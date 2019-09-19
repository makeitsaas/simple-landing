import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { APIContainer } from '../../../framework/core/api-container';

export function IsExistingEntityReference(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            name: "isExistingEntityReference",
            target: target.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions || {message: "Invalid entity reference"},
            validator: {
                validate(entityId: any, args: ValidationArguments) {
                    const EntityClass = Reflect.getMetadata('design:type', target, propertyName);
                    return APIContainer.getDatabase().manager.getRepository(EntityClass)
                        // Mysql will use convert(entityId, decimal) as id if EntityCall.id is number
                        .findOne(entityId)
                        .then((entity) => {
                            if (entity) {
                                Object.defineProperty(args.object, propertyName, {
                                    value: entity
                                });
                            }
                            return !!entity;
                        });
                }
            }
        });
    };
}
