import { Column, PrimaryColumn, ManyToOne, Entity } from 'typeorm';
import { Task } from './task.entity';
import { CheckDto } from '../dto/check.dto';
import { randomUUID, UUID } from 'node:crypto';

@Entity()
export class Check {
    public from(dto: CheckDto, task: Task): Check {
        this.id = randomUUID();
        this.title = dto.title;
        this.status = dto.status;
        this.task = task;
        return this;
    }

    @PrimaryColumn()
    id: UUID;

    @Column()
    title: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Task, task => task.checks, { onDelete: 'CASCADE' })
    task: Task;
}