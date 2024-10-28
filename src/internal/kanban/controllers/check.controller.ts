import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { CheckDto } from '../dto/check.dto';
import { CheckService } from '../services/check.service';

@Controller('kanban/:kanban_id/task/:task_id/check')
export class CheckController {
    constructor(private service: CheckService) {}

    @Post()
    create(@Body() check: CheckDto, @Param('task_id') task_id: string) {
        return this.service.create(check, task_id as UUID);
    }

    @Get()
    findAll(@Param('task_id') task_id: string) {
        return this.service.findAllByTask(task_id as UUID);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id as UUID);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() check: CheckDto) {
        return this.service.update(id as UUID, check.title, check.status);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id as UUID);
    }
}