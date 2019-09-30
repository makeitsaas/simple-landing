import { validate } from 'class-validator';

/**
 * validate shall return an error :
 *  - when a required property is missing
 *  - when property constraint are not valid
 *  - when an unauthorized property is set
 *  - when property type is invalid
 *
 *  todo : implement nested types validation
 */
export const validateExternalInput = (InputClass: { new(): any }, body: any): Promise<any> => {
    const input = new InputClass();

    for (let key in body) {
        input[key] = body[key];
    }

    // whitelist : true => removes non-whitelisted properties
    // forbidNonWhitelisted : true => returns error in case non-whitelisted properties are encountered
    return validate(input, {whitelist: true, forbidNonWhitelisted: true}).then(errors => {
        if(errors && errors.length) {
            throw errors;
        } else {
            return input;
        }
    });
};

export const isEntityIdFormatted = (entityId: any) => {
    switch (typeof entityId) {
        case "number":
            return true;
        case "string":
            return /^[a-zA-Z0-9-_]+$/.test(entityId);
        default:
            return false;
    }
};

