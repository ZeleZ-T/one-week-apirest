import { randomUUID, UUID } from 'node:crypto';
import { Task } from './task/task.entity';

export class Kanban {
    private readonly _id: UUID;

    constructor(
        private _title: string,
        private _description: string,
        private _tasks: Task[]
    ) {
        this._id = randomUUID();
    }

    get id(): UUID {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get tasks(): Task[] {
        return this._tasks;
    }

    set tasks(value: Task[]) {
        this._tasks = value;
    }

    addTask(task: Task): void {
        this._tasks.push(task);
    }

    removeTask(taskID: UUID): void {
        this._tasks = this._tasks.filter(task => task.id !== taskID);
    }
}