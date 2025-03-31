import { registerWebComponents } from '@domg-wc/common-utilities';
import { html } from 'lit';
import { VlSideNavigationContentComponent } from './vl-side-navigation-content.component';
import { VlSideNavigationGroupComponent } from './vl-side-navigation-group.component';
import { VlSideNavigationItemComponent } from './vl-side-navigation-item.component';
import { VlSideNavigationReferenceComponent } from './vl-side-navigation-reference.component';
import { VlSideNavigationH5 } from './vl-side-navigation-title.component';
import { VlSideNavigationToggleComponent } from './vl-side-navigation-toggle.component';
import { VlSideNavigationComponent } from './vl-side-navigation.component';

registerWebComponents([
    VlSideNavigationComponent,
    VlSideNavigationContentComponent,
    VlSideNavigationGroupComponent,
    VlSideNavigationItemComponent,
    VlSideNavigationToggleComponent,
    VlSideNavigationReferenceComponent,
    VlSideNavigationH5,
]);

describe('component - vl-side-navigation-next', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);

        cy.mount(html`
            <section class="vl-section-next">
                <div class="vl-content-block-next">
                    <div class="vl-grid-next vl-stacked-next-medium">
                        <div
                            class="vl-column-next vl-column-next--8 vl-column-next--m-8 vl-column-next--s-8 vl-column-next--xs-12"
                        >
                            <vl-side-navigation-reference-next>
                                <section id="content-1" class="vl-section-next">
                                    <vl-title-next type="h2">Content 1</vl-title-next>
                                </section>
                                <section id="content-1-1" class="vl-section-next">
                                    <vl-title-next type="h3">Content 1 - 1</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-1-2" class="vl-section-next">
                                    <vl-title-next type="h3">Content 1 - 2</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-1-3" class="vl-section-next">
                                    <vl-title-next type="h3">Content 1 - 3</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-1-4" class="vl-section-next">
                                    <vl-title-next type="h3">Content 1 - 4</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-2" class="vl-section-next">
                                    <vl-title-next type="h2">Content 2</vl-title-next>
                                </section>
                                <section id="content-2-1" class="vl-section-next">
                                    <vl-title-next type="h3">Content 2 - 1</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-2-2" class="vl-section-next">
                                    <vl-title-next type="h3">Content 2 - 2</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-2-3" class="vl-section-next">
                                    <vl-title-next type="h3">Content 2 - 3</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-2-4" class="vl-section-next">
                                    <vl-title-next type="h3">Content 2 - 4</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                                <section id="content-3" class="vl-section-next">
                                    <vl-title-next type="h2">Content 3</vl-title-next>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                </section>
                            </vl-side-navigation-reference-next>
                        </div>
                        <div
                            class="vl-column-next vl-column-next--3 vl-column-next--m-3 vl-column-next--s-3 vl-column-next--xs-0"
                        >
                            <vl-side-navigation-next aria-label="inhoudsopgave">
                                <vl-side-navigation-h5-next>Op deze pagina</vl-side-navigation-h5-next>
                                <vl-side-navigation-content-next>
                                    <vl-side-navigation-group-next>
                                        <vl-side-navigation-item-next parent="content-1">
                                            <vl-side-navigation-toggle-next href="#content-1" child="content-1">
                                                content 1
                                            </vl-side-navigation-toggle-next>
                                            <ul>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-1-1" parent="content-1">content 1 - 1</a>
                                                </vl-side-navigation-item-next>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-1-2" parent="content-1">content 1 - 2</a>
                                                </vl-side-navigation-item-next>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-1-3" parent="content-1">content 1 - 3</a>
                                                </vl-side-navigation-item-next>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-1-4" parent="content-1">content 1 - 4</a>
                                                </vl-side-navigation-item-next>
                                            </ul>
                                        </vl-side-navigation-item-next>
                                        <vl-side-navigation-item-next parent="content-2">
                                            <vl-side-navigation-toggle-next href="#content-2" child="content-2">
                                                content 2
                                            </vl-side-navigation-toggle-next>
                                            <ul>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-2-1" parent="content-2">content 2 - 1</a>
                                                </vl-side-navigation-item-next>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-2-2" parent="content-2">content 2 - 2</a>
                                                </vl-side-navigation-item-next>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-2-3" parent="content-2">content 2 - 3</a>
                                                </vl-side-navigation-item-next>
                                                <vl-side-navigation-item-next>
                                                    <a href="#content-2-4" parent="content-2">content 2 - 4</a>
                                                </vl-side-navigation-item-next>
                                            </ul>
                                        </vl-side-navigation-item-next>
                                        <vl-side-navigation-item-next parent="content-3">
                                            <vl-side-navigation-toggle-next href="#content-3" child="content-3">
                                                content 3
                                            </vl-side-navigation-toggle-next>
                                        </vl-side-navigation-item-next>
                                    </vl-side-navigation-group-next>
                                </vl-side-navigation-content-next>
                            </vl-side-navigation-next>
                        </div>
                    </div>
                </div>
            </section>
        `);
    });

    it('should mount', () => {
        cy.get('vl-side-navigation-next');
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation-next', {
            // heading-order rule uitgezet.
            // DV bouwt het zij-menu op dezelfde manier op, hier van afwijken zou de huisstijl veranderen.
            rules: {
                'heading-order': { enabled: false },
            },
        });
        cy.checkA11y('vl-side-navigation-reference-next');
    });

    it('should be accessible on mobile', () => {
        cy.injectAxe();
        cy.viewport(320, 480);
        cy.checkA11y('vl-side-navigation-next', {
            // heading-order rule uitgezet.
            // DV bouwt het zij-menu op dezelfde manier op, hier van afwijken zou de huisstijl veranderen.
            rules: {
                'heading-order': { enabled: false },
            },
        });
        cy.checkA11y('vl-side-navigation-reference-next');
    });

    it('should show child links on scroll', () => {
        cy.get('vl-side-navigation-reference-next').find('section#content-1-1').scrollIntoView();

        cy.get('vl-side-navigation-next')
            .find("vl-side-navigation-toggle-next[href='#content-1']")
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('vl-side-navigation-reference-next').get('section#content-2-1').scrollIntoView();

        cy.get('vl-side-navigation-next')
            .find("vl-side-navigation-toggle-next[href='#content-2']")
            .should('have.attr', 'aria-expanded', 'true');
    });

    it('should set attributes', () => {
        cy.get('vl-side-navigation-next')
            .should('have.attr', 'side-navigation', '')
            .should('have.attr', 'side-navigation-scrollable', '')
            .should('have.attr', 'scrollspy', '')
            .should('have.attr', 'scrollspy-mobile', 'Navigatie')
            .should('have.attr', 'sticky', '')
            .should('have.attr', 'sticky-offset-top', '43');

        cy.get('vl-side-navigation-reference-next').should('have.attr', 'scrollspy-content', '');
    });

    it('should set classes', () => {
        cy.get('vl-side-navigation-next')
            .should('have.class', 'vl-side-navigation-next')
            .should('have.class', 'js-vl-side-navigation')
            .should('have.class', 'js-vl-sticky')
            .should('have.class', 'js-vl-scrollspy');

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-h5-next')
            .should('have.class', 'vl-side-navigation-next__title');

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-content-next')
            .should('have.class', 'vl-side-navigation-next__content');

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-group-next')
            .should('have.class', 'vl-side-navigation-next__group');

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-item-next')
            .should('have.class', 'vl-side-navigation-next__item');

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-item-next')
            .should('have.attr', 'parent', 'content-1');

        cy.get('vl-side-navigation-next')
            .find('vl-side-navigation-toggle-next')
            .should('have.class', 'vl-side-navigation-next__toggle');

        cy.get('vl-side-navigation-reference-next').should('have.class', 'js-vl-scrollspy__content');
        cy.get('vl-side-navigation-reference-next').should('have.class', 'js-vl-scrollspy__content');
    });

    // TODO deze test werkt niet meer
    it.skip('should open mobile menu', () => {
        cy.viewport(320, 480);

        cy.get('vl-side-navigation-next').should('have.attr', 'sticky-dressed', 'true');
        cy.get('vl-side-navigation-next').should('not.be.visible');

        cy.get('vl-side-navigation-reference-next').find('button.vl-button.js-vl-scrollspy__toggle').click();

        cy.get('vl-side-navigation-next').should('be.visible');
    });

    // TODO deze test werkt niet meer
    it.skip('should switch between mobile & desktop', () => {
        cy.get('vl-side-navigation-next').find('button.vl-button.js-vl-scrollspy__toggle').should('not.exist');
        cy.get('vl-side-navigation-next').should('be.visible');

        cy.viewport(320, 480);

        cy.get('button.vl-button.js-vl-scrollspy__toggle').should('be.visible');
        cy.get('vl-side-navigation-next').should('not.be.visible');

        cy.viewport(960, 1440);

        cy.get('button.vl-button.js-vl-scrollspy__toggle').should('not.be.visible');
        cy.get('vl-side-navigation-next').should('be.visible');
    });
});
