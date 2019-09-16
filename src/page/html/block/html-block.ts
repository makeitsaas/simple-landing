import { HtmlElement } from '../../../../framework/core/abstracts/html-element';


export class HtmlBlock extends HtmlElement {
    settings: {[key: string]: string} = {
        something: 'Block content'
    };

    constructor() {
        super();
        this.settings = {
            something: '<div class="block-icon">Block title <span class="glyphicon glyphicon-th-large"></span></div>'  // icon here
        }
    }
    template = './block.twig';

    async render() {
        return await this.twig(`${__dirname}/${this.template}`);
    }
}
