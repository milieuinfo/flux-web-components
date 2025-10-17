import {
    awaitScript,
    BaseLitElement,
    legacyBreakpoint,
    legacyCore,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { ApplicationMenuLink, GlobalHeaderClient } from '@govflanders/vl-widget-global-header-types';
import { PropertyDeclarations } from 'lit';
import { headerContainerStyles, headerSkeletonStyles } from './vl-header.component.flux-css';
import { headerDefaults } from './vl-header.defaults';
export type ApplicationLink = ApplicationMenuLink;

declare global {
    interface Window {
        globalHeaderClient: GlobalHeaderClient;
    }
}

registerWebComponents([legacyCore, legacyBreakpoint]);

@webComponent('vl-header-next')
export class VlHeaderNext extends BaseLitElement {
    // Properties
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
            applicationLinks: { type: Array },
        };
    }

    private get headerContainer(): HTMLElement | null {
        return document.querySelector<HTMLElement>('#header__container');
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

        window.removeEventListener('widget.global_header.mounted', this.onReady);
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
        if (this.headerContainer) return;

        (document.querySelector('body') || document.body).insertAdjacentHTML(
            'afterbegin',
            '<header id="header__container"><div id="header"></div></header>'
        );
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, headerContainerStyles.styleSheet!];
    }

    private injectHeaderContainerSkeleton() {
        this.headerContainer?.insertAdjacentHTML('afterend', '<div id="header__skeleton"></div>');
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, headerSkeletonStyles.styleSheet!];
    }

    private async isUserAuthenticated(): Promise<boolean> {
        const response = await fetch(this.authenticatedUserUrl);

        return response.status === 200;
    }

    private onReady() {
        this.dispatchEvent(new CustomEvent('ready'));
    }

    private async loadWidget() {
        try {
            window.addEventListener('widget.global_header.mounted', this.onReady);

            await awaitScript(
                'vl-header-widget',
                `https://widgets.${this.development ? 'tni-' : ''}vlaanderen.be/api/v2/widget/${this.identifier}/entry`
            );

            if (!window.globalHeaderClient) {
                console.error('De global header client werd niet geladen.');
                return;
            }

            const headerElement = this.headerContainer?.querySelector<HTMLDivElement>('#header') || undefined;

            await window.globalHeaderClient.mount(headerElement);

            if (this.applicationLinks.length > 0) {
                await window.globalHeaderClient.accessMenu.setApplicationMenuLinks(this.applicationLinks);
            }

            if (this.simple) {
                return;
            }

            this.configureSession();

            // Sinds v5 is het niet meer nodig om automatische logout requests te rejecten
            // widget.on('citizen_profile.session.logout.request', async (logoutRequest: any) => {...});
        } catch (error) {
            console.error('De global header werd niet geladen.', error);
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

    public get height(): number {
        return this.headerContainer?.getBoundingClientRect().height || 0;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-header-next': VlHeaderNext;
    }
}
