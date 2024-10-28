import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../internal/config/database.config';
import { UsersModule } from '../internal/users/users.module';
import { User } from '../internal/users/user.entity';
import { KanbanModule } from '../internal/kanban/kanban.module';
import { Kanban } from '../internal/kanban/entities/kanban.entity';
import { Task } from '../internal/kanban/entities/task.entity';
import { Check } from '../internal/kanban/entities/check.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.database'),
                entities: [User, Kanban, Task, Check],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        KanbanModule,
    ],
})
export class AppModule {}