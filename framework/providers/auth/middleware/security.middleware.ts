import { AbstractMiddleware } from '..';

class AuthenticatedUserMiddleware extends AbstractMiddleware {
    execute() {
        if (this.request.user && this.request.user.isAuthenticated()) {
            this.next();
        } else {
            this.response.status(401).send({message: "Authorization required"});
        }
    }
}

class AuthenticatedAdmin extends AuthenticatedUserMiddleware {
    execute() {
        this.next();
    }
}

export const SecurityMiddleware = {
    authenticatedUser: AuthenticatedUserMiddleware,
    authenticatedAdmin: AuthenticatedAdmin
};
