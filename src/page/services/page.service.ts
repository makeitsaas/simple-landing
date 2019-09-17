import { HtmlPage } from '../html/page/html-page';
import { HtmlSection } from '../html/section/html-section';
import { HtmlBlock } from '../html/block/html-block';
import { HtmlColumn } from '../html/columns/html-column';
import { HtmlColumns } from '../html/columns/html-columns';
import { BlockUtils } from '../html/block/utils';

export class PageService {
    getPageById(pageId: string): HtmlPage {
        const page = new HtmlPage(),
            section = new HtmlSection(),
            section2 = new HtmlSection(),
            block = new HtmlBlock(),
            block2 = new HtmlBlock(),
            block3 = new HtmlBlock(),
            block4 = new HtmlBlock(),
            block5 = new HtmlBlock(),
            block6 = new HtmlBlock(),
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
        block6.settings.type = 'jumbotron';

        block.translationsByLang.en = {
            'text': BlockUtils.getRandomLongText()
        };
        block2.translationsByLang.en = {
            'text': BlockUtils.getRandomLongText()
        };
        block5.translationsByLang = {
            en: {title: 'Section title', subtitle: 'Section subtitle'},
            fr: {title: 'Titre de la section'},
        };
        block6.translationsByLang = {
            en: {title: 'An amazing page builder', description: 'A step-by-step quick and intuitive pages editor'},
        };

        // block.settings.container = 'fluid';

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

        page.children.push(section2);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        page.children.push(section);
        section2.children.push(block6);
        section.children.push(block5);
        section.children.push(block);
        section.children.push(block2);
        section.children.push(columnsRow);

        return page;
    }
}
