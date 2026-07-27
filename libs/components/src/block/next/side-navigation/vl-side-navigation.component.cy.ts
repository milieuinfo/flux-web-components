import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlButtonComponent } from '../../../atom/button';
import { VlIconComponent } from '../../../atom/icon';
import { VlLinkComponent } from '../../../atom/link';
import { VlTitleComponent } from '../../../atom/title';
import { VlSideNavigationComponent } from './vl-side-navigation.component';
import { VlSideNavigationSectionComponent } from './vl-side-navigation-section.component';

registerWebComponents([
    VlSideNavigationComponent,
    VlSideNavigationSectionComponent,
    VlTitleComponent,
    VlLinkComponent,
    VlButtonComponent,
    VlIconComponent,
]);

// Bij component-testen wordt de iframe waarin de component rendert één keer geladen per spec-bestand en daarna
// niet meer ververst: cy.mount() vervangt enkel de DOM erin. Daardoor blijven de scrollpositie en de location.hash
// van de vorige test staan.
// Dus een gelekte scroll laat een test starten in een andere state dan wanneer hij alleen draait. Elke test start
// daarom bovenaan de pagina, zonder location.hash uit een vorige test.
beforeEach(() => {
    cy.window().then((win) => {
        win.history.replaceState(null, '', win.location.pathname + win.location.search);
        win.scrollTo(0, 0);
    });
});

// Column class constants for grid layout
const NAVIGATION_COLUMN_CLASSES =
    'vl-column vl-column--3 vl-column--start-10 vl-column--m-4 vl-column--m-start-9 vl-column--s-12 vl-column--s-start-1 vl-side-navigation--order-1';
const CONTENT_COLUMN_CLASSES = 'vl-column vl-column--8 vl-column--m-7 vl-column--s-12 vl-column--s-start-1';

const sampleContent = html`
    <div id="story-content-container">
        <section style="min-height: 400px; margin-top: 100px;">
            <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </p>
        </section>
        <section style="min-height: 400px;">
            <vl-title type="h3" id="content-1-1-heading">Content 1 - 1</vl-title>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </p>
        </section>
        <section style="min-height: 400px;">
            <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </p>
        </section>
        <section style="min-height: 400px;">
            <vl-title type="h2" id="content-3-heading">Content 3</vl-title>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </p>
        </section>
    </div>
`;

const mountSideNavigation = (headingRootSelector = '#story-content-container') => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}" heading-root-selector=${headingRootSelector}>
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
        </div>
    `);
};

const mountSideNavigationMediumSpacing = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next
                class="${NAVIGATION_COLUMN_CLASSES}"
                heading-root-selector="#story-content-container"
                child-spacing="medium"
            >
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
        </div>
    `);
};

const mountSideNavigationWithCustomTocMediumSpacing = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}" child-spacing="medium">
                <ul>
                    <li>
                        <div class="nav-item-wrapper">
                            <vl-link href="#custom-section-1">Section 1</vl-link>
                        </div>
                        <ul>
                            <li>
                                <vl-link href="#custom-section-1-1">Section 1.1</vl-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">
                <section style="min-height: 400px; margin-top: 100px;">
                    <vl-title type="h2" id="custom-section-1">Section 1</vl-title>
                </section>
                <section style="min-height: 400px;">
                    <vl-title type="h3" id="custom-section-1-1">Section 1.1</vl-title>
                </section>
            </div>
        </div>
    `);
};

const mountSideNavigationWithCustomToc = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}">
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 8px;">
                        <vl-link href="#custom-intro">Inleiding</vl-link>
                        <ul style="list-style: none; padding-left: 24px; margin-top: 4px;">
                            <li style="margin-bottom: 4px;">
                                <vl-link href="#custom-vereisten">Vereisten</vl-link>
                            </li>
                        </ul>
                    </li>
                    <li style="margin-bottom: 8px;">
                        <vl-link href="#custom-aanvraag">Aanvraag indienen</vl-link>
                    </li>
                    <li style="margin-bottom: 8px;">
                        <vl-link href="#custom-termijnen">Termijnen</vl-link>
                    </li>
                </ul>
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">
                <div id="custom-toc-content">
                    <section style="min-height: 400px; margin-top: 100px;">
                        <vl-title type="h2" id="custom-intro">Inleiding</vl-title>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </p>
                    </section>
                    <section style="min-height: 400px;">
                        <vl-title type="h3" id="custom-vereisten">Vereisten</vl-title>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </p>
                    </section>
                    <section style="min-height: 400px;">
                        <vl-title type="h2" id="custom-aanvraag">Aanvraag indienen</vl-title>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </p>
                    </section>
                    <section style="min-height: 400px;">
                        <vl-title type="h2" id="custom-termijnen">Termijnen</vl-title>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </p>
                    </section>
                </div>
            </div>
        </div>
    `);
};

const SHADOW_CONTENT_TAG = 'shadow-toc-content';
if (!customElements.get(SHADOW_CONTENT_TAG)) {
    customElements.define(
        SHADOW_CONTENT_TAG,
        class extends HTMLElement {
            connectedCallback() {
                if (this.shadowRoot) return;
                const root = this.attachShadow({ mode: 'open' });
                root.innerHTML = `
                    <section style="min-height: 400px; margin-top: 100px;">
                        <h2 id="shadow-intro">Inleiding</h2>
                    </section>
                    <section style="min-height: 400px;">
                        <h2 id="shadow-aanvraag">Aanvraag indienen</h2>
                    </section>
                `;
            }
        }
    );
}

const mountSideNavigationWithCustomTocInShadowDom = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}">
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li><vl-link href="#shadow-intro">Inleiding</vl-link></li>
                    <li><vl-link href="#shadow-aanvraag">Aanvraag indienen</vl-link></li>
                </ul>
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">
                <shadow-toc-content></shadow-toc-content>
            </div>
        </div>
    `);
};

const mountSideNavigationWithCustomTocPlainAnchorInShadowDom = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}">
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li><a href="#shadow-intro">Inleiding</a></li>
                    <li><a href="#shadow-aanvraag">Aanvraag indienen</a></li>
                </ul>
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">
                <shadow-toc-content></shadow-toc-content>
            </div>
        </div>
    `);
};

const mountSideNavigationAutoTocInShadowDom = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next
                class="${NAVIGATION_COLUMN_CLASSES}"
                heading-root-selector="#shadow-auto-container"
            >
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">
                <div id="shadow-auto-container">
                    <shadow-toc-content></shadow-toc-content>
                </div>
            </div>
        </div>
    `);
};

const mountSideNavigationMultiActive = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next
                class="${NAVIGATION_COLUMN_CLASSES}"
                heading-root-selector="#story-content-container"
                multi-active
            >
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
        </div>
    `);
};

