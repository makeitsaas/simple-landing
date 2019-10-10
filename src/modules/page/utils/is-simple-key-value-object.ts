export const isSimpleKeyValueObject = (obj: any): boolean => {
    if (typeof obj !== 'object') {
        return false;
    }

    for (let key in obj) {
        if(!obj.hasOwnProperty(key)) {
            return false;
        }

        if (obj[key] !== null && ["string", "number"].indexOf(typeof obj[key]) === -1) {
            return false;
        }
    }

    return true;
};
