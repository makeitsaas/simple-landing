import { PageController } from './controllers/page.controller';
import { RoutingRuleSet } from '../../framework/providers/route';
import { BlockController } from './controllers/block.controller';
import { SecurityMiddleware } from '../../framework/providers/auth';

const PageRoutes = new RoutingRuleSet();

PageRoutes.get('/truc/:bidule', SecurityMiddleware.authenticatedAdmin, PageController.prototype.getById);
PageRoutes.get('/block/:bidule', BlockController.prototype.getById);
PageRoutes.post('/truc/:bidule', SecurityMiddleware.authenticatedUser, PageController.prototype.postAction);

export { PageRoutes };