const mountSideNavigationWithCustomTocMultiActive = () => {
    return cy.mount(html`
        <div class="vl-grid">
            <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}" multi-active>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 8px;"><vl-link href="#custom-intro">Inleiding</vl-link></li>
                    <li style="margin-bottom: 8px;"><vl-link href="#custom-aanvraag">Aanvraag indienen</vl-link></li>
                    <li style="margin-bottom: 8px;"><vl-link href="#custom-termijnen">Termijnen</vl-link></li>
                </ul>
            </vl-side-navigation-next>
            <div class="${CONTENT_COLUMN_CLASSES}">
                <div id="custom-toc-content">
                    <section style="min-height: 400px; margin-top: 100px;">
                        <vl-title type="h2" id="custom-intro">Inleiding</vl-title>
                    </section>
                    <section style="min-height: 400px;">
                        <vl-title type="h2" id="custom-aanvraag">Aanvraag indienen</vl-title>
                    </section>
                    <section style="min-height: 400px;">
                        <vl-title type="h2" id="custom-termijnen">Termijnen</vl-title>
                    </section>
                </div>
            </div>
        </div>
    `);
};

describe('cypress-component - block components - vl-side-navigation-next', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should mount', () => {
        mountSideNavigation();
        cy.get('vl-side-navigation-next').should('exist');
    });

    it('should render table of contents', () => {
        mountSideNavigation();
        cy.get('vl-side-navigation-next').shadow().find('nav').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a').should('have.length.greaterThan', 0);
    });

    it('should show default table of contents title "Op deze pagina"', () => {
        mountSideNavigation();
        cy.get('vl-side-navigation-next').shadow().find('.navigation-title').should('contain', 'Op deze pagina');
    });

    it('should show custom table of contents title when navigation-title attribute is set', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#story-content-container"
                    navigation-title="Inhoud"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
            </div>
        `);
        cy.get('vl-side-navigation-next').shadow().find('.navigation-title').should('contain', 'Inhoud');
    });

    it('should automatically generate navigation from h2 and h3 headings', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow();
        cy.get('vl-side-navigation-next').shadow().find('nav ul > li').should('have.length', 4);

        cy.get('vl-side-navigation-next').shadow().find('nav a').contains('Content 1').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-2-heading"]').should('exist');
    });

    it('should be accessible', () => {
        mountSideNavigation();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should have proper ARIA labels on navigation elements', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('nav').should('have.attr', 'aria-label');
    });

    it('should have aria-controls on toggle buttons pointing to nested ul elements', () => {
        mountSideNavigation();

        // Get the first toggle button (Content 1 has children)
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav button.toggle-button')
            .first()
            .should('have.attr', 'aria-controls')
            .then((ariaControls) => {
                const controlledId = ariaControls;
                expect(controlledId).to.match(/^toc-section-/);

                // Verify the controlled ul element exists in the DOM (even when hidden)
                cy.get('vl-side-navigation-next').shadow().find(`nav ul#${controlledId}`).should('exist');
            });
    });

    it('should have role="dialog" and aria-modal when in overlay mode (compact)', () => {
        cy.viewport(375, 667);
        mountSideNavigation();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should have role="dialog" and aria-modal when compact attribute is set', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    compact
                    heading-root-selector="#story-content-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
            </div>
        `);

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true');
    });

    it('should have aria-labelledby on table-of-contents pointing to navigation title', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('#side-navigation-title')
            .should('exist')
            .should('contain', 'Op deze pagina');
    });

    it('should have role="region" and aria-labelledby when in sidebar mode (desktop)', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'region')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title')
            .should('not.have.attr', 'aria-modal');
    });

    it('should respect prefers-reduced-motion for scroll behavior', () => {
        mountSideNavigation();

        // Mock prefers-reduced-motion: reduce
        cy.window().then((win) => {
            const originalMatchMedia = win.matchMedia.bind(win);
            cy.stub(win, 'matchMedia').callsFake((query: string) => {
                if (query === '(prefers-reduced-motion: reduce)') {
                    return {
                        matches: true,
                        media: query,
                        onchange: null,
                        addListener: () => {},
                        removeListener: () => {},
                        addEventListener: () => {},
                        removeEventListener: () => {},
                        dispatchEvent: () => true,
                    } as MediaQueryList;
                }
                return originalMatchMedia(query);
            });
        });

        // Click a link and verify scroll behavior is 'auto' (not smooth)
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-3-heading"]').click();

        // Verify we scrolled to the heading (scroll happened, just without animation)
        cy.get('#content-3-heading').should(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should manually expand and collapse children when using toggle button via keyboard', () => {
        mountSideNavigation();

        // Focus context: click nav, then TAB to first link, TAB to toggle button
        cy.get('vl-side-navigation-next').shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a').first().should('have.focus');
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav button.toggle-button').first().should('have.focus');

        // Get controlled ul id for assertions
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav button.toggle-button')
            .first()
            .invoke('attr', 'aria-controls')
            .then((controlledId) => {
                cy.press(Cypress.Keyboard.Keys.SPACE);
                cy.get('vl-side-navigation-next')
                    .shadow()
                    .find('nav button.toggle-button')
                    .first()
                    .should('have.attr', 'aria-expanded', 'false');
                cy.get('vl-side-navigation-next').shadow().find(`nav ul#${controlledId}`).should('have.attr', 'hidden');

                cy.press(Cypress.Keyboard.Keys.SPACE);
                cy.get('vl-side-navigation-next')
                    .shadow()
                    .find('nav button.toggle-button')
                    .first()
                    .should('have.attr', 'aria-expanded', 'true');
                cy.get('vl-side-navigation-next')
                    .shadow()
                    .find(`nav ul#${controlledId}`)
                    .should('not.have.attr', 'hidden');
            });
    });

    it('should move focus to table-of-contents when opening overlay', () => {
        cy.viewport(375, 667);
        mountSideNavigation();

        // Establish focus context: click nav so first TAB lands on close button
        cy.get('vl-side-navigation-next').shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('#close-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('have.attr', 'hidden');

        // Open the overlay via keyboard (show-toc-button is next focusable)
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .shadow()
            .find('button')
            .should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);

        // Verify overlay is open and ARIA: visible, focusable, role dialog, aria-modal
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'tabindex', '-1')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should have accessible compact toggle buttons', () => {
        cy.viewport(375, 667);
        mountSideNavigation();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('#close-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label');

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label');
    });

    it('should update active link when scrolling', () => {
        mountSideNavigation();

        cy.get('#content-2-heading').scrollIntoView();

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-2-heading"].active').should('exist');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should navigate when clicking link', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-3-heading"]').click();

        cy.get('#content-3-heading').should(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should scan and scroll to auto-TOC headings rendered inside shadow DOM', () => {
        mountSideNavigationAutoTocInShadowDom();

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#shadow-aanvraag"]').should('exist');

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#shadow-aanvraag"]').click();

        cy.get('shadow-toc-content').then(($host) => {
            const heading = $host[0].shadowRoot?.getElementById('shadow-aanvraag');
            expect(heading, 'shadow heading should exist').to.exist;
            const rect = (heading as HTMLElement).getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should support keyboard navigation through TOC items', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('nav').click();

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav button.toggle-button').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-1-1-heading"]').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-2-heading"]').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-3-heading"]').should('have.focus');
    });

    it('should navigate to section when pressing Enter on focused link', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('nav').click();
        cy.press(Cypress.Keyboard.Keys.TAB); // First link
        cy.press(Cypress.Keyboard.Keys.TAB); // Toggle button
        cy.press(Cypress.Keyboard.Keys.TAB); // Child link
        cy.press(Cypress.Keyboard.Keys.TAB); // Second link
        cy.press(Cypress.Keyboard.Keys.TAB); // Third link
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-3-heading"]').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.ENTER);

        cy.get('#content-3-heading').should(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should force compact view when compact attribute is set', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    compact
                    heading-root-selector="#story-content-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
            </div>
        `);

        cy.get('vl-side-navigation-next').shadow().find('#show-toc-button').should('exist');

        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });
});

describe('cypress-component - block components - vl-side-navigation-next - with custom TOC', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should mount with custom TOC', () => {
        mountSideNavigationWithCustomToc();
        cy.get('vl-side-navigation-next').should('exist');
    });

    it('should render custom TOC with vl-link components', () => {
        mountSideNavigationWithCustomToc();
        cy.get('vl-side-navigation-next').find('vl-link').should('have.length.greaterThan', 0);
    });

    it('should render custom TOC with links', () => {
        mountSideNavigationWithCustomToc();
        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-intro"]').should('exist');
        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-aanvraag"]').should('exist');
        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-termijnen"]').should('exist');
    });

    it('should navigate when clicking custom TOC links', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-aanvraag"]').click();

        cy.get('#custom-aanvraag').should(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should update active state on custom TOC links when scrolling', () => {
        mountSideNavigationWithCustomToc();

        cy.get('#custom-aanvraag').scrollIntoView();

        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-aanvraag"].active').should('exist');
    });

    it('should keep active state on custom TOC link after clicking it', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .shadow()
            .find('a')
            .click({ force: true });

        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-aanvraag"].active').should('exist');
        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .should('have.attr', 'aria-current', 'location');
    });

    it('should be accessible with custom TOC', () => {
        mountSideNavigationWithCustomToc();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should have aria-labelledby on table-of-contents with custom TOC', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');

        cy.get('vl-side-navigation-next').shadow().find('#side-navigation-title').should('exist');
    });

    it('should have role="region" with custom TOC in sidebar mode', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'region')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title')
            .should('not.have.attr', 'aria-modal');
    });

    it('should support keyboard navigation through custom TOC items', () => {
        mountSideNavigationWithCustomToc();

        // Click on nav to establish focus context
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').click();

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').find('vl-link').first().shadow().find('a').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Next is the child link
        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-vereisten"]')
            .shadow()
            .find('a')
            .should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Now the second top-level link
        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .shadow()
            .find('a')
            .should('have.focus');
    });

    it('should navigate to section when pressing Enter on custom TOC link', () => {
        mountSideNavigationWithCustomToc();

        // Click on nav to establish focus context
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').click();
        cy.press(Cypress.Keyboard.Keys.TAB); // First link
        cy.press(Cypress.Keyboard.Keys.TAB); // Second link
        cy.press(Cypress.Keyboard.Keys.TAB); // Third link
        cy.press(Cypress.Keyboard.Keys.TAB); // Fourth link
        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-termijnen"]')
            .shadow()
            .find('a')
            .should('have.focus');
        cy.press(Cypress.Keyboard.Keys.ENTER);

        cy.location('hash').should('equal', '#custom-termijnen');
        cy.get('#custom-termijnen').should(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should not lose focus to body when pressing Enter on a custom TOC link', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').click();
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-vereisten"]').shadow().find('a').focus();
        cy.press(Cypress.Keyboard.Keys.ENTER);

        cy.document().then((doc) => {
            const active = doc.activeElement;
            expect(active, 'activeElement should exist').to.exist;
            // Regression: expand/collapse must not hide the section containing the focused link (so focus is not lost to body).
            if (active !== doc.body) {
                expect(active).not.to.equal(doc.body);
                return;
            }
            // In Cypress iframe, Enter can move focus to body after hash navigation. Ensure the TOC section
            // containing the link was not hidden (parent ul has no [hidden]) — that would have caused focus loss.
            const link = doc
                .querySelector('vl-side-navigation-next')
                ?.querySelector('vl-link[href="#custom-vereisten"]');
            const parentUl = link?.closest('ul');
            expect(parentUl).to.exist;
            expect(parentUl).not.to.have.attr('hidden');
            expect(doc.location?.hash).to.equal('#custom-vereisten');
        });
    });

    it('should not lose focus to body when pressing Space on a custom TOC link', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').click();
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-aanvraag"]').shadow().find('a').focus();
        cy.press(Cypress.Keyboard.Keys.SPACE);

        cy.document().then((doc) => {
            const active = doc.activeElement;
            expect(active, 'activeElement should exist').to.exist;
            expect(active).not.to.equal(doc.body);
        });
    });

    it('should scroll to headings rendered inside shadow DOM when clicking a custom TOC link', () => {
        mountSideNavigationWithCustomTocInShadowDom();

        cy.get('vl-side-navigation-next').find('vl-link[href="#shadow-aanvraag"]').click();

        cy.get('shadow-toc-content').then(($host) => {
            const heading = $host[0].shadowRoot?.getElementById('shadow-aanvraag');
            expect(heading, 'shadow heading should exist').to.exist;
            const rect = (heading as HTMLElement).getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should scroll to a shadow-DOM heading from a plain anchor in the custom TOC', () => {
        mountSideNavigationWithCustomTocPlainAnchorInShadowDom();

        cy.get('vl-side-navigation-next').find('a[href="#shadow-aanvraag"]').click();

        cy.get('shadow-toc-content').then(($host) => {
            const heading = $host[0].shadowRoot?.getElementById('shadow-aanvraag');
            expect(heading, 'shadow heading should exist').to.exist;
            const rect = (heading as HTMLElement).getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should scroll to a heading whose id starts with a digit (CSS-unsafe selector)', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}">
                    <ul>
                        <li><a href="#1-inleiding">Inleiding</a></li>
                    </ul>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">
                    <section style="min-height: 400px; margin-top: 100px;">
                        <h2 id="1-inleiding">Inleiding</h2>
                    </section>
                </div>
            </div>
        `);

        cy.get('vl-side-navigation-next').find('a[href="#1-inleiding"]').click();

        cy.get('#1-inleiding').should(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });
});

