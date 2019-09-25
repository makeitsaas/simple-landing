import { HtmlElement, CustomTemplateCommon } from '../../index';
import { Asset } from '../../schemas/asset';

const BOOTSTRAP_CSS_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';
const BOOTSTRAP_CSS_THEME_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css';
const BOOTSTRAP_JS_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';
const JQUERY_JS_URL = 'https://code.jquery.com/jquery-1.12.4.min.js';
const MAIN_CSS_URL = '/public/style.css';

export class HtmlPage extends HtmlElement {
    template = `./page-content.twig`;

    /*
     *
     * Renderers
     *
     */
    async render() {    // la fonction de render courante renvoit, pour le moment, le document complet
        return await this.renderDocument();
    }

    async renderDocument() {
        return await this.twig(`${__dirname}/document.twig`, {
            styles: await this.renderStyles(),
            contentHtml: await this.renderContentHtml(),
            scripts: await this.renderScripts()
        });
    }

    async renderStyles() {
        return await this.twig(`${__dirname}/page-styles.twig`, {
            compiledBlockCustomCss: await this.getBlocksStyles(),
            compiledTemplatesCss: await this.getTemplatesStyles(),
            urls: {
                BOOTSTRAP_CSS_URL,
                BOOTSTRAP_CSS_THEME_URL,
                MAIN_CSS_URL
            }
        });
    }

    async renderContentHtml() {
        return await this.twig(`${__dirname}/page-content.twig`, {});
    }

    async renderScripts() {
        return await this.twig(`${__dirname}/page-scripts.twig`, {
            urls: {
                JQUERY_JS_URL,
                BOOTSTRAP_JS_URL
            }
        });
    }

    /*
     *
     * Getters
     *
     */

    async getLayers() {
        return {
            styles: await this.getStylesLayerAssets(),
            htmlContent: await this.renderContentHtml(),
            scripts: await this.getScriptsLayerAssets()
        }
    }

    async getStylesLayerAssets(): Promise<Asset[]> {
        return [
            new Asset(BOOTSTRAP_CSS_URL, 'style', 'bootstrap'),
            new Asset(BOOTSTRAP_CSS_THEME_URL, 'style', 'theme'),
            new Asset(MAIN_CSS_URL, 'style', 'custom'),
            new Asset(await this.getTemplatesStyles(), "style", "templates"),
            new Asset(await this.getBlocksStyles(), "style", "blocks")
        ]
    }

    async getScriptsLayerAssets(): Promise<Asset[]> {
        return [
            new Asset(JQUERY_JS_URL, 'script', 'bootstrap'),
            new Asset(BOOTSTRAP_JS_URL, 'script', 'theme')
        ]
    }

    async getTemplatesStyles() {
        const customTemplates: CustomTemplateCommon[] = await this.getTemplatesRecursively();

        return customTemplates.map(tpl => tpl.getCss()).join(' ');
    }

    async getBlocksStyles() {
        return this.getBlocksCssRecursively();
    }
}
