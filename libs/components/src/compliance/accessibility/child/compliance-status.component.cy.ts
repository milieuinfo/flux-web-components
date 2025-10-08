import { COMPLIANCE_STATUS, EVALUATION_STATUS } from '../vl-accessibility.model';
import { type ComplianceStatusProps, complianceStatus } from './compliance-status.component';

const mountDefault = ({ compliance, evaluation }: ComplianceStatusProps) =>
    cy.mount(complianceStatus({ compliance, evaluation }));

describe('cypress-component - compliance components - accessibility compliance-status', () => {
    const props: ComplianceStatusProps = {
        compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
        evaluation: EVALUATION_STATUS.EXPERT_EVALUATED,
    };

    beforeEach(() => {
        mountDefault({ ...props });
    });

    it('should mount', () => {
        cy.get('[data-cy-root]').within(() => {
            cy.get('div[id="compliance-status"]').should('exist');
        });
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('div[id="compliance-status"]');
    });

    it('should render with some basic styling from DV - h2 should have the correct style', () => {
        cy.get('div[id="compliance-status"]').should('have.class', 'vl-column--m-12');
    });
});

describe('cypress-component - compliance components - accessibility compliance-status - EVALUATION_STATUS messages', () => {
    const props: ComplianceStatusProps = {
        compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
        evaluation: EVALUATION_STATUS.NOT_EVALUATED,
    };

    it('should render the NOT_EVALUATED message when evaluation == NOT_EVALUATED', () => {
        mountDefault({ ...props });
        cy.get('div[id="compliance-status"]').contains('Deze website voldoet niet aan de');
    });

    it('should NOT render the NOT_EVALUATED message when evaluation == *-EVALUATED', () => {
        mountDefault({ ...props, evaluation: EVALUATION_STATUS.EXPERT_EVALUATED });
        cy.get('div[id="compliance-status"]').should('not.contain', 'Deze website voldoet niet aan de');
    });
});

describe('cypress-component - compliance components - accessibility compliance-status - COMPLIANCE_STATUS messages', () => {
    const props: ComplianceStatusProps = {
        compliance: COMPLIANCE_STATUS.FULLY_COMPLIANT,
        evaluation: EVALUATION_STATUS.SELF_EVALUATED,
    };

    it('should render the FULLY_COMPLIANT message when compliance == FULLY_COMPLIANT', () => {
        mountDefault({ ...props });
        cy.get('div[id="compliance-status"]').contains('Deze website voldoet volledig aan de ');
    });

    it('should render the PARTIALLY_COMPLIANT message when compliance == PARTIALLY_COMPLIANT', () => {
        mountDefault({ ...props, compliance: COMPLIANCE_STATUS.PARTIALLY_COMPLIANT });
        cy.get('div[id="compliance-status"]').contains('Deze website voldoet gedeeltelijk aan de ');
    });

    it('should render the NOT_COMPLIANT message when compliance == NOT_COMPLIANT', () => {
        mountDefault({ ...props, compliance: COMPLIANCE_STATUS.NOT_COMPLIANT });
        cy.get('div[id="compliance-status"]').contains('Deze website voldoet niet aan de');
    });
});
