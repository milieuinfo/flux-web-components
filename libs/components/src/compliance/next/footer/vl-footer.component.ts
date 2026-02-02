import {
    awaitScript,
    BaseLitElement,
    legacyBreakpoint,
    legacyCore,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { GlobalFooterClient } from '@govflanders/vl-widget-global-footer-types';

declare global {
    interface Window {
        globalFooterClient: GlobalFooterClient;
    }
}

registerWebComponents([legacyCore, legacyBreakpoint]);

@webComponent('vl-footer-next')
export class VlFooter extends BaseLitElement {
    private development = false;
    private identifier = '';

    static get properties() {
        return {
            development: {
                type: Boolean,
                attribute: 'development',
                reflect: true,
            },
            identifier: {
                type: String,
                attribute: 'identifier',
                reflect: true,
            },
        };
    }

    constructor() {
        super();
        this.allowCustomCSS = false;
    }

    get footerContainer() {
        return document.querySelector('#footer__container');
    }

    private injectFooterContainer() {
        const vlBody = document.querySelector('body');

        if (this.footerContainer) return;

        (vlBody || document.body).insertAdjacentHTML(
            'beforeend',
            '<footer id="footer__container"><div id="footer"></div></footer>'
        );
    }

    private onReady() {
        this.dispatchEvent(new CustomEvent('ready'));
    }

    private async loadWidget() {
        try {
            window.addEventListener('widget.global_footer.mounted', this.onReady);

            await awaitScript(
                'vl-footer-widget',
                `https://widgets.${this.development ? 'tni-' : ''}vlaanderen.be/api/v2/widget/${this.identifier}/entry`
            );

            if (!window.globalFooterClient) {
                console.error('De global footer client werd niet geladen.');
                return;
            }

            const footerElement = this.footerContainer?.querySelector<HTMLDivElement>('#footer') || undefined;

            await window.globalFooterClient.mount(footerElement);
        } catch (error) {
            console.error('De global footer werd niet geladen.', error);
        }
    }

    connectedCallback() {
        super.connectedCallback();

        this.injectFooterContainer();
        this.loadWidget();
    }

    createRenderRoot() {
        return this;
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('widget.global_footer.mounted', this.onReady);
        this.footerContainer?.remove();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-footer-next': VlFooter;
    }
}
