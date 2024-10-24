import { CheckDto } from './check.dto';

export class TaskDto {
    title: string;
    description: string;
    status: string;
    checks: CheckDto[];
}