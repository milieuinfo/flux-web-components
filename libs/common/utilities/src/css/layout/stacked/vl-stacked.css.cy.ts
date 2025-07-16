import { html } from 'lit';
import { GlobalStyles } from '../../styles';

describe('stacked styles', () => {
    const stackedLarge = html`
        <style>
            .vl-grid-next .vl-column-next {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        </style>
        <div class="vl-grid-next vl-stacked-next-large">
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
        </div>
    `;

    it('should have large stacked style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(stackedLarge);
        cy.viewport(1100, 800);
        cy.get('.vl-grid-next').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '60px',
        });
        cy.viewport(700, 800);
        cy.get('.vl-grid-next').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '30px',
        });
    });

    const stackedMedium = html`
        <style>
            .vl-grid-next .vl-column-next {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        </style>
        <div class="vl-grid-next vl-stacked-next-medium">
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
        </div>
    `;

    it('should have medium stacked style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(stackedMedium);
        cy.get('.vl-grid-next').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '30px',
        });
    });

    const stackedSmall = html`
        <style>
            .vl-grid-next .vl-column-next {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        </style>
        <div class="vl-grid-next vl-stacked-next-small">
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
            <div class="vl-column-next vl-column-next--8 vl-column-next--start-3"></div>
        </div>
    `;

    it('should have small stacked style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(stackedSmall);
        cy.get('.vl-grid-next').eq(0).shouldHaveComputedStyle({
            style: 'row-gap',
            value: '15px',
        });
    });
});
