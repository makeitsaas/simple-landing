import { AbstractModule } from '../../framework/core/abstracts/abstract-module';
import { PageRoutes } from './page.routes';
import { RoutingRuleSet } from '../../framework/providers/route/routing-rule-set';

export class PageModule extends AbstractModule {
    protected routes: RoutingRuleSet[] = [
        PageRoutes
    ];
}
