import { registerWebComponents } from '@domg-wc/common';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlButtonComponent } from '../../../atom/button';
import { VlIconComponent } from '../../../atom/icon';
import { VlLinkComponent } from '../../../atom/link';
import { VlTitleComponent } from '../../../atom/title';
import { VlProzaMessage, VlProzaMessagePreloader } from '../../proza-message';
import { VlSideNavigationLayoutComponent } from './vl-side-navigation-layout.component';
import { VlSideNavigationComponent } from './vl-side-navigation.component';

/**
 * Minimal custom element with light DOM only (no shadow root).
 * Used to test that side nav picks up headings inside such components
 * (e.g. consumer components that use createRenderRoot() { return this }).
 */
@customElement('toc-test-light-dom-wrapper')
class TocTestLightDomWrapper extends LitElement {
    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <section style="min-height: 200px;">
                <vl-title type="h3" id="details-vaststelling">Details vaststelling</vl-title>
                <p>Content inside a light-DOM-only custom element.</p>
            </section>
        `;
    }
}

/**
 * Custom element with Shadow DOM that contains a heading.
 * Used to test TOC ordering when headings are found through different traversal paths
 * (shadow DOM vs light DOM vs direct slotted content).
 */
@customElement('toc-test-shadow-dom-header')
class TocTestShadowDomHeader extends LitElement {
    render() {
        return html`
            <div>
                <vl-title type="h2" id="laatste-vaststelling">Laatste vaststelling</vl-title>
            </div>
        `;
    }
}

/**
 * Light DOM wrapper that contains another light DOM component with a heading.
 * Simulates the nested structure: placeholder-lvbr-vaststelling > placeholder-details-vaststelling-header
 */
@customElement('toc-test-nested-light-dom-wrapper')
class TocTestNestedLightDomWrapper extends LitElement {
    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <div>
                <toc-test-light-dom-wrapper></toc-test-light-dom-wrapper>
            </div>
        `;
    }
}

/**
 * Shadow DOM custom element that renders text without any light DOM text nodes.
 * Used to verify TOC labels can resolve text rendered in nested shadow roots.
 */
@customElement('toc-test-shadow-text')
class TocTestShadowText extends LitElement {
    render() {
        return html`<span>Tekst uit shadow root</span>`;
    }
}

registerWebComponents([
    VlSideNavigationLayoutComponent,
    VlSideNavigationComponent,
    VlTitleComponent,
    VlLinkComponent,
    VlButtonComponent,
    VlIconComponent,
    VlProzaMessagePreloader,
    VlProzaMessage,
]);

const mountSideNavigationLayout = () => {
    return cy.mount(html`
        <vl-side-navigation-layout-next>
            <vl-side-navigation-next slot="navigation"></vl-side-navigation-next>
            <div slot="content" style="min-height: 2000px;">
                <section id="content-1" style="margin-top: 100px; min-height: 400px;">
                    <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
                <section id="content-1-1" style="min-height: 400px;">
                    <vl-title type="h3" id="content-1-1-heading">Content 1 - 1</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
                <section id="content-2" style="min-height: 400px;">
                    <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
                <section id="content-3" style="min-height: 400px;">
                    <vl-title type="h2" id="content-3-heading">Content 3</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
            </div>
        </vl-side-navigation-layout-next>
    `);
};

const mountSideNavigationLayoutOnlyContent = () => {
    return cy.mount(html`
        <vl-side-navigation-layout-next>
            <div slot="content" style="min-height: 2000px;">
                <section id="content-1" style="margin-top: 100px; min-height: 400px;">
                    <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
                <section id="content-1-1" style="min-height: 400px;">
                    <vl-title type="h3" id="content-1-1-heading">Content 1 - 1</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
                <section id="content-2" style="min-height: 400px;">
                    <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
                <section id="content-3" style="min-height: 400px;">
                    <vl-title type="h2" id="content-3-heading">Content 3</vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </section>
            </div>
        </vl-side-navigation-layout-next>
    `);
};

const mountSideNavigationLayoutWithCustomToc = () => {
    return cy.mount(html`
        <vl-side-navigation-layout-next heading-root-selector="#custom-toc-content">
            <vl-side-navigation-next slot="navigation">
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
            <div slot="content">
                <div id="custom-toc-content" style="min-height: 2000px;">
                    <section id="custom-intro-section" style="margin-top: 100px; min-height: 400px;">
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
                    <section id="custom-vereisten-section" style="min-height: 400px;">
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
                    <section id="custom-aanvraag-section" style="min-height: 400px;">
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
                    <section id="custom-termijnen-section" style="min-height: 400px;">
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
        </vl-side-navigation-layout-next>
    `);
};

