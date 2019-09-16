import { HtmlElement } from '../../../framework/core/abstracts/html-element';

export class HtmlColumns extends HtmlElement {
    settings: { [key: string]: string } = {
        something: 'Block content'
    };

    constructor() {
        super();
        this.settings = {
            something: 'Block content'
        }
    }

    template = '<div class="row">%children%</div>';

    async render() {
        return this.template.replace(/%children%/g, await this.childrenRender());
    }
}
