const selectRichNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-default&viewMode=story';

const selectRichNextSearchUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-search&viewMode=story';

const selectRichNextNotDeletableUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-not-deletable&viewMode=story';

const selectRichNextGroupsUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-groups&viewMode=story';

const selectRichNextMultipleUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-multiple&viewMode=story';

const selectRichNextSelectedOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-selected-option&viewMode=story';

const selectRichNextDisabledOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-disabled-option&viewMode=story';

const selectRichNextReadOnlyUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-read-only&viewMode=story';

describe('story - vl-select-rich - default', () => {
    it('should render', () => {
        cy.visit(selectRichNextDefaultUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - search', () => {
    it('should render', () => {
        cy.visit(selectRichNextSearchUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - not-deletable', () => {
    it('should render', () => {
        cy.visit(selectRichNextNotDeletableUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - groups', () => {
    it('should render', () => {
        cy.visit(selectRichNextGroupsUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - multiple', () => {
    it('should render', () => {
        cy.visit(selectRichNextMultipleUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - selected option', () => {
    it('should render', () => {
        cy.visit(selectRichNextSelectedOptionUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - disabled option', () => {
    it('should render', () => {
        cy.visit(selectRichNextDisabledOptionUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - read only', () => {
    it('should render', () => {
        cy.visit(selectRichNextReadOnlyUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});
