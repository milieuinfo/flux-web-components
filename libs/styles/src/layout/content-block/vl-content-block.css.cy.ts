import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';
import { vlContentBlockStyles } from './vl-content-block.css';

describe('content-block styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
    });

    it('should have default styles', () => {
        cy.viewport('macbook-15');

        cy.mount(html`
            <style>
                ${vlContentBlockStyles}
            </style>
            <div class="vl-content-block cy-content-block-default">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-content-block-default').should('have.class', 'vl-content-block');
        cy.get('.cy-content-block-default').shouldHaveComputedStyle({ style: 'position', value: 'relative' });
        cy.get('.cy-content-block-default').shouldHaveComputedStyle({
            style: 'min-width',
            value: '1024px',
        });
        cy.get('.cy-content-block-default').shouldHaveComputedStyle({
            style: 'max-width',
            value: '1280px',
        });
        cy.get('.cy-content-block-default').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 30px',
        });
    });

    it('should have adapted width when medium screen', () => {
        cy.viewport('ipad-2');

        cy.mount(html`
            <style>
                ${vlContentBlockStyles}
            </style>
            <div class="vl-content-block cy-content-block-medium">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-content-block-medium').shouldHaveComputedStyle({
            style: 'min-width',
            value: '768px',
        });
        cy.get('.cy-content-block-medium').shouldHaveComputedStyle({
            style: 'max-width',
            value: '1280px',
        });
    });

    it('should have adapted padding when small screen', () => {
        cy.mount(html`
            <style>
                ${vlContentBlockStyles}
            </style>
            <div class="vl-content-block cy-content-block-small">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-content-block-small').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 15px',
        });
        cy.get('.cy-content-block-small').shouldHaveComputedStyle({
            style: 'min-width',
            value: '0px',
        });
    });

    it('should have full width', () => {
        const pageWidth = 1600;
        cy.viewport(1600, 1000);
        cy.mount(html`
            <style>
                ${vlContentBlockStyles}
            </style>
            <div class="vl-content-block vl-content-block--full-width">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.vl-content-block--full-width').shouldHaveComputedStyle({
            style: 'width',
            value: `${pageWidth}px`,
        });
    });
});
