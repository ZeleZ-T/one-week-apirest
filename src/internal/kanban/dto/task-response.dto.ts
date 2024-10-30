import { Task } from '../entities/task.entity';
import { CheckResponseDto } from './check-response.dto';
import { ParentDto } from './parent.dto';

export class TaskResponseDto {
    id: string;
    title: string;
    description: string;
    status: string;
    image: string;
    checks: CheckResponseDto[];
    parent: ParentDto;

    public from(task: Task): TaskResponseDto {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.image = task.image;
        this.checks = task.checks?.map(check => new CheckResponseDto().from(check));
        this.parent = task.kanban ? new ParentDto().from(task.kanban)  : undefined;
        return this;
    }
}