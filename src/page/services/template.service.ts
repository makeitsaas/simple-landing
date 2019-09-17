import { em } from '../../../framework/core/decorators/em';
import { EntityManager } from 'typeorm';

export class TemplateService {
    @em
    em: EntityManager;

    async getCustomTemplate(templateUuid: string) {
        return '<div class="block">custom</div>';
    }
}
