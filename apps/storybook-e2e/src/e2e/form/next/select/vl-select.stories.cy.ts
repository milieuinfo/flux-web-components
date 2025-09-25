const selectNextDefaultUrl = 'http://localhost:8080/iframe.html?id=form-next-select--select-default&viewMode=story';

const selectNextNotDeletableUrl =
    'http://localhost:8080/iframe.html?id=form-next-select--select-not-deletable&viewMode=story';

const selectNextGroupsUrl = 'http://localhost:8080/iframe.html?id=form-next-select--select-groups&viewMode=story';

const selectNextSelectedOptionUrl =
    'http://localhost:8080/iframe.html?id=form-next-select--select-selected-option&viewMode=story';

const selectNextDisabledOptionUrl =
    'http://localhost:8080/iframe.html?id=form-next-select--select-disabled-option&viewMode=story';

const selectNextReadOnlyUrl = 'http://localhost:8080/iframe.html?id=form-next-select--select-read-only&viewMode=story';

const selectNextDeclarativeOptionsUrl =
    'http://localhost:8080/iframe.html?id=form-next-select--select-declarative-options&viewMode=story';

describe('story - vl-select-next - default', () => {
    it('should render', () => {
        cy.visit(selectNextDefaultUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});

describe('story - vl-select-next - not-deletable', () => {
    it('should render', () => {
        cy.visit(selectNextNotDeletableUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});

describe('story - vl-select-next - groups', () => {
    it('should render', () => {
        cy.visit(selectNextGroupsUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});

describe('story - vl-select-next - selected option', () => {
    it('should render', () => {
        cy.visit(selectNextSelectedOptionUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});

describe('story - vl-select-next - disabled option', () => {
    it('should render', () => {
        cy.visit(selectNextDisabledOptionUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});

describe('story - vl-select-next - read only', () => {
    it('should render', () => {
        cy.visit(selectNextReadOnlyUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});

describe('story - vl-select-next - declarative options', () => {
    it('should render', () => {
        cy.visit(selectNextDeclarativeOptionsUrl);

        cy.get('vl-select-next').shadow().find('select');
    });
});