describe('cypress-component - block components - vl-side-navigation-next - compact', () => {
    beforeEach(() => {
        cy.viewport(375, 667);
    });

    it('should show compact toggle button', () => {
        mountSideNavigation();
        cy.get('vl-side-navigation-next').shadow().find('#close-button').should('be.visible');
    });

    it('should open navigation when clicking toggle button', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');

        cy.get('vl-side-navigation-next').shadow().find('#close-button').shadow().find('button').click();
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('have.attr', 'hidden');
        cy.get('vl-side-navigation-next').shadow().find('#show-toc-button').shadow().find('button').click();
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should be accessible in compact mode', () => {
        mountSideNavigation();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should be accessible in compact mode with custom TOC', () => {
        mountSideNavigationWithCustomToc();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should support keyboard navigation in compact mode with custom TOC', () => {
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('#close-button').shadow().find('button').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').find('vl-link').first().shadow().find('a').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-vereisten"]')
            .shadow()
            .find('a')
            .should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .shadow()
            .find('a')
            .should('have.focus');
    });

    it('should have role="dialog" and aria-modal with custom TOC in compact mode', () => {
        cy.viewport(375, 667);
        mountSideNavigationWithCustomToc();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should move focus to table-of-contents when opening overlay with custom TOC', () => {
        cy.viewport(375, 667);
        mountSideNavigationWithCustomToc();

        // Establish focus context, then close overlay via keyboard
        cy.get('vl-side-navigation-next').shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('#close-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('have.attr', 'hidden');

        // Open overlay via keyboard
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .shadow()
            .find('button')
            .should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);

        // Verify overlay open and ARIA
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'tabindex', '-1')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should support keyboard navigation in compact mode', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('nav').click();
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('#close-button').shadow().find('button').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('vl-side-navigation-next').shadow().find('nav button.toggle-button').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-1-1-heading"]').should('have.focus');
    });

    it('should toggle compact menu with Space key', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');

        // Establish focus context, then close overlay via keyboard
        cy.get('vl-side-navigation-next').shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB); // focus close button
        cy.get('vl-side-navigation-next').shadow().find('#close-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);
        // Close moves focus to show-toc-button (async)
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .shadow()
            .find('button')
            .should('have.focus');
        // TODO: onderstaande functionaliteit werkt ook met Enter (in de browser) maar niet binnen Cypress testen - te onderzoeken
        cy.press(Cypress.Keyboard.Keys.SPACE);
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('not.have.attr', 'hidden');
    });
});

