import { createSkipToContentLink, registerWebComponents } from '@domg-wc/common';
import { VlLinkComponent } from '@domg-wc/components/atom';
import { VlTableComponent } from '@domg-wc/components/block';
import { html, nothing, render } from 'lit';
import { VlDashboardHeader } from './vl-dashboard-header.component';
import { VlDashboard } from './vl-dashboard.component';
import { VlNavLink } from './vl-nav-link.component';
import { VlNavSub } from './vl-nav-sub.component';

registerWebComponents([VlDashboard, VlDashboardHeader, VlNavLink, VlNavSub, VlTableComponent, VlLinkComponent]);

// een app shell die vl-dashboard in zijn shadow root rendert, zoals een Lit applicatie
class DashboardShell extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
        render(
            html`
                <vl-dashboard>
                    <vl-nav-link slot="nav-main" href="#overzicht" icon="places-home" data-cy="shell-link"
                        >Overzicht</vl-nav-link
                    >
                    <div slot="content">
                        <vl-dashboard-header page-title="Overzicht"></vl-dashboard-header>
                        content
                    </div>
                </vl-dashboard>
            `,
            shadowRoot,
        );
    }
}
if (!customElements.get('dashboard-shell')) {
    customElements.define('dashboard-shell', DashboardShell);
}

// een route-component die zijn vl-dashboard-header in zijn eigen shadow root rendert
class DashboardRoute extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
        render(
            html`<vl-dashboard-header page-title="Route"></vl-dashboard-header>
                <p>inhoud van de route</p>`,
            shadowRoot,
        );
    }
}
if (!customElements.get('dashboard-route')) {
    customElements.define('dashboard-route', DashboardRoute);
}

const COLLAPSED_STORAGE_KEY = 'vl-dashboard-navigation-collapsed';

type MountOptions = {
    userName?: string;
    userImg?: string;
    userIcon?: string;
    // de titel van de vl-dashboard-header in de inhoud; null geeft geen header
    pageTitle?: string | null;
    navUtils?: boolean;
    badge?: boolean;
    notCollapsible?: boolean;
    collapsed?: boolean;
    style?: string;
    customCSS?: string;
};

const userImg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>';

const mountDashboard = ({
    userName,
    userImg,
    userIcon,
    pageTitle = 'Overzicht',
    navUtils = true,
    badge = false,
    notCollapsible = false,
    collapsed = false,
    style,
    customCSS,
}: MountOptions = {}) => {
    cy.mount(html`
        <vl-dashboard
            ?not-collapsible=${notCollapsible}
            ?collapsed=${collapsed}
            user-name=${userName ?? nothing}
            user-img=${userImg ?? nothing}
            user-icon=${userIcon ?? nothing}
            style=${style ?? nothing}
            custom-css=${customCSS ?? nothing}
        >
            <div slot="header" data-cy="header">header</div>
            <vl-nav-link slot="nav-main" href="#overzicht" icon="places-home" active data-cy="nav-link-overzicht"
                >Overzicht</vl-nav-link
            >
            <vl-nav-link slot="nav-main" href="#items" icon="list">
                Items
                <vl-button
                    slot="link-action"
                    icon="plus-circle-filled"
                    label="Item toevoegen"
                    ghost
                    data-cy="link-action"
                ></vl-button>
            </vl-nav-link>
            <vl-nav-link slot="nav-main" href="#notificaties" icon="bell" data-cy="nav-link-notificaties">
                Notificaties ${badge ? html`<span slot="link-badge">1</span>` : nothing}
            </vl-nav-link>
            <vl-nav-sub slot="nav-main" label="Sub navigatie" icon="paperplane" data-cy="nav-sub">
                <vl-nav-link href="#item-1" icon="file">Item 1</vl-nav-link>
            </vl-nav-sub>
            ${navUtils
                ? html`<vl-nav-link slot="nav-utils" href="#help" icon="question-mark-filled" data-cy="nav-link-help"
                      >Help</vl-nav-link
                  >`
                : nothing}
            <div slot="content" data-cy="content">
                ${pageTitle !== null
                    ? html`<vl-dashboard-header page-title=${pageTitle} data-cy="dashboard-header">
                          <vl-button slot="header-actions" icon="add" secondary>Nieuw</vl-button>
                      </vl-dashboard-header>`
                    : nothing}
                content
            </div>
            <div slot="footer" data-cy="footer">footer</div>
        </vl-dashboard>
    `);
    getDashboard().find('main.vl-dashboard__content');
};

const getDashboard = () => cy.get('vl-dashboard').shadow();
const getNavigation = () => getDashboard().find('aside#navigation');
const getToggleButton = () => getDashboard().find('#toggle-navigation-button');
const getOpenMobileButton = () => getDashboard().find('#open-mobile-navigation-button');
const getCloseMobileButton = () => getDashboard().find('#close-mobile-navigation-button');
const getUserBadge = () => getDashboard().find('.vl-dashboard__navigation-header vl-badge');

const shadowActiveElement = () =>
    cy.get('vl-dashboard').then(([dashboard]) => Cypress.$((dashboard as VlDashboard).shadowRoot?.activeElement ?? []));

// de interne <a> van een vl-nav-link
const getInnerLink = (dataCy: string) => cy.get(`[data-cy="${dataCy}"]`).shadow().find('vl-button').shadow().find('a');

// het element dat echt focus heeft, door alle shadow roots heen
const deepActiveElement = () =>
    cy.document().then((document) => {
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return Cypress.$(active ?? []);
    });

// de focus staat op de h1 in de shadow root van vl-title, niet op de host met het id
const isPageTitleHeading = (element: Element | null | undefined) =>
    element?.localName === 'h1' && (element.getRootNode() as ShadowRoot).host?.id === 'vl-dashboard-page-title';

// wacht tot de focus op de h1 van de paginatitel staat, eventueel met deze titel
const expectFocusOnPageTitle = (title?: string) =>
    cy.document().should((document) => {
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        expect(isPageTitleHeading(active), 'focus op de h1 van de paginatitel').to.equal(true);
        if (title) {
            // de tekst staat in de slot van de h1, dus in de host
            expect((active?.getRootNode() as ShadowRoot).host?.textContent?.trim()).to.equal(title);
        }
    });

// cy.press kent geen Shift; een keydown met shiftKey volstaat voor de trap, die de focus zelf verplaatst
const pressShiftTab = () =>
    deepActiveElement().then(([active]) => {
        active?.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'Tab',
                shiftKey: true,
                bubbles: true,
                composed: true,
                cancelable: true,
            }),
        );
    });

const shadowActiveElementId = () =>
    cy.get('vl-dashboard').then(([dashboard]) => (dashboard as VlDashboard).shadowRoot?.activeElement?.id);

const innerActiveElementTag = () =>
    cy
        .get('vl-dashboard')
        .then(([dashboard]) =>
            (dashboard as VlDashboard).shadowRoot?.activeElement?.shadowRoot?.activeElement?.tagName.toLowerCase(),
        );

// De Cypress mount-harness zet [data-cy-root] zelf in een <main> (support/component-index.html), waardoor
// het <main> van vl-dashboard altijd genest en dubbel is. Dat is een artefact van de harness, niet van vl-dashboard.
// axe zoekt het doel van een skip link enkel in het document en niet in de shadow DOM; de skip link wordt apart getest.
const a11yOptions = {
    rules: {
        'landmark-main-is-top-level': { enabled: false },
        'landmark-no-duplicate-main': { enabled: false },
        'skip-link': { enabled: false },
    },
};

