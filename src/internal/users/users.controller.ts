import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':email')
    findOne(@Param('email') email: string) {
        return this.usersService.findOne(email);
    }

    @Patch(':email')
    update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(email, updateUserDto.password, updateUserDto.nickname);
    }

    @Delete(':email')
    remove(@Param('email') email: string) {
        return this.usersService.remove(email);
    }
}