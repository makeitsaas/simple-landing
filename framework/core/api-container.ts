import { ControllersLoader } from './loaders/controllers.loader';
import { AbstractModule } from './abstracts/abstract-module';
import { HttpVerb, RouteConfigType, RoutingRuleSet } from '../providers/route';
import { ControllerClassInterface } from './interfaces/controller-class.interface';

class ContainerClass {
    ready: Promise<any>;

    private modules: AbstractModule[];
    public globalRoutingRuleSet = new RoutingRuleSet();
    private controllerLoader = new ControllersLoader();

    constructor() {
        this.ready = this.load().then(() => console.log('ready'));
    }

    load() {
        return Promise.all([
            this.controllerLoader.load()
        ]);
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
}

export const APIContainer = new ContainerClass();
