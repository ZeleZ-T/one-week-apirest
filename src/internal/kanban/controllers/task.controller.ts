import { Body, Controller, Delete, Get, Param, Patch, Post, Headers, UnauthorizedException } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../dto/task.dto';
import { JwtService } from '../../auth/jwt.service';
import { KanbanService } from '../services/kanban.service';
import { TaskResponseDto } from '../dto/task-response.dto';

@Controller('kanban/:kanban_id/task')
export class TaskController {
    constructor(
        private service: TaskService,
        private kanbanService: KanbanService,
        private jwt: JwtService
    ) {}

    @Post()
    async create(
        @Body() task: TaskDto,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID)) {
            const newTask = await this.service.create(task, kanban_id as UUID);
            return new TaskResponseDto().from(newTask);
        }
    }

    @Get()
    async findAll(
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID)) {
            const tasks = await this.service.findAllByKanban(kanban_id as UUID);
            return tasks.map(task => new TaskResponseDto().from(task));
        }
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID)) {
            const task = await this.service.findOne(id as UUID);
            return new TaskResponseDto().from(task);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() task: TaskDto,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID))
            return this.service.update(id as UUID, task.title, task.description, task.status);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID))
            return this.service.remove(id as UUID);
    }

    private async verify(tokenHeader: string, kanban_id: UUID) {
        const email = (await this.kanbanService.findOne(kanban_id)).user.email;
        const token = await this.jwt.getTokenFromHeaders(tokenHeader);

        if (await this.jwt.verify(token, email))
            return true;
        else
            throw new UnauthorizedException();
    }
}