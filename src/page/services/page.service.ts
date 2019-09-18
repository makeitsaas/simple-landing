import { HtmlPage } from '../html/page/html-page';
import { HtmlSection } from '../html/section/html-section';
import { HtmlBlock } from '../html/block/html-block';
import { HtmlColumn } from '../html/columns/html-column';
import { HtmlColumns } from '../html/columns/html-columns';
import { BlockUtils } from '../html/block/utils';
import { em } from '../../../framework/core/decorators/em';
import { EntityManager } from 'typeorm';
import { HtmlElementData } from '../entities/html-element-data';
import { Page } from '../entities/page';
import { HtmlElement } from '../../../framework/core/abstracts/html-element';
import { service } from '../../../framework/core/decorators/service';
import { HtmlElementService } from './html-element.service';

export class PageService {

    @em
    em: EntityManager;

    @service
    htmlElementService: HtmlElementService;

    async getPageById(pageId: string): Promise<HtmlElement> {
        const page = await this.em.findOneOrFail<Page>(Page, pageId),
            elementsData = await page.elementsData;

        return Promise.resolve(this.buildTree(page, elementsData));
    }

    async buildTree(pageInstance: Page, elementsData: HtmlElementData[]): Promise<HtmlElement> {
        const pageData = elementsData.filter(e => e.type === 'page')[0],
            page = new HtmlPage(pageData);

        if (!pageData) {
            throw new Error('No pageData');
        }

        await this.htmlElementService.populateChildren(page, elementsData);

        return page;
    }

    async getPageDemo(): Promise<HtmlPage> {
        const sampleTpl = await this.em.getRepository(HtmlElementData).findOneOrFail('1');
        const page = new HtmlPage(),
            section = new HtmlSection(),
            section2 = new HtmlSection(),
            block = new HtmlBlock(),
            block2 = new HtmlBlock(),
            block3 = new HtmlBlock(),
            block4 = new HtmlBlock(sampleTpl),
            block5 = new HtmlBlock(),
            block6 = new HtmlBlock(),
            column1 = new HtmlColumn(),
            column2 = new HtmlColumn(),
            columnsRow = new HtmlColumns(),
            column3 = new HtmlColumn(),
            column4 = new HtmlColumn(),
            columnsRow2 = new HtmlColumns();


        block.settings.blockType = 'text';
        block2.settings.blockType = 'text-image';
        block4.settings.blockType = 'custom';
        block5.settings.blockType = 'title';
        block6.settings.blockType = 'jumbotron';

        block.css = 'selector {text-align: justify}';

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
