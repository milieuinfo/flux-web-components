import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';

describe('stacked styles', () => {
    const stackedLarge = html`
        <style>
            .vl-grid .vl-column {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        </style>
        <div class="vl-grid vl-stacked-large">
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
        </div>
    `;

    it('should have large stacked style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(stackedLarge);
        cy.viewport(1100, 800);
        cy.get('.vl-column').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '60px 0px 0px',
        });
        cy.get('.vl-column').eq(2).shouldHaveComputedStyle({
            style: 'margin',
            value: '60px 0px 0px',
        });
        cy.viewport(700, 800);
        cy.get('.vl-column').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '30px 0px 0px',
        });
        cy.get('.vl-column').eq(2).shouldHaveComputedStyle({
            style: 'margin',
            value: '30px 0px 0px',
        });
    });

    const stackedSmall = html`
        <style>
            .vl-grid .vl-column {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        </style>
        <div class="vl-grid vl-stacked-small">
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
        </div>
    `;

    it('should have small stacked style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(stackedSmall);
        cy.get('.vl-column').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '15px 0px 0px',
        });
        cy.get('.vl-column').eq(2).shouldHaveComputedStyle({
            style: 'margin',
            value: '15px 0px 0px',
        });
    });
});
