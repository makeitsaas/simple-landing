export type HttpVerb = 'get'|'post'|'put'|'delete';

export interface IRouteConfig {
    get: [string, () => any][]
    post: [string, () => any][]
    put: [string, () => any][]
    delete: [string, () => any][]
}

export class RoutingRuleSet {
    // public routes: {[method in HttpVerb]: [string, () => any][]} = {
    public routes: IRouteConfig = {
        get: [],
        post: [],
        put: [],
        delete: []
    };

    get(path: string, callback: () => any) {
        this.routes.get.push([path, callback]);
    }

    post(path: string, callback: () => any) {
        this.routes.post.push([path, callback]);
    }
}
