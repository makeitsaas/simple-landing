import { isSimpleKeyValueObject } from './is-simple-key-value-object';

export const isMultipleTranslationsObject = (obj: any): boolean => {
    if (typeof obj !== 'object') {
        return false;
    }

    for (let lang in obj) {
        if(!/^[a-z]{2}(-[a-z]{2})?$/i.test(lang)) {
            return false;
        }
        if(!isSimpleKeyValueObject(obj[lang])) {
            return false;
        }
    }

    return true;
};
