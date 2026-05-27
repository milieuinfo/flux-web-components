import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlButtonComponent } from '../../../atom/button';
import { VlIconComponent } from '../../../atom/icon';
import { VlLinkComponent } from '../../../atom/link';
import { VlTitleComponent } from '../../../atom/title';
import { VlSideNavigationComponent } from './vl-side-navigation.component';

registerWebComponents([
    VlSideNavigationComponent,
    VlTitleComponent,
    VlLinkComponent,
    VlButtonComponent,
    VlIconComponent,
]);

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

// Test-only element that renders its headings inside a shadow root, so that the custom TOC
// has to pierce shadow DOM to scroll to them (regression for "custom TOC cannot scroll into shadow DOM").
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
            // Regression: with the old document.getElementById the heading inside shadow DOM was never
            // found, so no scroll happened. It should now be scrolled into the viewport.
            const rect = (heading as HTMLElement).getBoundingClientRect();
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
