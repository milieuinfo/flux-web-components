import { EVALUATION_STATUS } from '../';
import { type SetupStatementProps, setupStatement } from './setup-statement.component';

const mountDefault = ({ evaluation, date, dateModified }: SetupStatementProps) =>
    cy.mount(setupStatement({ evaluation, date, dateModified }));

const props: SetupStatementProps = {
    evaluation: EVALUATION_STATUS.EXPERT_EVALUATED,
    date: '01/01/2021',
    dateModified: '01/01/2021',
};

describe('cypress-component - compliance components - accessibility setup-statement - default', () => {
    beforeEach(() => {
        mountDefault(props);
    });

    it('should mount', () => {
        cy.get('div[id="setup-accessibility-statement"]').contains('Opstelling van deze toegankelijkheidsverklaring');
    });

    it('should be accessible', () => {
        cy.injectAxe();

        cy.checkA11y('div[id="setup-accessibility-statement"]');
    });
});

describe('cypress-component - compliance components - accessibility setup-statement - EVALUATION_STATUS messages', () => {
    it('should render the EXPERT_EVALUATED message when evaluation == EXPERT_EVALUATED', () => {
        mountDefault({ ...props, evaluation: EVALUATION_STATUS.EXPERT_EVALUATED });

        cy.get('div[id="setup-accessibility-statement"]').contains(
            `Deze toegankelijkheidsverklaring is opgesteld op ${props.date} en gebaseerd op een analyse van een web accessibility specialist, gecertificeerd door the International Association of Accessibility Professionals (IAAP). Deze toegankelijkheidsverklaring is voor het laatst herzien op ${props.dateModified}.`
        );
    });

    it('should render the SELF_EVALUATED message when evaluation == SELF_EVALUATED', () => {
        mountDefault({ ...props, evaluation: EVALUATION_STATUS.SELF_EVALUATED });

        cy.get('div[id="setup-accessibility-statement"]').contains(
            `Deze toegankelijkheidsverklaring is opgesteld op ${props.date} en gebaseerd op een analyse van Departement Omgeving. Deze toegankelijkheidsverklaring is voor het laatst herzien op ${props.dateModified}.`
        );
    });

    it('should render the NOT_EVALUATED message when evaluation == NOT_EVALUATED', () => {
        mountDefault({ ...props, evaluation: EVALUATION_STATUS.NOT_EVALUATED });

        cy.get('div[id="setup-accessibility-statement"]').contains(
            `Deze toegankelijkheidsverklaring is opgesteld op ${props.date} en werd voor het laatst herzien op`
        );
    });
});
