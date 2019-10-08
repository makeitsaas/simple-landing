import { Allow, IsString, MaxLength } from 'class-validator';
import { InputObject } from '../../../framework/core/abstracts/input-object';

export class SassRenderDto extends InputObject {
    @IsString()
    scss: string;

    @Allow()
    variables: any;
}
