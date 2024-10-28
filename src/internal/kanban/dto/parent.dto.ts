import { Kanban } from '../entities/kanban.entity';
import { Task } from '../entities/task.entity';
import { Check } from '../entities/check.entity';
import { User } from '../../users/user.entity';

export class ParentDto {
    id: string;
    title: string;

    public from(value: User | Kanban | Task): ParentDto {
        if (value instanceof User) {
            this.id = value.email;
            this.title = value.nickname;
            return this;
        } else {
            this.id = value.id;
            this.title = value.title;
            return this;
        }
    }
}