import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role.dto';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { status } from '../../shared/entity-status.enum';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ) { }

    async get(ID: number): Promise<ReadRoleDto> {
        if (!ID) {
            throw new BadRequestException('id must be send');
        }
        const role: Role = await this._roleRepository.findOne(ID, {
            where: {
                status: status.ACTIVE
            }
        })

        if (!role) {
            throw new NotFoundException();
        }

        return plainToClass(ReadRoleDto, role);
    }

    async getAll(): Promise<ReadRoleDto[]> {
        const roles: Role[] = await this._roleRepository.find({
            where: {
                status: status.ACTIVE
            }
        })

        return roles.map((role:Role)=> plainToClass(ReadRoleDto, role));

    }

    async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {       
        const saveRole = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto, saveRole);
    }

    async update(ID: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
        if (!ID) {
            throw new BadRequestException('id must be send');
        }
        const exist = await this._roleRepository.findOne(ID, {
            where: status.ACTIVE
        })
        if (!exist) {
            throw new NotFoundException();
        }
        exist.name = role.name;
        exist.description = role.description;

        const updateRole = await this._roleRepository.update(ID, exist);
        return plainToClass(ReadRoleDto, updateRole);
    }

    async delete(ID: number): Promise<void> {
        if (!ID) {
            throw new BadRequestException('id must be send');
        }

        const exist = await this._roleRepository.findOne(ID, {
            where: {
                status: status.ACTIVE
            }
        })

        if (!exist) {
            throw new NotFoundException();
        }

        await this._roleRepository.update(ID, { status: status.INACTIVE });
    }
}
