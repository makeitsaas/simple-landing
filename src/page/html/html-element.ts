import * as fs from "fs";
import { service } from '../../../framework/core/decorators/service';
import { TemplateService } from '../services/template.service';
import { HtmlElementData } from '../entities/html-element-data';
import { CustomTemplate } from '../entities/custom-template';

const Twig = require('twig'),
    twig = Twig.twig;

export type RenderMode = 'wireframe' | 'full';
export type LangCode = string;
export type Translations = { [key: string]: string };

export class HtmlElement {
    htmlId: string;
    css: string = "";
    settings: { [key: string]: string } = {};
    fields: { [key: string]: string } = {};
    translationsByLang: { [lang in LangCode]: Translations } = {};
    children: HtmlElement[] = [];
    template: string = `<div>%children%</div>`;
    renderMode: RenderMode = 'full';
    lang: LangCode = 'en';
    defaultLang: LangCode = 'en';

    data?: HtmlElementData;

    @service
    templateService: TemplateService;

    constructor(data?: HtmlElementData) {
        this.data = data;
        if (data) {
            this.settings = data.settings;
            this.fields = data.fields;
            this.translationsByLang = data.translations;
            this.css = data.css;
            if(data.settings.blockType === 'custom') {
                console.log(data);
            }
        }
    }

    getHtmlId() {
        if (!this.htmlId) {
            let id = (this.data && this.data.id) || Math.floor(Math.random() * 10000000);
            this.htmlId = `id-${id}`;
        }
        return this.htmlId;
    }

    async render(): Promise<string> {
        return this.template.replace('%children%', await this.childrenRender());
    }

    async renderCss(): Promise<string> {
        let css = this.css.replace(/selector/g, `#${this.getHtmlId()}`);
        css += (await Promise.all(this.children.map(c => c.renderCss()))).join(' ');

        return css;
    }

    async getCustomTemplates(): Promise<CustomTemplate[]> {
        let list: CustomTemplate[] = [];

        if (this.data) {
            const tpl: CustomTemplate | void = this.data.customTemplate;
            if (tpl) {
                list.push(tpl);
            }
        }

        const childrenTemplates: CustomTemplate[][] = await Promise.all(this.children.map(c => c.getCustomTemplates()));

        const possiblyDuplicatedChildrenTemplates: CustomTemplate[] = childrenTemplates.reduce((acc, item) => acc.concat(item), []);

        possiblyDuplicatedChildrenTemplates.forEach(tpl => {
            if (list.indexOf(tpl) === -1) {
                list.push(tpl);
            }
        });

        return list;
    }

    async childrenRender(): Promise<string> {
        return (await Promise.all(this.children.map(c => c.render()))).join('');
    }

    async loadTemplate(absolutePath: string) {
        return fs.readFileSync(absolutePath, 'utf8');
    }

    async twig(absolutePath: string, options?: any) {
        const twigTemplate = await this.loadTemplate(absolutePath);
        return this.twigRender(twigTemplate, options);
    }

    async twigCustom(customTemplate: CustomTemplate, options?: any) {
        const twigTemplate = customTemplate.getHtml();
        return this.twigRender(twigTemplate, options);
    }

    private async twigRender(twigTemplate: string, options: any = {}) {
        const defaultOptions: any = {
            settings: this.settings,
            fields: this.fields,
            translations: this.getTemplateTranslations(),
            renderMode: this.renderMode,
            lang: this.lang,
            children: await this.childrenRender()
        };

        for (let key in defaultOptions) {
            if (!options[key]) {
                options[key] = defaultOptions[key];
            }
        }

        const twigCompiler = twig({data: twigTemplate});
        return twigCompiler.render(options);
    }

    public setRenderMode(mode: RenderMode) {
        this.renderMode = mode;
        this.children.forEach(child => child.setRenderMode(mode));
    }

    public setLang(lang: string) {
        this.lang = lang;
        this.children.forEach(child => child.setLang(lang));
    }

    public getTemplateTranslations(): Translations {
        const defaultTranslations: Translations = this.translationsByLang[this.defaultLang] || {},
            langTranslations: Translations = this.translationsByLang[this.lang] || {};

        const templateTranslations: Translations = Object.assign({}, defaultTranslations);

        for (let key in langTranslations) {
            templateTranslations[key] = langTranslations[key];
        }

        return templateTranslations
    }
}