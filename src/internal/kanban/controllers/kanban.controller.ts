import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { KanbanService } from '../services/kanban.service';
import { KanbanDto } from '../dto/kanban.dto';
import { UUID } from 'node:crypto';
import { JwtService } from '../../auth/jwt.service';
import { KanbanResponseDto } from '../dto/kanban-response.dto';


@Controller('kanban')
export class KanbanController {
    constructor(
        private service: KanbanService,
        private jwt: JwtService
    ) {}

    @Post()
    async create(
        @Body() kanban: KanbanDto,
        @Headers('Authorization') token: string
    ) {
        token = await this.jwt.getTokenFromHeaders(token);
        const email = await this.jwt.decode(token);
        const newKanban = await this.service.create(kanban, email);
        return new KanbanResponseDto().from(newKanban);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(id as UUID, token)) {
            const kanban = await this.service.findOne(id as UUID);
            return new KanbanResponseDto().from(kanban);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string, @Body() kanban: KanbanDto,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(id as UUID, token))
            return this.service.update(id as UUID, kanban.description, kanban.title);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(id as UUID, token))
            return this.service.remove(id as UUID);
    }

    private async verify(id: UUID, tokenHeader: string) {
        const kanban = await this.service.findOne(id);
        const token = await this.jwt.getTokenFromHeaders(tokenHeader);

        if (await this.jwt.verify(token, kanban.user.email))
            return true;
        else
            throw new UnauthorizedException();
    }
}