import { html } from 'lit';
import { GlobalStyles } from '../../global-styles';

describe('image styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.register());
        cy.mount(html` <img src="cat.jpeg" alt="foto van een kat" /> `);
    });

    it('should have the correct styles', () => {
        cy.get('img').shouldHaveComputedStyle({
            style: 'max-width',
            value: '100%',
        });
    });
});
