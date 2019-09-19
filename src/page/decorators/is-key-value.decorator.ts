import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
import { isSimpleKeyValueObject } from '../utils/is-simple-key-value-object';

export function IsKeyValueDecorator(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isKeyValue",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions || {message: "Must implement {[key: string]: string|number}"},
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isSimpleKeyValueObject(value);
                }
            }
        });
    };
}
