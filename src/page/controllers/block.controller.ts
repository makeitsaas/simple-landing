import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';

export class BlockController extends AbstractController {
    private var2 = 'Block buster'

    getById() {
        return `From block controller : "${this.var2}"`;
    }

    postAction() {

    }
}
