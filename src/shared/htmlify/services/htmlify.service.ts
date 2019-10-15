import { HtmlBlock, HtmlColumn, HtmlColumns, HtmlElement, HtmlElementDataCommon, HtmlPage, HtmlSection } from '..';
import { ArrayUtils } from '../utils/array.utils';

const HTML_CALL_LIMIT = 10000;

export class HtmlifyService {
    private htmlCallCount = 0;

    private incHtmlCallCount() {
        this.htmlCallCount++;

        if (this.htmlCallCount > HTML_CALL_LIMIT) {
            throw new Error('too many html calls (probably a recursive error)');
        }
    };

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
    public async populateChildren(element: HtmlElement, elementsData: HtmlElementDataCommon[]) {
        const childrenData = await ArrayUtils.filterAsync(elementsData, async function (elementData: HtmlElementDataCommon) {
            const parent: HtmlElementDataCommon | null = elementData.parent;

            return parent && element.data && parent.id === element.data.id;
        });

        element.children = await Promise.all(childrenData
            .sort(({position: pos1, createdAt: d1}: HtmlElementDataCommon, {position: pos2, createdAt: d2}: HtmlElementDataCommon) => {
                if(pos1 === pos2) {
                    return d1 < d2 ? 1 : -1;
                }

                return pos1 > pos2 ? 1 : -1
            })
            .map(data => this.instanciateFromData(data)));
        await Promise.all(element.children.map(child => this.populateChildren(child, elementsData)));

        this.incHtmlCallCount();    // prevents infinite recursiveness
    }

    public async instanciateFromData(data: HtmlElementDataCommon): Promise<HtmlElement> {
        switch (data.type) {
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
}
