import { CustomTemplateCommon } from '..';

export class HtmlElementDataCommon {
    id: number;
    type: string;
    settings: any = {};
    fields: any = {};
    translations: any = {};
    css: string = '';
    position: number = 0;
    customTemplate: CustomTemplateCommon|void;
    parent: HtmlElementDataCommon|null;
    children: Promise<HtmlElementDataCommon[]>;
}
