import {
    awaitScript,
    BaseLitElement,
    legacyBreakpoint,
    legacyCore,
    registerWebComponents,
    webComponentCustom
} from '@domg-wc/common';
import { CSSResult, PropertyDeclarations } from 'lit';
import { headerContainerStyles, headerSkeletonStyles } from './vl-header.component.flux-css';
import { headerDefaults } from './vl-header.defaults';

registerWebComponents([legacyCore, legacyBreakpoint]);

const customRegistration = () =>
    awaitScript(
        'vl-header-polyfill',
        'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js'
    )
        .then(() => {
            awaitScript(
                'vl-header-client',
                'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js'
            ).finally(() => {
                customElements.define('vl-header', VlHeader);
            });
        })
        .catch(() => {
            customElements.define('vl-header', VlHeader);
        });

export type ApplicationLink = {
    label: string;
    href: string;
    icon?: string;
    target?: string;
};

@webComponentCustom(customRegistration)
export class VlHeader extends BaseLitElement {
    // Properties
    logoutCallback = headerDefaults.logoutCallback;
    applicationLinks = headerDefaults.applicationLinks;
    // Attributes
    private authenticatedUserUrl = headerDefaults.authenticatedUserUrl;
    private development = headerDefaults.development;
    private identifier = headerDefaults.identifier;
    private loginRedirectUrl = headerDefaults.loginRedirectUrl;
    private loginUrl = headerDefaults.loginUrl;
    private logoutUrl = headerDefaults.logoutUrl;
    private switchCapacityUrl = headerDefaults.switchCapacityUrl;
    private simple = headerDefaults.simple;
    private skeleton = headerDefaults.skeleton;
    private rejectLogout = headerDefaults.rejectLogout;
    // Variables
    private observer: MutationObserver | null = null;
    private session: any = null;
    private authenticated = false;

    constructor() {
        super();

        this.allowCustomCSS = false;
    }

    static get properties(): PropertyDeclarations {
        return {
            authenticatedUserUrl: { type: String, attribute: 'authenticated-user-url' },
            development: { type: Boolean, attribute: 'development' },
            identifier: { type: String, attribute: 'identifier' },
            loginRedirectUrl: { type: String, attribute: 'login-redirect-url' },
            loginUrl: { type: String, attribute: 'login-url' },
            logoutUrl: { type: String, attribute: 'logout-url' },
            simple: { type: Boolean, attribute: 'simple' },
            skeleton: { type: Boolean, attribute: 'skeleton' },
            switchCapacityUrl: { type: String, attribute: 'switch-capacity-url' },
            rejectLogout: { type: Boolean, attribute: 'reject-logout' },
            logoutCallback: { type: Function },
            applicationLinks: { type: Array },
        };
    }

    private get headerContainer(): Element | null {
        return document.querySelector('#header__container');
    }

    private get headerContainerSkeleton(): Element | null {
        return document.querySelector('#header__container__skeleton');
    }

    connectedCallback() {
        super.connectedCallback();

        this.injectHeaderContainer();

        if (this.skeleton) {
            this.injectHeaderContainerSkeleton();
        }

        this.observeWidgetIsAdded();
        this.loadWidget();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.headerContainer?.remove();

        if (this.skeleton) {
            this.headerContainerSkeleton?.remove();
        }

        this.observer?.disconnect();
    }

    /**
     * @deprecated Deze methode mag niet gebruikt worden.
     */
    injectHeader() {
        console.warn('VlHeader - injectHeader() - deze methode is deprecated en mag niet gebruikt worden.');
        this.injectHeaderContainer();
    }

    /**
     * @deprecated Deze methode mag niet gebruikt worden.
     */
    vlwHeader() {
        console.warn('VlHeader - vlwHeader() - deze methode is deprecated en mag niet gebruikt worden.');
        return document.querySelector('div[class=vlw__header]');
    }

    /**
     * @deprecated Deze methode nag niet gebruikt worden.
     */
    header() {
        console.warn('VlHeader - header() - deze methode is deprecated en mag niet gebruikt worden.');
        return this.headerContainer;
    }

