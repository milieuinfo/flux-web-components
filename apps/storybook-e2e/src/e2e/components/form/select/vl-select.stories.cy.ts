const selectDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-default&viewMode=story';

const selectNotDeletableUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-not-deletable&viewMode=story';

const selectGroupsUrl = 'http://localhost:8080/iframe.html?id=components-form-select--select-groups&viewMode=story';

const selectSelectedOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-selected-option&viewMode=story';

const selectDisabledOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-disabled-option&viewMode=story';

const selectReadOnlyUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-read-only&viewMode=story';

describe('story - vl-select - default', () => {
    it('should render', () => {
        cy.visit(selectDefaultUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - not-deletable', () => {
    it('should render', () => {
        cy.visit(selectNotDeletableUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - groups', () => {
    it('should render', () => {
        cy.visit(selectGroupsUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - selected option', () => {
    it('should render', () => {
        cy.visit(selectSelectedOptionUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - disabled option', () => {
    it('should render', () => {
        cy.visit(selectDisabledOptionUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - read only', () => {
    it('should render', () => {
        cy.visit(selectReadOnlyUrl);

        cy.get('vl-select').shadow().find('select');
    });
});
