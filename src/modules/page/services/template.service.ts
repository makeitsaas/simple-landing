import { em } from '@framework-v2/core/decorators/em';
import { EntityManager } from 'typeorm';
import { CustomTemplate } from '../entities/custom-template';

export class TemplateService {
    @em
    em: EntityManager;

    async getCustomTemplate(templateUuid: string) {
        const template = await this.em.getRepository(CustomTemplate)
            .findByIds([templateUuid])
            .then(templates => {
                if(templates.length === 0) {
                    throw new Error(`Template ${templateUuid} does not exist`);
                } else {
                    return templates[0]
                }
            });

        return template.getHtml();
    }
}
