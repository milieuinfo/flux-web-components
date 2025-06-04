import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';
import { vlMarginStyles } from './vl-margin.css';

describe('margin styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <style>
                ${vlMarginStyles} div.cy-margin-no-bottom {
                    margin-top: 10px;
                }

                div.cy-margin-no-top {
                    margin-bottom: 10px;
                }
            </style>
            <div class="vl-margin--small cy-margin-small">margin - small</div>
            <div class="vl-margin--medium cy-margin-medium">margin - medium</div>
            <div class="vl-margin--no cy-margin-no">margin - no</div>
            <div class="vl-margin--no-bottom cy-margin-no-bottom">margin - no bottom</div>
            <div class="vl-margin--no-top cy-margin-no-top">margin - no top</div>
        `);
    });

    it('should have small margin when set', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-margin-small').shouldHaveComputedStyle({
            style: 'margin',
            value: '15px 0px',
        });
        cy.viewport(700, 800);
        cy.get('.cy-margin-small').shouldHaveComputedStyle({
            style: 'margin',
            value: '20px 0px',
        });
    });

    it('should have medium margin when set', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-margin-medium').shouldHaveComputedStyle({
            style: 'margin',
            value: '30px 0px',
        });
        cy.viewport(700, 800);
        cy.get('.cy-margin-medium').shouldHaveComputedStyle({
            style: 'margin',
            value: '20px 0px',
        });
    });

    it('should have no margin when set', () => {
        cy.get('.cy-margin-no').shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have no bottom margin when set', () => {
        cy.get('.cy-margin-no-bottom').shouldHaveComputedStyle({
            style: 'margin-bottom',
            value: '0px',
        });
        cy.get('.cy-margin-no-bottom').shouldHaveComputedStyle({
            style: 'margin-top',
            value: '10px',
        });
    });

    it('should have no top margin when set', () => {
        cy.get('.cy-margin-no-top').shouldHaveComputedStyle({
            style: 'margin-top',
            value: '0px',
        });
        cy.get('.cy-margin-no-top').shouldHaveComputedStyle({
            style: 'margin-bottom',
            value: '10px',
        });
    });
});
