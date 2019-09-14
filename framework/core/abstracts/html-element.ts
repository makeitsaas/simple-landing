export class HtmlElement {
    id: string;
    css: string = "";
    values: {[key: string]: string} = {};
    children: HtmlElement[] = [];
    template: string = `<html>%children%</html>`;

    render(): string {
        return this.template.replace('%children%', this.children.map(c => c.render()).join(''));
    }
}