    protected willUpdate(changedProperties: Map<string, unknown>) {
        const sessionProperties = ['loginUrl', 'loginRedirectUrl', 'logoutUrl', 'switchCapacityUrl'];

        if (sessionProperties.some((property) => changedProperties.has(property))) {
            this.configureSession();
        }
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private injectHeaderContainer() {
        const vlBody = document.querySelector('body');

        (vlBody || document.body).insertAdjacentHTML(
            'afterbegin',
            '<div id="header__container"><div id="header"></div></div>'
        );

        this.addStylesToInjectedElement('#header__container', headerContainerStyles);
    }

    private injectHeaderContainerSkeleton() {
        const headerContainer = this.headerContainer;

        if (headerContainer) {
            headerContainer.insertAdjacentHTML('afterend', '<div id="header__skeleton"></div>');
        }

        this.addStylesToInjectedElement('#header__skeleton', headerSkeletonStyles);
    }

    private addStylesToInjectedElement(selector: string, cssContent: CSSResult) {
        const style = document.createElement('style');
        style.textContent = cssContent.cssText;

        const element = document.querySelector(selector);
        element?.appendChild(style);
    }

    private observeWidgetIsAdded() {
        const isHeader = (node: Node) => {
            return (
                (node as HTMLElement).tagName === 'HEADER' || (node.childNodes && [...node.childNodes].some(isHeader))
            );
        };

        this.observer = new MutationObserver((mutations, observer) => {
            const nodes = mutations.flatMap((mutation) => [...mutation.addedNodes]);

            if (nodes.some(isHeader)) {
                observer.disconnect();
                this.dispatchEvent(new CustomEvent('ready'));
            }
        });

        this.headerContainer && this.observer.observe(this.headerContainer, { childList: true });
    }

    private async isUserAuthenticated(): Promise<boolean> {
        const response = await fetch(this.authenticatedUserUrl);

        return response.status === 200;
    }

    private loadWidget() {
        const widgetUrl = this.development
            ? `https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/${this.identifier}`
            : `https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget/${this.identifier}`;

        (window as any).vl.widget.client
            .bootstrap(widgetUrl)
            .then((widget: any) => {
                widget.setMountElement(document.getElementById('header'));
                widget.mount();

                return widget;
            })
            .then((widget: any) => {
                if (this.applicationLinks.length > 0) {
                    const links = this.applicationLinks.map((link) => {
                        return {
                            type: 'link',
                            ...link,
                        };
                    });

                    widget.getExtension('citizen_profile').then((extension: any) => {
                        extension.getMenu().getGroup('application').addMultiple(links);
                    });
                }

                if (this.simple) {
                    return;
                }

                widget.getExtension('citizen_profile.session').then(async (session: any) => {
                    this.session = session;
                    this.authenticated = await this.isUserAuthenticated();
                    this.configureSession();
                });

                widget.on('citizen_profile.session.logout.request', async (logoutRequest: any) => {
                    // Acknowledge het logout request om te voorkomen dat de sessie extensie de default actie uitvoert door response timeout (5 seconden).
                    logoutRequest.acknowledge();

                    const logoutReason = logoutRequest.getRequest().getReason();

                    if (logoutReason === 'user') {
                        //  Logout request door de gebruiker. Dit request mag nooit afgewezen worden in normale omstandigheden.
                        logoutRequest.accept();
                        return;
                    }

                    if (this.rejectLogout) {
                        // Wijs het logout request af.
                        logoutRequest.reject();
                        return;
                    }

                    if (this.logoutCallback && !(await this.logoutCallback(logoutReason))) {
                        // Wijs het logout request af als de logoutCallback een Promise<boolean> teruggeeft die false is.
                        logoutRequest.reject();
                        return;
                    }

                    // Accepteer het logout request in alle andere gevallen.
                    logoutRequest.accept();
                });
            })
            .catch((e: unknown) => {
                console.error(e);
            });
    }

    private async configureSession(): Promise<void> {
        const config = {
            active: this.authenticated,
            endpoints: {
                loginUrl: this.loginUrl,
                loginRedirectUrl: this.loginRedirectUrl,
                logoutUrl: this.logoutUrl,
                switchCapacityUrl: this.switchCapacityUrl,
            },
        };

        this.session?.configure(config);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-header': VlHeader;
    }
}
