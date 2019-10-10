export class HttpRequest {
    get<T>(url: string): Promise<T|any> {
        const fakeResponse = {
            message: 'success'
        };
        console.log('launch http request');
        return Promise.resolve(fakeResponse);
    }
}
