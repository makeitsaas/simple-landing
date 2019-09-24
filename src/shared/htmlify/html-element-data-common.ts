import { CustomTemplateCommon } from '.';

export class HtmlElementDataCommon {
    id: number;
    type: string;
    settings: any = {};
    fields: any = {};
    translations: any = {};
    css: string = '';
    customTemplate: CustomTemplateCommon|void;
    parent: HtmlElementDataCommon|void;
    children: Promise<HtmlElementDataCommon[]>;
}
