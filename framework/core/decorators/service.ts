import { APIContainer } from '../api-container';

export function service(target: Object, propertyName: string, index?: number) {
    // Promise.resolve().then(() => {
        console.log('service()', APIContainer);
        if(APIContainer) {
            const metadata = Reflect.getMetadata('design:type', target, propertyName);
            APIContainer.ready.then(() => {
                const service = APIContainer.getService(metadata);
                Object.defineProperty(target, propertyName, {
                    value: service
                });
            });
        }
    // });
}
