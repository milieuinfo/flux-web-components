import { html } from 'lit';
import { vlHeading1, vlHeading2, vlHeading3, vlHeading4, vlHeading5, vlHeading6 } from './vl-heading.css';

describe('heading styles', () => {
    beforeEach(() => {
        cy.mount(html`
            <style>
                .cy-heading-1 {
                    ${vlHeading1}
                }
                .cy-heading-2 {
                    ${vlHeading2}
                }
                .cy-heading-3 {
                    ${vlHeading3}
                }
                .cy-heading-4 {
                    ${vlHeading4}
                }
                .cy-heading-5 {
                    ${vlHeading5}
                }
                .cy-heading-6 {
                    ${vlHeading6}
                }
            </style>
            <div class="cy-heading-1">Heading van grootte 1</div>
            <div class="cy-heading-2">Heading van grootte 2</div>
            <div class="cy-heading-3">Heading van grootte 3</div>
            <div class="cy-heading-4">Heading van grootte 4</div>
            <div class="cy-heading-5">Heading van grootte 5</div>
            <div class="cy-heading-6">Heading van grootte 6</div>
        `);
    });

    it('should mount', () => {
        cy.get('.cy-heading-1');
        cy.get('.cy-heading-2');
        cy.get('.cy-heading-3');
        cy.get('.cy-heading-4');
        cy.get('.cy-heading-5');
        cy.get('.cy-heading-6');
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('.cy-heading-1');
        cy.checkA11y('.cy-heading-2');
        cy.checkA11y('.cy-heading-3');
        cy.checkA11y('.cy-heading-4');
        cy.checkA11y('.cy-heading-5');
        cy.checkA11y('.cy-heading-6');
    });

    it('heading-1 should be responsive', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-heading-1').shouldHaveComputedStyle({ style: 'font-size', value: '70.4px' });
        cy.viewport(1000, 800);
        cy.get('.cy-heading-1').shouldHaveComputedStyle({ style: 'font-size', value: '64px' });
        cy.viewport(700, 800);
        cy.get('.cy-heading-1').shouldHaveComputedStyle({ style: 'font-size', value: '48px' });
    });

    it('heading-2 should be responsive', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-heading-2').shouldHaveComputedStyle({ style: 'font-size', value: '51.2px' });
        cy.viewport(700, 800);
        cy.get('.cy-heading-2').shouldHaveComputedStyle({ style: 'font-size', value: '41.6px' });
    });

    it('heading-3 should be responsive', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-heading-3').shouldHaveComputedStyle({ style: 'font-size', value: '41.6px' });
        cy.viewport(700, 800);
        cy.get('.cy-heading-3').shouldHaveComputedStyle({ style: 'font-size', value: '35.2px' });
    });

    it('heading-4 should be responsive', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-heading-4').shouldHaveComputedStyle({ style: 'font-size', value: '35.2px' });
        cy.viewport(700, 800);
        cy.get('.cy-heading-4').shouldHaveComputedStyle({ style: 'font-size', value: '32px' });
    });

    it('heading-5 should be responsive', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-heading-5').shouldHaveComputedStyle({ style: 'font-size', value: '32px' });
        cy.viewport(700, 800);
        cy.get('.cy-heading-5').shouldHaveComputedStyle({ style: 'font-size', value: '28.8px' });
    });

    it('heading-6 should be responsive', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-heading-6').shouldHaveComputedStyle({ style: 'font-size', value: '28.8px' });
        cy.viewport(700, 800);
        cy.get('.cy-heading-6').shouldHaveComputedStyle({ style: 'font-size', value: '28.8px' });
    });
});
