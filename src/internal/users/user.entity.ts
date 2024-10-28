import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { Kanban } from '../kanban/entities/kanban.entity';

@Entity()
export class User {
    public from(dto: CreateUserDto): User {
        this.email = dto.email;
        this.password = dto.password;
        this.nickname = dto.nickname;
        return this;
    }

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @OneToMany(() => Kanban, kanban => kanban.user)
    kanbans: Kanban[];
}