const selectRichDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-default&viewMode=story';

const selectRichSearchUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-search&viewMode=story';

const selectRichNotDeletableUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-not-deletable&viewMode=story';

const selectRichGroupsUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-groups&viewMode=story';

const selectRichMultipleUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-multiple&viewMode=story';

const selectRichSelectedOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-selected-option&viewMode=story';

const selectRichDisabledOptionUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-disabled-option&viewMode=story';

const selectRichReadOnlyUrl =
    'http://localhost:8080/iframe.html?id=components-form-select-rich--select-rich-read-only&viewMode=story';

describe('story - vl-select-rich - default', () => {
    it('should render', () => {
        cy.visit(selectRichDefaultUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - search', () => {
    it('should render', () => {
        cy.visit(selectRichSearchUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - not-deletable', () => {
    it('should render', () => {
        cy.visit(selectRichNotDeletableUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - groups', () => {
    it('should render', () => {
        cy.visit(selectRichGroupsUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - multiple', () => {
    it('should render', () => {
        cy.visit(selectRichMultipleUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - selected option', () => {
    it('should render', () => {
        cy.visit(selectRichSelectedOptionUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - disabled option', () => {
    it('should render', () => {
        cy.visit(selectRichDisabledOptionUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});

describe('story - vl-select-rich - read only', () => {
    it('should render', () => {
        cy.visit(selectRichReadOnlyUrl);

        cy.get('vl-select-rich').shadow().find('select');
    });
});
