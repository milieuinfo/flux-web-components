const selectNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-default&viewMode=story';

const selectNextNotDeletableUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-not-deletable&viewMode=story';

const selectNextGroupsUrl = 'http://localhost:8080/iframe.html?id=components-form-select--select-groups&viewMode=story';

const selectNextSelectedOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-selected-option&viewMode=story';

const selectNextDisabledOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-disabled-option&viewMode=story';

const selectNextReadOnlyUrl =
    'http://localhost:8080/iframe.html?id=components-form-select--select-read-only&viewMode=story';

describe('story - vl-select - default', () => {
    it('should render', () => {
        cy.visit(selectNextDefaultUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - not-deletable', () => {
    it('should render', () => {
        cy.visit(selectNextNotDeletableUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - groups', () => {
    it('should render', () => {
        cy.visit(selectNextGroupsUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - selected option', () => {
    it('should render', () => {
        cy.visit(selectNextSelectedOptionUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - disabled option', () => {
    it('should render', () => {
        cy.visit(selectNextDisabledOptionUrl);

        cy.get('vl-select').shadow().find('select');
    });
});

describe('story - vl-select - read only', () => {
    it('should render', () => {
        cy.visit(selectNextReadOnlyUrl);

        cy.get('vl-select').shadow().find('select');
    });
});
