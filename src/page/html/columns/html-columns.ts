import { HtmlElement } from '../../../../framework/core/abstracts/html-element';

export class HtmlColumns extends HtmlElement {
    constructor() {
        super();
    }

    template = '<div class="row">%children%</div>';

    async render() {
        return this.template.replace(/%children%/g, await this.childrenRender());
    }
}