import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';

export class PageController extends AbstractController {
    private var1 = 'Super Page Builder';

    getById() {
        return `From page controller : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.body)}`;
    }

    postAction() {
        return `Post action : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.body)}`;
    }
}
