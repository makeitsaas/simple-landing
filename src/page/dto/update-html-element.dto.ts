import { HtmlElementData } from '../entities/html-element-data';
import { IsOptional, IsString } from 'class-validator';
import { IsKeyValueDecorator } from '../decorators/is-key-value.decorator';
import { IsTranslations } from '../decorators/is-translations.decorator';
import { IsEntityReference } from '../decorators/is-existing-entity.decorator';

export class UpdateHtmlElementDto {
    @IsKeyValueDecorator()
    @IsOptional()
    fields?: {[key: string]: string|number};

    @IsTranslations()
    @IsOptional()
    translations?: {[key: string]: {[key: string]: string|number}};

    @IsEntityReference()
    @IsOptional()
    parentElement?: HtmlElementData;
}
