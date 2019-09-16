import { HtmlElement } from '../../../framework/core/abstracts/html-element';

export class HtmlColumns extends HtmlElement {
    values: { [key: string]: string } = {
        something: 'Block content'
    };

    constructor() {
        super();
        this.values = {
            something: 'Block content'
        }
    }

    template = '<div class="row">%children%</div>';

    render() {
        return this.template.replace(/%children%/g, this.children.map(c => c.render()).join(''));
    }
}
