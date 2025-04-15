import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

describe('separator styles', () => {
    it('should have default separator style', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html` <hr class="vl-separator" /> `);
        cy.get('hr').shouldHaveComputedStyle({
            style: 'border-bottom',
            value: '1px solid rgb(203, 210, 218)',
        });
        cy.get('hr').shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
    });

    it('should have separator style with slashes', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html` <hr class="vl-separator-slash" /> `);
        // only check 1 specific style, the background is too complex
        cy.get('hr').shouldHaveComputedStyle({
            style: 'min-height',
            value: '6px',
        });
    });

    it('should have separator style with waves', () => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html` <hr class="vl-separator-wave" /> `);
        // only check 1 specific style, the background is too complex
        cy.get('hr').shouldHaveComputedStyle({
            style: 'height',
            value: '4px',
        });
    });
});
