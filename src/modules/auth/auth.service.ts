import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';
import { plainToClass } from 'class-transformer';
import { LoggedInDto } from './dto/logged-in.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepo: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignupDto): Promise<void> {
        const { username, email } = signUpDto;
        const userExist = await this._authRepo.findOne({
            where: [{ username }, { email }]
        });
        if (userExist) {
            throw new ConflictException('username or email already exist');
        }
        return this._authRepo.singup(signUpDto);
    }

    async signIn(signIn: SigninDto): Promise<LoggedInDto> {
        const { username, password } = signIn;

        const user: User = await this._authRepo.findOne({
            where: { username },
        });

        if (!user) {
            throw new UnauthorizedException('User or password are invalids');
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('User or password are invalids');
        }

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RoleType)
        }

        const token = this._jwtService.sign(payload);
        return plainToClass(LoggedInDto, {token, user});
    }
}
