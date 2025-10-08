import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';
import { vlParagraphStyles } from './vl-paragraph-style.css';

describe('cypress-component - atom components - vl-paragraph-style', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <style>
                ${vlParagraphStyles}
            </style>
            <p class="cy-p-default">paragraph - default</p>
            <p class="bold cy-p-bold">paragraph - bold</p>
            <p class="introduction cy-p-introduction">paragraph - introduction</p>
        `);
    });

    it('should render a default paragraph', () => {
        cy.get('.cy-p-default').shouldHaveComputedStyle({ style: 'margin', value: '0px' });
    });

    it('should render a bold paragraph', () => {
        cy.get('.cy-p-bold').shouldHaveComputedStyle({ style: 'font-weight', value: '500' });
    });

    it('should render an introduction paragraph', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-p-introduction').shouldHaveComputedStyle({ style: 'font-size', value: '22px' });
        cy.get('.cy-p-introduction').shouldHaveComputedStyle({ style: 'color', value: 'rgb(104, 116, 131)' });
        cy.viewport(1000, 800);
        cy.get('.cy-p-introduction').shouldHaveComputedStyle({ style: 'font-size', value: '20px' });
        cy.viewport(700, 800);
        cy.get('.cy-p-introduction').shouldHaveComputedStyle({ style: 'font-size', value: '18px' });
    });
});
