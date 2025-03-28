import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

describe('spacer styles', () => {
    it('should have default spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next">
            <hr class="vl-separator-next">
        `);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 20px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have xxsmall spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next-xxsmall">
            <hr class="vl-separator-next">
        `);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 5px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have xsmall spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next-xsmall">
            <hr class="vl-separator-next">
        `);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 10px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have small spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next-small">
            <hr class="vl-separator-next">
        `);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 15px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have medium spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next-medium">
            <hr class="vl-separator-next">
        `);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 30px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have large spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next-large">
            <hr class="vl-separator-next">
        `);
        cy.viewport(1100, 800);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 60px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.viewport(700, 800);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px 0px 30px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have no spacer style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <hr class="vl-separator-next vl-spacer-next-none">
            <hr class="vl-separator-next">
        `);
        cy.get('.vl-separator-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-separator-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });
});
