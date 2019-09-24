import { HtmlElement, HtmlElementDataCommon } from '../../index';
import { BlockUtils } from './utils';

export class HtmlBlock extends HtmlElement {
    settings: {
        blockType: string,
        [key: string]: string
    };

    template = './block.twig';
    templateWireframe = './block-wireframe.twig';

    constructor(data?: HtmlElementDataCommon) {
        super(data);
        if (!this.settings.blockType) {
            this.settings.blockType = 'text';
        }
    }

    async render() {
        let contentHtml = '';
        if (this.renderMode === 'wireframe') {
            this.settings.typeIconClass = BlockUtils.getBlockTypeIconClass(this.settings.blockType);
            contentHtml = await this.twig(`${__dirname}/${this.templateWireframe}`);
        } else if (this.settings.blockType !== 'custom') {
            contentHtml = await this.twig(`${__dirname}/templates/${this.settings.blockType}.block.twig`);
        } else if (this.data && this.data.customTemplate) {
            contentHtml = await this.twigCustom(this.data.customTemplate);
        } else {
            contentHtml = '[template error]';
        }

        return `<div id="${this.getHtmlId()}" class="block">${contentHtml}</div>`;
    }
}
