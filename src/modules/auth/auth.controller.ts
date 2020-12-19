import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoggedInDto } from './dto/logged-in.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService
    ) { }

    @Post('signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() singUp: SignupDto): Promise<void> {
        return this._authService.signUp(singUp);
    }

    @Post('signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() singUp: SigninDto): Promise<LoggedInDto> {
        return this._authService.signIn(singUp);
    }
}
