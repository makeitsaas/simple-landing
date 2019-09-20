import { PageController } from './controllers/page.controller';
import { RoutingRuleSet } from '../../framework/providers/route';
import { AuthenticatedUserMiddleware } from '../../framework/providers/auth';
import { CanEditPageMiddleware } from '../core/security';
import { HtmlElementController } from './controllers/html-element.controller';

const PageRoutes = new RoutingRuleSet();

PageRoutes.get('/pages/:pageId', PageController.prototype.getById);
PageRoutes.get('/pages/:pageId/render/wireframe', PageController.prototype.getPageWireframeRender);
PageRoutes.get('/pages/:pageId/render/full', PageController.prototype.getPageFullRender);
PageRoutes.post('/pages/:pageId', AuthenticatedUserMiddleware, CanEditPageMiddleware, PageController.prototype.postAction);
PageRoutes.post('/pages/:pageId/elements', AuthenticatedUserMiddleware, CanEditPageMiddleware, HtmlElementController.prototype.createElement);

export { PageRoutes };