const getSideNavigation = (isAutoNav: boolean) => {
    return isAutoNav
        ? cy.get('vl-side-navigation-layout-next').shadow().find('vl-side-navigation-next')
        : cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next');
};

const runDesktopTests = (mountFn: () => Cypress.Chainable, isAutoNav = false) => {
    it('should mount', () => {
        mountFn();
        cy.get('vl-side-navigation-layout-next').should('exist');
    });

    it('should render navigation and content slots', () => {
        mountFn();
        getSideNavigation(false).should('exist');
        cy.get('vl-side-navigation-layout-next').find('[slot="content"]').should('exist');
    });

    it('should apply grid classes to navigation', () => {
        mountFn();
        cy.get('vl-side-navigation-layout-next')
            .shadow()
            .find('navigation-part')
            .should('have.class', 'vl-column')
            .should('have.class', 'vl-column--3')
            .should('have.class', 'vl-column--start-10')
            .should('have.class', 'vl-column--m-3');
    });

    it('should apply grid classes to content', () => {
        mountFn();
        cy.get('vl-side-navigation-layout-next')
            .shadow()
            .find('content-part')
            .should('have.class', 'vl-column')
            .should('have.class', 'vl-column--8')
            .should('have.class', 'vl-column--m-9');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should apply order-1 class to navigation by default', () => {
        mountFn();
        cy.get('vl-side-navigation-layout-next')
            .shadow()
            .find('navigation-part')
            .shouldHaveComputedStyle({ style: 'order', value: '1' });

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should be accessible', () => {
        mountFn();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should have aria-controls on toggle buttons pointing to nested ul elements', () => {
        mountFn();

        // Get the first toggle button (Content 1 has children)
        getSideNavigation(false)
            .shadow()
            .find('nav button.toggle-button')
            .first()
            .should('have.attr', 'aria-controls')
            .then((ariaControls) => {
                const controlledId = ariaControls;
                expect(controlledId).to.match(/^toc-section-/);

                // Verify the controlled ul element exists in the DOM (even when hidden)
                getSideNavigation(false).shadow().find(`nav ul#${controlledId}`).should('exist');
            });
    });

    it('should have role="region" and aria-labelledby when in sidebar mode (desktop)', () => {
        mountFn();

        getSideNavigation(false)
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'region')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title')
            .should('not.have.attr', 'aria-modal');
    });

    it('should have aria-labelledby on table-of-contents pointing to navigation title', () => {
        mountFn();

        getSideNavigation(false)
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');

        getSideNavigation(false).shadow().find('#side-navigation-title').should('exist');
    });

    it('should manually expand and collapse children when using toggle button via keyboard', () => {
        mountFn();

        // Focus context: click nav, TAB to first link, TAB to toggle button
        getSideNavigation(false).shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('nav a').first().should('have.focus');
        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('nav button.toggle-button').first().should('have.focus');

        getSideNavigation(false)
            .shadow()
            .find('nav button.toggle-button')
            .first()
            .invoke('attr', 'aria-controls')
            .then((controlledId) => {
                cy.press(Cypress.Keyboard.Keys.SPACE);
                getSideNavigation(false)
                    .shadow()
                    .find('nav button.toggle-button')
                    .first()
                    .should('have.attr', 'aria-expanded', 'false');
                getSideNavigation(false).shadow().find(`nav ul#${controlledId}`).should('have.attr', 'hidden');

                cy.press(Cypress.Keyboard.Keys.SPACE);
                getSideNavigation(false)
                    .shadow()
                    .find('nav button.toggle-button')
                    .first()
                    .should('have.attr', 'aria-expanded', 'true');
                getSideNavigation(false).shadow().find(`nav ul#${controlledId}`).should('not.have.attr', 'hidden');
            });
    });

    it('should respect prefers-reduced-motion for scroll behavior', () => {
        mountFn();

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

        // Click a link and verify scroll behavior
        getSideNavigation(false).shadow().find('nav a[href="#content-3-heading"]').click();

        // Wait for scroll to complete
        cy.wait(100);

        // Verify we scrolled to the heading
        cy.get('#content-3-heading').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should apply vl-content-block class when content-block attribute is set', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next content-block>
                <vl-side-navigation-next slot="navigation"></vl-side-navigation-next>
                <div slot="content">
                    <section>
                        <vl-title type="h2" id="test-heading">Test Content</vl-title>
                        <p>Test paragraph</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next')
            .shadow()
            .find('layout-container')
            .should('have.class', 'vl-grid')
            .should('have.class', 'vl-content-block');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should not apply vl-content-block class when content-block attribute is not set', () => {
        mountFn();

        cy.get('vl-side-navigation-layout-next')
            .shadow()
            .find('layout-container')
            .should('have.class', 'vl-grid')
            .should('not.have.class', 'vl-content-block');
    });

    it('should update navigation active status when scrolling', () => {
        mountFn();

        cy.wait(500);
        cy.get('#content-2-heading').scrollIntoView();

        getSideNavigation(false).shadow().find('nav a[href="#content-2-heading"].active').should('exist');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should maintain layout during scrolling', () => {
        mountFn();

        cy.get('vl-side-navigation-layout-next')
            .shadow()
            .find('navigation-part')
            .then(($nav) => {
                const initialClasses = $nav.attr('class');

                cy.get('#content-2-heading').scrollIntoView();
                cy.wait(300);

                cy.get('vl-side-navigation-layout-next')
                    .shadow()
                    .find('navigation-part')
                    .should('have.attr', 'class', initialClasses);
            });

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should support keyboard navigation through TOC items', () => {
        mountFn();

        getSideNavigation(false).shadow().find('nav').click();

        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('nav a').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // First item has children, so next TAB goes to its toggle button
        getSideNavigation(false).shadow().find('nav button.toggle-button').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Now we reach the child link
        getSideNavigation(false).shadow().find('nav a[href="#content-1-1-heading"]').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('nav a[href="#content-2-heading"]').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('nav a[href="#content-3-heading"]').should('have.focus');
    });

    it('should navigate to section when pressing Enter on focused link', () => {
        mountFn();

        getSideNavigation(false).shadow().find('nav').click();
        cy.press(Cypress.Keyboard.Keys.TAB); // First link
        cy.press(Cypress.Keyboard.Keys.TAB); // toggle button
        cy.press(Cypress.Keyboard.Keys.TAB); // Child link
        cy.press(Cypress.Keyboard.Keys.TAB); // Second link
        cy.press(Cypress.Keyboard.Keys.TAB); // Third link
        getSideNavigation(false).shadow().find('nav a[href="#content-3-heading"]').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.ENTER);

        cy.wait(600);

        cy.get('#content-3-heading').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });
};

