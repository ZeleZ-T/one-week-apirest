import { Body, Injectable, Post } from '@nestjs/common';
import { KanbanDto } from '../dto/kanban.dto';
import { UUID } from 'node:crypto';
import { Kanban } from '../entities/kanban.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/users.service';

@Injectable()
export class KanbanService {
    constructor(
        @InjectRepository(Kanban)
        private repository: Repository<Kanban>,
    ) {}

    async create(kanban: KanbanDto) {
        return await this.repository.save(new Kanban().from(kanban));
    }

    async findOne(id: UUID) {
        return await this.repository.findOneBy({ id: id });
    }

    async update(id: UUID, title?: string, description?: string) {
        return await this.repository.update(id, { title, description});
    }

    async remove(id: UUID) {
        return await this.repository.delete({ id: id });
    }
}