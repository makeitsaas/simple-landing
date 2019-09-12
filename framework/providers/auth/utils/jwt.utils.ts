const jwt = require('jsonwebtoken');
const httpRequest = require('request');
const jwkToPem = require('jwk-to-pem');

const PUBLIC_JWK_URL = `${process.env.AUTH_BASE_URL}/jwks.json`;

export const getRemoteKey = (header: any, callback: Function) => {
    httpRequest(PUBLIC_JWK_URL, {json: true}, (err: Error, res: any, body: any) => {
        const remoteJwk = body && body.keys && body.keys[0];
        if (err || !remoteJwk) {
            callback(err);
        } else {
            const key = jwkToPem(remoteJwk);
            callback(null, key);
        }
    });
};

export const parseToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getRemoteKey, {}, (err: Error, decoded: any) => {
            if (decoded) {
                resolve(decoded.user);
            } else {
                reject(err);
            }
        });
    });
};
