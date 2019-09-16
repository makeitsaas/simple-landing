import * as fs from "fs";

const Twig = require('twig'),
    twig = Twig.twig;

export type RenderMode = 'wireframe' | 'full';
export type LangCode = string;

export class HtmlElement {
    id: string;
    css: string = "";
    settings: { [key: string]: string } = {};
    fields: { [key: string]: string } = {};
    translations: { [key: string]: { [key: string]: string } } = {};
    children: HtmlElement[] = [];
    template: string = `<div>%children%</div>`;
    renderMode: RenderMode = 'full';
    lang: LangCode = 'en';

    async render(): Promise<string> {
        return this.template.replace('%children%', await this.childrenRender());
    }

    async childrenRender(): Promise<string> {
        return (await Promise.all(this.children.map(c => c.render()))).join('');
    }

    async loadTemplate(absolutePath: string) {
        return fs.readFileSync(absolutePath, 'utf8');
    }

    async twig(absolutePath: string, options: any = {}) {
        const defaultOptions: any = {
            settings: this.settings,
            fields: this.fields,
            translations: this.translations,
            renderMode: this.renderMode,
            lang: this.lang,
            children: await this.childrenRender()
        };

        for (let key in defaultOptions) {
            if (!options[key]) {
                options[key] = defaultOptions[key];
            }
        }

        const twigTemplate = twig({data: await this.loadTemplate(absolutePath)});
        return twigTemplate.render(options);
    }

    public setRenderMode(mode: RenderMode) {
        this.renderMode = mode;
        this.children.forEach(child => child.setRenderMode(mode));
    }

    public setLang(lang: string) {
        this.lang = lang;
        this.children.forEach(child => child.setLang(lang));
    }
}
