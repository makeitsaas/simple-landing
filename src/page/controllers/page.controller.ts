import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { PageDto } from '../validation/page-dto';
import { validate } from 'class-validator';
import { input } from '../../../framework/providers/http-server/http-server';

export class PageController extends AbstractController {
    private var1 = 'Super Page Builder';

    getById() {
        return `From page controller : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.body)}`;
    }

    postAction(@input page: PageDto) {
        page.doSomething();
        return `Post action : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.body)}`;
    }
}
