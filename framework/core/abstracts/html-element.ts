export class HtmlElement {
    id: string;
    css: string = "";
    values: {[key: string]: string} = {};   // maybe rename this onto "settings", and use "values" for "field values"
    children: HtmlElement[] = [];
    template: string = `<html>%children%</html>`;

    render(): string {
        return this.template.replace('%children%', this.children.map(c => c.render()).join(''));
    }
}
