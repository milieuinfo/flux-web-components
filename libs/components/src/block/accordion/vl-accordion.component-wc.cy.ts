import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlLinkComponent } from '../../atom/link';
import { VlAccordionComponent } from './vl-accordion.component';

registerWebComponents([VlAccordionComponent, VlLinkComponent]);


describe('cypress-component - block components - vl-accordion wc - default testen', () => {
    const accordionDefaultHtml = html`
        <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling">
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should be toggleable', () => {
        cy.mount(accordionDefaultHtml);
        shouldBeToggleable();
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" disabled>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnToggle();
    });

    it('should emit event on open', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnOpen();
    });

    it('should emit event on close', () => {
        cy.mount(accordionDefaultHtml);
        shouldEmitEventOnClose();
    });

    it('should be open by default', () => {
        cy.mount(html`
            <vl-accordion icon="university" toggle-text="Lees meer over de onderwijsdoelstelling" default-open>
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldBeOpen();
    });
});

describe('cypress-component - block components - vl-accordion wc - dynamic toggle testen', () => {
    const accordionDynamicToggleHtml = html`
        <vl-accordion
            icon="university"
            toggle-text="Lees meer over de onderwijsdoelstelling"
            close-toggle-text="Sluit de onderwijsdoelstelling"
            open-toggle-text="Open de onderwijsdoelstelling"
        >
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should be toggleable', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldBeToggleable();
    });


    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university"
                              toggle-text="Lees meer over de onderwijsdoelstelling"
                              close-toggle-text="Sluit de onderwijsdoelstelling"
                              open-toggle-text="Open de onderwijsdoelstelling"
                              disabled
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnToggle();
    });

    it('should emit event on open', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnOpen();
    });

    it('should emit event on close', () => {
        cy.mount(accordionDynamicToggleHtml);
        shouldEmitEventOnClose();
    });
});

describe('cypress-component - block components - vl-accordion wc - title slot testen', () => {
    const accordionTitleSlotHtml = html`
        <vl-accordion icon="university">
            <span slot="title">Lees meer over de onderwijsdoelstelling</span>
            <span>Onderwijs helpt jonge mensen.</span>
        </vl-accordion>
    `;

    it('should be toggleable', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldBeToggleable();
    });

    it('should disable accordion', () => {
        cy.mount(html`
            <vl-accordion icon="university" disabled>
                <span>Onderwijs helpt jonge mensen.</span>
                <span slot="title">Lees meer over de onderwijsdoelstelling</span>
            </vl-accordion>
        `);
        shouldDisableAccordion();
    });

    it('should emit event on toggle', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnToggle();
    });

    it('should emit event on open', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnOpen();
    });

    it('should emit event on close', () => {
        cy.mount(accordionTitleSlotHtml);
        shouldEmitEventOnClose();
    });
});

describe('cypress-component - block components - vl-accordion wc - isOpen', () => {
    it('should expose the open state via isOpen and _isOpen', () => {
        cy.mount(html`
            <vl-accordion toggle-text="Onderwijsdoelstelling">
                <span>Onderwijs helpt jonge mensen.</span>
            </vl-accordion>
        `);
        cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
            expect(component.isOpen).to.be.false;
            expect(component._isOpen).to.be.false;
            component.open();
            expect(component.isOpen).to.be.true;
            expect(component._isOpen).to.be.true;
        });
    });
});

describe('cypress-component - block components - vl-accordion wc - properties na het toevoegen', () => {
    it('should be open when default-open is set as property before the first render', () => {
        cy.mount(html`<div id="host"></div>`);
        cy.get('#host').then(($host) => {
            const accordion = document.createElement('vl-accordion') as VlAccordionComponent;
            accordion.setAttribute('toggle-text', 'Onderwijsdoelstelling');
            $host[0].appendChild(accordion);
            accordion.defaultOpen = true;
            return accordion.updateComplete;
        });
        shouldBeOpen();
    });
});

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
    cy.get('vl-accordion').shadow().find('button.vl-toggle').click({force: true});
    cy.createStubForEvent('vl-accordion', 'vl-on-toggle');

    cy.runTestFor<VlAccordionComponent>('vl-accordion', (component) => {
        component.close();
        cy.get('@vl-on-toggle').should('have.been.calledOnce');
    });
};
