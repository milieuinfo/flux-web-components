import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

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
        cy.get('.vl-column-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-column-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '60px 0px 0px',
        });
        cy.get('.vl-column-next').eq(2).shouldHaveComputedStyle({
            style: 'margin',
            value: '60px 0px 0px',
        });
        cy.viewport(700, 800);
        cy.get('.vl-column-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-column-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '30px 0px 0px',
        });
        cy.get('.vl-column-next').eq(2).shouldHaveComputedStyle({
            style: 'margin',
            value: '30px 0px 0px',
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
        cy.get('.vl-column-next').eq(0).shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.vl-column-next').eq(1).shouldHaveComputedStyle({
            style: 'margin',
            value: '15px 0px 0px',
        });
        cy.get('.vl-column-next').eq(2).shouldHaveComputedStyle({
            style: 'margin',
            value: '15px 0px 0px',
        });
    });
});
