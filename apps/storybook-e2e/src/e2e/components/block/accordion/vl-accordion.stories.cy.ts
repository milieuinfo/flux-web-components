const accordionDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-default&viewMode=story';
const accordionHeadingUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-heading&viewMode=story';
const accordionDynamicToggleUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-dynamic-toggle&viewMode=story';
const accordionIconUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-icon&viewMode=story';
const accordionTitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-title-slot&viewMode=story';
const accordionSubtitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-subtitle-slot&viewMode=story';
const accordionMenuSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-menu-slot&viewMode=story';

describe('cypress-e2e - block components - vl-accordion - default story', () => {
    it('should display story', () => {
        cy.visit(accordionDefaultUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('cypress-e2e - block components - vl-accordion - heading story', () => {
    it('should display story', () => {
        cy.visit(accordionHeadingUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('cypress-e2e - block components - vl-accordion - dynamic toggle story', () => {
    it('should display story', () => {
        cy.visit(accordionDynamicToggleUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('cypress-e2e - block components - vl-accordion title - slot story', () => {
    it('should display story', () => {
        cy.visit(accordionTitleSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('cypress-e2e - block components - vl-accordion - icon story', () => {
    it('should display story', () => {
        cy.visit(accordionIconUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('cypress-e2e - block components - vl-accordion - subtitle slot story', () => {
    it('should display story', () => {
        cy.visit(accordionSubtitleSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('cypress-e2e - block components - vl-accordion - menu slot story', () => {
    it('should display story', () => {
        cy.visit(accordionMenuSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});
