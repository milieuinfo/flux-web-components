import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { registerWebComponents } from '@domg-wc/common';
import { VlPrivacy } from './vl-privacy.section';
import { privacyDefaults } from './vl-privacy.defaults';

registerWebComponents([VlPrivacy]);

const mountDefault = ({ ...props }: typeof privacyDefaults) =>
    cy.mount(html` <vl-privacy
        data-vl-date=${props.date}
        data-vl-version=${props.version}
        ?data-vl-disable-back-link=${props.disableBackLink}
        ?data-vl-hide-back-link=${props.hideBackLink}
    >
        ${unsafeHTML(props.headerSlot)} ${unsafeHTML(props.versionSlot)} ${unsafeHTML(props.contentSlot)}
        ${unsafeHTML(props.bottomSlot)}
    </vl-privacy>`);

const defaultProps = privacyDefaults;

describe('vl-privacy component', () => {
    beforeEach(() => {
        mountDefault(defaultProps);
        cy.viewport(960, 1440);
    });

    it('should mount', () => {
        cy.get('vl-privacy').shadow();
    });

    it('should be accessible', () => {
        cy.get('vl-privacy');

        cy.injectAxe();
        cy.checkA11y('vl-privacy');
    });

    it('should have privacy header', () => {
        cy.get('vl-privacy');

        cy.get('vl-privacy').shadow().find('vl-title[type="h1"]').contains('Privacy');
    });
});

describe('vl-privacy component - properties default ', () => {
    it('should have default values for properties', () => {
        mountDefault(defaultProps);

        cy.get('vl-privacy').should('have.attr', 'data-vl-date', defaultProps.date);
        cy.get('vl-privacy').should('not.have.attr', 'data-vl-disable-back-link', defaultProps.disableBackLink);
        cy.get('vl-privacy').should('have.attr', 'data-vl-version', defaultProps.version);
    });
});

describe('vl-privacy component - properties reflect ', () => {
    it('should reflect the <date> attribute', () => {
        mountDefault({ ...defaultProps, date: '27 januari 2024' });

        cy.get('vl-privacy').should('have.attr', 'data-vl-date', '27 januari 2024');
    });

    it('should reflect the <disableBackLink> attribute', () => {
        mountDefault({ ...defaultProps, disableBackLink: true });

        cy.get('vl-privacy').should('have.attr', 'data-vl-disable-back-link');
        cy.get('vl-privacy').shadow().find('vl-functional-header').should('have.attr', 'data-vl-disable-back-link');
    });

    it('should reflect the <hideBackLink> attribute', () => {
        mountDefault({ ...defaultProps, hideBackLink: true });

        cy.get('vl-privacy').should('have.attr', 'data-vl-hide-back-link');
        cy.get('vl-privacy').shadow().find('vl-functional-header').should('have.attr', 'data-vl-hide-back-link');
    });

    it('should reflect the <version> attribute', () => {
        mountDefault({ ...defaultProps, version: 'v24' });

        cy.get('vl-privacy').should('have.attr', 'data-vl-version', 'v24');
    });
});

describe('vl-privacy component - properties functionality', () => {
    it('should disable back link and emit event', () => {
        mountDefault({ ...defaultProps, disableBackLink: true });

        cy.createStubForEvent('vl-privacy', 'vl-click-back');
        cy.get('vl-privacy').shadow().find('vl-functional-header').shadow().find('a#back-link').click();
        cy.get('@vl-click-back').should('have.been.calledOnce');
    });
    it('should show child links on scroll', () => {
        cy.viewport(1920, 1080);
        mountDefault(defaultProps);

        const shouldHaveExpandedToggle = (href: string, expanded: boolean) => {
            const have = expanded ? 'have' : 'not.have';
            cy.get('vl-privacy')
                .shadow()
                .find('vl-side-navigation')
                .find(`vl-side-navigation-toggle[href="${href}"]`)
                .should(`${have}.attr`, 'aria-expanded', `${expanded}`);
        };

        shouldHaveExpandedToggle('#privacy-declaration', false);

        cy.get('vl-privacy').shadow().find('vl-title#privacy-declaration').scrollIntoView();

        shouldHaveExpandedToggle('#privacy-declaration', true);
    });
});

describe('vl-privacy component - slots', () => {
    it('should replace default header with custom header', () => {
        mountDefault({
            ...defaultProps,
            headerSlot: `<vl-functional-header
        data-vl-title="Toegankelijkheidsverklaring"
        data-vl-title-level="1"
        data-vl-no-border
        data-vl-no-background
    >
        <vl-link id="back-link" href="https://overheid.vlaanderen.be">
            Start
        </vl-link>
    </vl-functional-header>`,
        });

        cy.get('vl-privacy').find('vl-functional-header').should('exist');
    });

    it('should replace default version with custom version', () => {
        mountDefault({
            ...defaultProps,
            versionSlot: `<div slot="version"> <p>Version 2.0.0</p> </div>`,
        });

        cy.get('vl-privacy').find('p').contains('Version 2.0.0');
    });

    it('should replace default content with custom content in shadow dom', () => {
        mountDefault({
            ...defaultProps,
            contentSlot: `<div slot="content"> <p>Content</p> </div>`,
        });

        cy.get('vl-privacy').shadow().find('p').contains('Content');
    });

    it('should replace default bottom part with custom bottom part', () => {
        mountDefault({
            ...defaultProps,
            bottomSlot: `<div slot="bottom"> <p>Ending note</p> </div>`,
        });

        cy.get('vl-privacy').find('p').contains('Ending note');
    });
});
