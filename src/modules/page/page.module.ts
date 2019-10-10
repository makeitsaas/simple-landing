import { AbstractModule } from '@framework-v2/core/abstracts/abstract-module';
import { PageRoutes } from './page.routes';
import { RoutingRuleSet } from '@framework-v2/providers/route';

export class PageModule extends AbstractModule {
    protected routes: RoutingRuleSet[] = [
        PageRoutes
    ];
}
