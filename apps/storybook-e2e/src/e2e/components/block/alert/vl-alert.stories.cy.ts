const alertDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-alert--alert-default&viewMode=story';
const alertErrorUrl = 'http://localhost:8080/iframe.html?id=components-block-alert--alert-error&viewMode=story';
const alertInfoUrl = 'http://localhost:8080/iframe.html?id=components-block-alert--alert-info&viewMode=story';
const alertSuccessUrl = 'http://localhost:8080/iframe.html?id=components-block-alert--alert-success&viewMode=story';
const alertWarningUrl = 'http://localhost:8080/iframe.html?id=components-block-alert--alert-warning&viewMode=story';
const alertWithButtonUrl =
    'http://localhost:8080/iframe.html?id=components-block-alert--alert-with-button&viewMode=story';
const alertWithTitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-alert--alert-with-title-slot&viewMode=story';
const alertCloseableUrl = 'http://localhost:8080/iframe.html?id=components-block-alert--alert-closeable&viewMode=story';
const alertNakedErrorUrl =
    'http://localhost:8080/iframe.html?id=components-block-alert--alert-naked-error&viewMode=story';
const alertNakedWarningUrl =
    'http://localhost:8080/iframe.html?id=components-block-alert--alert-naked-warning&viewMode=story';
const alertNakedSuccessUrl =
    'http://localhost:8080/iframe.html?id=components-block-alert--alert-naked-success&viewMode=story';

describe('story vl-alert default', () => {
    it('should display story', () => {
        cy.visit(alertDefaultUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert error', () => {
    it('should display story', () => {
        cy.visit(alertErrorUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert info', () => {
    it('should display story', () => {
        cy.visit(alertInfoUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert success', () => {
    it('should display story', () => {
        cy.visit(alertSuccessUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert warning', () => {
    it('should display story', () => {
        cy.visit(alertWarningUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert with button', () => {
    it('should display story', () => {
        cy.visit(alertWithButtonUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert with title slot', () => {
    it('should display story', () => {
        cy.visit(alertWithTitleSlotUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert closeable', () => {
    it('should display story', () => {
        cy.visit(alertCloseableUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert naked error', () => {
    it('should display story', () => {
        cy.visit(alertNakedErrorUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert naked warning', () => {
    it('should display story', () => {
        cy.visit(alertNakedWarningUrl);
        cy.get('vl-alert').shadow();
    });
});

describe('story vl-alert naked success', () => {
    it('should display story', () => {
        cy.visit(alertNakedSuccessUrl);
        cy.get('vl-alert').shadow();
    });
});
