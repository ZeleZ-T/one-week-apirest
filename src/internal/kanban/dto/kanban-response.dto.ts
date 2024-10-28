import { Kanban } from '../entities/kanban.entity';
import { TaskResponseDto } from './task-response.dto';
import { ParentDto } from './parent.dto';

export class KanbanResponseDto {
    id: string;
    title: string;
    description: string;
    tasks: TaskResponseDto[];
    parent: ParentDto;

    public from(kanban: Kanban): KanbanResponseDto {
        this.id = kanban.id;
        this.title = kanban.title;
        this.description = kanban.description;
        this.tasks = kanban.tasks?.map(task => new TaskResponseDto().from(task));
        this.parent = new ParentDto().from(kanban.user);
        return this;
    }
}