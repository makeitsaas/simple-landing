import { APIContainer } from '../api-container';

export const em = (target: object, propertyName: string, index?: number) => {
    APIContainer.ready.then(() => {
        const em = APIContainer.getDatabase().manager;
        Object.defineProperty(target, propertyName, {
            value: em,
        });
    });
};
