import { Allow, IsString, MaxLength } from 'class-validator';
import { InputObject } from '@framework-v2/core/abstracts/input-object';

export class SassRenderDto extends InputObject {
    @IsString()
    scss: string;

    @Allow()
    variables: any;
}
