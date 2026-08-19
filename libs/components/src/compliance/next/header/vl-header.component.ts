import {
    awaitScript,
    BaseLitElement,
    legacyBreakpoint,
    legacyCore,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import {
    ApplicationMenuLink,
    GlobalHeaderClient,
    IDPData,
    ProfileConfig,
} from '@govflanders/vl-widget-global-header-types';
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
export class VlHeader extends BaseLitElement {
    // Properties
    applicationLinks = headerDefaults.applicationLinks;
    idpProfileToken: string | undefined = headerDefaults.idpProfileToken;
    idpData: IDPData | undefined = headerDefaults.idpData;
    // Attributes
    private authenticatedUserUrl = headerDefaults.authenticatedUserUrl;
    private development = headerDefaults.development;
    private identifier = headerDefaults.identifier;
    private loginUrl = headerDefaults.loginUrl;
    private logoutUrl = headerDefaults.logoutUrl;
    private switchCapacityUrl = headerDefaults.switchCapacityUrl;
    private simple = headerDefaults.simple;
    private skeleton = headerDefaults.skeleton;
    private profileTokenUrl = headerDefaults.profileTokenUrl;
    private idpDataUrl = headerDefaults.idpDataUrl;
    private initialSessionConfigured = false;
    private configureSessionGeneration = 0;

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
            profileTokenUrl: { type: String, attribute: 'profile-token-url' },
            idpDataUrl: { type: String, attribute: 'idp-data-url' },
            idpProfileToken: { attribute: false },
            idpData: { attribute: false },
        };
    }

    private get headerContainer(): HTMLElement | null {
        return document.querySelector<HTMLElement>('#header__container');
    }

    private get headerContainerSkeleton(): HTMLDivElement | null {
        return document.querySelector<HTMLDivElement>('#header__skeleton');
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
        if (!this.initialSessionConfigured) {
            return;
        }

        const sessionProperties = [
            'loginUrl',
            'logoutUrl',
            'switchCapacityUrl',
            'profileTokenUrl',
            'idpDataUrl',
            'idpProfileToken',
            'idpData',
        ];

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
            '<header id="header__container"><div id="header"></div></header>',
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

    // class field met pijlfunctie, geen methode !
    // -> window.addEventListener krijgt hier enkel een functiereferentie mee
    // -> als gewone methode is 'this' bij het afvuren het window, en dan komt het ready-event op window
    //    terecht in plaats van op de component - afnemers die op het element luisteren zien het dan nooit
    private onReady = () => {
        this.dispatchEvent(new CustomEvent('ready'));
    };

    private async loadWidget() {
        try {
            window.addEventListener('widget.global_header.mounted', this.onReady);

            await awaitScript(
                'vl-header-widget',
                `https://widgets.${this.development ? 'tni-' : ''}vlaanderen.be/api/v2/widget/${this.identifier}/entry`,
            );

            if (!this.isConnected) return;

            if (!window.globalHeaderClient) {
                console.error('De global header client werd niet geladen.');
                return;
            }

            const headerElement = this.headerContainer?.querySelector<HTMLDivElement>('#header') || undefined;

            await window.globalHeaderClient.mount(headerElement);

            if (!this.isConnected) return;

            if (this.applicationLinks.length > 0) {
                await window.globalHeaderClient.accessMenu.setApplicationMenuLinks(this.applicationLinks);

                if (!this.isConnected) {
                    return;
                }
            }

            if (this.simple) {
                return;
            }

            this.configureSession();
            this.initialSessionConfigured = true;
        } catch (error) {
            console.error('De global header werd niet geladen.', error);
        }
    }

    private async resolveProfileToken(): Promise<string | undefined> {
        if (this.idpProfileToken) return this.idpProfileToken;
        if (!this.profileTokenUrl) return undefined;

        try {
            const response = await fetch(this.profileTokenUrl);
            if (!response.ok) return undefined;

            return (await response.text()).trim() || undefined;
        } catch (error) {
            console.error('Kon het PAPI profile token niet ophalen.', error);
            return undefined;
        }
    }

    private async resolveIdpData(): Promise<IDPData | undefined> {
        if (this.idpData) return this.idpData;
        if (!this.idpDataUrl) return undefined;

        try {
            const response = await fetch(this.idpDataUrl);
            if (!response.ok) return undefined;
            return (await response.json()) as IDPData;
        } catch (error) {
            console.error('Kon de IDP data niet ophalen.', error);
            return undefined;
        }
    }

    private async configureSession(): Promise<void> {
        const generation = ++this.configureSessionGeneration;
        const isStale = () => generation !== this.configureSessionGeneration || !this.isConnected;

        const active = await this.isUserAuthenticated();
        if (isStale()) return;

        const config: Partial<ProfileConfig> = {
            active,
            loginUrl: this.loginUrl,
            logoutUrl: this.logoutUrl,
            switchCapacityUrl: this.switchCapacityUrl,
        };

        if (active) {
            const token = await this.resolveProfileToken();
            if (isStale()) return;

            if (token) {
                config.idpProfileToken = token;
            } else {
                const idpData = await this.resolveIdpData();
                if (isStale()) return;
                if (idpData) config.idpData = idpData;
            }
        }

        if (isStale()) return;
        window.globalHeaderClient?.accessMenu?.setProfile(config);
    }

    public get height(): number {
        return this.headerContainer?.getBoundingClientRect().height || 0;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-header-next': VlHeader;
    }
}
