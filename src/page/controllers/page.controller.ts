import { AbstractController } from '../../../framework/core/abstracts/abstract-controller';
import { CreatePageDto } from '../dto/create-page.dto';
import { input } from '../../../framework/providers/http-server/http-server';
import { service } from '../../../framework/core/decorators/service';
import { PageService } from '../services/page.service';

export class PageController extends AbstractController {
    private var1 = 'Super Page Builder';

    @service
    pageService: PageService;

    getById() {
        return `From page controller : "${this.var1}" | params : ${JSON.stringify(this.params)} | body : ${JSON.stringify(this.payload)}`;
    }

    async createPage(@input page: CreatePageDto) {
        if(!this.request.user || !this.request.user.uuid) {
            throw new Error('no user.uuid')
        }
        return this.pageService.createPage(page.name, this.request.user.uuid);
    }

    async getPageWireframeRender() {
        const page = await this.getPageOrDemo();
        page.setRenderMode('wireframe');
        page.setLang('fr');
        return page;
    }

    async getPageFullRender() {
        const page = await this.getPageOrDemo();
        page.setLang('fr');
        return page;
    }

    private getPageOrDemo() {
        if(this.params.pageId === 'demo') {
            return this.pageService.getPageDemo()
        } else {
            return this.pageService.getPageTreeById(this.params.pageId);
        }
    }
}
