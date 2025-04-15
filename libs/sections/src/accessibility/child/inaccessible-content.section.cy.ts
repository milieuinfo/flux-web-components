import { registerWebComponents } from '@domg-wc/common-utilities';
import { COMPLIANCE_STATUS, EVALUATION_STATUS } from '../vl-accessibility.model';
import {
    type InaccessibleContentProps,
    inaccessibleContent,
    inaccessibleContentElements,
} from './inaccessible-content.section';

const mountDefault = (props: InaccessibleContentProps) => cy.mount(inaccessibleContent(props));

registerWebComponents(inaccessibleContentElements());
const baseProps: InaccessibleContentProps = {
    compliance: COMPLIANCE_STATUS.NOT_COMPLIANT,
    evaluation: EVALUATION_STATUS.EXPERT_EVALUATED,
    limitations: {
        withTiming: undefined,
        withoutTiming: undefined,
        outsideApplicableLaw: undefined,
    },
};

describe('component  inaccessible-content - default', () => {
    beforeEach(() => {
        mountDefault(baseProps);
    });

    it('should mount', () => {
        cy.get('div[id="inaccessible-content"]');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('div[id="inaccessible-content"]');
    });

    it('should render with some basic styling from DV - h2 should have the correct style', () => {
        cy.get('div[id="inaccessible-content"]')
            .find('vl-title[type="h2"]')
            .shadow()
            .find('h2')
            .should('have.css', 'font-size', '26px')
            .should('have.css', 'line-height', '32.24px');
    });
});

describe('component  inaccessible-content - EVALUATION_STATUS && COMPLIANCE messages and css', () => {
    it('should render the NOT_EVALUATED message when evaluation == NOT_EVALUATED', () => {
        mountDefault({ ...baseProps, evaluation: EVALUATION_STATUS.NOT_EVALUATED });

        cy.contains('De niet-toegankelijke inhoud is onbekend omdat de website niet is getest.');
    });

    it('should render the FULLY_COMPLIANT message when compliance == FULLY_COMPLIANT', () => {
        mountDefault({ ...baseProps, compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT });

        cy.contains('Er is geen niet-toegankelijke inhoud omdat de website volledig toegankelijk is.');
    });

    it('should hide content for FULLY_COMPLIANT websites', () => {
        mountDefault({
            ...baseProps,
            compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
            evaluation: EVALUATION_STATUS.EXPERT_EVALUATED,
        });
        cy.get('div[id="inaccessible-content"]').should('have.css', 'display', 'none');
    });
});

describe('component  inaccessible-content - LIMITATIONS messages', () => {
    it('should render the LIMITATIONS messages when limitations are present', () => {
        mountDefault({
            ...baseProps,
            limitations: {
                withTiming: ['Limitation 1', 'Limitation 2'],
                withoutTiming: ['Limitation 3', 'Limitation 4'],
                outsideApplicableLaw: ['Limitation 5', 'Limitation 6'],
            },
        });

        cy.contains('Niet-naleving van het bestuursdecreet');
        cy.contains('Onevenredige last');
        cy.contains('De inhoud valt buiten de werkingssfeer van de toepasselijke wetgeving');
    });

    it('should NOT render the LIMITATIONS messages when limitations are NOT present', () => {
        mountDefault({ ...baseProps });

        cy.get('div[id="inaccessible-content"]').should('not.contain', 'Niet-naleving van het bestuursdecreet');
        cy.get('div[id="inaccessible-content"]').should('not.contain', 'Onevenredige last');
        cy.get('div[id="inaccessible-content"]').should(
            'not.contain',
            'De inhoud valt buiten de werkingssfeer van de toepasselijke wetgeving'
        );
    });

    it('should render limitations with timing', () => {
        mountDefault({
            ...baseProps,
            limitations: {
                withTiming: ['Limitation 1', 'Limitation 2'],
            },
        });

        cy.contains('Niet-naleving van het bestuursdecreet');
        cy.contains('Limitation 1');
        cy.contains('Limitation 2');
    });

    it('should render limitations with withoutTiming', () => {
        mountDefault({
            ...baseProps,
            limitations: {
                withoutTiming: ['Limitation 3', 'Limitation 4'],
            },
        });

        cy.contains('Onevenredige last');
        cy.contains('Limitation 3');
        cy.contains('Limitation 4');
    });

    it('should render limitations with outsideApplicableLaw', () => {
        mountDefault({
            ...baseProps,
            limitations: {
                outsideApplicableLaw: ['Limitation 5', 'Limitation 6'],
            },
        });

        cy.contains('De inhoud valt buiten de werkingssfeer van de toepasselijke wetgeving');
        cy.contains('Limitation 5');
        cy.contains('Limitation 6');
    });
});

describe('inaccessible-content component - helper function <inaccessibleContentElements()> ', () => {
    it('should return an array of WebComponents with a length of 2', () => {
        const elements = inaccessibleContentElements();
        expect(elements).to.be.an('array');
        expect(elements).to.have.length(2);
    });
});
