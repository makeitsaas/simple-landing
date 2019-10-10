import { IsString, MaxLength } from 'class-validator';
import { InputObject } from '@framework-v2/core/abstracts/input-object';

export class CreatePageDto extends InputObject {
    @IsString()
    @MaxLength(127)
    name: string;
}
