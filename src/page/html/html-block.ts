import { HtmlElement } from '../../../framework/core/abstracts/html-element';

export class HtmlBlock extends HtmlElement {
    values: {[key: string]: string} = {
        something: 'Block content'
    };

    constructor() {
        super();
        this.values = {
            something: 'Block content'  // icon here
        }
    }
    template = '<div class="block">%value-something%</div>';
    render() {
        let rendered = this.template.replace('%children%', this.children.map(c => c.render()).join(''));
        for(let key in this.values) {
            if(typeof this.values[key] === 'string') {
                rendered = rendered.replace(`%value\-${key}%`, this.values[key]);
            }

        }
        return rendered;
    }
}
