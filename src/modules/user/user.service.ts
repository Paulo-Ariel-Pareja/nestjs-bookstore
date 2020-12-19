import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadUserDto } from './dto/read-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
    ) { }

    async get(ID: number): Promise<ReadUserDto> {
        if (!ID) {
            throw new BadRequestException('id must be send');
        }
        const user: User = await this._userRepository.findOne(ID, {
            where: {
                status: status.ACTIVE
            }
        })

        if (!user) {
            throw new NotFoundException();
        }

        return plainToClass(ReadUserDto, user);
    }

    async getAll(): Promise<ReadUserDto[]> {

        const users: User[] = await this._userRepository.find({
            where: {
                status: status.ACTIVE
            }
        })

        return users.map(user => plainToClass(ReadUserDto, user));

    }

    async update(ID: number, user: UpdateUserDto): Promise<ReadUserDto> {
        if (!ID) {
            throw new BadRequestException('id must be send');
        }

        const exist = await this._userRepository.findOne(ID, {
            where: {
                status: status.ACTIVE
            }
        })

        if (!exist) {
            throw new NotFoundException();
            
        }
        exist.username = user.username;
        const updated = await this._userRepository.update(ID, exist);
        return plainToClass(ReadUserDto, updated);
    }

    async delete(ID: number): Promise<void> {
        if (!ID) {
            throw new BadRequestException('id must be send');
        }

        const exist = await this._userRepository.findOne(ID, {
            where: {
                status: status.ACTIVE
            }
        })

        if (!exist) {
            throw new NotFoundException();
        }

        await this._userRepository.update(ID, { status: status.INACTIVE });
    }

    async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
        if (!userId) {
            throw new BadRequestException('id must be send');
        }

        const existUser = await this._userRepository.findOne(userId, {
            where: {
                status: status.ACTIVE
            }
        })

        const existRole = await this._roleRepository.findOne(roleId, {
            where: {
                status: status.ACTIVE
            }
        })

        if (!existUser || !existRole) {
            throw new NotFoundException();
        }

        existUser.roles.push(existRole);
        await this._userRepository.save(existUser);
        return true;
    }
}
