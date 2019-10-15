import * as fs from "fs";
import { HtmlElementDataCommon, CustomTemplateCommon } from '..';

const Twig = require('twig'),
    twig = Twig.twig;

export type RenderMode = 'wireframe' | 'full';
export type LangCode = string;
export type Translations = { [key: string]: string };

export class HtmlElement {
    static pageBuilderAPIUrl = '';
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

    data?: HtmlElementDataCommon;

    constructor(data?: HtmlElementDataCommon) {
        this.data = data;
        if (data) {
            this.settings = data.settings;
            this.fields = data.fields;
            this.translationsByLang = data.translations;
            this.css = data.css;
        }
    }

    getHtmlId() {
        if (!this.htmlId) {
            let id = (this.data && this.data.id) || Math.floor(Math.random() * 10000000);
            this.htmlId = `el-${id}`;
        }
        return this.htmlId;
    }

    async render(): Promise<string> {
        return this.template.replace('%children%', await this.childrenRender());
    }

    /*
     *
     * Templating
     *
     */

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

    async twigCustom(customTemplate: CustomTemplateCommon, options?: any) {
        const twigTemplate = customTemplate.getHtml();
        return this.twigRender(twigTemplate, options);
    }

    /*
     *
     * In order to make it possible to edit fields and translations after rendering,
     * values are wrapped before being rendered, with element id and code as wrapper's attributes.
     * This way, a further edition is possible over this kind of elements :
     * <dynamic-field data-id="1234" data-code="fields.value">My current</dynamic-field>
     *
     * Examples of expressions that matches for wrapping :
     *     <div>{{ fields.value }}</div>                            -> match
     *     <div>{{ settings.value }}</div>                          -> no match
     *     <script src="{{ fields.value }}"></script>                 -> no match
     *     <div class="container-full {{ fields.value }}"></div>    -> no match
     */
    private async twigRender(twigTemplate: string, options: any = {}) {
        const dataId = this.data && this.data.id;

        // change html content
        const valuesExceptHtmlAttributes = /(?<!(\w+="(\w|-| )*))(\{\{ *(((fields|translations)\.\w+)( *\|.+)?) *\}\})/gi;
        let overwrittenTemplate = twigTemplate.replace(
            valuesExceptHtmlAttributes,
            `<dynamic-value data-id="${dataId}" data-code="$5">$3</dynamic-value>`);

        // change images
        const imgHtml = (index: number): string => {
            const src = this.getFieldImageUrl(this.fields, index);
            return `<img dynamic-img data-id="${dataId}" data-media-index="${index}" src="${src}"/>`;
        };
        let securityCount = 0;
        while (/##image##/.test(overwrittenTemplate) && securityCount < 1000) {
            overwrittenTemplate = overwrittenTemplate.replace(/##image##/, imgHtml(securityCount++));
        }

        const defaultOptions: any = {
            settings: this.settings,
            fields: this.fields,
            translations: this.getTemplateTranslations(),
            renderMode: this.renderMode,
            lang: this.lang,
            children: await this.childrenRender(),
            imagesBaseUrl: HtmlElement.pageBuilderAPIUrl
        };

        for (let key in defaultOptions) {
            if (!options[key]) {
                options[key] = defaultOptions[key];
            }
        }

        const twigCompiler = twig({data: overwrittenTemplate});
        return twigCompiler.render(options);
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

    private getFieldImageUrl(fields: {[key: string]: any}|void, mediaIndex: number = 0): string {
        const fieldKey = `_image_${mediaIndex}_url`;
        const defaultSrc = `${HtmlElement.pageBuilderAPIUrl}/public/img/image-placeholder.png`;

        // console.log('getFieldImageUrl', fields, fieldKey, fields && fields[fieldKey] || defaultSrc);

        return fields && fields[fieldKey] || defaultSrc;
    }

    /*
     *
     * Recursive setters
     *
     */

    public setRenderMode(mode: RenderMode) {
        this.renderMode = mode;
        this.children.forEach(child => child.setRenderMode(mode));
    }

    public setLang(lang: string) {
        this.lang = lang;
        this.children.forEach(child => child.setLang(lang));
    }

    /*
     *
     * Recursive getters
     *
     */

    async getBlocksCssRecursively(): Promise<string> {
        let css = this.css.replace(/selector/g, `#${this.getHtmlId()}`);
        css += (await Promise.all(this.children.map(c => c.getBlocksCssRecursively()))).join(' ');

        return css;
    }

    async getTemplatesRecursively(): Promise<CustomTemplateCommon[]> {
        let list: CustomTemplateCommon[] = [];

        if (this.data) {
            const tpl: CustomTemplateCommon | void = this.data.customTemplate;
            if (tpl) {
                list.push(tpl);
            }
        }

        const childrenTemplates: CustomTemplateCommon[][] = await Promise.all(this.children.map(c => c.getTemplatesRecursively()));

        const possiblyDuplicatedChildrenTemplates: CustomTemplateCommon[] = childrenTemplates.reduce((acc, item) => acc.concat(item), []);

        possiblyDuplicatedChildrenTemplates.forEach(tpl => {
            if (list.indexOf(tpl) === -1) {
                list.push(tpl);
            }
        });

        return list;
    }
}
