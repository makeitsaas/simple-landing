import { UpdateHtmlElementPositionDto } from './update-html-element-position.dto';
import { IsNestedDtoArray } from '../decorators/is-nested-dto-array.decorator';

export class UpdateBulkHtmlElementsPositionDto {
    @IsNestedDtoArray(UpdateHtmlElementPositionDto)
    updates: UpdateHtmlElementPositionDto[];
}
