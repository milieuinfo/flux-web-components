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
        cy.get('.vl-grid').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '60px',
        });
        cy.viewport(700, 800);
        cy.get('.vl-grid').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '30px',
        });
    });

    const stackedMedium = html`
        <style>
            .vl-grid .vl-column {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        </style>
        <div class="vl-grid vl-stacked-medium">
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
            <div class="vl-column vl-column--8 vl-column--start-3"></div>
        </div>
    `;

    it('should have medium stacked style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(stackedMedium);
        cy.get('.vl-grid').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '30px',
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
        cy.get('.vl-grid').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '15px',
        });
    });
});
