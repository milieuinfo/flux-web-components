import { VlAccordionComponent } from '@domg-wc/components/block';

const accordionUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-default&viewMode=story';
const accordionTitleSlotUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-title-slot&viewMode=story';
const accordionDynamicToggleUrl =
    'http://localhost:8080/iframe.html?id=components-block-accordion--accordion-dynamic-toggle&viewMode=story';

const shouldBeToggleable = async () => {
    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        expect(component._isOpen).to.be.false;
        component.open();
        expect(component._isOpen).to.be.true;
        component.close();
        expect(component._isOpen).to.be.false;
        component.toggle();
        expect(component._isOpen).to.be.true;
        component.toggle();
        expect(component._isOpen).to.be.false;
    });
};

const shouldBeOpen = async () => {
    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        expect(component._isOpen).to.be.true;
    });
};

const shouldDisableAccordion = () => {
    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        expect(component._isOpen).to.be.false;
        component.open();
        expect(component._isOpen).to.be.false;
        component.close();
        expect(component._isOpen).to.be.false;
        component.toggle();
        expect(component._isOpen).to.be.false;
    });
};

const shouldEmitEventOnToggle = () => {
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.toggle();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};

const shouldEmitEventOnOpen = () => {
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.open();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};

const shouldEmitEventOnClose = () => {
    // Open de accordion vooraleer de eventListener toe te voegen
    cy.get('vl-accordion').shadow().find('button.vl-toggle').click();
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.close();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};

describe('story vl-accordion default', () => {
    it('should be toggleable', () => {
        cy.visit(accordionUrl);

        shouldBeToggleable();
    });

    it('should disable accordion', () => {
        cy.visit(`${accordionUrl}&args=disabled:true`);

        shouldDisableAccordion();
    });

    it('should emit event on toggle', () => {
        cy.visit(accordionUrl);

        shouldEmitEventOnToggle();
    });

    it('should emit event on open', () => {
        cy.visit(accordionUrl);

        shouldEmitEventOnOpen();
    });

    it('should emit event on close', () => {
        cy.visit(accordionUrl);

        shouldEmitEventOnClose();
    });

    it('should be open by default', () => {
        cy.visit(`${accordionUrl}&args=defaultOpen:true`);

        shouldBeOpen();
    });
});

describe('story vl-accordion dynamic toggle', () => {
    it('should be toggleable', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldBeToggleable();
    });

    it('should disable accordion', () => {
        cy.visit(`${accordionDynamicToggleUrl}&args=disabled:true`);

        shouldDisableAccordion();
    });

    it('should emit event on toggle', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldEmitEventOnToggle();
    });

    it('should emit event on open', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldEmitEventOnOpen();
    });

    it('should emit event on close', () => {
        cy.visit(accordionDynamicToggleUrl);

        shouldEmitEventOnClose();
    });
});

describe('story vl-accordion title slot', () => {
    it('should be toggleable', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldBeToggleable();
    });

    it('should disable accordion', () => {
        cy.visit(`${accordionTitleSlotUrl}&args=disabled:true`);

        shouldDisableAccordion();
    });

    it('should emit event on toggle', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldEmitEventOnToggle();
    });

    it('should emit event on open', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldEmitEventOnOpen();
    });

    it('should emit event on close', () => {
        cy.visit(accordionTitleSlotUrl);

        shouldEmitEventOnClose();
    });
});
