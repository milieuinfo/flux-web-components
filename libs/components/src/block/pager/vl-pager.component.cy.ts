import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlPagerComponent } from './vl-pager.component';

registerWebComponents([VlPagerComponent]);

describe('cypress-component - block components - vl-pager', () => {
    it('should be accessible', () => {
        cy.mount(html`<vl-pager total-items="25" items-per-page="5" current-page="1"></vl-pager>`);
        cy.injectAxe();
        cy.checkA11y('vl-pager');
    });

    it('should not dispatch a change event when the effective page does not change', () => {
        const onChange = cy.stub().as('onChange');
        cy.mount(html`<vl-pager total-items="25" items-per-page="5" current-page="5"></vl-pager>`);
        cy.get('vl-pager').then(($el) => $el[0].addEventListener('change', onChange));

        cy.get('vl-pager').invoke('attr', 'total-items', '5');
        cy.get('vl-pager').invoke('attr', 'current-page', '1');

        cy.get('@onChange').should('not.have.been.called');
    });

    it('should not dispatch a change event when the effective page does not change, regardless of attribute order', () => {
        const onChange = cy.stub().as('onChange');
        cy.mount(html`<vl-pager total-items="25" items-per-page="5" current-page="5"></vl-pager>`);
        cy.get('vl-pager').then(($el) => $el[0].addEventListener('change', onChange));

        // De consumer (vl-rich-data._paging) zet beide attributen in een synchrone batch, met
        // current-page voor total-items. De effectieve pagina blijft 1 (pagina 5 bestaat niet
        // meer met 5 items), dus er mag geen event vuren ongeacht de volgorde binnen de batch.
        cy.get('vl-pager').then(($el) => {
            $el[0].setAttribute('current-page', '1');
            $el[0].setAttribute('total-items', '5');
        });

        cy.get('@onChange').should('not.have.been.called');
    });

    it('should dispatch a change event with the clamped current page on a real change', () => {
        const onChange = cy.stub().as('onChange');
        cy.mount(html`<vl-pager total-items="25" items-per-page="5" current-page="1"></vl-pager>`);
        cy.get('vl-pager').then(($el) => $el[0].addEventListener('change', onChange));

        cy.get('vl-pager').invoke('attr', 'current-page', '3');

        cy.get('@onChange')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail.currentPage')
            .should('equal', 3);
    });

    it('should clamp an out-of-range current-page in the change event detail', () => {
        const onChange = cy.stub().as('onChange');
        cy.mount(html`<vl-pager total-items="25" items-per-page="5" current-page="1"></vl-pager>`);
        cy.get('vl-pager').then(($el) => $el[0].addEventListener('change', onChange));

        cy.get('vl-pager').invoke('attr', 'current-page', '99');

        cy.get('@onChange')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail.currentPage')
            .should('equal', 5);
    });
});
