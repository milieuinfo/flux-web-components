import { html } from 'lit';
import { RegisterGlobalStyles } from '../../global-styles-decorator';

describe('section styles', () => {
    it('should style the defaults', () => {
        cy.then(() => RegisterGlobalStyles.register());
        cy.mount(html`
            <section class="vl-section-next vl-section-next--alt cy-section-first">
                <p>vl-section-next vl-section-next--alt</p>
            </section>
            <section class="vl-section-next vl-section-next--bordered cy-section-bordered1">
                <p>vl-section-next vl-section-next--bordered</p>
            </section>
            <section class="vl-section-next vl-section-next--bordered vl-section-next--small cy-section-bordered-small">
                <p>vl-section-next vl-section-next--bordered vl-section-next--small</p>
            </section>
            <section class="vl-section-next vl-section-next--bordered cy-section-bordered2">
                <p>vl-section-next vl-section-next--bordered</p>
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
        cy.then(() => RegisterGlobalStyles.register());
        cy.mount(html`
            <section class="vl-section-next vl-section-next--overlap cy-section-overlap">
                <p class="vl-section-next__centered cy-section-centered">vl-section-next__centered</p>
                <p>vl-section-next vl-section-next--overlap</p>
            </section>
            <section class="vl-section-next vl-section-next--bordered cy-section-bordered1">
                <p>vl-section-next vl-section-next--bordered</p>
            </section>
            <section class="vl-section-next vl-section-next--bordered cy-section-bordered2">
                <p>vl-section-next vl-section-next--bordered</p>
            </section>
            <section class="vl-section-next vl-section-next--bordered cy-section-bordered3">
                <p>vl-section-next vl-section-next--bordered</p>
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
        cy.then(() => RegisterGlobalStyles.register());
        cy.mount(html`
            <section class="vl-section-next cy-section">
                <p class="vl-section-next__centered cy-section-centered">vl-section-next__centered</p>
                <p>vl-section-next</p>
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
