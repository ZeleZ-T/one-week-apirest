import { TaskDto } from './task.dto';

export class KanbanDto {
    title: string;
    description: string;
    tasks: TaskDto[];
}