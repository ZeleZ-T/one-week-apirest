import { Module } from '@nestjs/common';
import { KanbanController } from './controllers/kanban.controller';
import { KanbanService } from './services/kanban.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kanban } from './entities/kanban.entity';
import { Check } from './entities/check.entity';
import { Task } from './entities/task.entity';
import { TaskService } from './services/task.service';
import { CheckService } from './services/check.service';
import { TaskController } from './controllers/task.controller';
import { CheckController } from './controllers/check.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Kanban, Task, Check])],
    providers: [KanbanService, TaskService, CheckService],
    controllers: [KanbanController, TaskController, CheckController],
})
export class KanbanModule {}
