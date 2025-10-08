import { registerWebComponents } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import { html } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlInputFieldComponent } from '../input-field';

registerWebComponents([VlButtonComponent, VlInputFieldComponent]);

describe('cypress-component - form components - vl-input-group', () => {
    it('should contain an input-group with a button and an input-field', () => {
        cy.mount(html` <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--input-group">
                <vl-button input-group label="locatie kiezen">Locatie kiezen</vl-button>
                <vl-input-field input-group label="locatie ingave"></vl-input-field>
            </div>`);
        cy.injectAxe();

        cy.checkA11y('.vl-group');
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
                <vl-input-field input-group label="locatie ingave"></vl-input-field>
                <vl-button input-group label="locatie kiezen">Locatie kiezen</vl-button>
            </div>`);
        cy.injectAxe();

        cy.checkA11y('.vl-group');
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
