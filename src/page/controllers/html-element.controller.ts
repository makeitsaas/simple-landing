import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { input } from '../../../framework/providers/http-server/http-server';
import { CreateHtmlElementDto } from '../dto/create-html-element.dto';
import { service } from '../../../framework/core/decorators/service';
import { HtmlElementService } from '../services/html-element.service';

export class HtmlElementController extends AbstractController {

    @service
    htmlElementService: HtmlElementService;

    async updateElementProperty() {
        // todo cet aprem
    }

    async createElement(@input createElementDto: CreateHtmlElementDto) {
        console.log('parent element', createElementDto.parentElement);
        return {
            page: this.request.params.pageId,
            element: createElementDto
        };
    }

    async updateElementParent() {
        // todo cet aprem
    }
}
