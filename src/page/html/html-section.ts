import { HtmlElement } from '../../../framework/core/abstracts/html-element';

export class HtmlSection extends HtmlElement {
    template = '<div class="section">%children%</div>';

    render() {
        return this.template.replace(/%children%/g, this.children.map(c => {
            const containerClass = c.values.container === 'fluid' ? 'container-fluid':'container';
            return `<div class="${containerClass}">${c.render()}</div>`;
        }).join(''));
    }
}
