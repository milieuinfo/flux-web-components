import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { VlHeader } from '@domg-wc/components/compliance';
import { html } from 'lit';
import { VlTabsComponent } from '../next/tabs';
import { VlBreadcrumbComponent } from './../breadcrumb';
import { VlFunctionalHeaderComponent } from './vl-functional-header.component';

GlobalStyles.getInstance().register();

registerWebComponents([VlFunctionalHeaderComponent, VlTabsComponent, VlBreadcrumbComponent, VlHeader]);

const mockBackLink = 'https://www.example.com';

const shouldHaveDefaultBackText = () => {
    cy.get('vl-functional-header').shadow().find('#back-link').contains('Terug');
};

const shouldSetBackText = () => {
    cy.get('vl-functional-header').shadow().find('#back-link').contains('Keer terug');
};

const shouldHaveDefaultBackLink = () => {
    cy.get('vl-functional-header').shadow().find('#back-link').should('have.attr', 'href', document.referrer);
};

const shouldSetBackLink = () => {
    cy.get('vl-functional-header').shadow().find('#back-link').should('have.attr', 'href', mockBackLink);
};

const shouldDisableBackLinkAndEmitEvent = () => {
    cy.createStubForEvent('vl-functional-header', 'vl-click-back');
    cy.get('vl-functional-header').shadow().find('#back-link').click({ force: true });
    cy.get('@vl-click-back').should('have.been.calledOnce');
};

const shouldSetTitleLink = () => {
    cy.get('vl-functional-header')
        .shadow()
        .find('.vl-functional-header__title')
        .find('a')
        .should('have.attr', 'href', 'test');
};

const shouldSetSubTitleText = () => {
    cy.get('vl-functional-header')
        .shadow()
        .find('li.vl-functional-header__sub__action')
        .contains('Voor lager onderwijs');
};

const shouldSetTitleText = () => {
    cy.get('vl-functional-header')
        .shadow()
        .find('.vl-functional-header__title')
        .find('a')
        .contains('School en studietoelagen');
};

describe('cypress-component - block components - vl-functional-header', () => {
    it('should be accessible', () => {
        cy.mount(html` <vl-functional-header title="test"></vl-functional-header>`);

        cy.injectAxe();
        cy.checkA11y();
    });

    it('should have default back text', () => {
        cy.mount(html` <vl-functional-header></vl-functional-header>`);

        shouldHaveDefaultBackText();
    });

    it('should set back text', () => {
        cy.mount(html` <vl-functional-header back="Keer terug"></vl-functional-header>`);

        shouldSetBackText();
    });

    it('should have default back link', () => {
        cy.mount(html` <vl-functional-header></vl-functional-header>`);

        shouldHaveDefaultBackLink();
    });

    it('should set back link', () => {
        cy.mount(html` <vl-functional-header back-link="${mockBackLink}"></vl-functional-header>`);

        shouldSetBackLink();
    });

    it('should hide back link', () => {
        cy.mount(html` <vl-functional-header hide-back-link></vl-functional-header>`);

        cy.get('vl-functional-header').shadow().find('#back-link').should('not.exist');
    });

    it('should hide sub-header', () => {
        cy.mount(html` <vl-functional-header hide-sub-header></vl-functional-header>`);

        cy.get('vl-functional-header')
            .shadow()
            .find('#sub-header')
            .should('have.class', 'sub-header-hidden')
            .shouldHaveComputedStyle({ style: 'padding-bottom', value: '13px' })
            .find('slot')
            .and('not.be.visible');
    });

    it('should disable back link and emit event', () => {
        cy.mount(html` <vl-functional-header disable-back-link></vl-functional-header>`);

        cy.get('vl-functional-header').shadow().find('#back-link').should('have.attr', 'button-as-link');

        shouldDisableBackLinkAndEmitEvent();
    });

    it('should set title link', () => {
        cy.mount(html` <vl-functional-header link="test"></vl-functional-header>`);

        shouldSetTitleLink();
    });

    it('should set sub title text', () => {
        cy.mount(html` <vl-functional-header sub-title="Voor lager onderwijs"></vl-functional-header>`);

        shouldSetSubTitleText();
    });

    it('should set title text', () => {
        cy.mount(html` <vl-functional-header title="School en studietoelagen"></vl-functional-header>`);

        shouldSetTitleText();
    });
});

