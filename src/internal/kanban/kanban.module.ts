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
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { JwtService } from '../auth/jwt.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Kanban, Task, Check]),
        UsersModule,
        AuthModule
    ],
    providers: [KanbanService, TaskService, CheckService],
    controllers: [KanbanController, TaskController, CheckController],
})
export class KanbanModule {}
