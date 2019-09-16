import { HtmlElement } from '../../../../framework/core/abstracts/html-element';

export class HtmlSection extends HtmlElement {
    template = '<div class="section">%children%</div>';

    async render() {
        const childrenRender = await Promise.all(this.children.map(async c => {
            const containerClass = c.settings.container === 'fluid' ? 'container-fluid':'container';
            return `<div class="${containerClass}">${await c.render()}</div>`;
        }));
        return this.template.replace(/%children%/g, childrenRender.join(''));
    }
}
