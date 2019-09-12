import { AbstractMiddleware, User } from '..';
import { parseToken } from '../utils/jwt.utils';

class ParseUserMiddleware extends AbstractMiddleware {
    execute() {
        let authorization: string|void = this.request.headers.authorization;
        if (!authorization) {
            // user is simply not authenticated
            this.request.user = new User();
            this.next();
        } else if (!/^Bearer .+/.test(authorization)) {
            // authorization is set but not readable
            this.response.status(400).send({message: "Wrong token format"});
        } else {
            let token = authorization.replace(/^Bearer +/i, '');
            parseToken(token)
                .then(decoded => {
                    this.request.user = new User(decoded);
                    this.next()
                })
                .catch(err => {
                    //console.log('auth error', err);
                    this.request.user = new User();
                    this.response.status(401).send({message: "Invalid token"});
                })
        }
    }
}

export const AuthMiddleware = {
    parseUserMiddleware: ParseUserMiddleware
};
