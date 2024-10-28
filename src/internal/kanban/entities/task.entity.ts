import {randomUUID, UUID} from "node:crypto";
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Kanban } from './kanban.entity';
import { TaskDto } from '../dto/task.dto';
import { Check } from './check.entity';

@Entity()
export class Task {
    public from(task: TaskDto, kanban: Kanban): Task {
        this.id = randomUUID();
        this.title = task.title;
        this.description = task.description;
        this.kanban = kanban;
        this.status = task.status;

        return this;
    }

    @PrimaryColumn()
    id: UUID;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @OneToMany(() => Check, check => check.task)
    checks: Check[];

    @ManyToOne(() => Kanban, kanban => kanban.tasks)
    kanban: Kanban;
}