import { UserRequest } from '../../providers/auth';
import { Response } from 'express';
import { AbstractMiddlewareClass } from '../abstracts/middleware';


export const middlewareAsFunction = (middleware: AbstractMiddlewareClass) => {
    return (req: UserRequest, res: Response, next: Function) => {
        // console.log('apply middleware', middleware);
        let middlewareInstance = new middleware(req, res, next);
        return Promise.resolve(middlewareInstance.execute()).catch(e => res.status(500).send({message: e.message}));
    }
};