const runMobileTests = (mountFn: () => Cypress.Chainable, isAutoNav = false) => {
    it('should apply full width classes on mobile viewport', () => {
        mountFn();
        cy.get('vl-side-navigation-layout-next').shadow().find('navigation-part').should('have.class', 'vl-column--s-12');
        cy.get('vl-side-navigation-layout-next').shadow().find('content-part').should('have.class', 'vl-column--s-12');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should be accessible on mobile viewport', () => {
        mountFn();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should update navigation when scrolling on mobile viewport', () => {
        mountFn();

        cy.wait(600);
        cy.get('#content-2-heading').scrollIntoView();

        getSideNavigation(false).shadow().find('#show-toc-button').click({ force: true });

        getSideNavigation(false).shadow().find('nav a[href="#content-2-heading"].active').should('exist');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should have role="dialog" and aria-modal when in overlay mode (mobile)', () => {
        mountFn();

        getSideNavigation(false)
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should support keyboard navigation on mobile viewport', () => {
        mountFn();

        getSideNavigation(false).shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('#close-button').shadow().find('button').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('nav a').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // First item has children, so next TAB goes to its toggle button
        getSideNavigation(false).shadow().find('nav button.toggle-button').first().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Now we reach the child link
        getSideNavigation(false).shadow().find('nav a[href="#content-1-1-heading"]').should('have.focus');
    });

    it('should move focus to table-of-contents when opening overlay on mobile', () => {
        mountFn();

        // Establish focus context, then close overlay via keyboard
        getSideNavigation(false).shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('#close-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);
        getSideNavigation(false).shadow().find('table-of-contents').should('have.attr', 'hidden');

        // Open overlay via keyboard
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.press(Cypress.Keyboard.Keys.TAB);
        getSideNavigation(false).shadow().find('#show-toc-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);

        cy.wait(50);

        // Verify overlay open and ARIA
        getSideNavigation(false).shadow().find('table-of-contents').should('not.have.attr', 'hidden');
        getSideNavigation(false)
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'tabindex', '-1')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should toggle mobile menu with Space key', () => {
        mountFn();
        // TODO: onderstaande functionaliteit werkt ook met Enter (in de browser) maar niet binnen Cypress testen - te onderzoeken
        getSideNavigation(false).shadow().find('table-of-contents').should('not.have.attr', 'hidden');
        
        // Establish focus context, then close overlay via keyboard
        getSideNavigation(false).shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.press(Cypress.Keyboard.Keys.SPACE);
        getSideNavigation(false).shadow().find('table-of-contents').should('have.attr', 'hidden');
        getSideNavigation(false).shadow().find('#show-toc-button').shadow().find('button').should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);
        getSideNavigation(false).shadow().find('table-of-contents').should('not.have.attr', 'hidden');
    });
};

