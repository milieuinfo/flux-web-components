import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

describe('body styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html` <div class="cy-div">een div</div> `);
    });

    it('should be of the right font-family', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'font-family',
            value: '"Flanders Art Sans", sans-serif',
        });
    });

    it('should have the correct styles', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'font-size',
            value: '18px',
        });
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'line-height',
            value: '27px',
        });
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'color',
            value: 'rgb(51, 51, 50)',
        });
        cy.viewport(700, 800);
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'font-size',
            value: '16px',
        });
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'line-height',
            value: '21.28px',
        });
        cy.get('.cy-div').shouldHaveComputedStyle({
            style: 'color',
            value: 'rgb(51, 51, 50)',
        });
    });
});
