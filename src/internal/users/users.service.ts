import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) {}

    create(user: User) {
        this.repository.create(user);
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findOne(email: string): Promise<User> {
        return await this.repository.findOneBy({ email: email });
    }

    async changePassword(email: string, newPassword: string) {
        await this.repository.update(email, { password: newPassword });
    }

    async remove(email: string) {
        await this.repository.delete({ email: email });
    }
}
