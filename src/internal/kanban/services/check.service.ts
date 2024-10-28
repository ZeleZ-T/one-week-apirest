import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Check } from '../entities/check.entity';
import { CheckDto } from '../dto/check.dto';
import { TaskService } from './task.service';

@Injectable()
export class CheckService {
    constructor(
        @InjectRepository(Check)
        private repository: Repository<Check>,
        private taskService: TaskService
    ) {}

    async create(check: CheckDto, task_id: UUID) {
        const task = await this.taskService.findOne(task_id);
        return await this.repository.save(new Check().from(check, task));
    }

    async findAllByTask(id: UUID) {
        return await this.repository.findBy({ task: { id: id } });
    }

    async findOne(id: UUID) {
        return await this.repository.findOneBy({ id: id });
    }

    async update(id: UUID, title?: string, status?: boolean) {
        return await this.repository.update(id, { title, status});
    }

    async remove(id: UUID) {
        return await this.repository.delete({ id: id });
    }
}