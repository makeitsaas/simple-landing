import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { APIContainer } from '../../../framework/core/api-container';

export function IsEntityReference(validationOptions?: ValidationOptions) {
    return function (target: Object, propertyName: string) {
        registerDecorator({
            name: "isExistingEntityReference",
            target: target.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions || {message: "Invalid entity reference"},
            validator: {
                validate(entityId: any, args: ValidationArguments) {
                    if (!isEntityIdFormatted(entityId)) {
                        throw new Error(`Invalid id format : '${entityId}'`);
                    }
                    const EntityClass = Reflect.getMetadata('design:type', target, propertyName);
                    return APIContainer.getDatabase().manager.getRepository(EntityClass)
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

const isEntityIdFormatted = (entityId: any) => {
    switch (typeof entityId) {
        case "number":
            return true;
        case "string":
            return /^[a-zA-Z0-9-_]+$/.test(entityId);
        default:
            return false;
    }
};