describe('cypress-component - block components - vl-functional-header - actions', () => {
    it('should be accessible', () => {
        cy.mount(html`
            <vl-functional-header title="test">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        cy.injectAxe();
        cy.checkA11y();
    });

    it('should have default back text', () => {
        cy.mount(html`
            <vl-functional-header>
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldHaveDefaultBackText();
    });

    it('should set back text', () => {
        cy.mount(html`
            <vl-functional-header back="Keer terug">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldSetBackText();
    });

    it('should have default back link', () => {
        cy.mount(html`
            <vl-functional-header>
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldHaveDefaultBackLink();
    });

    it('should set back link', () => {
        cy.mount(html`
            <vl-functional-header back-link="${mockBackLink}">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldSetBackLink();
    });

    it('should disable back link and emit event', () => {
        cy.mount(html`
            <vl-functional-header disable-back-link="">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldDisableBackLinkAndEmitEvent();
    });

    it('should set title link', () => {
        cy.mount(html`
            <vl-functional-header link="test">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldSetTitleLink();
    });

    it('should set sub title text', () => {
        cy.mount(html`
            <vl-functional-header sub-title="Voor lager onderwijs">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldSetSubTitleText();
    });

    it('should set title text', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        shouldSetTitleText();
    });

    it('should set actions slot', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <div slot="actions">
                    <a href="#">Actie 1</a>
                    <a href="#">Actie 2</a>
                </div>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header')
            .shadow()
            .find('div.vl-functional-header__actions')
            .find('li.vl-functional-header__action')
            .find('a')
            .should('have.attr', 'href', '#')
            .contains('Actie 1');

        cy.get('vl-functional-header')
            .shadow()
            .find('div.vl-functional-header__actions')
            .find('li.vl-functional-header__action')
            .find('a')
            .should('have.attr', 'href', '#')
            .contains('Actie 2');
    });
});

describe('cypress-component - block components - vl-functional-header - tabs', () => {
    it('should be accessible', () => {
        cy.mount(html`
            <vl-functional-header title="test">
                <vl-tabs-next slot="sub-header" horizontal-navigation label="Transportmiddelen">
                    <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                    <vl-tab-link-next href="#metro">Metro, tram en bus</vl-tab-link-next>
                    <vl-tab-link-next href="#fiets">Fiets</vl-tab-link-next>
                </vl-tabs-next>
            </vl-functional-header>
        `);

        cy.injectAxe();
        cy.checkA11y();
    });

    it('should set title link', () => {
        cy.mount(html`
            <vl-functional-header link="test">
                <vl-tabs-next slot="sub-header" horizontal-navigation label="Transportmiddelen">
                    <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                    <vl-tab-link-next href="#metro">Metro, tram en bus</vl-tab-link-next>
                    <vl-tab-link-next href="#fiets">Fiets</vl-tab-link-next>
                </vl-tabs-next>
            </vl-functional-header>
        `);

        shouldSetTitleLink();
    });

    it('should set title text', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <vl-tabs-next slot="sub-header" horizontal-navigation label="Transportmiddelen">
                    <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                    <vl-tab-link-next href="#metro">Metro, tram en bus</vl-tab-link-next>
                    <vl-tab-link-next href="#fiets">Fiets</vl-tab-link-next>
                </vl-tabs-next>
            </vl-functional-header>
        `);

        shouldSetTitleText();
    });

    it('should have three tabs with titles', () => {
        cy.mount(html`
            <vl-functional-header>
                <vl-tabs-next slot="sub-header" horizontal-navigation label="Transportmiddelen">
                    <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                    <vl-tab-link-next href="#metro">Metro, tram en bus</vl-tab-link-next>
                    <vl-tab-link-next href="#fiets">Fiets</vl-tab-link-next>
                </vl-tabs-next>
            </vl-functional-header>
        `);

        cy.get('vl-tabs-next').find('vl-tab-link-next').first().contains('Trein');

        cy.get('vl-tabs-next').find('vl-tab-link-next').eq(1).contains('Metro, tram en bus');

        cy.get('vl-tabs-next').find('vl-tab-link-next').last().contains('Fiets');
    });

    it('should emit event on click tab', () => {
        cy.mount(html`
            <vl-functional-header>
                <vl-tabs-next slot="sub-header" horizontal-navigation label="Transportmiddelen">
                    <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                    <vl-tab-link-next href="#metro">Metro, tram en bus</vl-tab-link-next>
                    <vl-tab-link-next href="#fiets">Fiets</vl-tab-link-next>
                </vl-tabs-next>
            </vl-functional-header>
        `);

        cy.get('vl-tabs-next').then(($tabs) => {
            const tabs = $tabs[0];
            const spy = cy.spy();
            tabs.addEventListener('vl-tab-link-click', spy);
            cy.wrap(spy).as('tabLinkClick');
        });

        cy.get('vl-tabs-next').find('vl-tab-link-next').first().shadow().find('a').click({ force: true });
        cy.get('@tabLinkClick').should('have.been.calledOnce');
    });

    it('should open/close tablist on mobile', () => {
        cy.viewport(550, 750);
        cy.mount(html`
            <vl-functional-header>
                <vl-tabs-next slot="sub-header" horizontal-navigation label="Transportmiddelen">
                    <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                    <vl-tab-link-next href="#metro">Metro, tram en bus</vl-tab-link-next>
                    <vl-tab-link-next href="#fiets">Fiets</vl-tab-link-next>
                </vl-tabs-next>
            </vl-functional-header>
        `);

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('be.visible');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('not.be.visible');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').click();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('be.visible');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').click();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('not.be.visible');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').click();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('be.visible');
        cy.get('vl-tabs-next')
            .shadow()
            .find('.vl-tabs__mobile-dropdown')
            .find('.vl-tabs__mobile-option')
            .first()
            .click();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('not.be.visible');
    });
});

describe('cypress-component - block components - vl-functional-header - breadcrumb', () => {
    it('should be accessible', () => {
        cy.mount(html`
            <vl-functional-header title="test">
                <vl-breadcrumb slot="sub-title">
                    <vl-breadcrumb-item href="1">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="2">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="3">Webuniversum</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
                </vl-breadcrumb>
            </vl-functional-header>
        `);

        cy.injectAxe();
        cy.checkA11y();
    });

    it('should set title link', () => {
        cy.mount(html`
            <vl-functional-header link="test">
                <vl-breadcrumb slot="sub-title">
                    <vl-breadcrumb-item href="1">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="2">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="3">Webuniversum</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
                </vl-breadcrumb>
            </vl-functional-header>
        `);

        shouldSetTitleLink();
    });

    it('should set title text', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <vl-breadcrumb slot="sub-title">
                    <vl-breadcrumb-item href="1">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="2">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="3">Webuniversum</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
                </vl-breadcrumb>
            </vl-functional-header>
        `);

        shouldSetTitleText();
    });

    it('should contain 4 breadcrumb items', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <vl-breadcrumb slot="sub-title">
                    <vl-breadcrumb-item href="1">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="2">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="3">Webuniversum</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
                </vl-breadcrumb>
            </vl-functional-header>
        `);

        cy.get('vl-breadcrumb')
            .shadow()
            .find('.vl-breadcrumb__list')
            .children('.vl-breadcrumb__list__item')
            .should('have.length', 4);
    });

    it('should contain correct breadcrumb items', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <vl-breadcrumb slot="sub-title">
                    <vl-breadcrumb-item href="1">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="2">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="3">Webuniversum</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
                </vl-breadcrumb>
            </vl-functional-header>
        `);

        cy.get('vl-breadcrumb')
            .find('vl-breadcrumb-item')
            .first()
            .contains('Vlaanderen Intern')
            .next()
            .contains('Regelgeving')
            .next()
            .contains('Webuniversum')
            .next()
            .contains('Componenten');
    });

    it('should set correct links for breadcrumb items', () => {
        cy.mount(html`
            <vl-functional-header title="School en studietoelagen">
                <vl-breadcrumb slot="sub-title">
                    <vl-breadcrumb-item href="1">Vlaanderen Intern</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="2">Regelgeving</vl-breadcrumb-item>
                    <vl-breadcrumb-item href="3">Webuniversum</vl-breadcrumb-item>
                    <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
                </vl-breadcrumb>
            </vl-functional-header>
        `);

        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(0).shadow().find('a').should('have.attr', 'href', '1');
        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(1).shadow().find('a').should('have.attr', 'href', '2');
        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(2).shadow().find('a').should('have.attr', 'href', '3');
        cy.get('vl-breadcrumb').find('vl-breadcrumb-item').eq(3).shadow().find('span');
    });
});

