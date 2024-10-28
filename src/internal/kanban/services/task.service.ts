import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskDto } from '../dto/task.dto';
import { KanbanService } from './kanban.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private repository: Repository<Task>,
        private kanbanService: KanbanService
    ) {}

    async create(task: TaskDto, kanban_id: UUID) {
        const kanban = await this.kanbanService.findOne(kanban_id);
        return await this.repository.save(new Task().from(task, kanban));
    }

    async findAllByKanban(id: UUID) {
        return await this.repository.findBy({ kanban: { id: id } });
    }

    async findOne(id: UUID) {
        return await this.repository.findOneBy({ id: id });
    }

    async update(id: UUID, title?: string, description?: string, status?: string) {
        return await this.repository.update(id, { title, description, status});
    }

    async remove(id: UUID) {
        return await this.repository.delete({ id: id });
    }
}