export class RoutingObject {
    public routes: {[method: string]: [string, () => any][]} = {
        get: [],
        post: [],
        put: [],
        delete: []
    };

    get(path: string, callback: () => any) {
        this.routes.get.push([path, callback]);
    }
}
