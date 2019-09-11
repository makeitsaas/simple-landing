import { PageController } from './controllers/page.controller';
import { RoutingRuleSet } from '../../framework/providers/route/routing-rule-set';
import { BlockController } from './controllers/block.controller';

const PageRoutes = new RoutingRuleSet();

PageRoutes.get('/truc/:bidule', PageController.prototype.getById);
PageRoutes.get('/block/:bidule', BlockController.prototype.getById);
PageRoutes.post('/truc/:bidule', PageController.prototype.postAction);

export { PageRoutes };
