const functionalHeaderUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-default&viewMode=story';
const functionalHeaderActionsUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-actions&viewMode=story';
const functionalHeaderTabsUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-tabs&viewMode=story';
const functionalHeaderBreadcrumbUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-breadcrumb&viewMode=story';
const functionalHeaderSlotsUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-slots&viewMode=story';
const functionalHeaderFullWidthUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-full-width&viewMode=story';
const functionalHeaderDisableBackLinkUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-disable-back-link&viewMode=story';
const functionalHeaderHideBackLinkUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-hide-back-link&viewMode=story';
const functionalHeaderHideSubHeaderUrl =
    'http://localhost:8080/iframe.html?id=components-block-functional-header--functional-header-hide-sub-header&viewMode=story';

describe('story - vl-functional-header - default', () => {
    it('should render', () => {
        cy.visit(functionalHeaderUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - actions', () => {
    it('should render', () => {
        cy.visit(functionalHeaderActionsUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - tabs', () => {
    it('should render', () => {
        cy.visit(functionalHeaderTabsUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - breadcrumb', () => {
    it('should render', () => {
        cy.visit(functionalHeaderBreadcrumbUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - slots', () => {
    it('should render', () => {
        cy.visit(functionalHeaderSlotsUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - full width', () => {
    it('should render', () => {
        cy.visit(functionalHeaderFullWidthUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - disable back link', () => {
    it('should render', () => {
        cy.visit(functionalHeaderDisableBackLinkUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - hide back link', () => {
    it('should render', () => {
        cy.visit(functionalHeaderHideBackLinkUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});

describe('story - vl-functional-header - hide sub header', () => {
    it('should render', () => {
        cy.visit(functionalHeaderHideSubHeaderUrl);

        cy.get('vl-functional-header').shadow().find('header');
    });
});
