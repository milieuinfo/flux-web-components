const prozaDirectiveDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-proza-message-proza-directive--proza-directive-default&viewMode=story';
const prozaDirectiveMetParametersUrl =
    'http://localhost:8080/iframe.html?id=components-block-proza-message-proza-directive--proza-directive-met-parameters&viewMode=story';
const prozaDirectiveDomainOverrideUrl =
    'http://localhost:8080/iframe.html?id=components-block-proza-message-proza-directive--proza-directive-domain-override&viewMode=story';

describe('cypress-e2e - block components - vl-proza-directive - default story', () => {
    it('should render', () => {
        cy.visit(prozaDirectiveDefaultUrl);

        cy.get('vl-alert').should('exist');
    });
});

describe('cypress-e2e - block components - vl-proza-directive - met parameters story', () => {
    it('should render', () => {
        cy.visit(prozaDirectiveMetParametersUrl);

        cy.get('vl-alert').should('exist');
    });
});

describe('cypress-e2e - block components - vl-proza-directive - domain override story', () => {
    it('should render', () => {
        cy.visit(prozaDirectiveDomainOverrideUrl);

        cy.get('vl-alert').should('exist');
    });
});
