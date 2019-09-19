import { PageController } from './controllers/page.controller';
import { RoutingRuleSet } from '../../framework/providers/route';
import { SecurityMiddleware } from '../../framework/providers/auth';
import { CanEditPageMiddleware } from '../core/security';

const PageRoutes = new RoutingRuleSet();

PageRoutes.get('/pages/:pageId', SecurityMiddleware.authenticatedFakeAdmin, PageController.prototype.getById);
PageRoutes.get('/pages/:pageId/render/wireframe', PageController.prototype.getPageWireframeRender);
PageRoutes.get('/pages/:pageId/render/full', PageController.prototype.getPageFullRender);
PageRoutes.post('/pages/:pageId', SecurityMiddleware.authenticatedUser, CanEditPageMiddleware, PageController.prototype.postAction);

export { PageRoutes };
