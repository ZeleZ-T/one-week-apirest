import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { KanbanDto } from '../dto/kanban.dto';
import { UUID } from 'node:crypto';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../dto/task.dto';

@Controller('kanban/:kanban_id/task')
export class TaskController {
    constructor(private service: TaskService) {}

    @Post()
    create(@Body() task: TaskDto, @Param('kanban_id') kanban_id: string) {
        return this.service.create(task, kanban_id as UUID);
    }

    @Get()
    findAll(@Param('kanban_id') kanban_id: string) {
        return this.service.findAllByKanban(kanban_id as UUID);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id as UUID);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() task: TaskDto) {
        return this.service.update(id as UUID, task.title, task.description, task.status);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id as UUID);
    }
}