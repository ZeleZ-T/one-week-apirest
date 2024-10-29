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
        try {
        token = await this.jwt.getTokenFromHeaders(token);
        const email = await this.jwt.decode(token);
        const newKanban = await this.service.create(kanban, email);
        return new KanbanResponseDto().from(newKanban);
        } catch { return new UnauthorizedException(); }
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
        else return new UnauthorizedException();
    }

    @Get()
    async findAll(
        @Headers('Authorization') token: string
    ) {
        try {
        token = await this.jwt.getTokenFromHeaders(token);
        const email = await this.jwt.decode(token);
        const kanbans = await this.service.findAllByUser(email);
        const response = kanbans.map(kanban => new KanbanResponseDto().from(kanban));
        return response;
        } catch { return new UnauthorizedException(); }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string, @Body() kanban: KanbanDto,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(id as UUID, token))
            return this.service.update(id as UUID, kanban.description, kanban.title);
        else return new UnauthorizedException();
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Headers('Authorization') token: string
    ) {
        if (await this.verify(id as UUID, token))
            return this.service.remove(id as UUID);
        else return new UnauthorizedException();
    }

    private async verify(id: UUID, tokenHeader: string) {
        try {
        const kanban = await this.service.findOne(id);
        const token = await this.jwt.getTokenFromHeaders(tokenHeader);

        if (await this.jwt.verify(token, kanban.user.email))
            return true;
        else
            return false;
        } catch { return false; }
    }
}