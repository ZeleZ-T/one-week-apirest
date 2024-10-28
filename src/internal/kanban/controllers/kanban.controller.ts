import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { KanbanService } from '../services/kanban.service';
import { KanbanDto } from '../dto/kanban.dto';
import { UUID } from 'node:crypto';

@Controller('kanban')
export class KanbanController {
    constructor(private service: KanbanService) {}

    @Post()
    create(@Body() kanban: KanbanDto) {
        return this.service.create(kanban);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id as UUID);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() kanban: KanbanDto) {
        return this.service.update(id as UUID, kanban.description, kanban.title);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id as UUID);
    }
}