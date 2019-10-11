import { APIContainer } from '../api-container';

export function discovery(target: Object, propertyName: string, index?: number) {
    if (APIContainer) {
        APIContainer.ready.then(() => {
            Object.defineProperty(target, propertyName, {
                value: APIContainer.discovery
            });
        });
    }
}
