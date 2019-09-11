import { RoutingRuleSet } from '../../providers/route/routing-rule-set';
import { APIContainer } from '../api-container';

export abstract class AbstractModule {
    protected routes: RoutingRuleSet[] = [];

    getModuleRoutes(): RoutingRuleSet[] {
        return this.routes;
    }

    testRoutes() {
        this.routes.map(ro => {
            if(ro.routes && ro.routes.get.length) {
                const [path, callback] = ro.routes.get[0];
                console.log('path', path);
                // const pcInstance = new PageController();
                // console.log(PageController.prototype.getById === callback);
                // console.log(pcInstance.getById === callback);
                // console.log(BlockController.prototype.getById === callback);
                console.log("Found controller", APIContainer.getController(callback))
            }
        })
    }
}
