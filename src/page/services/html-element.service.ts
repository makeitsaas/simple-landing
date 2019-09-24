import { APIContainer } from '../../../framework/core/api-container';
import { ArrayUtils } from '../../../framework/core/utils/array.utils';
import { HtmlElementData } from '../entities/html-element-data';
import { HtmlSection } from '../html/section/html-section';
import { HtmlElement } from '../html/html-element';
import { HtmlPage } from '../html/page/html-page';
import { HtmlBlock } from '../html/block/html-block';
import { HtmlColumns } from '../html/columns/html-columns';
import { HtmlColumn } from '../html/columns/html-column';
import { Page } from '../entities/page';
import { CreateHtmlElementDto } from '../dto/create-html-element.dto';
import { em } from '../../../framework/core/decorators/em';
import { EntityManager } from 'typeorm';
import { UpdateHtmlElementDto } from '../dto/update-html-element.dto';

export class HtmlElementService {

    @em
    em: EntityManager;

    public async getElementById(id: string): Promise<HtmlElementData> {
        return this.em.getRepository(HtmlElementData).findOneOrFail(id);
    }

    public async instanciateFromData(data: HtmlElementData): Promise<HtmlElement> {
        switch(data.type) {
            case "section":
                return new HtmlSection(data);
            case "block":
                return new HtmlBlock(data);
            case "page":
                return new HtmlPage(data);
            case "columns":
                return new HtmlColumns(data);
            case "column":
                return new HtmlColumn(data);
            default:
                throw new Error('Unrecognized html element type');
        }

    }

    /**
     * Populates works this way :
     *   1. Before anything, we load all page elements data
     *   2. Then we instanciate the top element, which is the single element having type equal to page
     *   3. We populate every elements, recursively, starting with the page
     *
     * This populate function can be used, even if we didn't start from the page.
     * This only is the most common way of calling it.
     *
     * A security is added, using the container singleton incHtmlCallCount. This function throws an error
     * if it has been called too many times.
     *
     * @param element
     * @param elementsData
     */
    public async populateChildren(element: HtmlElement, elementsData: HtmlElementData[]) {
        const childrenData = await ArrayUtils.filterAsync(elementsData, async function(elementData: HtmlElementData) {
            const parent: HtmlElementData|void = await elementData.parent;

            return parent && element.data && parent.id === element.data.id;
        });

        element.children = await Promise.all(childrenData.map(data => this.instanciateFromData(data)));
        await Promise.all(element.children.map(child => this.populateChildren(child, elementsData)));

        APIContainer.incHtmlCallCount();    // prevents infinite recursiveness
    }

    public async createElement(page: Page, dto: CreateHtmlElementDto) {
        const newElement = new HtmlElementData();
        newElement.page = Promise.resolve(page);
        newElement.type = dto.type;
        newElement.fields = dto.fields || {};
        newElement.translations = dto.translations || {};
        newElement.parent = Promise.resolve(dto.parentElement);

        // todo : check parent/type compatibility
        await this.em.save(newElement);

        return newElement;
    }

    public async updateElement(element: HtmlElementData, dto: UpdateHtmlElementDto) {
        if(dto.fields) {
            Object.assign(element.fields, dto.fields)
        }

        if(dto.translations) {
            for(let lang in dto.translations) {
                if(!element.translations[lang]) {
                    element.translations[lang] = {}
                }
                Object.assign(element.translations[lang], dto.translations[lang])
            }
        }

        if(dto.parentElement) {
            element.parent = Promise.resolve(dto.parentElement);
        }

        // todo : check parent/type compatibility
        await this.em.save(element);

        return element;
    }
}
