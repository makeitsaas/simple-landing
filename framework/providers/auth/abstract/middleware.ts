import { UserRequest } from '..';
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
    }
}

export const toFunction = (middleware: AbstractMiddlewareClass) => {
    return (req: UserRequest, res: Response, next: Function) => {
        // console.log('apply middleware', middleware);
        let middlewareInstance = new middleware(req, res, next);
        return middlewareInstance.execute();
    }
};
