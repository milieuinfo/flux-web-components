import { registerWebComponents } from '@domg-wc/common';
import { VlHeader } from '@domg-wc/components/compliance';
import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../functional-header';
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
    VlFunctionalHeaderComponent,
    VlHeader,
]);

const template = html`
    <section class="vl-section">
        <div class="vl-content-block">
            <div class="vl-grid vl-stacked-medium">
                <div class="vl-column vl-column--8 vl-column--m-9 vl-column--s-12 vl-column--xs-12">
                    <vl-side-navigation-reference>
                        <section id="content-1" class="vl-section">
                            <vl-title type="h2">Content 1</vl-title>
                        </section>
                        <section id="content-1-1" class="vl-section">
                            <vl-title type="h3">Content 1 - 1</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-1-2" class="vl-section">
                            <vl-title type="h3">Content 1 - 2</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-1-3" class="vl-section">
                            <vl-title type="h3">Content 1 - 3</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-1-4" class="vl-section">
                            <vl-title type="h3">Content 1 - 4</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-2" class="vl-section">
                            <vl-title type="h2">Content 2</vl-title>
                        </section>
                        <section id="content-2-1" class="vl-section">
                            <vl-title type="h3">Content 2 - 1</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-2-2" class="vl-section">
                            <vl-title type="h3">Content 2 - 2</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-2-3" class="vl-section">
                            <vl-title type="h3">Content 2 - 3</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-2-4" class="vl-section">
                            <vl-title type="h3">Content 2 - 4</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                        <section id="content-3" class="vl-section">
                            <vl-title type="h2">Content 3</vl-title>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>
                    </vl-side-navigation-reference>
                </div>
                <div
                    class="vl-column vl-column--3 vl-column--m-3 vl-column--s-12 vl-column--xs-12 vl-column--start-10 vl-column--s-start-1"
                >
                    <vl-side-navigation aria-label="inhoudsopgave">
                        <vl-side-navigation-h5>Op deze pagina</vl-side-navigation-h5>
                        <vl-side-navigation-content>
                            <vl-side-navigation-group>
                                <vl-side-navigation-item parent="content-1">
                                    <vl-side-navigation-toggle href="#content-1" child="content-1">
                                        content 1
                                    </vl-side-navigation-toggle>
                                    <ul>
                                        <vl-side-navigation-item>
                                            <a href="#content-1-1" parent="content-1">content 1 - 1</a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#content-1-2" parent="content-1">content 1 - 2</a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#content-1-3" parent="content-1">content 1 - 3</a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#content-1-4" parent="content-1">content 1 - 4</a>
                                        </vl-side-navigation-item>
                                    </ul>
                                </vl-side-navigation-item>
                                <vl-side-navigation-item parent="content-2">
                                    <vl-side-navigation-toggle href="#content-2" child="content-2">
                                        content 2
                                    </vl-side-navigation-toggle>
                                    <ul>
                                        <vl-side-navigation-item>
                                            <a href="#content-2-1" parent="content-2">content 2 - 1</a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#content-2-2" parent="content-2">content 2 - 2</a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#content-2-3" parent="content-2">content 2 - 3</a>
                                        </vl-side-navigation-item>
                                        <vl-side-navigation-item>
                                            <a href="#content-2-4" parent="content-2">content 2 - 4</a>
                                        </vl-side-navigation-item>
                                    </ul>
                                </vl-side-navigation-item>
                                <vl-side-navigation-item>
                                    <a href="#content-3"> content 3 </a>
                                </vl-side-navigation-item>
                            </vl-side-navigation-group>
                        </vl-side-navigation-content>
                    </vl-side-navigation>
                </div>
            </div>
        </div>
    </section>
`;

