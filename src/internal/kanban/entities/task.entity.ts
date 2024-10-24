import {randomUUID, UUID} from "node:crypto";
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Kanban } from './kanban.entity';
import { TaskDto } from '../dto/task.dto';
import { Check } from './check.entity';
import { ManyToOne, OneToMany } from 'typeorm/browser';

@Entity()
export class Task {
    public from(task: TaskDto): Task {
        this.id = randomUUID();
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.checks = task.checks.map(check => new Check().from(check));
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