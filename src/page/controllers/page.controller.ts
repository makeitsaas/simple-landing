import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { PageDto } from '../validation/page-dto';
import { input } from '../../../framework/providers/http-server/http-server';
import { HtmlPage } from '../html/page/html-page';
import { HtmlSection } from '../html/section/html-section';
import { HtmlBlock } from '../html/block/html-block';
import { HtmlColumns } from '../html/columns/html-columns';
import { HtmlColumn } from '../html/columns/html-column';

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

        // Edition steps => wireframe > fields > translations > JS > paddings

        const page = new HtmlPage(),
            section = new HtmlSection(),
            block = new HtmlBlock(),
            block2 = new HtmlBlock(),
            block3 = new HtmlBlock(),
            block4 = new HtmlBlock(),
            block5 = new HtmlBlock(),
            column1 = new HtmlColumn(),
            column2 = new HtmlColumn(),
            columnsRow = new HtmlColumns(),
            column3 = new HtmlColumn(),
            column4 = new HtmlColumn(),
            columnsRow2 = new HtmlColumns();

        block.settings.type = 'text';
        block2.settings.type = 'text-image';
        block4.settings.type = 'custom';
        block5.settings.type = 'title';

        block2.settings.container = 'fluid';

        /* Columns 1 */
        column1.children.push(block3);
        column1.setResponsiveSize('sm', 4);
        column2.children.push(block4);
        column2.setResponsiveSize('sm', 8);

        columnsRow.children.push(column1);
        columnsRow.children.push(column2);

        /* Columns 2 */
        column3.children.push(block3);
        column3.setResponsiveSize('sm', 6);
        column4.children.push(block4);
        column4.setResponsiveSize('sm', 6);

        columnsRow2.children.push(column3);
        columnsRow2.children.push(column4);
        column2.children.push(columnsRow2);

        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        section.children.push(block5);
        section.children.push(block);
        section.children.push(block2);
        section.children.push(columnsRow);
        // comment gérer les colonnes ?

        return page;
    }
}
