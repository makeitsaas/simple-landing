interface FilterPromiseResult {
    result: any;
    item: any;
}

export const ArrayUtils = {
    filterAsync: async (arr: any[], fn: Function) => {
        const filterFunctions: Promise<FilterPromiseResult>[] = arr.map(item => new Promise((resolve, reject) => {
            try {
                fn(item)
                    .then((result: any) => resolve({result, item}))
                    .catch((e: Error) => reject(e));
            } catch(e) {
                reject(e);
            }

        }));

        return Promise.all(filterFunctions)
            .then(results => results
                .filter(({result}: FilterPromiseResult) => result)
                .map(({item}: FilterPromiseResult) => item)
            );
    }
};
