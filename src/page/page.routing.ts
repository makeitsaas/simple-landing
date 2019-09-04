import { PageController } from './controllers/page.controller';
import { RoutingObject } from '../../framework/core/routing-object';

const PageRouting = new RoutingObject();

PageRouting.get('/truc/:bidule', PageController.prototype.getById);

export { PageRouting };
