import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTypography } from './vl-typography.component';

registerWebComponents([VlTypography]);

describe('cypress-component - block components - vl-typography', () => {
    it('should mount', () => {
        cy.mount(html`<vl-typography><p>tekst</p></vl-typography>`);

        cy.get('vl-typography').shadow();
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-typography><p>tekst</p></vl-typography>`);
        cy.injectAxe();

        cy.checkA11y('vl-typography');
    });

    it('should render the light DOM content in the shadow DOM', () => {
        cy.mount(html`<vl-typography><p>initial text</p></vl-typography>`);

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'initial text');
    });

    it('should replace template parameters', () => {
        cy.mount(html`
            <vl-typography parameters='{"name": "Jos"}'><p>Hello &#36;{parameter.name}</p></vl-typography>
        `);

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'Hello Jos');
    });

    it('should update the shadow DOM when the light DOM changes', () => {
        cy.mount(html`<vl-typography><p>initial text</p></vl-typography>`);
        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'initial text');

        cy.get('vl-typography').then(($typography) => {
            $typography[0].innerHTML = '<p>updated text</p>';
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
    });

    it('should update the shadow DOM when the light DOM changes after the component was moved in the DOM', () => {
        cy.mount(html`
            <div id="first"><vl-typography><p>initial text</p></vl-typography></div>
            <div id="second"></div>
        `);

        cy.get('vl-typography').then(($typography) => {
            const typography = $typography[0];
            typography.ownerDocument.getElementById('second')?.appendChild(typography);
        });
        cy.get('#second vl-typography').shadow().find('#content p').should('contain.text', 'initial text');

        cy.get('vl-typography').then(($typography) => {
            $typography[0].innerHTML = '<p>updated text</p>';
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
    });

    it('should process a light DOM mutation only once after the component was moved multiple times', () => {
        cy.mount(html`
            <div id="first"></div>
            <div id="second"><vl-typography><p>initial text</p></vl-typography></div>
        `);

        cy.get('vl-typography').then(($typography) => {
            const typography = $typography[0];
            const document = typography.ownerDocument;
            document.getElementById('first')?.appendChild(typography);
            document.getElementById('second')?.appendChild(typography);
            cy.spy(typography as any, '__processSlotElements').as('processSlotElements');
            typography.innerHTML = '<p>updated text</p>';
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
        cy.get('@processSlotElements').should('have.been.calledOnce');
    });

    it('should render content that was changed while the component was detached from the DOM', () => {
        cy.mount(html`
            <div id="first"><vl-typography><p>initial text</p></vl-typography></div>
            <div id="second"></div>
        `);

        cy.get('vl-typography').then(($typography) => {
            const typography = $typography[0];
            typography.remove();
            typography.innerHTML = '<p>updated text</p>';
            typography.ownerDocument.getElementById('second')?.appendChild(typography);
        });

        cy.get('vl-typography').shadow().find('#content p').should('contain.text', 'updated text');
    });
});
