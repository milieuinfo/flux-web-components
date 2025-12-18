import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlPrivacy } from './vl-privacy.component';
import { privacyDefaults } from './vl-privacy.defaults';

registerWebComponents([VlPrivacy]);

const mountDefault = ({ ...props }: typeof privacyDefaults) =>
    cy.mount(html` <vl-privacy
        date=${props.date}
        version=${props.version}
        ?disable-back-link=${props.disableBackLink}
        ?hide-back-link=${props.hideBackLink}
    >
        ${unsafeHTML(props.headerSlot)} ${unsafeHTML(props.versionSlot)} ${unsafeHTML(props.contentSlot)}
        ${unsafeHTML(props.bottomSlot)}
    </vl-privacy>`);

const defaultProps = privacyDefaults;

describe('cypress-component - compliance components - vl-privacy', () => {
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
        // Schakel de skip‑link‑regel uit.
        // De target wordt niet gevonden door de shadow DOM.
        // De skip-link wordt verder getest in de vl-functional-header tests.
        cy.configureAxe({
            rules: [{ id: 'skip-link', enabled: false }],
        });
        cy.checkA11y('vl-privacy');
    });

    it('should have privacy header', () => {
        cy.get('vl-privacy');

        cy.get('vl-privacy').shadow().find('vl-title[type="h1"]').contains('Privacy');
    });
});

describe('cypress-component - compliance components - vl-privacy - properties default ', () => {
    it('should have default values for properties', () => {
        mountDefault(defaultProps);

        cy.get('vl-privacy').should('have.attr', 'date', defaultProps.date);
        cy.get('vl-privacy').should('not.have.attr', 'disable-back-link', defaultProps.disableBackLink);
        cy.get('vl-privacy').should('have.attr', 'version', defaultProps.version);
    });
});

describe('cypress-component - compliance components - vl-privacy - properties reflect ', () => {
    it('should reflect the <date> attribute', () => {
        mountDefault({ ...defaultProps, date: '27 januari 2024' });

        cy.get('vl-privacy').should('have.attr', 'date', '27 januari 2024');
    });

    it('should reflect the <disableBackLink> attribute', () => {
        mountDefault({ ...defaultProps, disableBackLink: true });

        cy.get('vl-privacy').should('have.attr', 'disable-back-link');
        cy.get('vl-privacy').shadow().find('vl-functional-header').should('have.attr', 'disable-back-link');
    });

    it('should reflect the <hideBackLink> attribute', () => {
        mountDefault({ ...defaultProps, hideBackLink: true });

        cy.get('vl-privacy').should('have.attr', 'hide-back-link');
        cy.get('vl-privacy').shadow().find('vl-functional-header').should('have.attr', 'hide-back-link');
    });

    it('should reflect the <version> attribute', () => {
        mountDefault({ ...defaultProps, version: 'v24' });

        cy.get('vl-privacy').should('have.attr', 'version', 'v24');
    });
});

describe('cypress-component - compliance components - vl-privacy - properties functionality', () => {
    it('should disable back link and emit event', () => {
        mountDefault({ ...defaultProps, disableBackLink: true });

        cy.createStubForEvent('vl-privacy', 'vl-click-back');
        cy.get('vl-privacy').shadow().find('vl-functional-header').shadow().find('#back-link').click();
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

describe('cypress-component - compliance components - vl-privacy - slots', () => {
    it('should replace default header with custom header', () => {
        mountDefault({
            ...defaultProps,
            headerSlot: `<vl-functional-header
        title="Toegankelijkheidsverklaring"
        title-level="1"
        no-border
        no-background
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
