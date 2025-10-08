import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';

describe('cypress-component - base styles - vl-font', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
        cy.mount(html`
            <style>
                .cy-font {
                    font-family: 'Flanders Art Sans';
                    font-style: normal;
                }
            </style>
            <div class="cy-font">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </div>
        `);
    });

    it('should be of the right font-family', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-font').shouldHaveComputedStyle({
            style: 'font-family',
            value: '"Flanders Art Sans"',
        });
    });
});
