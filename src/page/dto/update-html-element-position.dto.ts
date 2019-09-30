import { IsNumber, IsOptional } from 'class-validator';

export class UpdateHtmlElementPositionDto {
    @IsNumber()
    @IsOptional()
    parentId?: number|void|null;

    @IsNumber()
    position: number;

    @IsNumber()
    htmlElementDataId: number;
}
