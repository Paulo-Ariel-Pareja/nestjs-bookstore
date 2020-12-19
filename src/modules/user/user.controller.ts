import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorators';
import { RoleType } from '../role/roletype.enum';
import { RoleGuard } from '../role/guards/role.guard';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) { }

    @Get(':id')
    @Roles(RoleType.ADMIN, RoleType.AUTHOR)
    @UseGuards(AuthGuard(), RoleGuard)
    getUser(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
        return this._userService.get(id);
    }

    @UseGuards(AuthGuard())
    @Get()
    getAll(): Promise<ReadUserDto[]> {
        return this._userService.getAll();
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this._userService.update(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._userService.delete(id);
    }

    @Post('setRole/:userId/:roleId')
    setRole(@Param('userId', ParseIntPipe) userId: number, @Param('roleId', ParseIntPipe) roleId: number): Promise<boolean> {
        return this._userService.setRoleToUser(userId, roleId);
    }
}
