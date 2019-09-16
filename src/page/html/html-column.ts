import { HtmlElement } from '../../../framework/core/abstracts/html-element';

type responsivePrefix = 'xs'|'sm'|'md'|'lg';

export class HtmlColumn extends HtmlElement {
    responsive: {[key: string]: number} = {
        'sm': 6
    };

    template =  `<div class="%css-responsive%">%children%</div>`;

    async render() {
        let rendered = this.template.replace(/%children%/g, await this.childrenRender());
        rendered = rendered.replace('%css-responsive%', this.getResponsiveClasses().join(' '));

        return rendered;
    }

    getResponsiveClasses(): string[] {
        let classes: string[] = [];

        for(let size in this.responsive) {
            classes.push(`col-${size}-${this.responsive[size]}`);
        }

        if(classes.length === 0) {

        }

        return classes
    }

    setResponsiveSize(prefix: responsivePrefix, size: number) {
        this.responsive[prefix] = size;
    }
}