describe('cypress-component - block components - vl-side-navigation-next - max-depth', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should work with max-depth attribute', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    max-depth="1"
                    heading-root-selector="#story-content-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
            </div>
        `);

        cy.get('vl-side-navigation-next').should('have.attr', 'max-depth', '1');
        cy.get('vl-side-navigation-next').shadow().find('nav a').should('have.length.greaterThan', 0);
    });

    it('should find headings with max-depth set to 0', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    max-depth="0"
                    heading-root-selector="#story-content-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
            </div>
        `);

        // Content 1 has a child, so it has a toggle button (but text is in the link)
        cy.get('vl-side-navigation-next').shadow().find('nav a').contains('Content 1').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav button.toggle-button').should('exist');
        // Content 2 has no children, so it's a link only
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-2-heading"]').should('exist');
    });

    it('should be accessible with max-depth', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    max-depth="2"
                    heading-root-selector="#story-content-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sampleContent}</div>
            </div>
        `);

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });
});

describe('cypress-component - block components - vl-side-navigation-next - exclude-selectors', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    const contentWithExcludableSection = html`
        <div id="exclude-test-content">
            <section style="min-height: 200px; margin-top: 100px;">
                <vl-title type="h2" id="visible-heading-1">Visible Heading 1</vl-title>
                <p>This heading should appear in the TOC.</p>
            </section>
            <section style="min-height: 200px;" class="skip-this-section">
                <vl-title type="h2" id="excluded-heading-1">Excluded Heading 1</vl-title>
                <p>This heading should NOT appear in the TOC because its parent has class "skip-this-section".</p>
            </section>
            <section style="min-height: 200px;">
                <vl-title type="h2" id="visible-heading-2">Visible Heading 2</vl-title>
                <p>This heading should appear in the TOC.</p>
            </section>
            <div class="excluded-container">
                <section style="min-height: 200px;">
                    <vl-title type="h2" id="excluded-heading-2">Excluded Heading 2</vl-title>
                    <p>This heading should NOT appear because it's inside .excluded-container.</p>
                </section>
            </div>
            <section style="min-height: 200px;">
                <vl-title type="h2" id="visible-heading-3">Visible Heading 3</vl-title>
                <p>This heading should appear in the TOC.</p>
            </section>
        </div>
    `;

    it('should exclude headings inside elements matching exclude-selectors', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#exclude-test-content"
                    exclude-selectors=".skip-this-section, .excluded-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithExcludableSection}</div>
            </div>
        `);

        // Should find visible headings
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-1"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-2"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-3"]').should('exist');

        // Should NOT find excluded headings
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-1"]').should('not.exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-2"]').should('not.exist');
    });

    it('should show all headings when exclude-selectors is not set', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#exclude-test-content"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithExcludableSection}</div>
            </div>
        `);

        // Should find ALL headings when no exclude-selectors is set
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-1"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-2"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-3"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-1"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-2"]').should('exist');
    });

    it('should exclude headings by tag name selector', () => {
        const contentWithIframe = html`
            <div id="iframe-test-content">
                <section style="min-height: 200px; margin-top: 100px;">
                    <vl-title type="h2" id="main-heading">Main Heading</vl-title>
                    <p>This heading should appear.</p>
                </section>
                <iframe id="test-iframe" style="display: none;">
                    <!-- iframe content would have headings that should be excluded -->
                </iframe>
                <section style="min-height: 200px;">
                    <vl-title type="h2" id="another-heading">Another Heading</vl-title>
                    <p>This heading should also appear.</p>
                </section>
            </div>
        `;

        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#iframe-test-content"
                    exclude-selectors="iframe"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithIframe}</div>
            </div>
        `);

        cy.get('vl-side-navigation-next').should('have.attr', 'exclude-selectors', 'iframe');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#main-heading"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#another-heading"]').should('exist');
    });

    it('should be accessible with exclude-selectors', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#exclude-test-content"
                    exclude-selectors=".skip-this-section, .excluded-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithExcludableSection}</div>
            </div>
        `);

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should support keyboard navigation with exclude-selectors', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#exclude-test-content"
                    exclude-selectors=".skip-this-section, .excluded-container"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithExcludableSection}</div>
            </div>
        `);

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-1"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-2"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-3"]').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-1"]').should('not.exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-2"]').should('not.exist');

        cy.get('vl-side-navigation-next').shadow().find('nav a').should('have.length', 3);

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-1"]').click();
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-1"]').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-2"]').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-3"]').should('have.focus');
    });

    it('should handle invalid selectors gracefully', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#exclude-test-content"
                    exclude-selectors="[invalid selector"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithExcludableSection}</div>
            </div>
        `);

        // Component should still work and show all headings when selector is invalid
        cy.get('vl-side-navigation-next').shadow().find('nav a').should('have.length.greaterThan', 0);
    });

    it('should update TOC when exclude-selectors changes dynamically', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    id="dynamic-exclude-nav"
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#exclude-test-content"
                >
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${contentWithExcludableSection}</div>
            </div>
        `);

        // Initially all headings should be visible
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-1"]').should('exist');

        // Set exclude-selectors dynamically
        cy.get('vl-side-navigation-next').then(($el) => {
            $el[0].setAttribute('exclude-selectors', '.skip-this-section');
        });

        // Now the excluded heading should not be visible
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#excluded-heading-1"]').should('not.exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#visible-heading-1"]').should('exist');
    });
});

