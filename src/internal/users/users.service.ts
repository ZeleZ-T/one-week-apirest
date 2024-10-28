import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) {
    }

    async create(user: CreateUserDto) {
        user.password = await this.hashPassword(user.password);
        return await this.repository.save(new User().from(user));
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findOne(email: string): Promise<User> {
        return await this.repository.findOneBy({ email: email });
    }

    async update(email: string, password?: string, nickname?: string) {
        if (password) password = await this.hashPassword(password);
        return await this.repository.update(email, { password, nickname });
    }

    async remove(email: string) {
        return await this.repository.delete({ email: email });
    }

    async hashPassword(password: string): Promise<string> {
        const bcrypt = require('bcrypt');
        return bcrypt.hash(password, 10);
    }
}