describe('cypress-component - block components - vl-side-navigation', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);

        cy.mount(template);
    });

    it('should mount', () => {
        cy.get('vl-side-navigation');
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-side-navigation', {
            // heading-order rule uitgezet.
            // DV bouwt het zij-menu op dezelfde manier op, hier van afwijken zou de huisstijl veranderen.
            rules: {
                'heading-order': { enabled: false },
            },
        });
        cy.checkA11y('vl-side-navigation-reference');
    });

    it('should be accessible on mobile', () => {
        cy.injectAxe();
        cy.viewport(320, 480);
        cy.checkA11y('vl-side-navigation', {
            // heading-order rule uitgezet.
            // DV bouwt het zij-menu op dezelfde manier op, hier van afwijken zou de huisstijl veranderen.
            rules: {
                'heading-order': { enabled: false },
            },
        });
        cy.checkA11y('vl-side-navigation-reference');
    });

    it('should show child links on scroll', () => {
        cy.get('vl-side-navigation-reference').find('section#content-1-1').scrollIntoView();

        cy.get('vl-side-navigation')
            .find("vl-side-navigation-toggle[href='#content-1']")
            .should('have.attr', 'aria-expanded', 'true');

        cy.get('vl-side-navigation-reference').get('section#content-2-1').scrollIntoView();

        cy.get('vl-side-navigation')
            .find("vl-side-navigation-toggle[href='#content-2']")
            .should('have.attr', 'aria-expanded', 'true');
    });

    it('should set attributes', () => {
        cy.get('vl-side-navigation')
            .should('have.attr', 'side-navigation', '')
            .should('have.attr', 'side-navigation-scrollable', '')
            .should('have.attr', 'scrollspy', '')
            .should('have.attr', 'scrollspy-mobile', 'Navigatie')
            .should('have.attr', 'sticky', '')
            .should('have.attr', 'sticky-offset-top', '0');

        cy.get('vl-side-navigation-reference').should('have.attr', 'scrollspy-content', '');
    });

    it('should set classes', () => {
        cy.get('vl-side-navigation')
            .should('have.class', 'vl-side-navigation')
            .should('have.class', 'js-vl-side-navigation')
            .should('have.class', 'js-vl-sticky')
            .should('have.class', 'js-vl-scrollspy');

        cy.get('vl-side-navigation').find('vl-side-navigation-h5').should('have.class', 'vl-side-navigation__title');

        cy.get('vl-side-navigation')
            .find('vl-side-navigation-content')
            .should('have.class', 'vl-side-navigation__content');

        cy.get('vl-side-navigation').find('vl-side-navigation-group').should('have.class', 'vl-side-navigation__group');

        cy.get('vl-side-navigation').find('vl-side-navigation-item').should('have.class', 'vl-side-navigation__item');

        cy.get('vl-side-navigation').find('vl-side-navigation-item').should('have.attr', 'parent', 'content-1');

        cy.get('vl-side-navigation')
            .find('vl-side-navigation-toggle')
            .should('have.class', 'vl-side-navigation__toggle');

        cy.get('vl-side-navigation-reference').should('have.class', 'js-vl-scrollspy__content');
        cy.get('vl-side-navigation-reference').should('have.class', 'js-vl-scrollspy__content');
    });

    it('should show child links on scroll', () => {
        cy.viewport(1920, 1080);
        const target = '#content-2';
        const shouldHaveExpandedToggle = (href: string, expanded: boolean) => {
            const haveOrNotHave = expanded ? 'have' : 'not.have';
            cy.get('vl-side-navigation')
                .find(`vl-side-navigation-toggle[href="${href}"]`)
                .should(`${haveOrNotHave}.attr`, 'aria-expanded', `${expanded}`);
        };

        shouldHaveExpandedToggle(target, false);

        cy.get(`${target}-1`).scrollIntoView();

        shouldHaveExpandedToggle(target, true);
    });

    it('should scroll to content on click', () => {
        const viewportHeight = 500;
        cy.viewport(1920, viewportHeight);

        cy.get('#content-3').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top < viewportHeight).equal(false);
        });

        cy.get('vl-side-navigation').find("a[href='#content-3']").click();

        cy.wait(300); // about halfway the duration of the scroll animation

        cy.get('#content-3').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top < viewportHeight).equal(false); // should still be animating
        });

        cy.wait(600); // wait for scroll animation to finish

        cy.get('#content-3').then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top < viewportHeight).equal(true);
        });
    });

    it('should not update the browser history on click', () => {
        window.location.hash = ''; // Reset hash before test

        cy.get('vl-side-navigation').find("vl-side-navigation-toggle[href='#content-1']").click();
        cy.location('hash').should('eq', '');

        cy.get('vl-side-navigation').find("vl-side-navigation-toggle[href='#content-2']").click();
        cy.location('hash').should('eq', '');

        cy.get('vl-side-navigation').find("a[href='#content-3']").click();
        cy.location('hash').should('eq', '');
    });

    it('should update the browser history on click in case hash-sync is set', () => {
        window.location.hash = ''; // Reset hash before test

        cy.get('vl-side-navigation').then(([sideNavigation]) => {
            sideNavigation.setAttribute('hash-sync', '');
        });

        cy.get('vl-side-navigation').find("vl-side-navigation-toggle[href='#content-1']").click();
        cy.location('hash').should('eq', '#content-1');

        cy.get('vl-side-navigation').find("vl-side-navigation-toggle[href='#content-2']").click();
        cy.location('hash').should('eq', '#content-2');

        cy.get('vl-side-navigation').find("a[href='#content-3']").click();
        cy.location('hash').should('eq', '#content-3');
    });
});

