import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ReadRoleDto } from './dtos/read-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly _roleService: RoleService
    ) { }

    @Get(':id')
    getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
        return this._roleService.get(id);
    }

    @Get()
    getAll(): Promise<ReadRoleDto[]> {
        return this._roleService.getAll();
    }

    @Post()
    createRole(@Body() user: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
        return this._roleService.create(user);
    }

    @Patch(':id')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Partial<UpdateRoleDto>) {
        return this._roleService.update(id, role);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this._roleService.delete(id);
    }
}
