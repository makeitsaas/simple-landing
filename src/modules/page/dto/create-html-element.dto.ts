import { HtmlElementData } from '../entities/html-element-data';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsKeyValueDecorator } from '../decorators/is-key-value.decorator';
import { IsTranslations } from '../decorators/is-translations.decorator';
import { IsEntityReference } from '../decorators/is-existing-entity.decorator';

export class CreateHtmlElementDto {
    @IsString()
    type: 'page'|'section'|'column'|'columns'|'block';

    @IsKeyValueDecorator()
    @IsOptional()
    settings?: {[key: string]: string|number|null};

    @IsKeyValueDecorator()
    @IsOptional()
    fields?: {[key: string]: string|number|null};

    @IsTranslations()
    @IsOptional()
    translations?: {[key: string]: {[key: string]: string|number}};

    @IsEntityReference()
    @IsOptional()
    parent?: HtmlElementData;

    @IsNumber()
    @IsOptional()
    position?: number;

    @IsString()
    @IsOptional()
    blockType?: string;
}