describe('child-spacing attribuut', () => {
    it('child-links krijgen 1.3rem verticale marge wanneer child-spacing op medium staat', () => {
        mountSideNavigationMediumSpacing();

        // expand a parent by clicking the toggle button
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('button.toggle-button')
            .first()
            .click();

        // The .nav-item-wrapper gets the spacing (the a/button inside it is reset to margin: 0)
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav li ul li .nav-item-wrapper')
            .first()
            .should('have.css', 'margin-top', '13px'); // 1.3rem * 10px root font = 13px
    });

    it('child-links hebben geen extra marge wanneer child-spacing op small staat', () => {
        mountSideNavigation();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('button.toggle-button')
            .first()
            .click();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav li ul li .nav-item-wrapper')
            .first()
            .should('have.css', 'margin-top', '0px');
    });

    it('child-links in custom TOC krijgen verticale marge wanneer child-spacing op medium staat', () => {
        mountSideNavigationWithCustomTocMediumSpacing();

        // The nested li inside the custom TOC should have margin-top of 1.3rem (13px at 10px root font)
        cy.get('vl-side-navigation-next')
            .find('ul ul li') // light DOM — no .shadow() needed
            .first()
            .should('have.css', 'margin-top', '13px'); // 1.3rem * 10px root font = 13px
    });
});

