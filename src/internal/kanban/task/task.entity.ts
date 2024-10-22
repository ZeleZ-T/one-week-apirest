import {randomUUID, UUID} from "node:crypto";

export class Task {
    private readonly _id: UUID;

    constructor(
        private _title: string,
        private _description: string,
        private _status: string,
        private _checks?: Map<string, boolean>
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

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get checks(): Map<string, boolean> | undefined {
        return this._checks;
    }

    set checks(value: Map<string, boolean> | undefined) {
        this._checks = value;
    }

    addCheck(title: string): void {
        this._checks.set(title, false);
    }

    removeCheck(title: string): void {
        this._checks.delete(title);
    }
}