describe('cypress-component - structures - vl-dashboard', () => {
    beforeEach(() => {
        cy.viewport(1280, 800);
        cy.window().then((window) => window.localStorage.removeItem(COLLAPSED_STORAGE_KEY));
    });

    it('should mount', () => {
        mountDashboard();
    });

    it('should be accessible', () => {
        mountDashboard({ userName: 'Bedrijfsnaam', userIcon: 'building-big' });

        cy.injectAxe();
        cy.checkA11y('vl-dashboard', a11yOptions);
    });

    it('should be accessible when the navigation is collapsed', () => {
        mountDashboard({ userName: 'Bedrijfsnaam', userIcon: 'building-big' });
        getToggleButton().click();
        getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');

        cy.injectAxe();
        cy.checkA11y('vl-dashboard', a11yOptions);
    });

    it('should be accessible on a mobile viewport with the navigation opened', () => {
        cy.viewport(375, 812);
        mountDashboard({ userName: 'Bedrijfsnaam', userIcon: 'building-big' });
        getOpenMobileButton().click();
        getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');

        cy.injectAxe();
        cy.checkA11y('vl-dashboard', a11yOptions);
    });

    it('should be accessible without slotted content', () => {
        cy.mount(html`<vl-dashboard></vl-dashboard>`);
        getDashboard().find('main.vl-dashboard__content');

        cy.injectAxe();
        cy.checkA11y('vl-dashboard', a11yOptions);
    });

    describe('slots', () => {
        it('should render the header, navigation, content and footer slots in their landmarks', () => {
            mountDashboard();

            getDashboard().find('.vl-dashboard > slot[name="header"]');
            getNavigation().find('nav.vl-dashboard__navigation-main slot[name="nav-main"]');
            getNavigation().find('nav.vl-dashboard__navigation-utils slot[name="nav-utils"]');
            getDashboard().find('slot[name="header-actions"]').should('not.exist');
            getDashboard().find('main .vl-dashboard__content-area > slot[name="content"]');
            getDashboard().find('.vl-dashboard > slot[name="footer"]');
            cy.get('[data-cy="header"]').should('contain.text', 'header');
            cy.get('[data-cy="content"]').should('be.visible').and('contain.text', 'content');
            cy.get('[data-cy="footer"]').should('contain.text', 'footer');
        });

        it('should hide the utility navigation when the nav-utils slot is empty', () => {
            mountDashboard({ navUtils: false });

            getDashboard().find('nav.vl-dashboard__navigation-utils').should('have.attr', 'hidden');
            getDashboard().find('nav.vl-dashboard__navigation-utils').should('not.be.visible');
        });

        it('should show the utility navigation when the nav-utils slot gets content', () => {
            mountDashboard({ navUtils: false });
            getDashboard().find('nav.vl-dashboard__navigation-utils').should('have.attr', 'hidden');

            cy.get('vl-dashboard').then(([dashboard]) => {
                dashboard.insertAdjacentHTML(
                    'beforeend',
                    '<vl-nav-link slot="nav-utils" href="#help" icon="question-mark-filled">Help</vl-nav-link>',
                );
            });

            getDashboard().find('nav.vl-dashboard__navigation-utils').should('not.have.attr', 'hidden');
            getDashboard().find('nav.vl-dashboard__navigation-utils').should('be.visible');
        });

        it('should not render a content header of its own', () => {
            mountDashboard({ pageTitle: null });

            getDashboard().find('.vl-dashboard__content-header').should('not.exist');
            getDashboard().find('vl-title').should('not.exist');
        });

        it('should not render a right panel', () => {
            mountDashboard();

            getDashboard().find('#right-panel').should('not.exist');
            getDashboard().find('slot[name="right-panel"]').should('not.exist');
        });
    });

    describe('navigation header', () => {
        it('should not render the navigation header when no user-name, user-img or user-icon is set', () => {
            mountDashboard();

            getDashboard().find('.vl-dashboard__navigation-header').should('not.exist');
        });

        it('should render the user name', () => {
            mountDashboard({ userName: 'Bedrijfsnaam' });

            getDashboard()
                .find('.vl-dashboard__navigation-header span.vl-dashboard__user-name')
                .should('have.text', 'Bedrijfsnaam');
            getDashboard().find('user-name').should('not.exist');
            getUserBadge().should('not.exist');
        });

        it('should render the user badge as a vl-badge with the default background', () => {
            mountDashboard({ userName: 'Bedrijfsnaam', userIcon: 'building-big' });

            getUserBadge()
                .should('have.attr', 'background', 'default')
                .and('have.css', 'background-color', 'rgb(255, 255, 255)')
                .and('have.css', 'width', '45px');
        });

        it('should render the user image with an empty alt text because the user name is next to it', () => {
            mountDashboard({ userName: 'Bedrijfsnaam', userImg });

            getUserBadge().should('have.attr', 'alt', '');
            getUserBadge().shadow().find('img').should('have.attr', 'src', userImg).and('have.attr', 'alt', '');
        });

        it('should render the user image without a user name', () => {
            mountDashboard({ userImg });

            getUserBadge().shadow().find('img').should('have.attr', 'src', userImg).and('have.attr', 'alt', '');
        });

        it('should render the user icon when no user image is set', () => {
            mountDashboard({ userName: 'Bedrijfsnaam', userIcon: 'building-big' });

            getUserBadge().shadow().find('.vl-icon.vl-icon--building-big').should('be.visible');
            getUserBadge().shadow().find('img').should('not.exist');
            // decoratief: de naam staat ernaast
            getUserBadge().should(([badge]) => {
                expect(badge.hasAttribute('role'), 'role').to.equal(false);
                expect(badge.hasAttribute('aria-label'), 'aria-label').to.equal(false);
            });
        });

        it('should render the user image when both user-img and user-icon are set', () => {
            mountDashboard({ userName: 'Bedrijfsnaam', userImg, userIcon: 'building-big' });

            getUserBadge().shadow().find('img').should('have.attr', 'src', userImg);
            getUserBadge().shadow().find('.vl-icon').should('not.exist');
        });

        it('should shrink the user badge when the navigation is collapsed', () => {
            mountDashboard({ userName: 'Bedrijfsnaam', userIcon: 'building-big' });

            getToggleButton().click();

            getUserBadge().should('have.css', 'width', '24px').and('have.css', 'height', '24px');
        });
    });

    describe('width and padding recipe for the content', () => {
        // de CSS van het recept "Breedte en padding van de inhoud" in de documentatie
        const recipeStyles = html`
            <style>
                .dashboard-content {
                    box-sizing: border-box;
                    max-width: 128rem;
                    padding-block: var(--vl-spacing--medium);
                    padding-inline: var(--vl-dashboard-content-inline-padding);
                }

                .dashboard-content--full-width {
                    max-width: none;
                }

                .wide-table :is(th, td) {
                    white-space: nowrap;
                }
            </style>
        `;

        const mountPage = (content: unknown) =>
            cy.mount(html`
                ${recipeStyles}
                <vl-dashboard>
                    <div slot="content">
                        <vl-dashboard-header
                            page-title="Pagina"
                            page-icon="places-home"
                            data-cy="dashboard-header"
                        ></vl-dashboard-header>
                        ${content}
                    </div>
                </vl-dashboard>
            `);

        const wideTable = html`
            <vl-table class="wide-table" data-cy="table">
                <table>
                    <caption>
                        Brede tabel
                    </caption>
                    <thead>
                        <tr>
                            ${Array.from(
                                { length: 14 },
                                (_, index) => html`<th scope="col">Kolom met lange naam ${index}</th>`,
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${Array.from({ length: 14 }, (_, index) => html`<td>Waarde ${index}</td>`)}
                        </tr>
                    </tbody>
                </table>
            </vl-table>
        `;

        it('should keep text at most 1280px wide including padding and align it with the header', () => {
            cy.viewport(1600, 900);
            mountPage(html`
                <div class="dashboard-content vl-stacked vl-stacked-small" data-cy="text">
                    <h2>Veelgestelde vragen</h2>
                    <p>Antwoorden op de vragen die gebruikers het vaakst stellen.</p>
                </div>
            `);

            cy.get('[data-cy="text"]').should(([text]) => {
                expect(text.getBoundingClientRect().width).to.equal(1280);
            });
            cy.get('[data-cy="dashboard-header"]')
                .shadow()
                .find('vl-icon')
                .then(([icon]) => {
                    cy.get('[data-cy="text"] h2').should(([heading]) => {
                        expect(heading.getBoundingClientRect().left).to.be.closeTo(
                            icon.getBoundingClientRect().left,
                            1,
                        );
                    });
                });
        });

        it('should let a table use the full width of the content area', () => {
            cy.viewport(1600, 900);
            mountPage(html`
                <div
                    class="dashboard-content dashboard-content--full-width vl-stacked vl-stacked-small"
                    data-cy="full-width"
                >
                    ${wideTable}
                </div>
            `);

            getDashboard()
                .find('.vl-dashboard__content-area')
                .then(([contentArea]) => {
                    cy.get('[data-cy="full-width"]').should(([fullWidth]) => {
                        const width = fullWidth.getBoundingClientRect().width;
                        expect(width).to.be.greaterThan(1280);
                        expect(width).to.equal(contentArea.clientWidth);
                    });
                });
        });

        it('should scroll a wide table in its own wrapper and not the page on a small viewport', () => {
            cy.viewport(375, 812);
            mountPage(html`
                <div
                    class="dashboard-content dashboard-content--full-width vl-stacked vl-stacked-small"
                    data-cy="full-width"
                >
                    ${wideTable}
                </div>
            `);

            cy.get('[data-cy="table"]').should(([table]) => {
                expect(table.scrollWidth).to.be.greaterThan(table.clientWidth);
            });
            cy.document().should((document) => {
                expect(document.documentElement.scrollWidth).to.be.at.most(document.documentElement.clientWidth);
            });
        });
    });

    describe('vl-dashboard-header in the content', () => {
        [
            [375, 812],
            [1280, 800],
        ].forEach(([width, height]) => {
            it(`should align the header with content that uses --vl-dashboard-content-inline-padding at ${width}px`, () => {
                cy.viewport(width, height);
                cy.mount(html`
                    <vl-dashboard>
                        <div slot="content">
                            <vl-dashboard-header
                                page-title="Overzicht"
                                page-icon="places-home"
                                data-cy="dashboard-header"
                            ></vl-dashboard-header>
                            <div
                                style="padding: var(--vl-spacing--medium) var(--vl-dashboard-content-inline-padding)"
                                data-cy="page-content"
                            >
                                <h2>Recente items</h2>
                            </div>
                        </div>
                    </vl-dashboard>
                `);

                cy.get('[data-cy="dashboard-header"]')
                    .shadow()
                    .find('vl-icon')
                    .then(([icon]) => {
                        cy.get('[data-cy="page-content"] h2').should(([heading]) => {
                            expect(heading.getBoundingClientRect().left).to.be.closeTo(
                                icon.getBoundingClientRect().left,
                                1,
                            );
                        });
                    });
                if (width < 1024) {
                    getOpenMobileButton().then(([button]) => {
                        cy.get('[data-cy="page-content"] h2').should(([heading]) => {
                            expect(heading.getBoundingClientRect().left).to.be.closeTo(
                                button.getBoundingClientRect().left,
                                1,
                            );
                        });
                    });
                }
            });
        });

        it('should pass --vl-dashboard-title-min-width from the dashboard to the header', () => {
            mountDashboard({ style: '--vl-dashboard-title-min-width: 20rem' });

            cy.get('[data-cy="dashboard-header"]')
                .shadow()
                .find('.vl-dashboard-header__title')
                .should('have.css', 'flex-basis', '200px');
        });

        it('should keep the header in place when the content scrolls', () => {
            cy.mount(html`
                <vl-dashboard>
                    <div slot="content">
                        <vl-dashboard-header page-title="Overzicht" data-cy="dashboard-header"></vl-dashboard-header>
                        <div style="height: 3000px" data-cy="long-content">lange inhoud</div>
                    </div>
                </vl-dashboard>
            `);
            getDashboard().find('.vl-dashboard__content-area').as('contentArea');
            cy.get('[data-cy="dashboard-header"]').then(([header]) => {
                const topBefore = header.getBoundingClientRect().top;

                cy.get('@contentArea').scrollTo(0, 1000);

                cy.get('@contentArea').its('0.scrollTop').should('equal', 1000);
                cy.get('[data-cy="dashboard-header"]').should(([scrolledHeader]) => {
                    expect(scrolledHeader.getBoundingClientRect().top).to.equal(topBefore);
                });
                cy.get('[data-cy="long-content"]').should(([content]) => {
                    expect(content.getBoundingClientRect().top).to.be.lessThan(topBefore);
                });
            });
        });

        it('should keep the header below the mobile bar when the page scrolls on a small viewport', () => {
            cy.viewport(375, 812);
            cy.mount(html`
                <vl-dashboard style="--vl-dashboard-header-height: 0px">
                    <div slot="content">
                        <vl-dashboard-header page-title="Overzicht" data-cy="dashboard-header"></vl-dashboard-header>
                        <div style="height: 3000px">lange inhoud</div>
                    </div>
                </vl-dashboard>
            `);
            getDashboard().find('.vl-dashboard__mobile-bar').as('mobileBar');

            cy.window().scrollTo(0, 1000);

            cy.get('@mobileBar').then(([bar]) => {
                const barRect = bar.getBoundingClientRect();
                expect(barRect.top).to.equal(0);
                cy.get('[data-cy="dashboard-header"]').should(([header]) => {
                    expect(header.getBoundingClientRect().top).to.be.closeTo(barRect.bottom, 1);
                });
            });
        });
    });

    describe('content area', () => {
        it('should not add padding or a max width to the content area', () => {
            cy.mount(html`
                <vl-dashboard content-padding="10px" content-max-width="100px">
                    <div slot="content" data-cy="content">content</div>
                </vl-dashboard>
            `);

            getDashboard().find('.vl-dashboard__content-area').should('have.css', 'padding', '0px');
            getDashboard().find('.vl-dashboard__content-area-max-width').should('not.exist');
            cy.get('[data-cy="content"]').then(([content]) => {
                expect(content.getBoundingClientRect().width).to.be.greaterThan(100);
            });
        });
    });

    describe('collapse', () => {
        it('should collapse the navigation when the toggle button is clicked', () => {
            mountDashboard();
            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');

            getToggleButton().click();

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            getNavigation().then(([navigation]) => {
                expect(navigation.getBoundingClientRect().width).to.be.lessThan(50);
            });
        });

        it('should set aria-expanded to false and update the toggle label when collapsed', () => {
            mountDashboard();
            getToggleButton()
                .shadow()
                .find('button')
                .should('have.attr', 'aria-expanded', 'true')
                .and('have.attr', 'aria-label', 'Paneel inklappen');

            getToggleButton().click();

            getToggleButton()
                .shadow()
                .find('button')
                .should('have.attr', 'aria-expanded', 'false')
                .and('have.attr', 'aria-label', 'Paneel uitklappen');
        });

        it('should dispatch vl-toggle-navigation with detail collapsed true and false', () => {
            mountDashboard();
            cy.get('vl-dashboard').then(([dashboard]) => {
                dashboard.addEventListener('vl-toggle-navigation', cy.stub().as('toggleNavigation'));
            });

            getToggleButton().click();
            cy.get('@toggleNavigation').should('have.been.calledOnce');
            cy.get('@toggleNavigation')
                .its('firstCall.args.0')
                .should('include', { bubbles: true, composed: true })
                .its('detail')
                .should('deep.equal', { collapsed: true });

            getToggleButton().click();
            cy.get('@toggleNavigation').should('have.been.calledTwice');
            cy.get('@toggleNavigation').its('secondCall.args.0.detail').should('deep.equal', { collapsed: false });
        });

        it('should expand the navigation when the toggle button is clicked again', () => {
            mountDashboard();

            getToggleButton().click();
            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            getToggleButton().click();

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            getToggleButton().shadow().find('button').should('have.attr', 'aria-expanded', 'true');
        });

        it('should store the collapsed state in localStorage', () => {
            mountDashboard();

            getToggleButton().click();
            cy.window().then((window) => expect(window.localStorage.getItem(COLLAPSED_STORAGE_KEY)).to.equal('true'));
            getToggleButton().click();
            cy.window().then((window) => expect(window.localStorage.getItem(COLLAPSED_STORAGE_KEY)).to.equal('false'));
        });

        it('should restore the collapsed state from localStorage on mount', () => {
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'true'));
            cy.document().then((document) => {
                document.addEventListener('vl-toggle-navigation', cy.stub().as('toggleNavigation'), { once: true });
            });

            mountDashboard();

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            getToggleButton().shadow().find('button').should('have.attr', 'aria-expanded', 'false');
            cy.get('@toggleNavigation').its('firstCall.args.0.detail').should('deep.equal', { collapsed: true });
        });

        it('should work when localStorage is not available', () => {
            cy.window().then((window) => {
                cy.stub(window.Storage.prototype, 'getItem').throws(new Error('SecurityError'));
                cy.stub(window.Storage.prototype, 'setItem').throws(new Error('SecurityError'));
            });

            mountDashboard();
            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            getToggleButton().click();

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
        });
    });

    describe('mobile', () => {
        beforeEach(() => {
            cy.viewport(375, 812);
        });

        it('should hide the navigation and show the menu button on a small viewport', () => {
            mountDashboard();

            getNavigation().should('not.be.visible');
            getOpenMobileButton().should('be.visible');
            getOpenMobileButton().shadow().find('button').should('have.attr', 'aria-label', 'Navigatie openen');
        });

        it('should show the menu button in a mobile bar above the content', () => {
            mountDashboard();

            getDashboard()
                .find('main > .vl-dashboard__mobile-bar')
                .should('be.visible')
                .and('have.css', 'position', 'sticky')
                .find('#open-mobile-navigation-button');
            getDashboard()
                .find('.vl-dashboard__mobile-bar')
                .then(([bar]) => {
                    cy.get('[data-cy="dashboard-header"]').should(([header]) => {
                        // de header staat onder de balk, op een halve pixel afronding na
                        expect(header.getBoundingClientRect().top).to.be.closeTo(bar.getBoundingClientRect().bottom, 1);
                    });
                });
        });

        it('should hide the mobile bar on a wide viewport', () => {
            cy.viewport(1280, 800);
            mountDashboard();

            getDashboard().find('.vl-dashboard__mobile-bar').should('not.be.visible');
            getOpenMobileButton().should('not.be.visible');
        });

        it('should open the mobile navigation and focus the close button', () => {
            mountDashboard();

            getOpenMobileButton().click();

            getNavigation().should('be.visible').and('have.class', 'vl-dashboard__navigation--mobile');
            getDashboard().find('main.vl-dashboard__content').should('not.be.visible');
            getCloseMobileButton().should('be.visible');
            shadowActiveElementId().should('equal', 'close-mobile-navigation-button');
            innerActiveElementTag().should('equal', 'button');
        });

        it('should close the mobile navigation and return focus to the menu button', () => {
            mountDashboard();
            getOpenMobileButton().click();
            getNavigation().should('be.visible');

            getCloseMobileButton().click();

            getNavigation().should('not.be.visible');
            shadowActiveElementId().should('equal', 'open-mobile-navigation-button');
            innerActiveElementTag().should('equal', 'button');
        });

        it('should show the menu button as a tertiary button', () => {
            mountDashboard();

            getOpenMobileButton().should('have.attr', 'tertiary');
            getOpenMobileButton().should('not.have.attr', 'ghost');
            getOpenMobileButton().should('have.attr', 'icon', 'drawer');
        });

        it('should close the mobile navigation and focus the main landmark when a nav link is clicked', () => {
            mountDashboard();
            getOpenMobileButton().click();
            getNavigation().should('be.visible');

            cy.get('[data-cy="nav-link-overzicht"]').click();

            getNavigation().should('not.be.visible');
            getDashboard().find('main.vl-dashboard__content').should('be.visible');
            shadowActiveElementId().should('equal', 'main-content');
        });

        it('should focus the main landmark when a nav link is clicked without vl-dashboard-header', () => {
            mountDashboard({ pageTitle: null });
            getOpenMobileButton().click();

            cy.get('[data-cy="nav-link-overzicht"]').click();

            getNavigation().should('not.be.visible');
            shadowActiveElementId().should('equal', 'main-content');
        });

        it('should close the mobile navigation when a link in the utility navigation is clicked', () => {
            mountDashboard();
            getOpenMobileButton().click();

            cy.get('[data-cy="nav-link-help"]').click();

            getNavigation().should('not.be.visible');
        });

        it('should close the mobile navigation when a slotted anchor is clicked', () => {
            mountDashboard({ navUtils: false });
            cy.get('vl-dashboard').then(([dashboard]) => {
                dashboard.insertAdjacentHTML(
                    'beforeend',
                    '<a slot="nav-utils" href="#contact" data-cy="anchor">Contact</a>',
                );
            });
            getOpenMobileButton().click();

            cy.get('[data-cy="anchor"]').click();

            getNavigation().should('not.be.visible');
        });

        it('should keep the mobile navigation open when a link-action is clicked', () => {
            mountDashboard();
            getOpenMobileButton().click();

            cy.get('[data-cy="link-action"]').click();

            getNavigation().should('be.visible');
        });

        it('should keep the mobile navigation open when the label of a nav sub is clicked', () => {
            mountDashboard();
            getOpenMobileButton().click();

            cy.get('[data-cy="nav-sub"]').shadow().find('#label').click();

            getNavigation().should('be.visible');
        });

        it('should keep the mobile navigation in the flow with the height of the viewport below the header', () => {
            mountDashboard({ style: '--vl-dashboard-header-height: 50px' });

            getOpenMobileButton().click();

            getNavigation().should('have.css', 'position', 'static');
            getNavigation().should('have.css', 'min-height', `${812 - 50}px`);
        });

        it('should not let the focus leave the open mobile navigation for content after the dashboard', () => {
            cy.mount(html`
                <div style="height: 43px">header</div>
                <vl-dashboard>
                    <vl-nav-link slot="nav-main" href="#overzicht" icon="places-home" data-cy="only-link"
                        >Overzicht</vl-nav-link
                    >
                    <div slot="content">
                        <vl-dashboard-header page-title="Overzicht"></vl-dashboard-header>
                        content
                    </div>
                </vl-dashboard>
                <footer><a href="#footer" data-cy="footer-link" style="display: inline-block">Footer link</a></footer>
            `);
            getOpenMobileButton().click();
            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');
            getInnerLink('only-link').focus();

            cy.press(Cypress.Keyboard.Keys.TAB);

            cy.focused().should('not.have.attr', 'data-cy', 'footer-link');
            shadowActiveElement().should('match', 'a.vl-skip-link');
            // het paneel blijft in de flow: komt de focus toch buiten de navigatie, dan is ze niet bedekt
            cy.get('[data-cy="footer-link"]').then(([link]) => {
                const rect = link.getBoundingClientRect();
                const hit = link.ownerDocument.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
                expect(hit === null || hit === link).to.equal(true);
            });
        });

        it('should move the focus from the last link to the first focusable element in the panel with Tab', () => {
            mountDashboard();
            getOpenMobileButton().click();
            getInnerLink('nav-link-help').focus();

            cy.press(Cypress.Keyboard.Keys.TAB);

            shadowActiveElement().should('match', 'a.vl-skip-link');
            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');
        });

        it('should move the focus from the first focusable element to the last link with Shift+Tab', () => {
            mountDashboard();
            getOpenMobileButton().click();
            getDashboard().find('a.vl-skip-link').focus();

            pressShiftTab();

            getInnerLink('nav-link-help').then(([link]) => {
                deepActiveElement().should(([active]) => expect(active).to.equal(link));
            });
        });

        it('should let Tab move normally between the links in the panel', () => {
            mountDashboard();
            getOpenMobileButton().click();
            getInnerLink('nav-link-overzicht').focus();

            cy.press(Cypress.Keyboard.Keys.TAB);

            getInnerLink('nav-link-overzicht').then(([link]) => {
                deepActiveElement().should(([active]) => expect(active).not.to.equal(link));
            });
            shadowActiveElement().should(($active) => expect($active.is('a.vl-skip-link')).to.equal(false));
        });

        it('should not trap the focus in the navigation on a wide viewport', () => {
            cy.viewport(1280, 800);
            mountDashboard();
            getInnerLink('nav-link-help').focus();

            cy.press(Cypress.Keyboard.Keys.TAB);

            shadowActiveElementId().should('equal', 'toggle-navigation-button');
        });

        it('should keep the mobile navigation open when a nav button without href is clicked', () => {
            mountDashboard();
            cy.get('vl-dashboard').then(([dashboard]) => {
                dashboard.insertAdjacentHTML(
                    'beforeend',
                    '<vl-nav-link slot="nav-utils" icon="mail" data-cy="nav-button">Contact</vl-nav-link>',
                );
            });
            getOpenMobileButton().click();

            cy.get('[data-cy="nav-button"]').click();

            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');
        });

        it('should keep the mobile navigation open when a disabled nav link is clicked', () => {
            mountDashboard();
            cy.get('vl-dashboard').then(([dashboard]) => {
                dashboard.insertAdjacentHTML(
                    'beforeend',
                    '<vl-nav-link slot="nav-utils" href="#contact" icon="mail" disabled data-cy="nav-disabled">Contact</vl-nav-link>',
                );
            });
            getOpenMobileButton().click();

            // Cypress klikt niet op een disabled element zonder force
            cy.get('[data-cy="nav-disabled"]').click({ force: true });

            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');
        });

        it('should not move focus to the content when a nav button moves focus elsewhere', () => {
            cy.mount(html`
                <vl-dashboard>
                    <vl-nav-link slot="nav-utils" icon="question-mark-filled" data-cy="help">Help</vl-nav-link>
                    <div slot="content">
                        <vl-dashboard-header page-title="Overzicht"></vl-dashboard-header>
                        content
                    </div>
                </vl-dashboard>
                <button data-cy="dialog-button">In dialoog</button>
            `);
            cy.get('[data-cy="help"]').then(([help]) => {
                help.addEventListener('vl-click', () => {
                    (help.ownerDocument.querySelector('[data-cy="dialog-button"]') as HTMLElement).focus();
                });
            });
            getOpenMobileButton().click();

            cy.get('[data-cy="help"]').shadow().find('vl-button').shadow().find('button').click();

            cy.focused().should('have.attr', 'data-cy', 'dialog-button');
        });

        it('should close the mobile navigation with Escape and return focus to the menu button', () => {
            mountDashboard();
            getOpenMobileButton().click();
            shadowActiveElementId().should('equal', 'close-mobile-navigation-button');

            cy.press(Cypress.Keyboard.Keys.ESC);

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--mobile');
            shadowActiveElementId().should('equal', 'open-mobile-navigation-button');
        });

        it('should reset the mobile navigation when the viewport becomes wider than the medium breakpoint', () => {
            mountDashboard();
            getOpenMobileButton().click();
            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');

            cy.viewport(1280, 800);

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--mobile');
            getDashboard().find('main.vl-dashboard__content').should('be.visible');
        });

        it('should show the notification dot and label when a nav link has a badge', () => {
            mountDashboard({ badge: true });

            getDashboard()
                .find('.vl-dashboard__mobile-nav-badge')
                .should('have.css', 'display', 'block')
                .and('have.css', 'background-color', 'rgb(210, 55, 60)');
            getOpenMobileButton()
                .shadow()
                .find('button')
                .should('have.attr', 'aria-label', 'Navigatie openen, er zijn meldingen');
        });

        it('should update the notification dot when a badge is added or removed dynamically', () => {
            mountDashboard();
            getDashboard().find('.vl-dashboard__mobile-nav-badge').should('not.exist');

            cy.get('[data-cy="nav-link-notificaties"]').then(([link]) => {
                link.insertAdjacentHTML('beforeend', '<span slot="link-badge" data-cy="badge">1</span>');
            });
            getDashboard().find('.vl-dashboard__mobile-nav-badge').should('exist');
            getOpenMobileButton()
                .shadow()
                .find('button')
                .should('have.attr', 'aria-label', 'Navigatie openen, er zijn meldingen');

            cy.get('[data-cy="badge"]').then(([badge]) => badge.remove());
            getDashboard().find('.vl-dashboard__mobile-nav-badge').should('not.exist');
            getOpenMobileButton().shadow().find('button').should('have.attr', 'aria-label', 'Navigatie openen');
        });
    });

    describe('breakpoint', () => {
        it('should not apply the collapsed styles to the mobile navigation at the medium breakpoint', () => {
            cy.viewport(1023, 800);
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'true'));
            mountDashboard({ userName: 'Bedrijfsnaam' });
            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');

            getOpenMobileButton().click();

            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile').and('have.css', 'display', 'flex');
            getDashboard().find('.vl-dashboard__navigation-header .vl-dashboard__user-name').should('be.visible');
        });

        it('should show the collapsed navigation just above the medium breakpoint', () => {
            cy.viewport(1024, 800);
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'true'));
            mountDashboard({ userName: 'Bedrijfsnaam' });

            getNavigation().should('be.visible').and('have.class', 'vl-dashboard__navigation--collapsed');
            getOpenMobileButton().should('not.be.visible');
            getDashboard().find('.vl-dashboard__navigation-header .vl-dashboard__user-name').should('not.be.visible');
        });
    });

    describe('collapsed property', () => {
        const getDashboardElement = () => cy.get('vl-dashboard').its('0') as unknown as Cypress.Chainable<VlDashboard>;
        const listenToToggleNavigation = () =>
            cy.document().then((document) => {
                document.addEventListener('vl-toggle-navigation', cy.stub().as('toggleNavigation'));
            });

        it('should reflect the collapsed state to the attribute when the user toggles', () => {
            mountDashboard();
            cy.get('vl-dashboard').should('not.have.attr', 'collapsed');

            getToggleButton().click();

            cy.get('vl-dashboard').should('have.attr', 'collapsed');
            getDashboardElement().its('collapsed').should('equal', true);

            getToggleButton().click();

            cy.get('vl-dashboard').should('not.have.attr', 'collapsed');
            getDashboardElement().its('collapsed').should('equal', false);
        });

        it('should collapse and expand the navigation when the property is set, without event', () => {
            mountDashboard();
            listenToToggleNavigation();

            getDashboardElement().then((dashboard) => {
                dashboard.collapsed = true;
            });

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('vl-dashboard').should('have.attr', 'collapsed');
            getToggleButton().shadow().find('button').should('have.attr', 'aria-expanded', 'false');

            getDashboardElement().then((dashboard) => {
                dashboard.collapsed = false;
            });

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('@toggleNavigation').should('not.have.been.called');
        });

        it('should collapse the navigation when the attribute is set', () => {
            mountDashboard();

            cy.get('vl-dashboard').invoke('attr', 'collapsed', '');

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            getDashboardElement().its('collapsed').should('equal', true);
        });

        it('should not store a programmatic change in localStorage', () => {
            mountDashboard();

            getDashboardElement().then((dashboard) => {
                dashboard.collapsed = true;
            });
            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            cy.window().then((window) => expect(window.localStorage.getItem(COLLAPSED_STORAGE_KEY)).to.equal(null));
        });

        it('should keep the choice of the user in localStorage when collapsed changes programmatically', () => {
            mountDashboard();

            getToggleButton().click();
            cy.window().then((window) => expect(window.localStorage.getItem(COLLAPSED_STORAGE_KEY)).to.equal('true'));

            getDashboardElement().then((dashboard) => {
                dashboard.collapsed = false;
            });
            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            cy.window().then((window) => expect(window.localStorage.getItem(COLLAPSED_STORAGE_KEY)).to.equal('true'));
        });

        it('should start collapsed with the collapsed attribute, also when localStorage says expanded', () => {
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'false'));
            listenToToggleNavigation();

            mountDashboard({ collapsed: true });

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            getDashboardElement().its('collapsed').should('equal', true);
            cy.get('@toggleNavigation').should('not.have.been.called');
        });

        it('should start expanded without the collapsed attribute when localStorage says expanded', () => {
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'false'));

            mountDashboard();

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('vl-dashboard').should('not.have.attr', 'collapsed');
        });

        it('should start collapsed from localStorage without the collapsed attribute and reflect it', () => {
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'true'));

            mountDashboard();

            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('vl-dashboard').should('have.attr', 'collapsed');
        });

        it('should never be collapsed with not-collapsible, also with the collapsed attribute', () => {
            mountDashboard({ collapsed: true, notCollapsible: true });

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('vl-dashboard').should('not.have.attr', 'collapsed');
            getDashboardElement().its('collapsed').should('equal', false);
        });

        it('should ignore setting collapsed with not-collapsible and keep localStorage', () => {
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'true'));
            mountDashboard({ notCollapsible: true });

            getDashboardElement().then((dashboard) => {
                dashboard.collapsed = true;
            });

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            getDashboardElement().its('collapsed').should('equal', false);
            cy.window().then((window) => expect(window.localStorage.getItem(COLLAPSED_STORAGE_KEY)).to.equal('true'));
        });
    });

    describe('not-collapsible', () => {
        it('should not render the toggle button', () => {
            mountDashboard({ notCollapsible: true });

            cy.get('vl-dashboard').should('have.attr', 'not-collapsible');
            getToggleButton().should('not.exist');
            getDashboard().find('.vl-dashboard__navigation-footer').should('not.exist');
        });

        it('should ignore the collapsed state from localStorage', () => {
            cy.window().then((window) => window.localStorage.setItem(COLLAPSED_STORAGE_KEY, 'true'));
            cy.document().then((document) => {
                document.addEventListener('vl-toggle-navigation', cy.stub().as('toggleNavigation'), { once: true });
            });

            mountDashboard({ notCollapsible: true });

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('@toggleNavigation').should('not.have.been.called');
        });

        it('should expand a collapsed navigation when not-collapsible is set', () => {
            mountDashboard();
            getToggleButton().click();
            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
            cy.get('vl-dashboard').then(([dashboard]) => {
                dashboard.addEventListener('vl-toggle-navigation', cy.stub().as('toggleNavigation'));
            });

            cy.get('vl-dashboard').invoke('attr', 'not-collapsible', '');

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--collapsed');
            getToggleButton().should('not.exist');
            cy.get('@toggleNavigation').its('firstCall.args.0.detail').should('deep.equal', { collapsed: false });
        });
    });

    describe('focus after activating a navigation link', () => {
        const headerTemplate = (title: string) =>
            html`<vl-dashboard-header page-title=${title} data-cy="router-header"></vl-dashboard-header>`;

        // een eenvoudige router: een klik op een nav-link rendert de header van de nieuwe pagina in de outlet,
        // meteen of na een vertraging (een lazy route)
        const addRouter = (dashboard: Element, outlet: HTMLElement, delay = 0) => {
            dashboard.addEventListener('click', (event) => {
                const link = event.composedPath().find((target): target is VlNavLink => target instanceof VlNavLink);
                if (!link) return;
                event.preventDefault();
                const show = () => render(headerTemplate(link.textContent!.trim()), outlet);
                if (delay) {
                    setTimeout(show, delay);
                } else {
                    show();
                }
            });
        };

        const mountWithRouter = (delay = 0) => {
            cy.mount(html`
                <vl-dashboard>
                    <vl-nav-link slot="nav-main" href="#een" icon="places-home" active data-cy="link-een"
                        >Een</vl-nav-link
                    >
                    <vl-nav-link slot="nav-main" href="#twee" icon="list" data-cy="link-twee">Twee</vl-nav-link>
                    <vl-nav-sub slot="nav-main" label="Drie" href="#drie" icon="file">
                        <vl-nav-link href="#vier" icon="hourglass">Vier</vl-nav-link>
                    </vl-nav-sub>
                    <vl-nav-link
                        slot="nav-utils"
                        href="https://www.vlaanderen.be"
                        icon="external"
                        external
                        data-cy="link-extern"
                        >Extern</vl-nav-link
                    >
                    <div slot="content" data-cy="outlet"></div>
                    <p slot="content" data-cy="content-text">Tekst in de inhoud</p>
                </vl-dashboard>
                <button data-cy="elsewhere">Elders</button>
            `);
            cy.get('vl-dashboard').then(([dashboard]) => {
                const outlet = dashboard.querySelector<HTMLElement>('[data-cy="outlet"]')!;
                render(headerTemplate('Een'), outlet);
                addRouter(dashboard, outlet, delay);
            });
            cy.get('[data-cy="router-header"]').shadow().find('vl-title');
        };

        // Een focuswissel die níet mag gebeuren, kan je niet afwachten met een retrying assertion: die slaagt meteen.
        // Wacht daarom kort, ruim langer dan de header-melding plus updateComplete, en kijk dan pas waar de focus staat.
        const waitForFocusToSettle = () => cy.wait(100);

        const expectFocusNotOnPageTitle = () => {
            waitForFocusToSettle();
            deepActiveElement().should(([active]) => expect(isPageTitleHeading(active)).to.be.false);
        };

        it('should focus the h1 of the new vl-dashboard-header after a click on a nav link', () => {
            mountWithRouter();

            cy.get('[data-cy="link-twee"]').click();

            expectFocusOnPageTitle('Twee');
        });

        it('should focus the h1 of the new vl-dashboard-header after activating a nav link with Enter', () => {
            mountWithRouter();
            getInnerLink('link-twee').focus();

            cy.press(Cypress.Keyboard.Keys.ENTER);

            expectFocusOnPageTitle('Twee');
        });

        it('should show the Flux focus outline on the h1 after activating a nav link with the keyboard', () => {
            const outline = (element: Element) => {
                const style = getComputedStyle(element);
                return { style: style.outlineStyle, width: style.outlineWidth, color: style.outlineColor };
            };
            mountWithRouter();
            // een vl-link heeft de outline van vlFocusOutlineMixin
            cy.get('vl-dashboard').then(([dashboard]) => {
                const link = dashboard.ownerDocument.createElement('vl-link');
                link.setAttribute('href', '#referentie');
                link.textContent = 'Referentie';
                dashboard.after(link);
            });
            cy.get('vl-link')
                .shadow()
                .find('a')
                .focus()
                .then(([referenceLink]) => {
                    const expected = outline(referenceLink);
                    expect(expected.style).to.equal('solid');
                    getInnerLink('link-twee').focus();

                    cy.press(Cypress.Keyboard.Keys.ENTER);

                    expectFocusOnPageTitle('Twee');
                    deepActiveElement().should(([title]) => expect(outline(title)).to.deep.equal(expected));
                });
        });

        it('should close the mobile navigation and focus the h1 of the new vl-dashboard-header', () => {
            cy.viewport(375, 812);
            mountWithRouter();
            getOpenMobileButton().click();
            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');

            cy.get('[data-cy="link-twee"]').click();

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--mobile');
            expectFocusOnPageTitle('Twee');
        });

        it('should close the mobile navigation and focus the h1 of the new vl-dashboard-header after a click on the link of a nav sub', () => {
            cy.viewport(375, 812);
            mountWithRouter();
            getOpenMobileButton().click();
            getNavigation().should('have.class', 'vl-dashboard__navigation--mobile');

            cy.get('vl-nav-sub').shadow().find('vl-nav-link').click();

            getNavigation().should('not.have.class', 'vl-dashboard__navigation--mobile');
            expectFocusOnPageTitle('Drie');
        });

        it('should focus the h1 of a vl-dashboard-header that renders 500ms after the click', () => {
            mountWithRouter(500);

            cy.get('[data-cy="link-twee"]').click();

            expectFocusOnPageTitle('Twee');
        });

        it('should focus the h1 of a late vl-dashboard-header on mobile after focusing main first', () => {
            cy.viewport(375, 812);
            mountWithRouter(500);
            getOpenMobileButton().click();

            cy.get('[data-cy="link-twee"]').click();

            shadowActiveElementId().should('equal', 'main-content');
            expectFocusOnPageTitle('Twee');
        });

        it('should not move the focus when the user moved it elsewhere before the new header renders', () => {
            mountWithRouter(500);

            cy.get('[data-cy="link-twee"]').click();
            cy.get('[data-cy="elsewhere"]').focus();
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Twee');
            waitForFocusToSettle();

            cy.focused().should('have.attr', 'data-cy', 'elsewhere');
        });

        it('should not move the focus when the page title changes without a click on a nav link', () => {
            mountWithRouter();
            cy.get('[data-cy="elsewhere"]').focus();

            cy.get('[data-cy="router-header"]').invoke('attr', 'page-title', 'Nieuwe titel');
            cy.get('[data-cy="router-header"]').shadow().find('vl-title').should('have.text', 'Nieuwe titel');
            waitForFocusToSettle();

            cy.focused().should('have.attr', 'data-cy', 'elsewhere');
        });

        it('should not move the focus for a click on a nav link that does not render a new header', () => {
            cy.mount(html`
                <vl-dashboard>
                    <vl-nav-link slot="nav-main" href="#een" icon="places-home" active data-cy="link-een"
                        >Een</vl-nav-link
                    >
                    <div slot="content">${headerTemplate('Een')}</div>
                </vl-dashboard>
            `);
            cy.get('vl-dashboard').then(([dashboard]) =>
                dashboard.addEventListener('click', (event) => event.preventDefault()),
            );

            cy.get('[data-cy="link-een"]').click();
            waitForFocusToSettle();
            deepActiveElement().should(([active]) => expect(active?.localName).to.equal('a'));

            // later wijzigt de titel, bv. een teller na het laden van data: de focus blijft op de link
            cy.get('[data-cy="router-header"]').invoke('attr', 'page-title', 'Een (3)');
            cy.get('[data-cy="router-header"]').shadow().find('vl-title').should('have.text', 'Een (3)');
            waitForFocusToSettle();

            deepActiveElement().should(([active]) => expect(active?.localName).to.equal('a'));
        });

        it('should not move the focus on a later title change after a click on the active nav link', () => {
            mountWithRouter();

            // de router rendert dezelfde header met dezelfde titel: geen melding
            cy.get('[data-cy="link-een"]').click();
            cy.get('[data-cy="router-header"]').invoke('attr', 'page-title', 'Een (3)');
            cy.get('[data-cy="router-header"]').shadow().find('vl-title').should('have.text', 'Een (3)');

            expectFocusNotOnPageTitle();
        });

        it('should not move the focus on a later title change after the user clicked in the content', () => {
            mountWithRouter(500);

            cy.get('[data-cy="link-twee"]').click();
            cy.get('[data-cy="content-text"]').click();
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Twee');

            expectFocusNotOnPageTitle();
        });

        it('should not move the focus on a later title change after the user pressed a key', () => {
            mountWithRouter(500);

            cy.get('[data-cy="link-twee"]').click();
            // een toets die de focus niet verplaatst, bv. om te scrollen
            deepActiveElement().then(([active]) =>
                active?.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }),
                ),
            );
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Twee');

            expectFocusNotOnPageTitle();
        });

        it('should not set a pending navigation for a modifier click or an external link', () => {
            mountWithRouter();
            // een externe link opent geen nieuw venster in de test
            cy.window().then((window) => cy.stub(window, 'open'));

            // de router van de test rendert toch een nieuwe header: de focus mag er niet naartoe
            cy.get('[data-cy="link-twee"]').click({ ctrlKey: true });
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Twee');
            expectFocusNotOnPageTitle();

            cy.get('[data-cy="link-extern"]').click();
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Extern');
            expectFocusNotOnPageTitle();
        });

        it('should still focus the h1 of a vl-dashboard-header that renders 5 seconds after the click', () => {
            mountWithRouter(5000);
            cy.clock();

            cy.get('[data-cy="link-twee"]').click();
            cy.tick(5000);

            expectFocusOnPageTitle('Twee');
        });

        it('should not move the focus for a vl-dashboard-header that renders more than 10 seconds after the click', () => {
            mountWithRouter(15_000);
            cy.clock();

            cy.get('[data-cy="link-twee"]').click();
            cy.tick(15_000);
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Twee');

            expectFocusNotOnPageTitle();
        });

        it('should clear the timer of the pending navigation when the dashboard is disconnected', () => {
            // de router rendert pas na een minuut: de markering blijft staan tot de disconnect
            mountWithRouter(60_000);
            cy.clock();
            cy.window().then((window) => {
                cy.spy(window, 'setTimeout').as('setTimeout');
                cy.spy(window, 'clearTimeout').as('clearTimeout');
            });

            cy.get('[data-cy="link-twee"]').click();
            cy.get('vl-dashboard').then(([dashboard]) => dashboard.remove());

            cy.get('@setTimeout').then((setTimeoutSpy) => {
                const spy = setTimeoutSpy as unknown as sinon.SinonSpy;
                const timerCall = spy.getCalls().find((call) => call.args[1] === 10000);
                expect(timerCall, 'timer van de navigatiemarkering').to.exist;
                cy.get('@clearTimeout').should('have.been.calledWith', timerCall!.returnValue);
            });
        });

        it('should still focus the h1 after a click that follows an ignored modifier click', () => {
            mountWithRouter();

            cy.get('[data-cy="link-twee"]').click({ metaKey: true });
            cy.get('[data-cy="router-header"]').should('have.attr', 'page-title', 'Twee');
            cy.get('vl-nav-sub').shadow().find('vl-nav-link').click();

            expectFocusOnPageTitle('Drie');
        });

        it('should focus the h1 of the new vl-dashboard-header when the dashboard is inside a shadow root', () => {
            cy.mount(html`<dashboard-shell></dashboard-shell>`);
            cy.get('dashboard-shell')
                .shadow()
                .find('vl-dashboard')
                .then(([dashboard]) => {
                    const content = dashboard.querySelector<HTMLElement>('[slot="content"]')!;
                    content.querySelector('vl-dashboard-header')?.remove();
                    const outlet = document.createElement('div');
                    content.append(outlet);
                    render(headerTemplate('Start'), outlet);
                    addRouter(dashboard, outlet);
                });

            cy.get('dashboard-shell').shadow().find('[data-cy="shell-link"]').click();

            expectFocusOnPageTitle('Overzicht');
        });
    });

    describe('inside a shadow root', () => {
        const getShellDashboard = () => cy.get('dashboard-shell').shadow().find('vl-dashboard');
        const shellDashboardActiveElementId = () =>
            getShellDashboard().then(([dashboard]) => (dashboard as VlDashboard).shadowRoot?.activeElement?.id);

        beforeEach(() => {
            cy.mount(html`<dashboard-shell></dashboard-shell>`);
            getShellDashboard().shadow().find('main.vl-dashboard__content');
        });

        it('should move focus to the page title via the skip link when the dashboard is inside a shadow root', () => {
            getShellDashboard().shadow().find('a.vl-skip-link').focus().click();

            expectFocusOnPageTitle();
        });

        it('should focus the main landmark after a nav link click when the dashboard is inside a shadow root', () => {
            cy.viewport(375, 812);
            getShellDashboard().shadow().find('#open-mobile-navigation-button').click();
            getShellDashboard()
                .shadow()
                .find('aside#navigation')
                .should('have.class', 'vl-dashboard__navigation--mobile');

            cy.get('dashboard-shell').shadow().find('[data-cy="shell-link"]').click();

            getShellDashboard()
                .shadow()
                .find('aside#navigation')
                .should('not.have.class', 'vl-dashboard__navigation--mobile');
            shellDashboardActiveElementId().should('equal', 'main-content');
        });

        it('should keep the focus in the open mobile navigation when the dashboard is inside a shadow root', () => {
            cy.viewport(375, 812);
            getShellDashboard().shadow().find('#open-mobile-navigation-button').click();
            cy.get('dashboard-shell')
                .shadow()
                .find('[data-cy="shell-link"]')
                .shadow()
                .find('vl-button')
                .shadow()
                .find('a')
                .focus();

            cy.press(Cypress.Keyboard.Keys.TAB);

            getShellDashboard().then(([dashboard]) => {
                expect((dashboard as VlDashboard).shadowRoot?.activeElement?.matches('a.vl-skip-link')).to.equal(true);
            });
        });
    });

    describe('skip links', () => {
        afterEach(() => {
            cy.document().then((document) => document.querySelector('[data-cy="header-skip-link"]')?.remove());
        });

        it('should place the skip link at the start of the navigation', () => {
            mountDashboard();

            getNavigation().children().first().should('match', 'a.vl-skip-link');
        });

        it('should move focus to the h1 of the vl-dashboard-header in the content via the skip link', () => {
            mountDashboard();

            // de skip link wordt pas zichtbaar als hij focus heeft
            getDashboard().find('a.vl-skip-link').focus().should('be.visible').click();

            expectFocusOnPageTitle();
            deepActiveElement().should(([heading]) => {
                const title = (heading.getRootNode() as ShadowRoot).host;
                expect((title.getRootNode() as ShadowRoot).host).to.match('[data-cy="dashboard-header"]');
            });
        });

        it('should move focus to the h1 of a vl-dashboard-header in a nested shadow root via the skip link', () => {
            cy.mount(html`
                <vl-dashboard>
                    <div slot="content"><dashboard-route data-cy="route"></dashboard-route></div>
                </vl-dashboard>
            `);
            cy.get('[data-cy="route"]').shadow().find('vl-dashboard-header').shadow().find('vl-title');

            getDashboard().find('a.vl-skip-link').focus().click();

            expectFocusOnPageTitle();
            // de h1 zit in de header, en die in de shadow root van de route
            deepActiveElement().should(([heading]) => {
                const title = (heading.getRootNode() as ShadowRoot).host;
                const header = (title.getRootNode() as ShadowRoot).host;
                expect(header.localName).to.equal('vl-dashboard-header');
                expect((header.getRootNode() as ShadowRoot).host).to.match('[data-cy="route"]');
            });
        });

        it('should move focus to the main landmark via the skip link without vl-dashboard-header', () => {
            mountDashboard({ pageTitle: null });

            getDashboard().find('a.vl-skip-link').focus().click();

            shadowActiveElementId().should('equal', 'main-content');
        });

        // vl-header-next maakt zijn skip link met createSkipToContentLink uit @domg-wc/common
        it('should let the skip link of vl-header-next reach the page title with skip-to-content-id', () => {
            mountDashboard();
            cy.document().then((document) => {
                const skipLink = createSkipToContentLink('vl-dashboard-page-title');
                skipLink.dataset.cy = 'header-skip-link';
                document.body.prepend(skipLink);
            });

            cy.get('[data-cy="header-skip-link"]').focus().click();

            expectFocusOnPageTitle();
        });
    });

    describe('keyboard', () => {
        it('should reach and use the toggle button with the keyboard', () => {
            cy.mount(html`<vl-dashboard></vl-dashboard>`);
            getDashboard().find('main.vl-dashboard__content');

            // skip link, hoofdnavigatie, inklapknop
            cy.press(Cypress.Keyboard.Keys.TAB);
            shadowActiveElement().should('match', 'a.vl-skip-link');
            cy.press(Cypress.Keyboard.Keys.TAB);
            shadowActiveElement().should('match', 'nav.vl-dashboard__navigation-main');
            cy.press(Cypress.Keyboard.Keys.TAB);
            shadowActiveElementId().should('equal', 'toggle-navigation-button');

            cy.press(Cypress.Keyboard.Keys.SPACE);
            getNavigation().should('have.class', 'vl-dashboard__navigation--collapsed');
        });
    });

    it('should apply custom-css', () => {
        mountDashboard({ customCSS: '.vl-dashboard__content-area { padding-top: 10px; }' });

        getDashboard().find('.vl-dashboard__content-area').should('have.css', 'padding-top', '10px');
    });
});
