export const isSimpleKeyValueObject = (obj: any): boolean => {
    if (typeof obj !== 'object') {
        return false;
    }

    for (let key in obj) {
        if (["string", "number"].indexOf(typeof obj[key]) === -1) {
            return false;
        }
    }

    return true;
};
