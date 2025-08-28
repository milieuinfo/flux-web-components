const accordionDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-default&viewMode=story';
const accordionDynamicToggleUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-dynamic-toggle&viewMode=story';
const accordionIconUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-title-slot&viewMode=story';
const accordionTitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-title-slot&viewMode=story';
const accordionSubtitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-subtitle-slot&viewMode=story';
const accordionMenuSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-menu-slot&viewMode=story';

describe('story vl-accordion default', () => {
    it('should display story', () => {
        cy.visit(accordionDefaultUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion dynamic toggle', () => {
    it('should display story', () => {
        cy.visit(accordionDynamicToggleUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion title slot', () => {
    it('should display story', () => {
        cy.visit(accordionTitleSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion icon', () => {
    it('should display story', () => {
        cy.visit(accordionIconUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion subtitle slot', () => {
    it('should display story', () => {
        cy.visit(accordionSubtitleSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});

describe('story vl-accordion menu slot', () => {
    it('should display story', () => {
        cy.visit(accordionMenuSlotUrl);
        cy.get('vl-accordion').shadow();
    });
});
