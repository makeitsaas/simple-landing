const request = require('request');

export class HttpClient {
    get<T = any>(url: string, options: any = {json: true}): Promise<T> {
        const fakeResponse = {
            message: 'success'
        };

        console.log('launch http request to', url, options || '');
        return new Promise(((resolve, reject) => {
            request(url, options, (err: Error, res: any, body: any) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        }))

    }
}
