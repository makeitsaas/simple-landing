import { HtmlElement } from '../../../../framework/core/abstracts/html-element';
import { HtmlRenderOptionsInterface } from '../../../../framework/core/interfaces/html-render-options.interface';
import { BlockUtils } from './utils';


export class HtmlBlock extends HtmlElement {
    settings: {
        type: string,
        [key: string]: string
    } = {
        type: 'default'
    };

    template = './block.twig';

    async render(options?: HtmlRenderOptionsInterface) {
        this.settings.typeIconClass = BlockUtils.getBlockTypeIconClass(this.settings.type);
        return await this.twig(`${__dirname}/${this.template}`);
    }
}
