import { HtmlElement } from '../../../../framework/core/abstracts/html-element';
import { BlockUtils } from './utils';


export class HtmlBlock extends HtmlElement {
    settings: {
        type: string,
        [key: string]: string
    } = {
        type: 'text'
    };

    template = './block.twig';
    templateWireframe = './block-wireframe.twig';

    async render() {
        let contentHtml = '';
        if (this.renderMode === 'wireframe') {
            this.settings.typeIconClass = BlockUtils.getBlockTypeIconClass(this.settings.type);
            contentHtml = await this.twig(`${__dirname}/${this.templateWireframe}`);
        } else if (this.settings.type !== 'custom') {
            contentHtml = await this.twig(`${__dirname}/templates/${this.settings.type}.block.twig`);
        } else {
            contentHtml = await BlockUtils.getCustomTemplate('1234');
        }

        return `<div class="block">${contentHtml}</div>`;
    }
}