describe('cypress-component - block components - vl-functional-header - slots', () => {
    it('should be accessible', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.injectAxe();
        cy.checkA11y();
    });

    it('should set title slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="title">School- en studietoelagen</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header')
            .shadow()
            .find('.vl-functional-header__title')
            .find('a')
            .find('slot[name="title"]');
        cy.get('vl-functional-header').find('span[slot="title"]').contains('School- en studietoelagen');
    });

    it('should set sub header slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header').shadow().find('div.vl-functional-header__sub').find('slot[name="sub-header"]');
        cy.get('vl-functional-header').find('span[slot="sub-header"]').contains('Sub header content');
    });

    it('should set sub title slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header')
            .shadow()
            .find('li.vl-functional-header__sub__action')
            .find('slot[name="sub-title"]');

        cy.get('vl-functional-header')
            .find('span[slot="sub-title"]')
            .contains('Voor lager, middelbaar en hoger onderwijs');
    });

    it('should set back link slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header')
            .shadow()
            .find('li.vl-functional-header__sub__action')
            .find('slot[name="back-link"]');

        cy.get('vl-functional-header').find('a[slot="back-link"]').should('have.attr', 'href', '#').contains('Terug');
    });

    it('should set back slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header').shadow().find('li.vl-functional-header__sub__action').find('slot[name="back"]');
        cy.get('vl-functional-header').find('span[slot="back"]').contains('Terug');
    });

    it('should set top-left slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header').shadow().find('div.vl-functional-header__content').find('slot[name="top-left"]');
        cy.get('vl-functional-header').find('span[slot="top-left"]').contains('Linkerbovenhoek content');
    });

    it('should set top-right slot', () => {
        cy.mount(html`
            <vl-functional-header>
                <span slot="back">Terug</span>
                <a slot="back-link" href="#">Terug</a>
                <span slot="sub-header">Sub header content</span>
                <span slot="sub-title">Voor lager, middelbaar en hoger onderwijs</span>
                <span slot="title">School- en studietoelagen</span>
                <span slot="top-left">Linkerbovenhoek content</span>
                <span slot="top-right">Rechterbovenhoek content</span>
            </vl-functional-header>
        `);

        cy.get('vl-functional-header')
            .shadow()
            .find('div.flux-functional-header__top-right')
            .find('slot[name="top-right"]');

        cy.get('vl-functional-header').find('span[slot="top-right"]').contains('Rechterbovenhoek content');
    });
});

