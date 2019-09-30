import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { validateExternalInput } from '../../../framework/providers/http-server/validation';

export function IsNestedDto(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            name: "isNestedDto",
            target: target.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions || {message: "Invalid entity reference"},
            validator: {
                validate(nestedBody: any, args: ValidationArguments) {
                    const EntityClass = Reflect.getMetadata('design:type', target, propertyName);

                    return validateExternalInput(EntityClass, nestedBody).then(entity => {
                        Object.defineProperty(args.object, propertyName, {
                            value: entity
                        });

                        return !!entity;
                    });
                }
            }
        });
    };
}
