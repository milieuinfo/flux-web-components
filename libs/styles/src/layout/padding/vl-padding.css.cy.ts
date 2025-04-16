import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';
import { vlPaddingStyles } from './vl-padding.css';

describe('padding styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <style>
                ${vlPaddingStyles} div {
                    padding: 10px;
                }
            </style>
            <div class="vl-padding--small cy-padding-small">padding - small</div>
            <div class="vl-padding--medium cy-padding-medium">padding - medium</div>
            <div class="vl-padding--no cy-padding-no">padding - no</div>
            <div class="vl-padding--no-bottom cy-padding-no-bottom">padding - no bottom</div>
            <div class="vl-padding--no-top cy-padding-no-top">padding - no top</div>
        `);
    });

    it('should have small padding when set', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-padding-small').shouldHaveComputedStyle({
            style: 'padding',
            value: '15px 0px',
        });
        cy.viewport(700, 800);
        cy.get('.cy-padding-small').shouldHaveComputedStyle({
            style: 'padding',
            value: '20px 0px',
        });
    });

    it('should have medium padding when set', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-padding-medium').shouldHaveComputedStyle({
            style: 'padding',
            value: '30px 0px',
        });
        cy.viewport(700, 800);
        cy.get('.cy-padding-medium').shouldHaveComputedStyle({
            style: 'padding',
            value: '20px 0px',
        });
    });

    it('should have no padding when set', () => {
        cy.get('.cy-padding-no').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px',
        });
    });

    it('should have no bottom padding when set', () => {
        cy.get('.cy-padding-no-bottom').shouldHaveComputedStyle({
            style: 'padding-bottom',
            value: '0px',
        });
        cy.get('.cy-padding-no-bottom').shouldHaveComputedStyle({
            style: 'padding-top',
            value: '10px',
        });
    });

    it('should have no top padding when set', () => {
        cy.get('.cy-padding-no-top').shouldHaveComputedStyle({
            style: 'padding-top',
            value: '0px',
        });
        cy.get('.cy-padding-no-top').shouldHaveComputedStyle({
            style: 'padding-bottom',
            value: '10px',
        });
    });
});