describe('cypress-component - block components - vl-side-navigation - mobile', () => {
    beforeEach(() => {
        cy.viewport(320, 480);

        cy.mount(template);
        cy.scrollTo(0, 0);
    });

    it('should open mobile menu', () => {
        cy.get('vl-side-navigation').should('have.attr', 'sticky-dressed', 'true');
        cy.get('vl-side-navigation').should('not.be.visible');

        cy.get('vl-side-navigation-reference').find('button.vl-button.js-vl-scrollspy__toggle').click({ force: true });

        cy.get('vl-side-navigation').should('be.visible');
    });

    it('should switch between mobile & desktop', () => {
        cy.viewport(960, 1440);
        cy.get('vl-side-navigation').find('button.vl-button.js-vl-scrollspy__toggle').should('not.exist');
        cy.get('vl-side-navigation').should('be.visible');

        cy.viewport(320, 480);

        cy.get('button.vl-button.js-vl-scrollspy__toggle').should('be.visible');
        cy.get('vl-side-navigation').should('not.be.visible');

        cy.viewport(960, 1440);

        cy.get('button.vl-button.js-vl-scrollspy__toggle').should('not.be.visible');
        cy.get('vl-side-navigation').should('be.visible');
    });
});

describe('cypress-component - block components - vl-side-navigation - with sticky headers', () => {
    it('should adjust scroll offset to sticky header height', () => {
        cy.viewport(1440, 800);

        cy.mount(html`
            <vl-header></vl-header>
            ${template}
        `);

        cy.get('#header__container').then(([headerContainer]) => {
            const headerHeight = headerContainer.getBoundingClientRect().height;
            cy.get('vl-side-navigation').should('have.attr', 'sticky-offset-top', headerHeight);
        });
    });

    it('should adjust scroll offset to sticky functional header height', () => {
        cy.viewport(1440, 800);

        cy.mount(html`
            <vl-functional-header sticky title="Functional header"></vl-functional-header>
            ${template}
        `);

        cy.get('vl-functional-header').then(([vlFunctionalHeader]) => {
            const functionHeaderHeight = vlFunctionalHeader.shadowRoot
                ?.querySelector('.vl-functional-header')
                ?.getBoundingClientRect().height;
            cy.get('vl-side-navigation').should('have.attr', 'sticky-offset-top', functionHeaderHeight);
        });
    });

    it('should adjust scroll offset to header AND sticky functional header height', () => {
        cy.viewport(1440, 800);

        cy.mount(html`
            <vl-header></vl-header>
            <vl-functional-header sticky title="Functional header"></vl-functional-header>
            ${template}
        `);

        cy.get('#header__container').then(([headerContainer]) => {
            const headerHeight = headerContainer.getBoundingClientRect().height;

            cy.get('vl-functional-header').then(([vlFunctionalHeader]) => {
                const functionHeaderHeight =
                    vlFunctionalHeader.shadowRoot?.querySelector('.vl-functional-header')?.getBoundingClientRect()
                        .height || 0;
                cy.get('vl-side-navigation').should(
                    'have.attr',
                    'sticky-offset-top',
                    headerHeight + functionHeaderHeight
                );
            });
        });
    });
});

describe('cypress-component - block components - vl-side-navigation - scrollspy toggle', () => {
    beforeEach(() => {
        cy.viewport(320, 480);

        cy.mount(html`
            <div style="margin-bottom: 1000px;">Extra ruimte voor test</div>
            ${template}
            <div style="margin-top: 1000px;">Extra ruimte voor test</div>
        `);
    });

    it('should show the scrollspy toggle', () => {
        cy.wait(500);
        cy.get('vl-side-navigation-reference').find('button.vl-button.js-vl-scrollspy__toggle').should('exist');
        cy.get('vl-side-navigation-reference')
            .find('button.vl-button.js-vl-scrollspy__toggle')
            .should('not.have.class', 'js-vl-scrollspy__toggle--fixed');
    });
});
