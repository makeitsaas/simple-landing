import { Allow, IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class PageDto {
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
