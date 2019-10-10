import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { validateExternalInput } from '@framework-v2/providers/http-server/validation';

// it is not possible to retrieve the type of a decorated class attribute which is an array of something (all we get
// is the array function). That's why in this case, we have to specify the EntityClass as decorator input.
export function IsNestedDtoArray(EntityClass: { new(): any }, validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            name: "isNestedDtoArray",
            target: target.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions || {message: "Invalid entity reference"},
            validator: {
                validate(nestedBody: any, args: ValidationArguments) {
                    // console.log('metadata returns array function', Reflect.getMetadata('design:type', target, propertyName));

                    if(!(nestedBody instanceof Array)) {
                        throw new Error(`${propertyName} shall be ${EntityClass.name}[]`);
                    }

                    return Promise.all(Array.prototype.map.apply(nestedBody, [value => {
                        return validateExternalInput(EntityClass, value);
                    }])).then(arrayOfFormattedValues => {
                        Object.defineProperty(args.object, propertyName, {
                            value: arrayOfFormattedValues
                        });

                        return !!arrayOfFormattedValues;
                    });
                }
            }
        });
    };
}
