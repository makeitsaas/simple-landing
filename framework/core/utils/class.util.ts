export const doClassExtendAnother = (childClass: any, parentClass: any) => {
    if(typeof childClass === 'function' && typeof parentClass === 'function') {
        if(!parentClass.prototype) {
            return false;
        }
        let proto = childClass.prototype;
        while(proto) {
            if(Object.getPrototypeOf(proto) === parentClass.prototype) {
                return true;
            } else {
                // console.log("get proto", Object.getPrototypeOf(proto));
                proto = Object.getPrototypeOf(proto);
            }
        }

        return false;
    } else {
        return false;
    }
};
