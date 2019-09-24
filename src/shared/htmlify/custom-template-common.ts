export class CustomTemplateCommon {
    id: number;
    html: string = '';
    css: string = '';

    getHtml(): string {
        return `<div class="tpl-${this.id}">${this.html}</div>`;
    }

    getCss(): string {
        return this.css.replace(/selector/i, `.tpl-${this.id}`);
    }

}