// explicit navigation slot tests
describe('cypress-component - block components - vl-side-navigation-layout-next', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    runDesktopTests(mountSideNavigationLayout, false);
});

describe('cypress-component - block components - vl-side-navigation-layout-next - mobile viewport', () => {
    beforeEach(() => {
        cy.viewport(375, 667);
    });

    runMobileTests(mountSideNavigationLayout, false);
});

// auto-generated navigation tests
describe('cypress-component - block components - vl-side-navigation-layout-next - only content (auto navigation)', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    runDesktopTests(mountSideNavigationLayoutOnlyContent, true);
});

describe('cypress-component - block components - vl-side-navigation-layout-next - only content (auto navigation) - mobile viewport', () => {
    beforeEach(() => {
        cy.viewport(375, 667);
    });

    runMobileTests(mountSideNavigationLayoutOnlyContent, true);
});

// custom table of contents tests
describe('cypress-component - block components - vl-side-navigation-layout-next - with custom TOC', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should mount with custom TOC', () => {
        mountSideNavigationLayoutWithCustomToc();
        cy.get('vl-side-navigation-layout-next').should('exist');
        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').should('exist');
    });

    it('should render custom TOC with vl-link components', () => {
        mountSideNavigationLayoutWithCustomToc();
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link')
            .should('have.length.greaterThan', 0);
    });

    it('should render custom TOC with links', () => {
        mountSideNavigationLayoutWithCustomToc();
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-intro"]')
            .should('exist');
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .should('exist');
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-termijnen"]')
            .should('exist');
    });

    it('should navigate when clicking custom TOC links', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .click();

        cy.wait(600);

        cy.get('#custom-aanvraag').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should update active state on custom TOC links when scrolling', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.wait(500);
        cy.get('#custom-aanvraag').scrollIntoView();
        cy.wait(500);

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-aanvraag"].active')
            .should('exist');
    });

    it('should expand parent section when scrolling to child heading and collapse when scrolling away', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.wait(500);
        cy.get('#custom-vereisten').scrollIntoView();
        // Wait for IntersectionObserver to update and apply expand state to parent section
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-intro"]')
            .parent('li')
            .find('> ul')
            .should('not.have.attr', 'hidden')
            .then(() => cy.wait(100));

        cy.get('#custom-termijnen').scrollIntoView();
        // Wait for IntersectionObserver to update and collapse parent section
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link[href="#custom-intro"]')
            .parent('li')
            .find('> ul')
            .should('have.attr', 'hidden');
    });

    it('should be accessible with custom TOC', () => {
        mountSideNavigationLayoutWithCustomToc();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should have aria-labelledby on table-of-contents with custom TOC', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#side-navigation-title')
            .should('exist');
    });

    it('should have role="region" with custom TOC in sidebar mode', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'region')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title')
            .should('not.have.attr', 'aria-modal');
    });

    it('should support keyboard navigation through custom TOC items', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('table-of-contents').click();

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-layout-next').find('vl-link').first().shadow().find('a').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Next is the child link
        cy.get('vl-side-navigation-layout-next')
            .find('vl-link[href="#custom-vereisten"]')
            .shadow()
            .find('a')
            .should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Now the second top-level link
        cy.get('vl-side-navigation-layout-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .shadow()
            .find('a')
            .should('have.focus');
    });

    it('should navigate to section when pressing Enter on custom TOC link', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('table-of-contents').click();
        cy.press(Cypress.Keyboard.Keys.TAB); // First link
        cy.press(Cypress.Keyboard.Keys.TAB); // Second link
        cy.press(Cypress.Keyboard.Keys.TAB); // Third link
        cy.press(Cypress.Keyboard.Keys.TAB); // Fourth link
        cy.get('vl-side-navigation-layout-next')
            .find('vl-link[href="#custom-termijnen"]')
            .shadow()
            .find('a')
            .should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);

        cy.wait(600);

        cy.get('#custom-termijnen').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });
});

