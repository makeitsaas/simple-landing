import { HtmlElement } from '../../../../framework/core/abstracts/html-element';
import { BlockUtils } from './utils';
import { HtmlElementData } from '../../entities/html-element-data';

export class HtmlBlock extends HtmlElement {
    settings: {
        blockType: string,
        [key: string]: string
    };

    template = './block.twig';
    templateWireframe = './block-wireframe.twig';

    async render() {
        let contentHtml = '';
        if (this.renderMode === 'wireframe') {
            this.settings.typeIconClass = BlockUtils.getBlockTypeIconClass(this.settings.blockType);
            contentHtml = await this.twig(`${__dirname}/${this.templateWireframe}`);
        } else if (this.settings.blockType !== 'custom') {
            contentHtml = await this.twig(`${__dirname}/templates/${this.settings.blockType}.block.twig`);
        } else {
            contentHtml = await this.twigCustom('1');
        }

        return `<div id="${this.getHtmlId()}" class="block">${contentHtml}</div>`;
    }
}
