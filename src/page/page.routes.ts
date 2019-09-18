import { PageController } from './controllers/page.controller';
import { RoutingRuleSet } from '../../framework/providers/route';
import { SecurityMiddleware } from '../../framework/providers/auth';

const PageRoutes = new RoutingRuleSet();

PageRoutes.get('/pages/:pageId', SecurityMiddleware.authenticatedAdmin, PageController.prototype.getById);
PageRoutes.get('/pages/:pageId/render/wireframe', PageController.prototype.getPageWireframeRender);
PageRoutes.get('/pages/:pageId/render/full', PageController.prototype.getPageFullRender);
PageRoutes.post('/pages/:pageId', SecurityMiddleware.authenticatedUser, PageController.prototype.postAction);

export { PageRoutes };