describe('cypress-component - block components - vl-functional-header - sticky', () => {
    it('should set sticky offset top CSS variable when sticky attribute is set', () => {
        cy.viewport(1440, 800);
        cy.mount(html` <vl-functional-header sticky title="test"></vl-functional-header>`);

        cy.get('vl-functional-header').shouldHaveComputedStyle({
            style: '--vl-functional-header--sticky-offset-top',
            value: '0px',
        });
    });

    it('should set sticky offset top CSS variable when header is present', () => {
        cy.viewport(1440, 800);
        cy.mount(html`
            <!-- dummy vl-header -->
            <vl-header></vl-header>
            <vl-functional-header sticky title="test"></vl-functional-header>
        `);

        cy.get('#header__container').should('exist');

        cy.get('vl-header').then(([vlHeader]) => {
            const headerHeight = (vlHeader as VlHeader).height;
            expect(headerHeight).to.equal(43);

            vlHeader.dispatchEvent(new Event('ready'));

            cy.get('vl-functional-header').shouldHaveComputedStyle({
                style: '--vl-functional-header--sticky-offset-top',
                value: '43px',
            });
        });
    });
});

describe('cypress-component - block components - vl-functional-header - skip-to-content-id', () => {
    it('should not create a skip-link when skip-to-content-id is not set', () => {
        cy.mount(html` <vl-functional-header></vl-functional-header> `);

        cy.get('vl-functional-header').shadow().find(`a.vl-skip-link`).should('not.exist');
    });

    it('should warn the user when skip-to-content-id is not set', () => {
        cy.spy(console, 'warn').as('warn');

        cy.mount(html` <vl-functional-header></vl-functional-header> `);

        cy.get('@warn').should('have.been.calledOnce');
        cy.get('@warn').should(
            'have.been.calledWith',
            'vl-functional-header -',
            'Denk eraan om een skip-to-content-id mee te geven zodat er een skip-link kan gerenderd worden.',
            'Gebruik hiervoor de ID van de eerste heading van de content.',
            '(WCAG 2.4.1: https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)'
        );
    });

    it('should create a skip-link when skip-to-content-id is set', () => {
        const mockSkipToContentId = 'test-id';
        cy.mount(html` <vl-functional-header skip-to-content-id="${mockSkipToContentId}"></vl-functional-header> `);

        cy.get('vl-functional-header').shadow().find(`a[href="#${mockSkipToContentId}"].vl-skip-link`).should('exist');
    });

    it('should show the skip-link on focus', () => {
        const mockSkipToContentId = 'test-id';
        cy.mount(html` <vl-functional-header skip-to-content-id="${mockSkipToContentId}"></vl-functional-header> `);

        cy.get('vl-functional-header')
            .shadow()
            .find(`a[href="#${mockSkipToContentId}"].vl-skip-link`)
            .then(([skipLink]) => {
                expect(skipLink.getBoundingClientRect().width).to.equal(1);
                expect(skipLink.getBoundingClientRect().height).to.equal(1);
                skipLink.focus();
                expect(skipLink.getBoundingClientRect().width).to.be.greaterThan(1);
                expect(skipLink.getBoundingClientRect().height).to.be.greaterThan(1);
                skipLink.blur();
                expect(skipLink.getBoundingClientRect().width).to.equal(1);
                expect(skipLink.getBoundingClientRect().height).to.equal(1);
            });
    });
});
