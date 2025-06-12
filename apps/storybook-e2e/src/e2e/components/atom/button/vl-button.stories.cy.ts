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

describe('story - vl-button - default', () => {
    it('should render', () => {
        cy.visit(buttonPrimaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - secondary', () => {
    it('should render', () => {
        cy.visit(buttonSecondaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - tertiary', () => {
    it('should render', () => {
        cy.visit(buttonTertiaryUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - disabled', () => {
    it('should render', () => {
        cy.visit(buttonDisabledUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - error', () => {
    it('should render', () => {
        cy.visit(buttonErrorUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - block', () => {
    it('should render', () => {
        cy.visit(buttonBlockUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - large', () => {
    it('should render', () => {
        cy.visit(buttonLargeUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - wide', () => {
    it('should render', () => {
        cy.visit(buttonWideUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - narrow', () => {
    it('should render', () => {
        cy.visit(buttonNarrowUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - loading', () => {
    it('should render', () => {
        cy.visit(buttonLoadingUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - icon', () => {
    it('should render', () => {
        cy.visit(buttonIconUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - icon only', () => {
    it('should render', () => {
        cy.visit(buttonIconOnlyUrl);

        cy.get('vl-button').shadow().find('button');
    });
});

describe('story - vl-button - toggle', () => {
    it('should render', () => {
        cy.visit(buttonToggleUrl);

        cy.get('vl-button').shadow().find('button');
    });
});
