import { registerWebComponents } from '@domg-wc/common';
import { VlLinkComponent } from '@domg-wc/components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { AccessibilityProperties } from './vl-accessibility.model';
import { VlAccessibility } from './vl-accessibility.section';

registerWebComponents([VlAccessibility, VlLinkComponent]);

type MountDefaultProps = AccessibilityProperties & { onClickBack?: () => void; headerSlot?: string };

const mountDefault = ({ ...props }: MountDefaultProps) =>
    cy.mount(html` <vl-accessibility
        application=${props.application}
        compliance=${props.compliance}
        date=${props.date}
        date-modified=${props.dateModified}
        ?disable-back-link=${props.disableBackLink}
        ?hide-back-link=${props.hideBackLink}
        evaluation=${props.evaluation}
        version=${props.version}
        .limitations=${props.limitations}
    >
        ${unsafeHTML(props.headerSlot)}
    </vl-accessibility>`);

const defaultProps: MountDefaultProps = {
    application: 'deze applicatie',
    compliance: 'PARTIALLY_COMPLIANT',
    date: '20 juli 2021',
    dateModified: '20 juli 2021',
    disableBackLink: false,
    hideBackLink: false,
    evaluation: 'NOT_EVALUATED',
    version: '1.0.0',
    limitations: undefined,
    onClickBack: () => {},
    headerSlot: undefined,
};

describe('component vl-accessibility', () => {
    beforeEach(() => {
        mountDefault(defaultProps);
    });

    it('should mount', () => {
        cy.get('vl-accessibility').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-accessibility');
    });
});

describe('component vl-accessibility - properties default ', () => {
    it('should have default values properties', () => {
        mountDefault(defaultProps);

        cy.get('vl-accessibility').should('have.attr', 'application', defaultProps.application);
        cy.get('vl-accessibility').should('have.attr', 'compliance', defaultProps.compliance);
        cy.get('vl-accessibility').should('have.attr', 'date', defaultProps.date);
        cy.get('vl-accessibility').should('have.attr', 'date-modified', defaultProps.dateModified);
        cy.get('vl-accessibility').should('not.have.attr', 'disable-back-link', defaultProps.disableBackLink);
        cy.get('vl-accessibility').should('not.have.attr', 'hide-back-link', defaultProps.hideBackLink);
        cy.get('vl-accessibility').should('have.attr', 'evaluation', defaultProps.evaluation);
        cy.get('vl-accessibility').should('have.attr', 'version', defaultProps.version);
        cy.get('vl-accessibility').should('not.have.attr', 'limitations', defaultProps.limitations);
    });
});

describe('component vl-accessibility - properties reflect ', () => {
    it('should reflect the <application> attribute', () => {
        mountDefault({ ...defaultProps, application: 'Omgeving' });

        cy.get('vl-accessibility').should('have.attr', 'application', 'Omgeving');
    });

    it('should reflect the <compliance> attribute', () => {
        mountDefault({ ...defaultProps, compliance: 'NOT_COMPLIANT' });

        cy.get('vl-accessibility').should('have.attr', 'compliance', 'NOT_COMPLIANT');
    });

    it('should reflect the <date> attribute', () => {
        mountDefault({ ...defaultProps, date: '27 januari 2024' });

        cy.get('vl-accessibility').should('have.attr', 'date', '27 januari 2024');
    });

    it('should reflect the <dateModified> attribute', () => {
        mountDefault({ ...defaultProps, dateModified: '27 januari 2024' });

        cy.get('vl-accessibility').should('have.attr', 'date-modified', '27 januari 2024');
    });

    it('should reflect the <disableBackLink> attribute', () => {
        mountDefault({ ...defaultProps, disableBackLink: true });

        cy.get('vl-accessibility').should('have.attr', 'disable-back-link');
    });

    it('should reflect the <hideBackLink> attribute', () => {
        mountDefault({ ...defaultProps, hideBackLink: true });

        cy.get('vl-accessibility').should('have.attr', 'hide-back-link');
    });

    it('should reflect the <evaluation> attribute', () => {
        mountDefault({ ...defaultProps, evaluation: 'EXPERT_EVALUATED' });

        cy.get('vl-accessibility').should('have.attr', 'evaluation', 'EXPERT_EVALUATED');
    });

    it('should reflect the <version> attribute', () => {
        mountDefault({ ...defaultProps, version: 'v24' });

        cy.get('vl-accessibility').should('have.attr', 'version', 'v24');
    });
});

describe('component vl-accessibility - hide-back-link', () => {
    it('back-link should be visible', () => {
        mountDefault({ ...defaultProps, hideBackLink: false });

        cy.get('vl-accessibility').should('not.have.attr', 'hide-back-link');
        cy.get('vl-accessibility').shadow().find('vl-functional-header').should('not.have.attr', 'hide-back-link');
        cy.get('vl-accessibility').shadow().find('vl-functional-header').shadow().find('a#back-link').should('exist');
    });

    it('back-link should be hidden', () => {
        mountDefault({ ...defaultProps, hideBackLink: true });

        cy.get('vl-accessibility').should('have.attr', 'hide-back-link');
        cy.get('vl-accessibility').shadow().find('vl-functional-header').should('have.attr', 'hide-back-link');
        cy.get('vl-accessibility')
            .shadow()
            .find('vl-functional-header')
            .shadow()
            .find('a#back-link')
            .should('not.exist');
    });
});

describe('component vl-accessibility - header slot', () => {
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

        cy.get('vl-accessibility').find('vl-functional-header').should('exist');
    });
});
