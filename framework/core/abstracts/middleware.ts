import { UserRequest } from '../../providers/auth';
import { Response } from 'express';

export interface AbstractMiddlewareClass {
    new(request: UserRequest, response: Response, next: Function): AbstractMiddleware
}

export interface MiddlewareInterface {
    execute(): any
}

export class AbstractMiddleware implements MiddlewareInterface {
    constructor(
        protected request: UserRequest,
        protected response: Response,
        protected next: Function
    ) {
    }

    execute() {
        this.next();
    }
}
