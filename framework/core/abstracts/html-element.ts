import * as fs from "fs";
import { service } from '../decorators/service';
import { TemplateService } from '../../../src/page/services/template.service';

const Twig = require('twig'),
    twig = Twig.twig;

export type RenderMode = 'wireframe' | 'full';
export type LangCode = string;
export type Translations = { [key: string]: string };

export class HtmlElement {
    id: string;
    css: string = "";
    settings: { [key: string]: string } = {};
    fields: { [key: string]: string } = {};
    translationsByLang: { [lang in LangCode]: Translations } = {};
    children: HtmlElement[] = [];
    template: string = `<div>%children%</div>`;
    renderMode: RenderMode = 'full';
    lang: LangCode = 'en';
    defaultLang: LangCode = 'en';

    @service
    templateService: TemplateService;

    async render(): Promise<string> {
        return this.template.replace('%children%', await this.childrenRender());
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

    async twigCustom(customTemplateUuid: string, options?: any) {
        const twigTemplate = await this.templateService.getCustomTemplate(customTemplateUuid);
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
