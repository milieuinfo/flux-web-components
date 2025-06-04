const checkboxDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-checkbox--checkbox-default&viewMode=story&args=';
const checkboxSwitchUrl =
    'http://localhost:8080/iframe.html?id=components-form-checkbox--checkbox-switch&viewMode=story&args=';
const checkboxValueUrl =
    'http://localhost:8080/iframe.html?id=components-form-checkbox--checkbox-value&viewMode=story&args=';
const checkboxReadonlyUrl =
    'http://localhost:8080/iframe.html?id=components-form-checkbox--checkbox-readonly&viewMode=story&args=';

describe('story - vl-checkbox - default', () => {
    it('should render', () => {
        cy.visit(checkboxDefaultUrl);

        cy.get('vl-checkbox').shadow();
    });
});

describe('story - vl-checkbox - switch', () => {
    it('should render', () => {
        cy.visit(checkboxSwitchUrl);

        cy.get('vl-checkbox').shadow();
    });
});

describe('story - vl-checkbox - value', () => {
    it('should render', () => {
        cy.visit(checkboxValueUrl);

        cy.get('vl-checkbox').shadow();
    });
});

describe('story - vl-checkbox - readonly', () => {
    it('should render', () => {
        cy.visit(checkboxReadonlyUrl);

        cy.get('vl-checkbox').shadow();
    });
});
