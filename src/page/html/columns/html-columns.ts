import { HtmlElement } from '../html-element';

export class HtmlColumns extends HtmlElement {

    template = '<div class="row">%children%</div>';

    async render() {
        return this.template.replace(/%children%/g, await this.childrenRender());
    }
}
