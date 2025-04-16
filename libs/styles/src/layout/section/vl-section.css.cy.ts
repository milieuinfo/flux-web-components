import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

describe('section styles', () => {
    it('should style the defaults', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <section class="vl-section vl-section--alt cy-section-first">
                <p>vl-section vl-section--alt</p>
            </section>
            <section class="vl-section vl-section--bordered cy-section-bordered1">
                <p>vl-section vl-section--bordered</p>
            </section>
            <section class="vl-section vl-section--bordered vl-section--small cy-section-bordered-small">
                <p>vl-section vl-section--bordered vl-section--small</p>
            </section>
            <section class="vl-section vl-section--bordered cy-section-bordered2">
                <p>vl-section vl-section--bordered</p>
            </section>
        `);
        // large screen
        cy.viewport(1100, 800);
        // .cy-section-first: de eerste sectie
        cy.get('.cy-section-first').shouldHaveComputedStyle({
            style: 'padding',
            value: '60px 0px',
        });
        // .cy-section-bordered1: een 'gewone' sectie die na een 'alt-sectie komt'
        cy.get('.cy-section-bordered1').shouldHaveComputedStyle({
            style: 'padding',
            value: '60px 0px',
        });
        // .cy-section-bordered-small: small + opeenvolgende sectie's die geen alt-secties zijn krijgen geen top-padding
        cy.get('.cy-section-bordered-small').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 15px',
        });
        // bordered + opeenvolgende sectie's die geen alt-secties zijn krijgen geen top-padding
        cy.get('.cy-section-bordered2').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        cy.get('.cy-section-bordered2').shouldHaveComputedStyle({
            style: 'border-top',
            value: '1px solid rgb(247, 249, 252)',
        });
        // small screen
        cy.viewport(700, 800);
        // .cy-section-first: de eerste sectie
        cy.get('.cy-section-first').shouldHaveComputedStyle({
            style: 'padding',
            value: '20px 0px 60px',
        });
        // .cy-section-bordered1: een 'gewone' sectie die na een 'alt-sectie komt'
        cy.get('.cy-section-bordered1').shouldHaveComputedStyle({
            style: 'padding',
            value: '30px 0px 60px',
        });
        // .cy-section-bordered-small: small + opeenvolgende sectie's die geen alt-secties zijn krijgen geen top-padding
        cy.get('.cy-section-bordered-small').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 20px',
        });
        // bordered + opeenvolgende sectie's die geen alt-secties zijn krijgen geen top-padding
        cy.get('.cy-section-bordered2').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        cy.get('.cy-section-bordered2').shouldHaveComputedStyle({
            style: 'border-top',
            value: '1px solid rgb(247, 249, 252)',
        });
    });

    it('should style with overlap', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <section class="vl-section vl-section--overlap cy-section-overlap">
                <p class="vl-content-block cy-section-centered">vl-content-block</p>
                <p>vl-section vl-section--overlap</p>
            </section>
            <section class="vl-section vl-section--bordered cy-section-bordered1">
                <p>vl-section vl-section--bordered</p>
            </section>
            <section class="vl-section vl-section--bordered cy-section-bordered2">
                <p>vl-section vl-section--bordered</p>
            </section>
            <section class="vl-section vl-section--bordered cy-section-bordered3">
                <p>vl-section vl-section--bordered</p>
            </section>
        `);
        // large screen
        cy.viewport(1100, 800);
        cy.get('.cy-section-overlap').shouldHaveComputedStyle({
            style: 'padding',
            value: '60px 0px',
        });
        cy.get('.cy-section-centered').shouldHaveComputedStyle({
            style: 'padding',
            value: '50px 30px',
        });
        cy.get('.cy-section-bordered1').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        cy.get('.cy-section-bordered2').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        cy.get('.cy-section-bordered3').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        // small screen
        cy.viewport(700, 800);
        cy.get('.cy-section-overlap').shouldHaveComputedStyle({
            style: 'padding',
            value: '20px 0px 60px',
        });
        cy.get('.cy-section-centered').shouldHaveComputedStyle({
            style: 'padding',
            value: '20px 15px',
        });
        cy.get('.cy-section-bordered1').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        cy.get('.cy-section-bordered2').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
        cy.get('.cy-section-bordered3').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 0px 60px',
        });
    });

    it('should style centered', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <section class="vl-section cy-section">
                <p class="vl-content-block cy-section-centered">vl-content-block</p>
                <p>vl-section</p>
            </section>
        `);
        // large screen
        cy.viewport(1100, 800);
        cy.get('.cy-section').shouldHaveComputedStyle({
            style: 'padding',
            value: '60px 0px',
        });
        cy.get('.cy-section-centered').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 30px',
        });
        // small screen
        cy.viewport(700, 800);
        cy.get('.cy-section').shouldHaveComputedStyle({
            style: 'padding',
            value: '20px 0px 60px',
        });
        cy.get('.cy-section-centered').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 15px',
        });
    });
});
