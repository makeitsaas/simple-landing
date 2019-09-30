import { Allow, IsNumber, IsString } from 'class-validator';

export class UpdateHtmlElementPositionDto {
    @IsString()
    @Allow()
    parentId: string;

    @IsNumber()
    @Allow()
    position: string;

    @IsString()
    @Allow()
    htmlElementDataId: string;

}
