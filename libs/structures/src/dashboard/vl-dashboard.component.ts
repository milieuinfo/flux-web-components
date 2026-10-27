import {
    BaseLitElement,
    findHeadingInShadowRoot,
    navigateToAnchor,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlBadgeComponent } from '@domg-wc/components/block/badge';
import { vlAccessibilityStyles, vlLayoutStyles, vlMediaScreenMedium, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyValues, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { DASHBOARD_HEADER_UPDATE_EVENT, DASHBOARD_PAGE_TITLE_ID } from './vl-dashboard-header.component';
import { vlDashboardStyles } from './vl-dashboard.css';
import { dashboardDefaults } from './vl-dashboard.defaults';

registerWebComponents([VlButtonComponent, VlBadgeComponent]);

const COLLAPSED_STORAGE_KEY = 'vl-dashboard-navigation-collapsed';

const TABBABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

// localStorage kan ontbreken of een fout gooien, bv. in een sandboxed iframe of bij geblokkeerde site data
const readCollapsedFromStorage = (): boolean => {
    try {
        return globalThis.localStorage.getItem(COLLAPSED_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
};

const writeCollapsedToStorage = (collapsed: boolean): void => {
    try {
        globalThis.localStorage.setItem(COLLAPSED_STORAGE_KEY, collapsed ? 'true' : 'false');
    } catch {
        // de toestand wordt dan niet bewaard
    }
};

export type VlToggleNavigationEventDetail = { collapsed: boolean };

// een klik op een navigatielink: de aangeklikte link, om te zien of de focus sindsdien niet verplaatst is
type PendingNavigation = { link: HTMLElement };

// Een rem voor een link die de router negeert: zonder nieuwe header na de klik zou een veel latere titelwijziging
// (bv. een teller na het laden van data) anders nog de focus verzetten. Ruim genoeg voor een trage lazy route.
const PENDING_NAVIGATION_TIMEOUT = 10000;

/**
 * @slot header - Plaats hier het vl-header-next component.
 * @slot nav-main - Plaats hier de hoofdnavigatie, met vl-nav-link en vl-nav-sub componenten.
 * @slot nav-utils - Plaats hier de hulpnavigatie, met vl-nav-link componenten. Wordt enkel getoond als er inhoud is.
 * @slot content - Plaats hier de inhoud van de pagina, met bovenaan een vl-dashboard-header.
 * @slot footer - Plaats hier het vl-footer-next component.
 * @fires vl-toggle-navigation - Bij het in- of uitklappen van de navigatie, met `detail: { collapsed: boolean }`.
 */
@webComponent('vl-dashboard')
export class VlDashboard extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLayoutStyles, vlAccessibilityStyles, vlDashboardStyles];
    }

    @property({ type: String, attribute: 'user-name' })
    userName = dashboardDefaults.userName;

    @property({ type: String, attribute: 'user-img' })
    userImg = dashboardDefaults.userImg;

    @property({ type: String, attribute: 'user-icon' })
    userIcon = dashboardDefaults.userIcon;

    @property({ type: Boolean, attribute: 'not-collapsible', reflect: true })
    notCollapsible = dashboardDefaults.notCollapsible;

    /**
     * Of de navigatie ingeklapt is. Gereflecteerd, zodat de consumer de toestand kan uitlezen en ook zelf kan zetten.
     * Een wijziging van buitenaf vuurt geen `vl-toggle-navigation` af en wordt niet bewaard in `localStorage`.
     */
    @property({ type: Boolean, attribute: 'collapsed', reflect: true })
    collapsed = dashboardDefaults.collapsed;

    @state() private mobileNavigationOpen = false;

    @state() private hasNavUtils = false;

    /** True wanneer een nav-link (in nav-main of nav-utils) een badge bevat. */
    @state() private navHasBadge = false;

    @query('#open-mobile-navigation-button')
    private openMobileNavigationButton!: VlButtonComponent;

    @query('#close-mobile-navigation-button')
    private closeMobileNavigationButton!: VlButtonComponent;

    private badgeObserver: MutationObserver | undefined = undefined;

    private mobileMediaQuery: MediaQueryList | undefined = undefined;

    /**
     * Een klik op een navigatielink waarvan de nieuwe pagina nog de focus moet krijgen; gewist bij de volgende interactie
     * van de gebruiker of na PENDING_NAVIGATION_TIMEOUT.
     */
    private pendingNavigation: PendingNavigation | undefined = undefined;

    private pendingNavigationTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(DASHBOARD_HEADER_UPDATE_EVENT, this.onHeaderUpdate);
        // Herbereken de badge-indicator wanneer nav-links of hun badges (dynamisch) wijzigen.
        // observeert ook de inhoud; recomputeNavBadge is één querySelector per mutatiebatch
        this.badgeObserver = new MutationObserver(this.recomputeNavBadge);
        this.badgeObserver.observe(this, { childList: true, subtree: true });
        this.mobileMediaQuery = globalThis.matchMedia(`(max-width: ${vlMediaScreenMedium}px)`);
        this.mobileMediaQuery.addEventListener('change', this.onMobileMediaQueryChange);
    }

    firstUpdated(): void {
        this.recomputeNavBadge();
        // een collapsed-attribuut bij de start wint van localStorage
        if (!this.notCollapsible && !this.collapsed && readCollapsedFromStorage()) {
            this.setCollapsed(true);
        }
    }

    protected willUpdate(changedProperties: PropertyValues<this>): void {
        if (this.notCollapsible && this.collapsed) {
            this.collapsed = false;
            // wordt een ingeklapte navigatie niet-inklapbaar, dan klapt ze open: meld dat, zodat de links mee uitklappen
            if (this.hasUpdated && changedProperties.has('notCollapsible')) {
                this.dispatchToggleNavigation(false);
            }
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener(DASHBOARD_HEADER_UPDATE_EVENT, this.onHeaderUpdate);
        this.setPendingNavigation(undefined);
        this.badgeObserver?.disconnect();
        this.badgeObserver = undefined;
        this.mobileMediaQuery?.removeEventListener('change', this.onMobileMediaQueryChange);
        this.mobileMediaQuery = undefined;
    }

    // De mobiele navigatie bestaat enkel op een smal scherm: sluit ze als het scherm breder wordt.
    private readonly onMobileMediaQueryChange = (e: MediaQueryListEvent) => {
        if (!e.matches) {
            this.mobileNavigationOpen = false;
        }
    };

    // De open mobiele navigatie houdt de toetsenbordfocus vast: Tab en Shift+Tab lopen rond binnen het paneel.
    private readonly onNavigationKeydown = (e: KeyboardEvent) => {
        if (!this.mobileNavigationOpen) return;
        if (e.key === 'Escape') {
            void this.onCloseMobileNavigation();
            return;
        }
        if (e.key !== 'Tab') return;
        const tabbables = this.getNavigationTabbables();
        if (tabbables.length === 0) return;
        const first = tabbables[0];
        const last = tabbables[tabbables.length - 1];
        const current = e.composedPath()[0];
        if (e.shiftKey && current === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && current === last) {
            e.preventDefault();
            first.focus();
        }
    };

    /** De zichtbare, focusbare elementen van het navigatiepaneel in tabvolgorde, ook in shadow roots en slots. */
    private getNavigationTabbables(): HTMLElement[] {
        const tabbables: HTMLElement[] = [];
        const visit = (element: Element) => {
            if (
                element instanceof HTMLElement &&
                element.matches(TABBABLE_SELECTOR) &&
                element.tabIndex >= 0 &&
                element.getClientRects().length > 0
            ) {
                tabbables.push(element);
            }
            if (element.shadowRoot) {
                [...element.shadowRoot.children].forEach(visit);
            } else if (element instanceof HTMLSlotElement) {
                element.assignedElements({ flatten: true }).forEach(visit);
            } else {
                [...element.children].forEach(visit);
            }
        };
        const navigation = this.shadowRoot?.querySelector('#navigation');
        if (navigation) {
            [...navigation.children].forEach(visit);
        }
        return tabbables;
    }

    private readonly recomputeNavBadge = () => {
        // Badges (element met slot="link-badge") kunnen in nav-main of nav-utils zitten,
        // ook genest in een vl-nav-sub. Een descendant-selector dekt beide gevallen.
        this.navHasBadge = !!this.querySelector(
            '[slot="nav-main"] [slot="link-badge"], [slot="nav-utils"] [slot="link-badge"]',
        );
    };

    private readonly onNavUtilsSlotChange = (e: Event) => {
        const slotEl = e.currentTarget as HTMLSlotElement;
        this.hasNavUtils = slotEl.assignedElements().length > 0;
    };

    private readonly onOpenMobileNavigation = async () => {
        this.mobileNavigationOpen = true;
        await this.updateComplete;
        this.closeMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
    };

    private readonly onCloseMobileNavigation = async () => {
        this.mobileNavigationOpen = false;
        await this.updateComplete;
        this.openMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
    };

    // enkel de keuze van de gebruiker wordt bewaard, niet een wijziging van buitenaf; zonder knop (not-collapsible) niets
    private readonly onToggleNavigation = () => {
        this.setCollapsed(!this.collapsed);
        writeCollapsedToStorage(this.collapsed);
    };

    /** Zet de toestand vanuit het dashboard zelf (toggle door de gebruiker of herstel) en meldt dat. */
    private setCollapsed(collapsed: boolean): void {
        this.collapsed = collapsed;
        this.dispatchToggleNavigation(collapsed);
    }

    private dispatchToggleNavigation(collapsed: boolean): void {
        this.dispatchEvent(
            new CustomEvent<VlToggleNavigationEventDetail>('vl-toggle-navigation', {
                detail: { collapsed },
                composed: true,
                bubbles: true,
            }),
        );
    }

    private focusMain(): void {
        const main = this.shadowRoot?.querySelector<HTMLElement>('#main-content');
        main?.focus();
        main?.scrollIntoView({ behavior: 'instant' });
    }

    /**
     * Na een klik op een link sluit de mobiele navigatie en gaat de focus naar het main landmark: de pagina van de link
     * en haar vl-dashboard-header staan er dan mogelijk nog niet. Heeft de nieuwe header de focus intussen al, dan
     * blijft ze daar. Zonder navigation (een klik op de huidige pagina) gaat de focus altijd naar main.
     */
    private async moveFocusToMain(navigation?: PendingNavigation): Promise<void> {
        this.mobileNavigationOpen = false;
        await this.updateComplete;
        if (!navigation || this.pendingNavigation === navigation) {
            this.focusMain();
        }
    }

    /** Het element dat echt focus heeft, door alle shadow roots heen. */
    private get deepActiveElement(): Element | null {
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active;
    }

    // De focus is na de klik niet door de gebruiker of de pagina verplaatst: ze staat nog op de link, op main, of nergens.
    private isFocusUntouchedSince(navigation: PendingNavigation): boolean {
        const active = this.deepActiveElement;
        return (
            !active ||
            active === document.body ||
            active === navigation.link ||
            active === this.shadowRoot?.querySelector('#main-content')
        );
    }

    // Een vl-dashboard-header meldt zich na het renderen van zijn titel. Volgt dat op een klik op een navigatielink, dan
    // gaat de focus naar zijn h1: de titel van de nieuwe pagina, ook als die pas later rendert.
    private readonly onHeaderUpdate = async (e: Event) => {
        const navigation = this.pendingNavigation;
        if (!navigation) return;
        this.setPendingNavigation(undefined);
        const header = e.composedPath()[0] as Element;
        // op mobiel moet de navigatie eerst dicht zijn, anders is de h1 nog niet zichtbaar
        await this.updateComplete;
        const title = header.shadowRoot?.getElementById(DASHBOARD_PAGE_TITLE_ID) as
            | (HTMLElement & { updateComplete?: Promise<unknown> })
            | null;
        // de h1 staat in de shadow root van vl-title; zoals bij de skip link krijgt die de focus
        await title?.updateComplete;
        if (title && this.isFocusUntouchedSince(navigation)) {
            const heading = findHeadingInShadowRoot(title) ?? title;
            if (heading.tabIndex < 0) {
                heading.tabIndex = -1;
            }
            heading.focus();
        }
    };

    // De skip link gaat naar de h1 van de vl-dashboard-header, waar die ook staat (ook in een shadow root), anders
    // naar het main landmark.
    private readonly onSkipToContentClick = async (e: Event) => {
        e.preventDefault();
        this.mobileNavigationOpen = false;
        await this.updateComplete;
        if (!navigateToAnchor(DASHBOARD_PAGE_TITLE_ID)) {
            this.focusMain();
        }
    };

    // Onthoudt de klik tot de nieuwe vl-dashboard-header zich meldt, tot de volgende interactie van de gebruiker of tot
    // de time-out: een klik waarop geen nieuwe pagina volgt, mag de focus later niet meer verzetten.
    private setPendingNavigation(navigation: PendingNavigation | undefined): void {
        this.pendingNavigation = navigation;
        clearTimeout(this.pendingNavigationTimeout);
        this.pendingNavigationTimeout = undefined;
        if (navigation) {
            this.pendingNavigationTimeout = setTimeout(this.clearPendingNavigation, PENDING_NAVIGATION_TIMEOUT);
            document.addEventListener('pointerdown', this.clearPendingNavigation, true);
            document.addEventListener('keydown', this.clearPendingNavigation, true);
        } else {
            document.removeEventListener('pointerdown', this.clearPendingNavigation, true);
            document.removeEventListener('keydown', this.clearPendingNavigation, true);
        }
    }

    // bij interactie of na de time-out; de pointerdown of keydown van de klik zelf is al voorbij als de klik vuurt
    private readonly clearPendingNavigation = () => {
        this.setPendingNavigation(undefined);
    };

    // In een SPA blijft de pagina staan na een klik op een link. Het dashboard onthoudt de klik, zodat de focus naar de h1
    // van de nieuwe vl-dashboard-header gaat zodra die zich meldt. Op mobiel sluit de navigatie, zodat de nieuwe inhoud
    // zichtbaar wordt. Enkel een link telt (een <a href> of een vl-nav-link met href): een knop, een link-action of een
    // disabled link navigeert niet. Een link die in een ander venster opent, verandert de pagina niet; een link naar de
    // huidige pagina rendert geen nieuwe header.
    private readonly onNavigationClick = (e: MouseEvent) => {
        this.setPendingNavigation(undefined);
        const path = e.composedPath();
        const isSkipped = path.some(
            (target) =>
                target instanceof Element && (target.slot === 'link-action' || target.matches('vl-nav-link[disabled]')),
        );
        if (isSkipped) return;
        // een klik naast de interne link van een vl-nav-link met href navigeert ook (zie vl-nav-link)
        const link = path.find(
            (target): target is HTMLElement =>
                (target instanceof HTMLAnchorElement ||
                    (target instanceof Element && target.localName === 'vl-nav-link')) &&
                target.hasAttribute('href'),
        );
        if (!link) return;
        const opensElsewhere =
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey ||
            e.altKey ||
            e.button !== 0 ||
            path.some(
                (target) => target instanceof Element && target.matches('vl-nav-link[external], a[target="_blank"]'),
            );
        if (opensElsewhere) return;
        const isCurrentPage = path.some(
            (target) => target instanceof Element && target.matches('vl-nav-link[active], a[aria-current="page"]'),
        );
        if (isCurrentPage) {
            if (this.mobileNavigationOpen) {
                void this.moveFocusToMain();
            }
            return;
        }
        const navigation: PendingNavigation = { link };
        this.setPendingNavigation(navigation);
        if (this.mobileNavigationOpen) {
            void this.moveFocusToMain(navigation);
        }
    };

    private renderMobileCloseButton(): TemplateResult {
        return html`
            <div class="vl-dashboard__navigation-close-mobile">
                <vl-button
                    id="close-mobile-navigation-button"
                    icon="close"
                    ghost
                    label="Navigatie sluiten"
                    @vl-click=${this.onCloseMobileNavigation}
                ></vl-button>
            </div>
        `;
    }

    private renderUserBadge(): TemplateResult {
        // vl-badge geeft user-img voorrang op user-icon; de afbeelding is decoratief, de naam staat ernaast
        return html`
            <vl-badge
                class="vl-dashboard__user-badge"
                background="default"
                img=${ifDefined(this.userImg)}
                icon=${ifDefined(this.userIcon)}
                alt=""
            ></vl-badge>
        `;
    }

    private renderNavigationHeader(): TemplateResult {
        return html`
            <div class="vl-dashboard__navigation-header">
                <div class="vl-dashboard__navigation-header-user">
                    ${when(this.userImg || this.userIcon, () => this.renderUserBadge())}
                    ${when(this.userName, () => html`<span class="vl-dashboard__user-name">${this.userName}</span>`)}
                </div>
                ${this.renderMobileCloseButton()}
            </div>
        `;
    }

    protected render(): TemplateResult {
        const navigationClasses = {
            'vl-dashboard__navigation': true,
            'vl-dashboard__navigation--collapsed': this.collapsed,
            'vl-dashboard__navigation--mobile': this.mobileNavigationOpen,
        };
        return html`
            <div class="vl-dashboard">
                <slot name="header"></slot>
                <aside
                    class=${classMap(navigationClasses)}
                    id="navigation"
                    aria-label="Zijpaneel met navigatie"
                    @keydown=${this.onNavigationKeydown}
                >
                    <a href=${`#${DASHBOARD_PAGE_TITLE_ID}`} class="vl-skip-link" @click=${this.onSkipToContentClick}
                        >Ga meteen naar de inhoud</a
                    >
                    ${when(
                        this.userName || this.userIcon || this.userImg,
                        () => this.renderNavigationHeader(),
                        () => this.renderMobileCloseButton(),
                    )}
                    <nav
                        class="vl-dashboard__navigation-main"
                        aria-label="Hoofdnavigatie"
                        tabindex="0"
                        @click=${this.onNavigationClick}
                    >
                        <div role="list">
                            <slot name="nav-main"></slot>
                        </div>
                    </nav>
                    <nav
                        ?hidden=${!this.hasNavUtils}
                        class="vl-dashboard__navigation-utils"
                        aria-label="Hulpnavigatie"
                        tabindex="-1"
                        @click=${this.onNavigationClick}
                    >
                        <div role="list">
                            <slot name="nav-utils" @slotchange=${this.onNavUtilsSlotChange}></slot>
                        </div>
                    </nav>
                    ${when(
                        !this.notCollapsible,
                        () => html`
                            <div class="vl-dashboard__navigation-footer">
                                <vl-button
                                    id="toggle-navigation-button"
                                    icon="nav-left-double"
                                    ghost
                                    aria-expanded=${this.collapsed ? 'false' : 'true'}
                                    label=${this.collapsed ? 'Paneel uitklappen' : 'Paneel inklappen'}
                                    @vl-click=${this.onToggleNavigation}
                                ></vl-button>
                            </div>
                        `,
                    )}
                </aside>
                <main class="vl-dashboard__content" tabindex="-1" id="main-content">
                    <div class="vl-dashboard__mobile-bar">
                        <div class="vl-dashboard__navigation-open-mobile">
                            <vl-button
                                id="open-mobile-navigation-button"
                                icon="drawer"
                                tertiary
                                label=${this.navHasBadge ? 'Navigatie openen, er zijn meldingen' : 'Navigatie openen'}
                                @vl-click=${this.onOpenMobileNavigation}
                            ></vl-button>
                            ${when(
                                this.navHasBadge,
                                () => html`<span class="vl-dashboard__mobile-nav-badge" aria-hidden="true"></span>`,
                            )}
                        </div>
                    </div>
                    <div
                        class="vl-dashboard__content-area"
                        tabindex="0"
                        id="page-content"
                        role="region"
                        aria-label="Pagina inhoud"
                    >
                        <slot name="content"></slot>
                    </div>
                </main>
                <slot name="footer"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-dashboard': VlDashboard;
    }
}
