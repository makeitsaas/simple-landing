import { HtmlElementData } from '../entities/html-element-data';
import { HtmlElement } from '../../shared/htmlify';
import { Page } from '../entities/page';
import { CreateHtmlElementDto } from '../dto/create-html-element.dto';
import { em } from '../../../framework/core/decorators/em';
import { EntityManager } from 'typeorm';
import { UpdateHtmlElementDto } from '../dto/update-html-element.dto';
import { service } from '../../../framework/core/decorators/service';
import { HtmlifyService } from '../../shared/htmlify/services/htmlify.service';

export class HtmlElementService {

    @em
    em: EntityManager;

    @service
    htmlifyService: HtmlifyService;

    public async getElementById(id: string): Promise<HtmlElementData> {
        return this.em.getRepository(HtmlElementData).findOneOrFail(id);
    }

    public async populateChildren(element: HtmlElement, elementsData: HtmlElementData[]) {
        return this.htmlifyService.populateChildren(element, elementsData);
    }

    public async createElement(page: Page, dto: CreateHtmlElementDto) {
        const newElement = new HtmlElementData();
        newElement.page = Promise.resolve(page);
        newElement.type = dto.type;
        newElement.fields = dto.fields || {};
        newElement.translations = dto.translations || {};
        newElement.parent = dto.parentElement;

        this.checkParenthood(newElement);
        await this.em.save(newElement);

        return newElement;
    }

    public async updateElement(element: HtmlElementData, dto: UpdateHtmlElementDto) {
        if (dto.fields) {
            Object.assign(element.fields, dto.fields)
        }

        if (dto.translations) {
            for (let lang in dto.translations) {
                if (!element.translations[lang]) {
                    element.translations[lang] = {}
                }
                Object.assign(element.translations[lang], dto.translations[lang])
            }
        }

        if (dto.parentElement) {
            element.parent = dto.parentElement;
        }

        this.checkParenthood(element);
        await this.em.save(element);

        return element;
    }

    private checkParenthood(element: HtmlElementData) {
        if(element.type === 'page' && element.parent) {
            throw new Error('Page cannot have a parent element');
        }

        if(element.parent) {
            if(element.type === 'column' && element.parent.type !== 'columns') {
                throw new Error('Column shall have a Columns parent');
            }
            if(element.type === 'section' && element.parent.type !== 'page') {
                throw new Error('Section shall have a Page parent');
            }
        }
    }
}
