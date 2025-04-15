import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGroupStyles } from '@domg-wc/common-utilities/css';
import { VlButtonComponent } from '@domg-wc/components';
import { html } from 'lit';
import { VlInputFieldComponent } from '../input-field';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

describe('story vl-input-group', () => {
    it('should contain an input-group with a button and an input-field', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--input-group">
                <vl-button input-group>Locatie kiezen</vl-button>
                <vl-input-field input-group></vl-input-field>
            </div>`);
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .eq(0)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-BUTTON');
        cy.get('vl-button').shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '3px 0px 0px 3px',
        });
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .eq(1)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-INPUT-FIELD');
        cy.get('vl-input-field').shadow().find('input').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '0px 3px 3px 0px',
        });
    });

    it('should contain an input-group with an input-field and a button', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--input-group">
                <vl-input-field input-group></vl-input-field>
                <vl-button input-group>Locatie kiezen</vl-button>
            </div>`);
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .eq(0)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-INPUT-FIELD');
        cy.get('vl-input-field').shadow().find('input').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '3px 0px 0px 3px',
        });
        cy.get('.vl-group')
            .should('have.class', 'vl-group--input-group')
            .children()
            .eq(1)
            .should('have.prop', 'tagName')
            .should('eq', 'VL-BUTTON');
        cy.get('vl-button').shadow().find('button').shouldHaveComputedStyle({
            style: 'border-radius',
            value: '0px 3px 3px 0px',
        });
    });
});
