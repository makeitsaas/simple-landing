import { Allow, IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { InputObject } from '../../../framework/core/abstracts/input-object';

export class PageDto extends InputObject {
    @Allow()
    project_id: number;

    @IsString()
    @MaxLength(100)
    name: string;

    @IsString()
    repository_url: string;

    @IsBoolean()
    mandatory: boolean;

    @IsOptional()
    @IsBoolean()
    optional?: boolean;

    doSomething() {
        console.log('do something');
    }
}
