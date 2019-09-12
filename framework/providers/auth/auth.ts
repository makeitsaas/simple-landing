const jwt = require('jsonwebtoken');
const request = require('request');
const jwkToPem = require('jwk-to-pem');

const PUBLIC_JWK_URL = `${process.env.AUTH_BASE_URL}/jwks.json`;

const getRemoteKey = (header: any, callback: Function) => {
    request(PUBLIC_JWK_URL, { json: true }, (err: Error, res: any, body: any) => {
        const remoteJwk = body && body.keys && body.keys[0];
        if (err || !remoteJwk) {
            callback(err);
        } else {
            const key = jwkToPem(remoteJwk);
            callback(null, key);
        }
    });
};

const parseToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getRemoteKey, {}, (err: Error, decoded: any) => {
            if(decoded) {
                resolve(decoded.user);
            } else {
                reject(err);
            }
        });
    });
};

class User {
    jwt = null;
    constructor(parsedJwtUser?: any) {
        this.jwt = parsedJwtUser;
    }

    isAuthenticated() {
        return !!this.jwt;
    }
}

export const AuthProvider = {
    middlewareParseUser: (req: any, res: any, next: Function) => {
        let authorization = req.headers.authorization;
        if(!authorization) {
            // user is simply not authenticated
            req.user = new User();
            next();
        } else if (authorization && !/^Bearer .+/.test(authorization)) {
            // authoriation is set bu not readable
            res.status(400).send({message: "Wrong token format"});
        } else {
            let token = authorization.replace(/^Bearer +/i, '');
            parseToken(token)
                .then(decoded => {
                    req.user = new User(decoded);
                    next()
                })
                .catch(err => {
                    //console.log('auth error', err);
                    req.user = new User();
                    res.status(401).send({message: "Invalid token"});
                })
        }
    }
}
