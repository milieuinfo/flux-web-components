const buttonPrimaryUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-primary&viewMode=story';
const buttonSecondaryUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-secondary&viewMode=story';
const buttonTertiaryUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-tertiary&viewMode=story';
const buttonDisabledUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-disabled&viewMode=story';
const buttonErrorUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-error&viewMode=story';
const buttonBlockUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-block&viewMode=story';
const buttonLargeUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-large&viewMode=story';
const buttonWideUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-wide&viewMode=story';
const buttonNarrowUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-narrow&viewMode=story';
const buttonLoadingUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-loading&viewMode=story';
const buttonIconUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-icon&viewMode=story';
const buttonIconOnlyUrl =
    'http://localhost:8080/iframe.html?id=components-atom-button--button-icon-only&viewMode=story';
const buttonToggleUrl = 'http://localhost:8080/iframe.html?id=components-atom-button--button-toggle&viewMode=story';

describe('cypress-e2e - atom components - vl-button - default story', () => {
    it('should render', () => {
        cy.visit(buttonPrimaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - secondary story', () => {
    it('should render', () => {
        cy.visit(buttonSecondaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - tertiary story', () => {
    it('should render', () => {
        cy.visit(buttonTertiaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - disabled story', () => {
    it('should render', () => {
        cy.visit(buttonDisabledUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - error story', () => {
    it('should render', () => {
        cy.visit(buttonErrorUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - block story', () => {
    it('should render', () => {
        cy.visit(buttonBlockUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - large story', () => {
    it('should render', () => {
        cy.visit(buttonLargeUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - wide story', () => {
    it('should render', () => {
        cy.visit(buttonWideUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - narrow story', () => {
    it('should render', () => {
        cy.visit(buttonNarrowUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - loading story', () => {
    it('should render', () => {
        cy.visit(buttonLoadingUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - icon story', () => {
    it('should render', () => {
        cy.visit(buttonIconUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - icon only story', () => {
    it('should render', () => {
        cy.visit(buttonIconOnlyUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('cypress-e2e - atom components - vl-button - toggle story', () => {
    it('should render', () => {
        cy.visit(buttonToggleUrl);

        cy.get('vl-button').shadow().find('button');
    });
});
