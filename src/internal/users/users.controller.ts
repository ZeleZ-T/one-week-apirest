import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.service.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':email')
    findOne(@Param('email') email: string) {
        return this.service.findOne(email);
    }

    @Patch(':email')
    update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
        return this.service.update(email, updateUserDto.password, updateUserDto.nickname);
    }

    @Delete(':email')
    remove(@Param('email') email: string) {
        return this.service.remove(email);
    }
}