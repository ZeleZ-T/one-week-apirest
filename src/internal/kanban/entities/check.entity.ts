import { Column, PrimaryColumn } from 'typeorm';
import { ManyToOne } from 'typeorm/browser';
import { Task } from './task.entity';
import { CheckDto } from '../dto/check.dto';
import { randomUUID, UUID } from 'node:crypto';

export class Check {
    public from(dto: CheckDto): Check {
        this.id = randomUUID();
        this.title = dto.title;
        this.status = dto.status;
        return this;
    }

    @PrimaryColumn()
    id: UUID;

    @Column()
    title: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Task, task => task.checks)
    task: Task;
}