import { html } from 'lit';
import { GlobalStyles } from '../../styles';
import { vlFocusOutlineMixin } from './vl-outlines.css';

describe('outline styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <style>
                .cy-outline-focus {
                    ${vlFocusOutlineMixin()}
                }
            </style>
            <div class="cy-outline-focus">focus-outline</div>
        `);
    });

    it('should have the correct syles', () => {
        cy.get('.cy-outline-focus').shouldHaveComputedStyle({
            style: 'box-shadow',
            value: 'none',
        });
        cy.get('.cy-outline-focus').shouldHaveComputedStyle({
            style: 'outline',
            value: 'rgba(0, 85, 204, 0.65) solid 3px',
        });
        cy.get('.cy-outline-focus').shouldHaveComputedStyle({
            style: 'outline-offset',
            value: '2px',
        });
    });
});
