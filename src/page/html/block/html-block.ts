import { HtmlElement } from '../../../../framework/core/abstracts/html-element';
import { BlockUtils } from './utils';


export class HtmlBlock extends HtmlElement {
    settings: {
        type: string,
        [key: string]: string
    } = {
        type: 'default'
    };

    template = './block.twig';
    templateWireframe = './block-wireframe.twig';

    async render() {
        if (this.renderMode === 'wireframe') {
            this.settings.typeIconClass = BlockUtils.getBlockTypeIconClass(this.settings.type);
            return await this.twig(`${__dirname}/${this.templateWireframe}`);
        } else if (this.settings.type !== 'custom') {
            return await this.twig(`${__dirname}/${this.template}`);
        } else {
            return await BlockUtils.getCustomTemplate('1234');
        }
    }
}
