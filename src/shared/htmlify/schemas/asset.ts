type AssetType = 'style' | 'script';

export class Asset {
    url?: string;
    content?: string;
    type: AssetType;
    shortName?: string;

    constructor(urlOrContent: string, type: AssetType, shortName?: string) {
        this.type = type;
        this.shortName = shortName;

        if (this.isUrl(urlOrContent)) {
            this.url = urlOrContent;
        } else {
            this.content = urlOrContent;
        }
    }

    private isUrl(text: string) {
        return /^(https?:\/\/|\/)/.test(text);
    }
}
