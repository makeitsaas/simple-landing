// provider : service with a specific interface, that can change according to execution context (e.g.: database, queues, ...)

import { APIContainer } from '../api-container';
import { providerManager } from '../providers/providers-container';

export function driver(target: Object, propertyName: string, index?: number) {
    if (APIContainer) {
        const metadata = Reflect.getMetadata('design:type', target, propertyName);
        APIContainer.ready.then(() => {
            const service = providerManager.providerInstance(metadata);
            Object.defineProperty(target, propertyName, {
                value: service
            });
        });
    }
}

