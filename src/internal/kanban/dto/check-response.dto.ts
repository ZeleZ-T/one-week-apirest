import { Check } from '../entities/check.entity';
import { ParentDto } from './parent.dto';

export class CheckResponseDto {
    id: string;
    title: string;
    status: boolean;
    parent: ParentDto;

    public from(check: Check): CheckResponseDto {
        this.id = check.id;
        this.title = check.title;
        this.status = check.status;
        this.parent = check.task ? new ParentDto().from(check.task) : undefined;
        return this;
    }
}