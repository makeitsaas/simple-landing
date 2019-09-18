import { HtmlElement } from '../../../../framework/core/abstracts/html-element';
import { HtmlBlock } from '../block/html-block';

export class HtmlSection extends HtmlElement {
    template = '<div class="section">%children%</div>';

    async render() {
        const childrenRender = await Promise.all(this.children.map(async c => {
            const containerClass = this.getChildContainerClass(c);
            const contentHtml = `<div class="${containerClass}">${await c.render()}</div>`;

            return this.isChildJumbotron(c) ? `<div class="jumbotron">${contentHtml}</div>` : contentHtml;
        }));
        return this.template.replace(/%children%/g, childrenRender.join(''));
    }

    getChildContainerClass(child: HtmlElement): string {
        switch (child.settings.container) {
            case 'fluid':
                return 'container-fluid';
            case 'none':
                return '';
            default:
                return 'container';
        }
    }

    isChildJumbotron(child: HtmlElement): boolean {
        return child instanceof HtmlBlock && child.settings.blockType === 'jumbotron';
    }
}
