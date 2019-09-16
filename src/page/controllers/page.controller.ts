import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { PageDto } from '../validation/page-dto';
import { input } from '../../../framework/providers/http-server/http-server';
import { HtmlPage } from '../html/page/html-page';
import { HtmlSection } from '../html/section/html-section';
import { HtmlBlock } from '../html/block/html-block';
import { HtmlColumns } from '../html/columns/html-columns';
import { HtmlColumn } from '../html/columns/html-column';
import { service } from '../../../framework/core/decorators/service';
import { PageService } from '../services/page.service';

export class PageController extends AbstractController {
    private var1 = 'Super Page Builder';

    @service
    pageService: PageService;

    getById() {
        return `From page controller : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.payload)}`;
    }

    postAction(@input page: PageDto) {
        // page.doSomething();
        return `Post action : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.payload)}`;
    }

    getPageStructure() {
        const page = this.pageService.getPageById(this.params.pageId);
        return page;
    }
}
