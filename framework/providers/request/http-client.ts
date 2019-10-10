const request = require('request');

export class HttpClient {
    get<T = any>(url: string, options: any = {json: true}): Promise<T> {

        console.log('\n\n--->\n', `launch http request get( ${url},`, options || '', ')\n--->\n\n');

        return new Promise(((resolve, reject) => {
            request(url, options, (err: Error, res: any, body: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        }))

    }
}