describe('cypress-component - block components - vl-side-navigation-layout-next - with custom TOC - mobile viewport', () => {
    beforeEach(() => {
        cy.viewport(375, 667);
    });

    it('should render custom TOC on mobile viewport', () => {
        mountSideNavigationLayoutWithCustomToc();
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .find('vl-link')
            .should('have.length.greaterThan', 0);
    });

    it('should be accessible on mobile viewport with custom TOC', () => {
        mountSideNavigationLayoutWithCustomToc();
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should have role="dialog" and aria-modal with custom TOC in mobile viewport', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });

    it('should support keyboard navigation on mobile viewport with custom TOC', () => {
        mountSideNavigationLayoutWithCustomToc();

        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#close-button')
            .shadow()
            .find('button')
            .should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-layout-next').find('vl-link').first().shadow().find('a').should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Next is the child link
        cy.get('vl-side-navigation-layout-next')
            .find('vl-link[href="#custom-vereisten"]')
            .shadow()
            .find('a')
            .should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        // Now the second top-level link
        cy.get('vl-side-navigation-layout-next')
            .find('vl-link[href="#custom-aanvraag"]')
            .shadow()
            .find('a')
            .should('have.focus');
    });

    it('should move focus to table-of-contents when opening overlay with custom TOC on mobile', () => {
        mountSideNavigationLayoutWithCustomToc();

        // Establish focus context, then close overlay via keyboard
        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav').click({ force: true });
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#close-button')
            .shadow()
            .find('button')
            .should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'hidden');

        // Open overlay via keyboard
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .shadow()
            .find('button')
            .should('have.focus');
        cy.press(Cypress.Keyboard.Keys.SPACE);

        cy.wait(50);

        // Verify overlay open and ARIA
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('not.have.attr', 'hidden');
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'tabindex', '-1')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });
});

describe('cypress-component - block components - vl-side-navigation-layout-next - compact attribute', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should force compact view when compact attribute is set', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next compact>
                <div slot="content" style="min-height: 2000px;">
                    <section id="compact-test-content" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="compact-test-heading">Compact Test Content</vl-title>
                        <p>Testing compact attribute on layout component.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next').should('have.attr', 'compact');
        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').should('have.attr', 'compact');

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .should('exist');

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should have proper ARIA labels on navigation elements in compact mode', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next compact>
                <div slot="content" style="min-height: 2000px;">
                    <section id="compact-test-content" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="compact-test-heading">Compact Test Content</vl-title>
                        <p>Testing compact attribute on layout component.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('nav')
            .should('have.attr', 'aria-label');

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#close-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label');

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('#show-toc-button')
            .shadow()
            .find('button')
            .should('have.attr', 'aria-label');
    });

    it('should have role="dialog" and aria-modal when compact attribute is set', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next compact>
                <div slot="content" style="min-height: 2000px;">
                    <section id="compact-test-content" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="compact-test-heading">Compact Test Content</vl-title>
                        <p>Testing compact attribute on layout component.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('table-of-contents')
            .should('have.attr', 'role', 'dialog')
            .should('have.attr', 'aria-modal', 'true')
            .should('have.attr', 'aria-labelledby', 'side-navigation-title');
    });
});

describe('cypress-component - block components - vl-side-navigation-layout-next - navigation-title', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should pass navigation-title from layout to vl-side-navigation-next', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next navigation-title="Inhoud van deze pagina">
                <div slot="content" style="min-height: 2000px;">
                    <section id="toc-title-content" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="toc-title-heading">Content</vl-title>
                        <p>Testing navigation-title pass-through.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next').should('have.attr', 'navigation-title', 'Inhoud van deze pagina');
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .should('have.attr', 'navigation-title', 'Inhoud van deze pagina');
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('.navigation-title')
            .should('contain', 'Inhoud van deze pagina');
    });
});

