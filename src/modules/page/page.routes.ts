import { PageController } from './controllers/page.controller';
import { RoutingRuleSet } from '@framework-v2/providers/route';
import { AuthenticatedUserMiddleware } from '@framework-v2/providers/auth';
import { CanEditPageMiddleware } from '../../core/security';
import { HtmlElementController } from './controllers/html-element.controller';

const PageRoutes = new RoutingRuleSet();

PageRoutes.get('/pages/:pageId', PageController.prototype.getById);
PageRoutes.get('/pages/:pageId/render/wireframe', PageController.prototype.getPageWireframeRender);
PageRoutes.get('/pages/:pageId/render/full', PageController.prototype.getPageFullRender);
PageRoutes.get('/pages/:pageId/layers', AuthenticatedUserMiddleware, CanEditPageMiddleware, PageController.prototype.getPageLayers);
PageRoutes.post('/pages', AuthenticatedUserMiddleware, PageController.prototype.createPage);
PageRoutes.get('/pages/:pageId/elements', PageController.prototype.getHtmlElements);
PageRoutes.post('/pages/:pageId/elements', AuthenticatedUserMiddleware, CanEditPageMiddleware, HtmlElementController.prototype.createElement);
PageRoutes.put('/pages/:pageId/elements/tree', AuthenticatedUserMiddleware, CanEditPageMiddleware, HtmlElementController.prototype.updateElementsPositions);
PageRoutes.put('/pages/:pageId/elements/:htmlElementDataId', AuthenticatedUserMiddleware, CanEditPageMiddleware, HtmlElementController.prototype.updateElement);
PageRoutes.put('/sass-render', PageController.prototype.renderScss);

export { PageRoutes };
