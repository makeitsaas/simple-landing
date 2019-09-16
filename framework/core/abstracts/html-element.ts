import * as fs from "fs";
import { HtmlRenderOptionsInterface } from '../interfaces/html-render-options.interface';
const Twig = require('twig'),
    twig = Twig.twig;

export class HtmlElement {
    id: string;
    css: string = "";
    settings: {[key: string]: string} = {};
    fields: {[key: string]: string} = {};
    translations: {[key: string]: {[key: string]: string}} = {};
    children: HtmlElement[] = [];
    template: string = `<div>%children%</div>`;

    async render(options?: HtmlRenderOptionsInterface): Promise<string> {
        return this.template.replace('%children%', await this.childrenRender());
    }

    async childrenRender(): Promise<string> {
        return (await Promise.all(this.children.map( c => c.render()))).join('');
    }

    async loadTemplate(absolutePath: string) {
        return fs.readFileSync(absolutePath, 'utf8');
    }

    async twig(absolutePath: string, options?: any) {
        if(!options) {
            options = {
                settings: this.settings,
                fields: this.fields,
                translations: this.translations
            };
        }
        const twigTemplate = twig({data: await this.loadTemplate(absolutePath)});
        return twigTemplate.render(options);
    }
}