describe('cypress-component - block components - vl-side-navigation-layout-next - max-depth', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should work with max-depth attribute', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next max-depth="1">
                <div slot="content" style="min-height: 2000px;">
                    <section id="content-1" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </section>
                    <section id="content-2" style="min-height: 400px;">
                        <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next').should('have.attr', 'max-depth', '1');
        cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').should('have.attr', 'max-depth', '1');
    });

    it('should find headings with max-depth set to 0', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next max-depth="0">
                <div slot="content" style="min-height: 2000px;">
                    <section id="content-1" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </section>
                    <section id="content-2" style="min-height: 400px;">
                        <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('nav a[href="#content-1-heading"]')
            .should('exist');
        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('nav a[href="#content-2-heading"]')
            .should('exist');
    });

    it('should be accessible with max-depth', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next max-depth="2">
                <div slot="content" style="min-height: 2000px;">
                    <section id="content-1" style="margin-top: 100px; min-height: 400px;">
                        <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </section>
                    <section id="content-2" style="min-height: 400px;">
                        <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });
});

describe('cypress-component - block components - vl-side-navigation-layout-next - slotted content with light-DOM-only custom element', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    it('should pick up headings inside light-DOM-only custom element and keep TOC in document order', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next content-block>
                <vl-side-navigation-next slot="navigation"></vl-side-navigation-next>
                <div slot="content" style="min-height: 2000px;">
                    <section style="margin-top: 100px; min-height: 200px;">
                        <vl-title type="h2" id="laatste-vaststelling">Laatste vaststelling</vl-title>
                        <p>Content before the light-DOM-only block.</p>
                    </section>
                    <toc-test-light-dom-wrapper></toc-test-light-dom-wrapper>
                    <section style="min-height: 200px;">
                        <vl-title type="h2" id="historiek">Historiek</vl-title>
                        <p>Content that appears last in the page.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        // Wait for slot assignment and deferred TOC scan (requestAnimationFrame)
        cy.wait(150);

        const nav = () => cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');

        // Heading inside light-DOM-only custom element must appear in TOC
        nav().find('a[href="#details-vaststelling"]').should('exist').and('contain', 'Details vaststelling');

        // Historiek must appear in TOC
        nav().find('a[href="#historiek"]').should('exist').and('contain', 'Historiek');

        // TOC must be in document order: last top-level link should be Historiek (not first)
        nav()
            .find('ul > li')
            .last()
            .find('a')
            .first()
            .should('have.attr', 'href', '#historiek')
            .and('contain', 'Historiek');
    });

    /**
     * This test replicates the exact scenario from apps/playground-lit/src/app/placeholder-lvbr/storybook-vaststelling-exact.ts
     * where headings are found through different traversal paths:
     * 1. Shadow DOM component (toc-test-shadow-dom-header) contains "laatste-vaststelling" (h2)
     * 2. Nested light DOM components contain "details-vaststelling" (h3)
     * 3. Direct slotted content contains "historiek" (h2)
     *
     * Without the getBoundingClientRect fallback in sortHeadingItemsByDocumentOrder,
     * compareDocumentPosition returns DOCUMENT_POSITION_DISCONNECTED when comparing
     * elements from different DOM trees, causing incorrect TOC ordering.
     */
    it('should maintain document order when headings are found through shadow DOM, nested light DOM, and direct slotted content', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next content-block>
                <vl-side-navigation-next slot="navigation"></vl-side-navigation-next>
                <div slot="content" style="min-height: 2000px;">
                    <!-- Section 1: Shadow DOM component with h2 heading -->
                    <section style="margin-top: 100px; min-height: 200px;">
                        <toc-test-shadow-dom-header></toc-test-shadow-dom-header>
                        <p>Content after shadow DOM header.</p>
                    </section>
                    <!-- Section 2: Nested light DOM components with h3 heading -->
                    <section style="min-height: 200px;">
                        <toc-test-nested-light-dom-wrapper></toc-test-nested-light-dom-wrapper>
                    </section>
                    <!-- Section 3: Direct slotted content with h2 heading -->
                    <section style="min-height: 200px;">
                        <vl-title type="h2" id="historiek">Historiek</vl-title>
                        <p>Content that appears last in the page.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        // Wait for slot assignment and deferred TOC scan
        cy.wait(150);

        const nav = () => cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');

        // All headings must appear in TOC
        nav().find('a[href="#laatste-vaststelling"]').should('exist').and('contain', 'Laatste vaststelling');
        nav().find('a[href="#details-vaststelling"]').should('exist').and('contain', 'Details vaststelling');
        nav().find('a[href="#historiek"]').should('exist').and('contain', 'Historiek');

        // Verify document order: laatste-vaststelling (h2) -> details-vaststelling (h3) -> historiek (h2)
        // The TOC should show:
        // 1. Laatste vaststelling (h2) - first top-level item
        //    - Details vaststelling (h3) - nested under it
        // 2. Historiek (h2) - second top-level item (last)
        nav()
            .find('ul > li')
            .first()
            .find('a')
            .first()
            .should('have.attr', 'href', '#laatste-vaststelling')
            .and('contain', 'Laatste vaststelling');

        nav()
            .find('ul > li')
            .last()
            .find('a')
            .first()
            .should('have.attr', 'href', '#historiek')
            .and('contain', 'Historiek');

        // Details vaststelling (h3) should be nested under Laatste vaststelling (h2)
        nav()
            .find('ul > li')
            .first()
            .find('ul a[href="#details-vaststelling"]')
            .should('exist')
            .and('contain', 'Details vaststelling');
    });

    it('should resolve heading text from nested shadow DOM content inside vl-title', () => {
        cy.mount(html`
            <vl-side-navigation-layout-next content-block>
                <vl-side-navigation-next slot="navigation"></vl-side-navigation-next>
                <div slot="content" style="min-height: 1200px;">
                    <section style="margin-top: 100px; min-height: 300px;">
                        <vl-title type="h2" id="shadow-heading">
                            <toc-test-shadow-text></toc-test-shadow-text>
                        </vl-title>
                        <p>Content under a heading with shadow-rendered text.</p>
                    </section>
                </div>
            </vl-side-navigation-layout-next>
        `);

        cy.wait(150);

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('nav a[href="#shadow-heading"]')
            .should('exist')
            .and('contain', 'Tekst uit shadow root');
    });
});

