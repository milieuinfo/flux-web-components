import { GlobalStyles } from '@domg-wc/common';
import { html } from 'lit';
import { vlAccessibilityStyles } from './vl-accessibility-styles.css';

describe('accessibility styles', () => {
    beforeEach(() => {
        cy.then(() => GlobalStyles.getInstance().register());
    });
    it('should render content that is not visible', () => {
        const invisibleText = 'Verborgen tekst'
        cy.mount(
            html`
            <style>
                ${vlAccessibilityStyles}
            </style>
            <div>
                <div class="vl-visually-hidden">${invisibleText}</div>
                <div>Andere zichtbare content</div>
            </div>`
        );
        cy.contains(invisibleText).should('exist');
        cy.get('.vl-visually-hidden').then(([visuallyHidden]) => {
            const { right, bottom } = visuallyHidden.getBoundingClientRect();
            expect(bottom).to.equal(0);
            expect(right).to.equal(0);
        })
    });
});
