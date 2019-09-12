import { AbstractMiddleware, AbstractMiddlewareClass } from '../auth'
import { doClassExtendAnother } from '../../core/utils/class.util';

export type HttpVerb = 'get' | 'post' | 'put' | 'delete';

export interface RouteConfigOption {
    middleware: any[]
}

export type RouteConfigType = {
    [method in HttpVerb]: [string, Function, RouteConfigOption?][]
}

export class RoutingRuleSet {
    // public routes: {[method in HttpVerb]: [string, () => any][]} = {
    public routes: RouteConfigType = {
        get: [],
        post: [],
        put: [],
        delete: []
    };

    get(...args: (AbstractMiddlewareClass | any)[]) {
        this.classifyRule('get', ...args);
    }

    post(...args: (AbstractMiddlewareClass | any)[]) {
        this.classifyRule('post', ...args);
    }

    put(...args: (AbstractMiddlewareClass | any)[]) {
        this.classifyRule('put', ...args);
    }

    delete(...args: (AbstractMiddlewareClass | any)[]) {
        this.classifyRule('delete', ...args);
    }

    private classifyRule(verb: HttpVerb, ...args: (AbstractMiddlewareClass | any)[]) {
        const path: string = args[0];
        const callback: Function = args[args.length - 1];
        const options: RouteConfigOption = {
            middleware: []
        };

        for (let i = 0; i < args.length; i++) {
            if (doClassExtendAnother(args[i], AbstractMiddleware)) {
                options.middleware.push(args[i])
            }
        }

        this.routes[verb].push([path, callback, options]);
    }
}
