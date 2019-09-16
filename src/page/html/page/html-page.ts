import { HtmlElement } from '../../../../framework/core/abstracts/html-element';

const BOOTSTRAP_CSS_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';
const BOOTSTRAP_CSS_THEME_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css';
const BOOTSTRAP_JS_URL = 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';
const JQUERY_JS_URL = 'https://code.jquery.com/jquery-1.12.4.min.js';
const MAIN_CSS_URL = '/public/style.css';

export class HtmlPage extends HtmlElement {
    template = `./page.twig`;

    async render() {
        return await this.twig(`${__dirname}/${this.template}`, {
            urls: {
                BOOTSTRAP_CSS_URL,
                BOOTSTRAP_CSS_THEME_URL,
                BOOTSTRAP_JS_URL,
                JQUERY_JS_URL,
                MAIN_CSS_URL
            }
        });
    }
}
