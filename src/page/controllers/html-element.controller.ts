import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { input } from '../../../framework/providers/http-server/http-server';
import { CreateHtmlElementDto } from '../dto/create-html-element.dto';
import { service } from '../../../framework/core/decorators/service';
import { HtmlElementService } from '../services/html-element.service';
import { PageService } from '../services/page.service';

export class HtmlElementController extends AbstractController {

    @service
    htmlElementService: HtmlElementService;

    @service
    pageService: PageService;

    async updateElement() {
        // todo cet aprem
    }

    async createElement(@input createElementDto: CreateHtmlElementDto) {
        console.log('parent element', createElementDto.parentElement);
        const page = await this.pageService.getPageById(this.request.params.pageId);
        const element = await this.htmlElementService.createElement(page, createElementDto);
        return element;
    }

    async updateElementParent() {
        // todo cet aprem
    }
}