const prozaDomain = 'side-navigation-layout-proza-message-test';

const preloadProzaMessages = () => {
    VlProzaMessagePreloader.__setPreloadedMessagesCacheForDomain(
        prozaDomain,
        Promise.resolve({
            'page-title': 'Side navigation met proza message',
            'section-1-title': 'Ontwerpprincipes',
            'section-1-sub-1': 'Consistente headings',
            'section-1-sub-2': 'Scanbare content',
            'section-2-title': 'Implementatie',
            'section-2-sub-1': 'Preloaden van berichten',
            'section-3-title': 'Resultaat',
        })
    );
    VlProzaMessage.__setToegelatenOperatiesCacheForDomain(prozaDomain, Promise.resolve({ update: false }));
};

const mountSideNavigationLayoutWithProzaMessage = () => {
    preloadProzaMessages();

    return cy.mount(html`
        <vl-proza-message-preloader domain="${prozaDomain}"></vl-proza-message-preloader>
        <vl-side-navigation-layout-next content-block heading-root-selector="#proza-content">
            <div slot="content" id="proza-content" style="min-height: 2000px;">
                <vl-title type="h1" id="proza-main-title">
                    <vl-proza-message domain="${prozaDomain}" code="page-title"></vl-proza-message>
                </vl-title>

                <vl-title type="h2" id="proza-section-1">
                    <vl-proza-message domain="${prozaDomain}" code="section-1-title"></vl-proza-message>
                </vl-title>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <vl-title type="h3" id="proza-section-1-sub-1">
                    <vl-proza-message domain="${prozaDomain}" code="section-1-sub-1"></vl-proza-message>
                </vl-title>
                <p>Integer malesuada lorem vitae lorem volutpat.</p>

                <vl-title type="h3" id="proza-section-1-sub-2">
                    <vl-proza-message domain="${prozaDomain}" code="section-1-sub-2"></vl-proza-message>
                </vl-title>
                <p>Nulla facilisi. Vestibulum ante ipsum primis in faucibus.</p>

                <vl-title type="h2" id="proza-section-2">
                    <vl-proza-message domain="${prozaDomain}" code="section-2-title"></vl-proza-message>
                </vl-title>
                <p>Donec et erat vel est sodales viverra.</p>

                <vl-title type="h3" id="proza-section-2-sub-1">
                    <vl-proza-message domain="${prozaDomain}" code="section-2-sub-1"></vl-proza-message>
                </vl-title>
                <p>Phasellus in elit neque.</p>

                <vl-title type="h2" id="proza-section-3">
                    <vl-proza-message domain="${prozaDomain}" code="section-3-title"></vl-proza-message>
                </vl-title>
                <p>Curabitur non malesuada purus.</p>
            </div>
        </vl-side-navigation-layout-next>
    `);
};

