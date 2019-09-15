import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { PageDto } from '../validation/page-dto';
import { input } from '../../../framework/providers/http-server/http-server';
import { HtmlPage } from '../html/html-page';
import { HtmlSection } from '../html/html-section';
import { HtmlBlock } from '../html/html-block';
import { HtmlColumns } from '../html/html-columns';

export class PageController extends AbstractController {
    private var1 = 'Super Page Builder';

    getById() {
        return `From page controller : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.payload)}`;
    }

    postAction(@input page: PageDto) {
        // page.doSomething();
        return `Post action : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.payload)}`;
    }

    getPageStructure() {
        const page = new HtmlPage(),
            section = new HtmlSection(),
            block = new HtmlBlock(),
            block2 = new HtmlBlock(),
            block3 = new HtmlBlock(),
            block4 = new HtmlBlock(),
            columns = new HtmlColumns();

        block2.values.container = 'fluid';

        columns.children.push(block3);
        columns.children.push(block4);

        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        section.children.push(block);
        section.children.push(block2);
        section.children.push(columns);
        // comment gérer les colonnes ?

        return page;
    }
}
