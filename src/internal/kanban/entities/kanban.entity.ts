import { randomUUID, UUID } from 'node:crypto';
import { Task } from './task.entity';
import { Column, Entity, PrimaryColumn, JoinColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { KanbanDto } from '../dto/kanban.dto';
import { User } from '../../users/user.entity';

@Entity()
export class Kanban {
    public from(kanban: KanbanDto): Kanban {
        this.id = randomUUID();
        this.title = kanban.title;
        this.description = kanban.description;
        return this;
    }

    @PrimaryColumn()
    id: UUID;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Task, task => task.kanban)
    tasks: Task[];
}