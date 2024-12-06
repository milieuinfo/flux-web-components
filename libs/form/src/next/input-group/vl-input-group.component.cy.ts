import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { html } from 'lit';
import { VlInputFieldComponent } from '../input-field';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

describe('story vl-input-group-next', () => {
    it('should contain an input-group with a button and an input-field', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--input-group">
                <vl-button-next input-group>Locatie kiezen</vl-button-next>
                <vl-input-field-next input-group></vl-input-field-next>
            </div>`);
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .eq(0)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-BUTTON-NEXT');
        cy.get('vl-button-next').shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '3px 0px 0px 3px',
        });
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .eq(1)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-INPUT-FIELD-NEXT');
        cy.get('vl-input-field-next').shadow().find('input').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '0px 3px 3px 0px',
        });
    });

    it('should contain an input-group with an input-field and a button', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--input-group">
                <vl-input-field-next input-group></vl-input-field-next>
                <vl-button-next input-group>Locatie kiezen</vl-button-next>
            </div>`);
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .eq(0)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-INPUT-FIELD-NEXT');
        cy.get('vl-input-field-next').shadow().find('input').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '3px 0px 0px 3px',
        });
        cy.get('.vl-group-next')
            .should('have.class', 'vl-group-next--input-group')
            .children()
            .eq(1)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-BUTTON-NEXT');
        cy.get('vl-button-next').shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '0px 3px 3px 0px',
        });
    });
});
