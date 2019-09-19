import { AbstractMiddleware } from '../../../../framework/core/abstracts/middleware';
import { service } from '../../../../framework/core/decorators/service';
import { PageService } from '../../../page/services/page.service';
import { em } from '../../../../framework/core/decorators/em';
import { EntityManager } from 'typeorm';
import { Page } from '../../../page/entities/page';

export class CanEditPageMiddleware extends AbstractMiddleware {

    @em
    em: EntityManager;

    @service
    pageService: PageService;

    async execute() {
        const pageId: string|void = this.request.params.pageId || this.request.params.page_id,
            page = await this.em.getRepository(Page).findOneOrFail(pageId);

        if(!this.request.user || page.ownerUserUuid !== this.request.user.uuid) {
            this.response.status(403).send({message: 'Unauthorized to edit page'});
        } else {
            this.next();
        }
    }
}
