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

@webComponent('vl-footer')
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
        (vlBody || document.body).insertAdjacentHTML(
            'beforeend',
            '<div id="footer__container"><div id="footer"></div></div>'
        );
    }

    private async loadWidget() {
        try {
            await awaitScript(
                'vl-footer-widget',
                `https://widgets.${this.development ? 'tni-' : ''}vlaanderen.be/api/v2/widget/${this.identifier}/entry`
            );

            if (!window.globalFooterClient) {
                console.error('Global footer client failed to load');
                return;
            }

            const footerElement = this.footerContainer?.querySelector<HTMLDivElement>('#footer') || undefined;

            const successFullyMounted = await window.globalFooterClient.mount(footerElement);

            if (successFullyMounted) {
                this.dispatchEvent(new CustomEvent('ready'));
            }
        } catch (error) {}
    }

    render() {
        this.footerContainer?.remove();
        this.injectFooterContainer();
        this.loadWidget();
    }

    createRenderRoot() {
        return this;
    }

    /**
     * @deprecated Deze methode mag niet gebruikt worden.
     */
    injectFooter() {
        console.warn('VlFooter - injectFooter() - deze methode is deprecated en mag niet gebruikt worden.');
        this.injectFooterContainer();
    }

    /**
     * @deprecated Deze methode mag niet gebruikt worden.
     */
    vlwFooter() {
        console.warn('VlFooter - vlwFooter() - deze methode is deprecated en mag niet gebruikt worden.');
        return document.querySelector('footer[class=vlw__footer]');
    }

    /**
     * @deprecated Deze methode mag niet gebruikt worden.
     */
    footer() {
        console.warn('VlFooter - footer() - deze methode is deprecated en mag niet gebruikt worden.');
        return this.footerContainer;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-footer': VlFooter;
    }
}
