import { ControllersLoader } from './loaders/controllers.loader';
import { ControllerInstanceInterface } from './interfaces/controller-instance.interface';
import { AbstractModule } from './abstracts/abstract-module';
import { HttpVerb, IRouteConfig, RoutingRuleSet } from '../providers/route/routing-rule-set';
import { ControllerClassInterface } from './interfaces/controller-class.interface';

class ContainerClass {
    random: number;
    ready: Promise<any>;

    private modules: AbstractModule[];
    public globalRoutingRuleSet = new RoutingRuleSet();
    private controllerLoader = new ControllersLoader();

    constructor() {
        this.random = Math.floor(Math.random() * 1000000);
        this.ready = this.load().then(() => console.log('ready'));
    }

    registerModules(modules: AbstractModule[]) {
        this.modules = modules;
        this.modules.map(module => {
            const ruleSets: RoutingRuleSet[] = module.getModuleRoutes();
            for (let ruleSet of ruleSets) {
                // const someRoutes = ruleSet.routes;
                const someRoutes: IRouteConfig = ruleSet.routes;
                const globalRoutes: IRouteConfig = this.globalRoutingRuleSet.routes;

                let verb: HttpVerb;
                for (verb in someRoutes) {
                    this.globalRoutingRuleSet.routes[verb] = this.globalRoutingRuleSet.routes[verb].concat(someRoutes[verb]);
                    // this.allRoutes[verb] = this.allRoutes[verb].concat(someRoutes);
                }
            }
        });
    }

    load() {
        return Promise.all([
            this.controllerLoader.load()
        ]);
    }

    getController(fn: Function): {controller: ControllerClassInterface, methodName: string} {
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

    executeAction(controllerInstance: ControllerInstanceInterface, methodName: string): Promise<any> {
        const controllerMethods = Object.getOwnPropertyNames(controllerInstance);
        for(let method of controllerMethods) {

        }
        return Promise.resolve(true);
    }

    showRandom() {
        console.log('random :', this.random);
    }
}

export const APIContainer = new ContainerClass();