describe('cypress-component - block components - vl-side-navigation-next - externe links in custom TOC', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should not intercept external links in custom TOC (design choice: only a[href^="#"] are handled)', () => {
        // setupCustomTocLinkHandlers selects only a[href^="#"] — external links pass through unmodified.
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next class="${NAVIGATION_COLUMN_CLASSES}">
                    <ul>
                        <li>
                            <a id="hash-link" href="#custom-section">Interne sectie</a>
                        </li>
                        <li>
                            <a id="external-link" href="https://www.vlaanderen.be">Externe link</a>
                        </li>
                    </ul>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">
                    <section style="min-height: 400px; margin-top: 100px;">
                        <h2 id="custom-section">Sectie</h2>
                    </section>
                </div>
            </div>
        `);

        // Capture defaultPrevented after any component handlers run (bubble phase)
        let defaultPrevented: boolean;
        cy.get('#external-link').then(($a) => {
            $a[0].addEventListener('click', (e) => {
                defaultPrevented = e.defaultPrevented;
                e.preventDefault(); // prevent actual navigation in test
            });
        });

        cy.get('#external-link').click();

        cy.then(() => {
            expect(defaultPrevented, 'vl-side-navigation-next must not prevent default for external links').to.be.false;
        });
    });
});

describe('cypress-component - block components - vl-side-navigation-next - multi-active', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should mark multiple items active when multiple sections are visible', () => {
        mountSideNavigationMultiActive();

        cy.get('#content-2-heading').scrollIntoView();

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-2-heading"].active').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-3-heading"].active').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a.active').should('have.length.greaterThan', 1);
    });

    it('should mark the bottom item active when scrolled to the end of the page', () => {
        mountSideNavigationMultiActive();

        cy.scrollTo('bottom');

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-3-heading"].active').should('exist');
    });

    it('should keep a single active item by default (no multi-active attribute)', () => {
        mountSideNavigation();

        cy.get('#content-2-heading').scrollIntoView();

        cy.get('vl-side-navigation-next').shadow().find('nav a[href="#content-2-heading"].active').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav a.active').should('have.length', 1);
    });

    it('should expose activeHeadingIds additively on the active-heading-changed event', () => {
        mountSideNavigationMultiActive();

        cy.get('vl-side-navigation-next').then(($el) => {
            const spy = cy.spy().as('activeChanged');
            $el[0].addEventListener('active-heading-changed', spy);
        });

        cy.get('#content-3-heading').scrollIntoView();

        cy.get('@activeChanged').should('have.been.called');
        cy.get('@activeChanged')
            .its('lastCall.args.0.detail')
            .should((detail) => {
                expect(detail.activeHeadingId, 'activeHeadingId stays a string for existing consumers').to.be.a(
                    'string'
                );
                expect(detail.activeHeadingIds, 'activeHeadingIds is added as an array').to.be.an('array');
                expect(detail.activeHeadingIds).to.include('content-3-heading');
            });
    });

    it('should be accessible with multiple active items', () => {
        mountSideNavigationMultiActive();

        cy.get('#content-2-heading').scrollIntoView();
        cy.get('vl-side-navigation-next').shadow().find('nav a.active').should('have.length.greaterThan', 1);

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });

    it('should mark multiple custom TOC links active when sections overlap', () => {
        mountSideNavigationWithCustomTocMultiActive();

        cy.get('#custom-aanvraag').scrollIntoView();

        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-aanvraag"].active').should('exist');
        cy.get('vl-side-navigation-next').find('vl-link[href="#custom-termijnen"].active').should('exist');
    });

    it('should draw one continuous far-left line spanning all active items', () => {
        mountSideNavigationMultiActive();

        cy.get('#content-2-heading').scrollIntoView();
        cy.get('vl-side-navigation-next').shadow().find('nav a.active').should('have.length.greaterThan', 1);

        // the single line is visible and tall enough to cover more than one item
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav .active-indicator-line')
            .should('be.visible')
            .then(($line) => {
                expect($line[0].getBoundingClientRect().height).to.be.greaterThan(0);
            });

        // the line sits at the far left, aligned regardless of nesting depth (no per-level indent)
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav')
            .then(($nav) => {
                const navRect = $nav[0].getBoundingClientRect();
                cy.get('vl-side-navigation-next')
                    .shadow()
                    .find('nav .active-indicator-line')
                    .then(($line) => {
                        const lineRect = $line[0].getBoundingClientRect();
                        // far left: within the nav's left padding, not stepped inward per level
                        expect(lineRect.left - navRect.left).to.be.lessThan(20);
                    });
            });
    });

    it('should suppress the per-item indicator bars in multi-active mode', () => {
        mountSideNavigationMultiActive();

        cy.get('#content-2-heading').scrollIntoView();
        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav a.active')
            .first()
            .then(($a) => {
                const before = window.getComputedStyle($a[0], '::before');
                expect(before.display).to.equal('none');
            });
    });

    it('should not draw the continuous line without the multi-active attribute', () => {
        mountSideNavigation();

        cy.get('#content-2-heading').scrollIntoView();
        cy.get('vl-side-navigation-next').shadow().find('nav a.active').should('exist');
        cy.get('vl-side-navigation-next').shadow().find('nav .active-indicator-line').should('not.be.visible');
    });
});

describe('cypress-component - block components - vl-side-navigation-next - sections-mode', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    const sectionsSampleContent = html`
        <div id="sections-content-container">
            <section style="min-height: 400px; margin-top: 100px;">
                <vl-title type="h2" id="sec-a">Sectie A</vl-title>
            </section>
            <section style="min-height: 400px;">
                <vl-title type="h2" id="sec-b">Sectie B</vl-title>
            </section>
            <section style="min-height: 400px;">
                <vl-title type="h2" id="sec-c">Sectie C</vl-title>
            </section>
        </div>
    `;

    const mountThreeSections = () =>
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#sections-content-container"
                >
                    <vl-side-navigation-section-next type="auto" section-title="Op deze pagina">
                    </vl-side-navigation-section-next>
                    <vl-side-navigation-section-next section-title="Acties">
                        <ul>
                            <li><a href="#sec-b">Naar sectie B</a></li>
                            <li><a href="https://www.vlaanderen.be">Externe link</a></li>
                        </ul>
                    </vl-side-navigation-section-next>
                    <vl-side-navigation-section-next section-title="Info">
                        <ul>
                            <li><a href="#sec-c">Naar sectie C</a></li>
                        </ul>
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sectionsSampleContent}</div>
            </div>
        `);

    it('rendert sections-mode in DOM-volgorde (1 auto + 2 custom)', () => {
        mountThreeSections();

        // Wacht eerst tot de gegenereerde auto-sectie lijst beschikbaar is (rAF-defer).
        cy.get('vl-side-navigation-section-next[type="auto"] .vl-side-navigation-section-next__list ul a[href="#sec-a"]')
            .should('exist');

        cy.get('vl-side-navigation-next > vl-side-navigation-section-next').then(($sections) => {
            expect($sections, 'verwacht 3 secties als directe children').to.have.length(3);
            // Lit reflect default-waarden niet naar attributen — check de property.
            expect(($sections[0] as VlSideNavigationSectionComponent).type).to.equal('auto');
            expect(($sections[1] as VlSideNavigationSectionComponent).type).to.equal('custom');
            expect(($sections[2] as VlSideNavigationSectionComponent).type).to.equal('custom');
        });

        // De custom-secties tonen hun door-de-auteur geleverde links.
        cy.get('vl-side-navigation-section-next:not([type="auto"]) ul a[href="#sec-b"]').should('exist');
        cy.get('vl-side-navigation-section-next:not([type="auto"]) ul a[href="#sec-c"]').should('exist');
    });

    it('wiret aria-labelledby per sectie naar het gegenereerde titel-label', () => {
        mountThreeSections();

        // Wacht tot de auto-sectie zijn gegenereerde ul heeft (rAF-defer).
        cy.get('vl-side-navigation-section-next[type="auto"] ul').should('exist');

        cy.get('vl-side-navigation-section-next').each(($section) => {
            const titleEl = $section[0].querySelector('.vl-side-navigation-section-next__title') as HTMLElement | null;
            const ul = $section[0].querySelector('ul');
            expect(titleEl, 'sectie heeft een titel-element').to.exist;
            expect(ul, 'sectie heeft een ul').to.exist;
            const titleId = titleEl!.getAttribute('id');
            expect(titleId, 'titel-element heeft een id (gegenereerd indien afwezig)').to.be.a('string').and.not.empty;
            expect(ul!.getAttribute('aria-labelledby')).to.equal(titleId);
        });
    });

    it('aria-labelledby idref bereikt de zichtbare titel-tekst', () => {
        mountThreeSections();
        cy.get('vl-side-navigation-section-next[type="auto"] ul').should('exist');

        const expectedTitles = ['Op deze pagina', 'Acties', 'Info'];

        cy.get('vl-side-navigation-section-next').each(($section, index) => {
            const ul = $section[0].querySelector('ul')!;
            const labelId = ul.getAttribute('aria-labelledby')!;
            const labelEl = $section[0].ownerDocument!.getElementById(labelId);
            expect(labelEl, `aria-labelledby="${labelId}" verwijst naar een bestaand element`).to.exist;
            expect(labelEl!.textContent?.trim()).to.equal(expectedTitles[index]);
        });
    });

    it('houdt één nav-landmark voor de hele side-navigation (geen extra landmarks per sectie)', () => {
        mountThreeSections();

        cy.get('vl-side-navigation-next').shadow().find('nav[aria-label]').should('have.length', 1);
        // sectie-elementen zelf bevatten GEEN extra <nav>
        cy.get('vl-side-navigation-section-next nav').should('not.exist');
    });

    it('past actieve link toe over secties heen (één aria-current per keer)', () => {
        mountThreeSections();

        // Scroll naar sectie B (in de custom-sectie "Acties" is er een link naar #sec-b)
        cy.get('#sec-b').scrollIntoView({ duration: 0 });

        // Wacht tot de IntersectionObserver geactiveerd is.
        cy.get('vl-side-navigation-section-next:not([type="auto"]) a[href="#sec-b"]')
            .should('have.attr', 'aria-current', 'location');

        // De auto-sectie's link naar #sec-b moet eveneens aria-current dragen (zelfde activeHeadingId).
        cy.get('vl-side-navigation-section-next[type="auto"] a[href="#sec-b"]')
            .should('have.attr', 'aria-current', 'location');

        // Hoogstens één link per "groep" mag actief zijn — controleer aantal aria-current binnen elke sectie-subtree.
        cy.document().then((doc) => {
            doc.querySelectorAll('vl-side-navigation-section-next').forEach((section) => {
                const active = section.querySelectorAll('a[aria-current="location"], vl-link[aria-current="location"]');
                expect(active.length, 'maximaal 1 aria-current per sectie').to.be.at.most(1);
            });
        });
    });

    it('staat mixen toe: losse <ul> tussen secties wordt impliciete titelloze sectie', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#sections-content-container"
                >
                    <vl-side-navigation-section-next section-title="Eerst">
                        <ul><li><a href="#sec-a">A</a></li></ul>
                    </vl-side-navigation-section-next>
                    <ul>
                        <li><a href="#sec-b">Losse link naar B</a></li>
                    </ul>
                    <vl-side-navigation-section-next section-title="Laatst">
                        <ul><li><a href="#sec-c">C</a></li></ul>
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sectionsSampleContent}</div>
            </div>
        `);

        // De losse <ul> blijft staan tussen de secties (DOM-volgorde behouden) en zijn link werkt.
        cy.get('vl-side-navigation-next > ul a[href="#sec-b"]').should('exist');
        cy.get('#sec-b').scrollIntoView({ duration: 0 });
        cy.get('vl-side-navigation-next > ul a[href="#sec-b"]').should('have.attr', 'aria-current', 'location');
    });

    it('blijft 1 drawer tonen in compact-mode (geen 3 stacked drawers)', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    compact
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#sections-content-container"
                >
                    <vl-side-navigation-section-next type="auto" section-title="Op deze pagina">
                    </vl-side-navigation-section-next>
                    <vl-side-navigation-section-next section-title="Acties">
                        <ul><li><a href="#sec-b">B</a></li></ul>
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${sectionsSampleContent}</div>
            </div>
        `);

        // Eén drawer (één show-toc-button), niet één per sectie.
        cy.get('vl-side-navigation-next').shadow().find('#show-toc-button').should('have.length', 1);
        cy.get('vl-side-navigation-next').shadow().find('table-of-contents').should('have.length', 1);
    });

    it('ruimt auto-sectie state op bij slot-wissel van sections naar custom TOC', () => {
        mountThreeSections();

        // wacht tot de auto-sectie zijn gegenereerde lijst heeft (rAF-defer)
        cy.get(
            'vl-side-navigation-section-next[type="auto"] .vl-side-navigation-section-next__list ul a[href="#sec-a"]'
        ).should('exist');

        // bewaar referentie naar de auto-sectie en wissel de slot-inhoud naar een kale custom TOC
        cy.get('vl-side-navigation-next').then(($nav) => {
            const nav = $nav[0];
            const autoSection = nav.querySelector('vl-side-navigation-section-next[type="auto"]') as HTMLElement;
            cy.wrap(autoSection).as('detachedAutoSection');

            nav.querySelectorAll('vl-side-navigation-section-next').forEach((el) => el.remove());
            const ul = nav.ownerDocument.createElement('ul');
            ul.innerHTML = '<li><a href="#sec-b">Naar sectie B</a></li>';
            nav.appendChild(ul);
        });

        // custom TOC werkt na de wissel: actieve state bij scroll
        cy.get('#sec-b').scrollIntoView({ duration: 0 });
        cy.get('vl-side-navigation-next > ul a[href="#sec-b"]').should('have.attr', 'aria-current', 'location');

        // de gegenereerde lijst van de (losgekoppelde) auto-sectie is leeggemaakt
        cy.get('@detachedAutoSection').then(($section) => {
            const container = $section[0].querySelector('.vl-side-navigation-section-next__list');
            expect(container?.children.length ?? 0, 'auto-sectie container is leeggemaakt').to.equal(0);
        });
    });

    it('navigeert naar een heading in shadow DOM bij klik op een gegenereerde auto-sectie link', () => {
        mountThreeSections();

        cy.window().then((win) => {
            const initialScroll = win.scrollY;
            cy.get('vl-side-navigation-section-next[type="auto"] a[href="#sec-c"]')
                .click()
                .then(() => {
                    cy.window().its('scrollY').should('be.greaterThan', initialScroll);
                });
        });
    });

    const nestedAutoContent = html`
        <div id="nested-sections-content">
            <section style="min-height: 600px; margin-top: 100px;">
                <vl-title type="h2" id="np-a">Parent A</vl-title>
            </section>
            <section style="min-height: 600px;">
                <vl-title type="h3" id="np-a-1">Child A1</vl-title>
            </section>
            <section style="min-height: 600px;">
                <vl-title type="h2" id="np-b">Parent B</vl-title>
            </section>
            <section style="min-height: 600px;">
                <vl-title type="h2" id="np-c">Parent C</vl-title>
            </section>
        </div>
    `;

    it('vergeet manuele inklap van auto-sectie na wegscrollen (collapse-pruning, parity met auto-TOC)', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#nested-sections-content"
                >
                    <vl-side-navigation-section-next type="auto" section-title="Op deze pagina">
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${nestedAutoContent}</div>
            </div>
        `);

        const childUl = 'vl-side-navigation-section-next[type="auto"] li ul';

        // auto-sectie gerendeerd: parent A met child A1 (dus een toggle-knop)
        cy.get('vl-side-navigation-section-next[type="auto"] a[href="#np-a-1"]').should('exist');

        // scroll naar A → A actief → children auto-expand
        cy.get('#np-a').scrollIntoView({ duration: 0 });
        cy.get(childUl).should('not.have.attr', 'hidden');

        // manueel inklappen → children verborgen
        cy.get('vl-side-navigation-section-next[type="auto"] button.toggle-button').first().click();
        cy.get(childUl).should('have.attr', 'hidden');

        // wegscrollen naar B (midden-sectie, bereikt de active-zone) → A niet meer actief
        cy.get('#np-b').scrollIntoView({ duration: 0 });
        cy.get('vl-side-navigation-section-next[type="auto"] a[href="#np-b"]').should(
            'have.attr',
            'aria-current',
            'location'
        );

        // terugscrollen naar A → manuele inklap is vergeten, children weer auto-expanded
        cy.get('#np-a').scrollIntoView({ duration: 0 });
        cy.get('vl-side-navigation-section-next[type="auto"] a[href="#np-a"]').should(
            'have.attr',
            'aria-current',
            'location'
        );
        cy.get(childUl).should('not.have.attr', 'hidden');
    });

    it('toont en roteert het toggle-icoon van de auto-sectie (vl-icon, geen document-level icon-styles)', () => {
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#nested-sections-content"
                >
                    <vl-side-navigation-section-next type="auto" section-title="Op deze pagina">
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${nestedAutoContent}</div>
            </div>
        `);

        const toggleIcon = 'vl-side-navigation-section-next[type="auto"] button.toggle-button vl-icon';
        cy.get(toggleIcon).should('exist');

        // glyph aanwezig: de ::before content zit in de eigen shadow root van vl-icon,
        // dus zonder dat er icon-styles in document.adoptedStyleSheets nodig zijn
        cy.get(toggleIcon)
            .first()
            .then(($icon) => {
                cy.window().then((win) => {
                    const glyphSpan = $icon[0].shadowRoot?.querySelector('.vl-icon');
                    expect(glyphSpan, 'vl-icon rendert zijn glyph-span in eigen shadow root').to.exist;
                    const content = win.getComputedStyle(glyphSpan as Element, '::before').content;
                    expect(content, 'toggle-icoon heeft een glyph in light DOM').to.not.be.oneOf([
                        'none',
                        'normal',
                        '',
                    ]);
                });
            });

        // rotatie-trigger: zodra de sectie actief is en uitklapt, krijgt de icon showing-children
        cy.get('#np-a').scrollIntoView({ duration: 0 });
        cy.get(toggleIcon).first().should('have.class', 'showing-children');
    });

    it('auto-sectie scant binnen de shadow root van de host als er geen heading-root is (getRootNode fallback)', () => {
        // stray heading in light DOM die NIET in de toc mag belanden zodra de scan correct gescoped is
        cy.mount(html`
            <div>
                <vl-title type="h2" id="stray-light">Stray light heading</vl-title>
                <div id="shadow-host"></div>
            </div>
        `);

        cy.get('#shadow-host').then(($host) => {
            const shadow = $host[0].attachShadow({ mode: 'open' });
            shadow.innerHTML = `
                <vl-side-navigation-next>
                    <vl-side-navigation-section-next type="auto" section-title="Op deze pagina">
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div>
                    <section><vl-title type="h2" id="shadow-h-a">Shadow A</vl-title></section>
                    <section><vl-title type="h2" id="shadow-h-b">Shadow B</vl-title></section>
                </div>
            `;
        });

        // headings binnen de shadow root worden gevonden zonder expliciete heading-root
        cy.get('#shadow-host')
            .shadow()
            .find('vl-side-navigation-section-next[type="auto"] a[href="#shadow-h-a"]')
            .should('exist');
        cy.get('#shadow-host')
            .shadow()
            .find('vl-side-navigation-section-next[type="auto"] a[href="#shadow-h-b"]')
            .should('exist');

        // de light-DOM stray heading valt buiten de scope en mag niet in de toc staan
        cy.get('#shadow-host')
            .shadow()
            .find('vl-side-navigation-section-next[type="auto"] a[href="#stray-light"]')
            .should('not.exist');
    });
});