describe('cypress-component - block components - vl-side-navigation-layout-next - with proza message', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    afterEach(() => {
        VlProzaMessagePreloader.clearCache();
        VlProzaMessage.clearCache();
    });

    it('should mount with proza message headings', () => {
        mountSideNavigationLayoutWithProzaMessage();
        cy.get('vl-side-navigation-layout-next').should('exist');
    });

    it('should resolve proza message text in the auto-generated TOC', () => {
        mountSideNavigationLayoutWithProzaMessage();

        cy.wait(300);

        const nav = () =>
            cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');

        nav().find('a[href="#proza-section-1"]').should('exist').and('contain', 'Ontwerpprincipes');
        nav().find('a[href="#proza-section-2"]').should('exist').and('contain', 'Implementatie');
        nav().find('a[href="#proza-section-3"]').should('exist').and('contain', 'Resultaat');
    });

    it('should resolve proza message text for nested h3 headings in the TOC', () => {
        mountSideNavigationLayoutWithProzaMessage();

        cy.wait(300);

        const nav = () =>
            cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');

        nav().find('a[href="#proza-section-1-sub-1"]').should('exist').and('contain', 'Consistente headings');
        nav().find('a[href="#proza-section-1-sub-2"]').should('exist').and('contain', 'Scanbare content');
        nav().find('a[href="#proza-section-2-sub-1"]').should('exist').and('contain', 'Preloaden van berichten');
    });

    it('should maintain correct TOC hierarchy with proza message headings', () => {
        mountSideNavigationLayoutWithProzaMessage();

        cy.wait(300);

        const nav = () =>
            cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');

        // Verify first top-level section exists
        nav().find('a[href="#proza-section-1"]').should('exist').and('contain', 'Ontwerpprincipes');

        // Verify nested items under first section
        nav()
            .find('ul > li')
            .first()
            .find('ul a[href="#proza-section-1-sub-1"]')
            .should('exist')
            .and('contain', 'Consistente headings');

        nav()
            .find('ul > li')
            .first()
            .find('ul a[href="#proza-section-1-sub-2"]')
            .should('exist')
            .and('contain', 'Scanbare content');

        // Verify last top-level section exists
        nav().find('a[href="#proza-section-3"]').should('exist').and('contain', 'Resultaat');
    });

    it('should navigate to proza message section when clicking TOC link', () => {
        mountSideNavigationLayoutWithProzaMessage();

        cy.wait(300);

        cy.get('vl-side-navigation-layout-next')
            .find('vl-side-navigation-next')
            .shadow()
            .find('nav a[href="#proza-section-2"]')
            .click();

        cy.wait(600);

        cy.get('#proza-section-2').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(900);
        });
    });

    it('should be accessible with proza message headings', () => {
        mountSideNavigationLayoutWithProzaMessage();

        cy.wait(300);

        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-layout-next');
    });

    it('should not render proza message titles twice in the TOC', () => {
        mountSideNavigationLayoutWithProzaMessage();

        cy.wait(300);

        const nav = () =>
            cy.get('vl-side-navigation-layout-next').find('vl-side-navigation-next').shadow().find('nav');

        const expectedTitles: [string, string][] = [
            ['#proza-section-1', 'Ontwerpprincipes'],
            ['#proza-section-1-sub-1', 'Consistente headings'],
            ['#proza-section-1-sub-2', 'Scanbare content'],
            ['#proza-section-2', 'Implementatie'],
            ['#proza-section-2-sub-1', 'Preloaden van berichten'],
            ['#proza-section-3', 'Resultaat'],
        ];

        expectedTitles.forEach(([href, expectedText]) => {
            nav()
                .find(`a[href="${href}"]`)
                .invoke('text')
                .then((text) => {
                    expect(text.trim()).to.equal(expectedText);
                });
        });
    });
});
