import {
    awaitScript,
    BaseLitElement,
    legacyBreakpoint,
    legacyCore,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { ApplicationMenuLink, GlobalHeaderClient } from '@govflanders/vl-widget-global-header-types';
import { CSSResult, PropertyDeclarations } from 'lit';
import { headerContainerStyles, headerSkeletonStyles } from './vl-header.component.flux-css';
import { headerDefaults } from './vl-header.defaults';
export type ApplicationLink = ApplicationMenuLink;

declare global {
    interface Window {
        globalHeaderClient: GlobalHeaderClient;
    }
}

registerWebComponents([legacyCore, legacyBreakpoint]);

@webComponent('vl-header')
export class VlHeader extends BaseLitElement {
    // Properties
    // logoutCallback = headerDefaults.logoutCallback;
    applicationLinks = headerDefaults.applicationLinks;
    // Attributes
    private authenticatedUserUrl = headerDefaults.authenticatedUserUrl;
    private development = headerDefaults.development;
    private identifier = headerDefaults.identifier;
    private loginUrl = headerDefaults.loginUrl;
    private logoutUrl = headerDefaults.logoutUrl;
    private switchCapacityUrl = headerDefaults.switchCapacityUrl;
    private simple = headerDefaults.simple;
    private skeleton = headerDefaults.skeleton;
    // private rejectLogout = headerDefaults.rejectLogout;
    // Variables
    // private session: any = null;
    // private authenticated = false;

    constructor() {
        super();

        this.allowCustomCSS = false;
    }

    static get properties(): PropertyDeclarations {
        return {
            authenticatedUserUrl: { type: String, attribute: 'authenticated-user-url' },
            development: { type: Boolean, attribute: 'development' },
            identifier: { type: String, attribute: 'identifier' },
            loginUrl: { type: String, attribute: 'login-url' },
            logoutUrl: { type: String, attribute: 'logout-url' },
            simple: { type: Boolean, attribute: 'simple' },
            skeleton: { type: Boolean, attribute: 'skeleton' },
            switchCapacityUrl: { type: String, attribute: 'switch-capacity-url' },
            // rejectLogout: { type: Boolean, attribute: 'reject-logout' },
            // logoutCallback: { type: Function },
            applicationLinks: { type: Array },
        };
    }

    private get headerContainer(): HTMLDivElement | null {
        return document.querySelector<HTMLDivElement>('#header__container');
    }

    private get headerContainerSkeleton(): HTMLDivElement | null {
        return document.querySelector<HTMLDivElement>('#header__container__skeleton');
    }

    connectedCallback() {
        super.connectedCallback();

        this.injectHeaderContainer();

        if (this.skeleton) {
            this.injectHeaderContainerSkeleton();
        }

        this.loadWidget();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.headerContainer?.remove();

        if (this.skeleton) {
            this.headerContainerSkeleton?.remove();
        }
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
        const sessionProperties = ['loginUrl', 'logoutUrl', 'switchCapacityUrl'];

        if (sessionProperties.some((property) => changedProperties.has(property))) {
            this.configureSession();
        }
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private injectHeaderContainer() {
        const vlBody = document.querySelector('body');

        if (this.headerContainer) return;

        (vlBody || document.body).insertAdjacentHTML(
            'afterbegin',
            '<div id="header__container"><div id="header"></div></div>'
        );

        this.addStylesToInjectedElement('#header__container', headerContainerStyles);
    }

    private injectHeaderContainerSkeleton() {
        this.headerContainer?.insertAdjacentHTML('afterend', '<div id="header__skeleton"></div>');
        this.addStylesToInjectedElement('#header__skeleton', headerSkeletonStyles);
    }

    private addStylesToInjectedElement(selector: string, cssContent: CSSResult) {
        const style = document.createElement('style');
        style.textContent = cssContent.cssText;

        const element = document.querySelector(selector);
        element?.appendChild(style);
    }

    private async isUserAuthenticated(): Promise<boolean> {
        const response = await fetch(this.authenticatedUserUrl);

        return response.status === 200;
    }

    private async loadWidget() {
        try {
            await awaitScript(
                'vl-header-widget',
                `https://widgets.${this.development ? 'tni-' : ''}vlaanderen.be/api/v2/widget/${this.identifier}/entry`
            );

            if (!window.globalHeaderClient) {
                console.error('Global header client failed to load');
                return;
            }

            const headerElement = this.headerContainer?.querySelector<HTMLDivElement>('#header') || undefined;

            const successFullyMounted = await window.globalHeaderClient.mount(headerElement);

            if (this.applicationLinks.length > 0) {
                const links = this.applicationLinks.map((link) => {
                    return {
                        type: 'link',
                        ...link,
                    };
                });

                await window.globalHeaderClient.accessMenu.addApplicationMenuLinks(links);
            }

            if (this.simple) return;

            this.configureSession();

            // TODO: bekijken hoe dit werkt in v5

            //         widget.on('citizen_profile.session.logout.request', async (logoutRequest: any) => {
            //             // Acknowledge het logout request om te voorkomen dat de sessie extensie de default actie uitvoert door response timeout (5 seconden).
            //             logoutRequest.acknowledge();

            //             const logoutReason = logoutRequest.getRequest().getReason();

            //             if (logoutReason === 'user') {
            //                 //  Logout request door de gebruiker. Dit request mag nooit afgewezen worden in normale omstandigheden.
            //                 logoutRequest.accept();
            //                 return;
            //             }

            //             if (this.rejectLogout) {
            //                 // Wijs het logout request af.
            //                 logoutRequest.reject();
            //                 return;
            //             }

            //             if (this.logoutCallback && !(await this.logoutCallback(logoutReason))) {
            //                 // Wijs het logout request af als de logoutCallback een Promise<boolean> teruggeeft die false is.
            //                 logoutRequest.reject();
            //                 return;
            //             }

            //             // Accepteer het logout request in alle andere gevallen.
            //             logoutRequest.accept();
            //         });

            if (successFullyMounted) {
                this.dispatchEvent(new CustomEvent('ready'));
            }
        } catch (error) {
            console.error('Global header client failed to load', error);
        }
    }

    private async configureSession(): Promise<void> {
        const active = await this.isUserAuthenticated();

        window.globalHeaderClient?.accessMenu?.setProfile({
            active,
            loginUrl: this.loginUrl,
            logoutUrl: this.logoutUrl,
            switchCapacityUrl: this.switchCapacityUrl,
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-header': VlHeader;
    }
}
