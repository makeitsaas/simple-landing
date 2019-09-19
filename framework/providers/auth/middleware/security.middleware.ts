import { AbstractMiddleware } from '../../../core/abstracts/middleware';

export class AuthenticatedUserMiddleware extends AbstractMiddleware {
    execute() {
        if (this.request.user && this.request.user.isAuthenticated()) {
            this.next();
        } else {
            this.response.status(401).send({message: "Authorization required"});
        }
    }
}

export class AuthenticatedAdmin extends AuthenticatedUserMiddleware {
    execute() {
        this.next();
    }
}
