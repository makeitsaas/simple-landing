import { ControllersLoader } from './loaders/controllers.loader';
import { AbstractModule } from './abstracts/abstract-module';
import { HttpVerb, RouteConfigType, RoutingRuleSet } from '../providers/route';
import { ControllerClassInterface } from './interfaces/controller-class.interface';
import { DatabaseLoader } from '../providers/orm';
import { Connection } from 'typeorm';

class ContainerClass {
    ready: Promise<any> = new Promise<any>((resolve, reject) => this.readyCallback = {resolve, reject});
    private readyCallback: {resolve: Function, reject: Function};

    private modules: AbstractModule[];
    public globalRoutingRuleSet = new RoutingRuleSet();
    private controllerLoader = new ControllersLoader();
    private databaseLoader = new DatabaseLoader();

    constructor() {
        setTimeout(() => {
            // dirty hack to avoid undefined APIContainer at first call in any cases (had problem in decorators call)
            this.load();
        }, 0);
    }

    load() {
        Promise.all([
            this.controllerLoader.load(),
            this.databaseLoader.load()
        ]).catch(e => {
            this.readyCallback.reject(e);
            throw e;
        }).then(() => {
            this.readyCallback.resolve();
        });
    }

    registerModules(modules: AbstractModule[]) {
        this.modules = modules;
        this.modules.map(module => {
            const ruleSets: RoutingRuleSet[] = module.getModuleRoutes();
            for (let ruleSet of ruleSets) {
                // const someRoutes = ruleSet.routes;
                const someRoutes: RouteConfigType = ruleSet.routes;
                const globalRoutes: RouteConfigType = this.globalRoutingRuleSet.routes;

                let verb: HttpVerb;
                for (verb in someRoutes) {
                    this.globalRoutingRuleSet.routes[verb] = this.globalRoutingRuleSet.routes[verb].concat(someRoutes[verb]);
                    // this.allRoutes[verb] = this.allRoutes[verb].concat(someRoutes);
                }
            }
        });
    }

    getController(fn: Function): { controller: ControllerClassInterface, methodName: string } {
        const controllers = this.controllerLoader.getControllersList();

        for (let controller of controllers) {
            // todo: check reason why prototype is not iterable "as is"
            const controllerMethods = Object.getOwnPropertyNames(controller.prototype);
            for (let method of controllerMethods) {
                if (controller.prototype[method] === fn) {
                    return {controller, methodName: method};
                }
            }
        }

        throw new Error('Controller not found');
    }

    getDatabase(): Connection {
        return this.databaseLoader.connection;
    }

    private services: {
        [key: string]: any
    } = {};

    public getService(metadata: any) {
        if(!this.services[metadata.name]) {
            this.services[metadata.name] = new metadata();
        }
        return this.services[metadata.name];
    }

}

export const APIContainer = new ContainerClass();
