import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
import { isMultipleTranslationsObject } from '../utils/is-multiple-translations-object';

export function IsTranslations(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isTranslation",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions || {message: "Must implement {[lang: string]:{[key: string]: string|number}}"},
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isMultipleTranslationsObject(value);
                }
            }
        });
    };
}
