import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlIconComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { vlLayoutStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement } from 'lit';
import { when } from 'lit-html/directives/when.js';
import { customElement, property, state } from 'lit/decorators.js';
import { vlDashboardStyles } from './vl-dashboard.css';

@customElement('vl-dashboard')
export class VlDashboardComponent extends LitElement {
    static {
        registerWebComponents([VlButtonComponent, VlTitleComponent, VlIconComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlDashboardStyles];
    }

    @state() private hasNavUtils = false;

    @property({ type: String, attribute: 'user-name' })
    userName: string | undefined = undefined;

    @property({ type: String, attribute: 'user-img' })
    userImg: string | undefined = undefined;

    @property({ type: String, attribute: 'user-icon' })
    userIcon: string | undefined = undefined;

    @property({ type: String, attribute: 'page-title' })
    pageTitle: string | undefined = undefined;

    @property({ type: String, attribute: 'page-icon' })
    pageIcon: string | undefined = undefined;

    @property({ type: String, attribute: 'content-padding' })
    contentPadding = '30px';

    @property({ type: String, attribute: 'content-max-width' })
    contentMaxWidth = '100%';

    private mutationObserver?: MutationObserver;

    private get openMobileNavigationButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#open-mobile-navigation-button');
    }
    private get closeMobileNavigationButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#close-mobile-navigation-button');
    }
    private get toggleNavigationButton(): VlButtonComponent | null | undefined {
        return this.shadowRoot?.querySelector<VlButtonComponent>('#toggle-navigation-button');
    }
    private get navigationContainer(): HTMLElement | null | undefined {
        return this.shadowRoot?.querySelector<HTMLElement>('.vl-dashboard__navigation');
    }

    private onNavUtilsSlotChange = (e: Event) => {
        const slotEl = e.currentTarget as HTMLSlotElement;
        const hasElements = slotEl.assignedElements({ flatten: true }).length > 0;
        const hasText = slotEl
            .assignedNodes({ flatten: true })
            .some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0);
        this.hasNavUtils = hasElements || hasText;
    };

    firstUpdated(): void {
        this.openMobileNavigationButton?.addEventListener('click', () => {
            this.navigationContainer?.classList.add('vl-dashboard__navigation--mobile');
            this.closeMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
        });
        this.closeMobileNavigationButton?.addEventListener('click', () => {
            this.navigationContainer?.classList.remove('vl-dashboard__navigation--mobile');
            this.openMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
        });
        this.toggleNavigationButton?.addEventListener('click', () => {
            this.navigationContainer?.classList.toggle('vl-dashboard__navigation--collapsed');
            const collapsed = this.navigationContainer?.classList.contains('vl-dashboard__navigation--collapsed');
            this.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            const event = new CustomEvent('vl-toggle-navigation', {
                detail: {
                    collapsed,
                },
                composed: true,
                bubbles: true,
            });
            this.dispatchEvent(event);
        });
    }

    render() {
        return html`
            <div class="vl-dashboard">
                <slot name="header"></slot>
                <!-- navigation is altijd 100% hoog tussen header en footer -->
                <!-- navigation kan ingeklapt worden tot ongeveer breedte van icon-only knop met wat margin -->
                <!-- navigation verdwijnt in hamburger menu op mobile -->
                <!-- mobiele navigation neemt volledig scherm in onder de header wanneer opengeklapt -->
                <div class="vl-dashboard__navigation" id="navigation">
                    <div class="vl-dashboard__navigation-header">
                        ${when(
                            this.userName || this.userIcon || this.userImg,
                            () =>
                                html`<div class="vl-dashboard__navigation-header-user">
                                    ${when(
                                        this.userImg || this.userIcon,
                                        () => html`
                                            <user-badge>
                                                ${when(
                                                    this.userImg && this.userName && !this.userIcon,
                                                    () => html`<img src="${this.userImg!}" alt="${this.userName!}" />`,
                                                )}
                                                ${when(
                                                    this.userIcon && !this.userImg,
                                                    () => html`<vl-icon icon="${this.userIcon!}"></vl-icon>`,
                                                )}
                                            </user-badge>
                                        `,
                                    )}
                                    ${when(this.userName, () => html`<user-name>Bedrijfsnaam</user-name>`)}
                                </div>`,
                        )}
                        <div class="vl-dashboard__navigation-close-mobile">
                            <vl-button id="close-mobile-navigation-button" icon="close" ghost></vl-button>
                        </div>
                    </div>
                    <nav class="vl-dashboard__navigation-main">
                        <div role="list">
                            <slot name="nav-main"></slot>
                        </div>
                    </nav>
                    <nav ?hidden=${!this.hasNavUtils} class="vl-dashboard__navigation-utils" aria-label="Hulpnavigatie">
                        <ul>
                            <slot name="nav-utils" @slotchange=${this.onNavUtilsSlotChange}></slot>
                        </ul>
                    </nav>
                    <div class="vl-dashboard__navigation-footer">
                        <vl-button
                            id="toggle-navigation-button"
                            icon="nav-left-double"
                            ghost
                            block
                            aria-expanded="true"
                            aria-controls="navigation"
                            >Paneel inklappen</vl-button
                        >
                    </div>
                </div>
                <!-- content is altijd 100% hoog tussen header en footer -->
                <!-- content is altijd 100% breed naast navigation -->
                <main class="vl-dashboard__content">
                    <div class="vl-dashboard__content-header">
                        <div class="vl-dashboard__content-header-title">
                            <div class="vl-dashboard__navigation-open-mobile">
                                <vl-button id="open-mobile-navigation-button" icon="menu" ghost></vl-button>
                            </div>
                            ${when(this.pageIcon, () => html`<vl-icon icon="${this.pageIcon!}" large></vl-icon>`)}
                            ${when(
                                this.pageTitle,
                                () => html`<vl-title type="h1" no-space-bottom>${this.pageTitle}</vl-title>`,
                            )}
                        </div>
                        <!-- een pagina header kan acties hebben zoals knoppen en een zoekveld -->
                        <div class="vl-dashboard__content-header-actions">
                            <slot name="header-actions"></slot>
                        </div>
                    </div>
                    <div class="vl-dashboard__content-area" style="padding: ${this.contentPadding}" tabindex="0">
                        <!-- de content area is default 100% hoog en breed -->
                        <!-- de content area kan 30px padding hebben, als de content niet container-vullend moet zijn -->
                        <!-- de content area kan een max-width van 1280px hebben, als de content niet container-vullend moet zijn -->
                        <div style="max-width: ${this.contentMaxWidth}">
                            <slot name="content"></slot>
                        </div>
                    </div>
                </main>
                <slot name="footer"></slot>
            </div>
        `;
    }
}
