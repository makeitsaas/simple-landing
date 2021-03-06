import { AbstractController } from '@framework-v2/core/abstracts/abstract-controller';
import { input } from '@framework-v2/providers/http-server/http-server';
import { CreateHtmlElementDto } from '../dto/create-html-element.dto';
import { service } from '@framework-v2/core/decorators/service';
import { HtmlElementService } from '../services/html-element.service';
import { PageService } from '../services/page.service';
import { UpdateHtmlElementDto } from '../dto/update-html-element.dto';
import { UpdateHtmlElementPositionDto } from '../dto/update-html-element-position.dto';
import { UpdateBulkHtmlElementsPositionDto } from '../dto/update-bulk-html-elements-position.dto';

export class HtmlElementController extends AbstractController {

    @service
    htmlElementService: HtmlElementService;

    @service
    pageService: PageService;

    async getElement() {
        return this.htmlElementService.getElementById(this.request.params.htmlElementDataId);
    }

    async updateElement(@input updateElementDto: UpdateHtmlElementDto) {
        const element = await this.htmlElementService.getElementById(this.request.params.htmlElementDataId);
        return this.htmlElementService.updateElement(element, updateElementDto);
    }

    async createElement(@input createElementDto: CreateHtmlElementDto) {
        const page = await this.pageService.getPageById(this.request.params.pageId);
        const element = await this.htmlElementService.createElement(page, createElementDto);
        return element;
    }

    async updateElementsPositions(@input {updates}: UpdateBulkHtmlElementsPositionDto) {
        const results = await this.htmlElementService.updatePageTree(this.params.pageId, updates);

        return {
            results
        };
    }
}
