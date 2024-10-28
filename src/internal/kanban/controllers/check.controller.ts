import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { CheckDto } from '../dto/check.dto';
import { CheckService } from '../services/check.service';
import { KanbanService } from '../services/kanban.service';
import { JwtService } from '../../auth/jwt.service';
import { CheckResponseDto } from '../dto/check-response.dto';

@Controller('kanban/:kanban_id/task/:task_id/check')
export class CheckController {
    constructor(
        private service: CheckService,
        private kanbanService: KanbanService,
        private jwt: JwtService
    ) {}

    @Post()
    async create(
        @Body() check: CheckDto,
        @Param('task_id') task_id: string,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID)) {
            const newCheck = await this.service.create(check, task_id as UUID);
            return new CheckResponseDto().from(newCheck);
        }
    }

    @Get()
    async findAll(
        @Param('task_id') task_id: string,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID)) {
            const checks = await this.service.findAllByTask(task_id as UUID);
            return checks.map(check => new CheckResponseDto().from(check));
        }
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID)) {
            const output = await this.service.findOne(id as UUID);
            return new CheckResponseDto().from(output);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() check: CheckDto,
        @Param('kanban_id') kanban_id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(token, kanban_id as UUID))
            return this.service.update(id as UUID, check.title, check.status);
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