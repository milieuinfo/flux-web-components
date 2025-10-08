import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';

describe('cypress-component - layout styles - vl-spacer', () => {
    it('should have default spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer" />
            <hr class="vl-separator" />
        `);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 20px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have xxsmall spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer-xxsmall" />
            <hr class="vl-separator" />
        `);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 5px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have xsmall spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer-xsmall" />
            <hr class="vl-separator" />
        `);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 10px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have small spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer-small" />
            <hr class="vl-separator" />
        `);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 15px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have medium spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer-medium" />
            <hr class="vl-separator" />
        `);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 30px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have large spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer-large" />
            <hr class="vl-separator" />
        `);
        cy.viewport(1100, 800);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 60px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.viewport(700, 800);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 30px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have no spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator vl-spacer-none" />
            <hr class="vl-separator" />
        `);
        cy.get('.vl-separator').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-separator').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });
});
