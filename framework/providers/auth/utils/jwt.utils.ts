const jwt = require('jsonwebtoken');
const httpRequest = require('request');
const jwkToPem = require('jwk-to-pem');

const PUBLIC_JWK_URL = `${process.env.AUTH_BASE_URL}/jwks.json`;

export const getRemoteKeys = (): Promise<any[]> => {
    return new Promise(((resolve, reject) => {
        httpRequest(PUBLIC_JWK_URL, {json: true}, (err: Error, res: any, body: any) => {
            const keys: any[] = body && body.keys;
            if (err || !keys || !keys.length) {
                reject(err || new Error('Authentication instance does not have any jwk'));
            } else {
                resolve(keys.map((key: any) => jwkToPem(key)))
            }
        });
    }))
};

export const parseToken = async (token: string) => {
    const publicKeys = await getRemoteKeys();
    let jwk: any;
    while(publicKeys.length) {
        jwk = publicKeys.shift();
        try {
            const decoded: any = jwt.verify(token, jwk);

            return decoded.user;
        } catch(e) {
            // check next key
        }
    }

    throw new Error('Invalid token');
};