describe('cypress-component - block components - vl-side-navigation-next - sections-mode multi-active', () => {
    beforeEach(() => cy.viewport(1440, 900));

    const multiActiveSectionsContent = html`
        <div id="ms-content">
            <section style="min-height: 200px; margin-top: 40px;">
                <vl-title type="h2" id="ms-a1">Hoofdstuk 1</vl-title>
            </section>
            <section style="min-height: 200px;">
                <vl-title type="h2" id="ms-a2">Hoofdstuk 2</vl-title>
            </section>
        </div>
        <div id="ms-bijlage">
            <section style="min-height: 200px;">
                <vl-title type="h2" id="ms-bx">Bijlage X</vl-title>
            </section>
        </div>
    `;

    const mountMultiActiveSections = () =>
        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="${NAVIGATION_COLUMN_CLASSES}"
                    heading-root-selector="#ms-content"
                    multi-active
                >
                    <vl-side-navigation-section-next type="auto" section-title="Op deze pagina">
                    </vl-side-navigation-section-next>
                    <vl-side-navigation-section-next section-title="Bijlagen">
                        <ul>
                            <li><a href="#ms-bx">Bijlage X</a></li>
                        </ul>
                    </vl-side-navigation-section-next>
                </vl-side-navigation-next>
                <div class="${CONTENT_COLUMN_CLASSES}">${multiActiveSectionsContent}</div>
            </div>
        `);

    it('markeert meerdere links actief over de auto- en custom-sectie heen', () => {
        mountMultiActiveSections();

        cy.get('#ms-a1').scrollIntoView();

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-section-next[type="auto"] a.active')
            .should('have.length.greaterThan', 1);
        cy.get('vl-side-navigation-next').find('a[href="#ms-bx"].active').should('exist');
    });

    it('tekent aparte lijn-segmenten per nav-sectie i.p.v. één lijn over de sectietitels', () => {
        mountMultiActiveSections();

        cy.get('#ms-a1').scrollIntoView();

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav .active-indicator-line')
            .filter(':visible')
            .should('have.length.greaterThan', 1);

        cy.get('vl-side-navigation-next')
            .shadow()
            .find('nav')
            .then(($nav) => {
                const navHeight = $nav[0].getBoundingClientRect().height;
                cy.get('vl-side-navigation-next')
                    .shadow()
                    .find('nav .active-indicator-line')
                    .filter(':visible')
                    .each(($seg) => {
                        expect($seg[0].getBoundingClientRect().height).to.be.lessThan(navHeight);
                    });
            });
    });

    it('is toegankelijk met meerdere actieve secties', () => {
        mountMultiActiveSections();

        cy.get('#ms-a1').scrollIntoView();
        cy.get('vl-side-navigation-next').find('a.active').should('have.length.greaterThan', 1);

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next');
    });
});
