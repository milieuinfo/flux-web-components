import { html } from 'lit';
import { hexToString } from '../../../util/utils';
import { RegisterGlobalStyles } from '../../global-styles-decorator';
import { vlIconStyles } from '../icon/vl-icon.css';

describe('outline styles', () => {
    beforeEach(() => {
        cy.then(() => RegisterGlobalStyles.register());
        cy.mount(html`
            <style>
                ${vlIconStyles}
            </style>
            <span class="vl-icon vl-icon--bike cy-icon-default" />
            <span class="vl-icon vl-icon--small vl-icon--bike cy-icon-small" />
            <span class="vl-icon vl-icon--large vl-icon--bike cy-icon-large" />
            <span class="vl-icon vl-icon--light vl-icon--bike cy-icon-light" />
            <span class="vl-icon vl-icon--right-margin vl-icon--bike cy-icon-right-margin" />
            <span class="vl-icon vl-icon--left-margin vl-icon--bike cy-icon-left-margin" />
            <span class="vl-icon vl-icon--clickable vl-icon--bike cy-icon-clickable" />
        `);
    });

    it('should have the correct default styles', () => {
        cy.get('.cy-icon-default').shouldHaveComputedStyle({
            style: 'font-family',
            value: 'vlaanderen-icon-classic',
        });
        cy.get('.cy-icon-default').shouldHaveComputedStyle({
            style: 'font-size',
            value: '16px',
        });
    });

    it('should display the bike icon', () => {
        // het bike icon is gespecifieerd als
        // .vl-icon--bike::before {
        //     content: '\F12D';
        // }
        cy.get('.vl-icon--bike').shouldHaveComputedStyle({
            style: 'content',
            value: hexToString('0x22 0xF12D 0x22'),
            pseudo: '::before',
        });
    });

    it('should have the small style when set', () => {
        cy.get('.cy-icon-small').shouldHaveComputedStyle({
            style: 'font-size',
            value: '12.8px',
        });
    });

    it('should have the large style when set', () => {
        cy.get('.cy-icon-large').shouldHaveComputedStyle({
            style: 'font-size',
            value: '15.36px',
        });
    });

    it('should have the light style when set', () => {
        cy.get('.cy-icon-light').shouldHaveComputedStyle({
            style: 'color',
            value: 'rgb(134, 149, 168)',
        });
    });

    it('should have the right-margin style when set', () => {
        cy.get('.cy-icon-right-margin').shouldHaveComputedStyle({
            style: 'margin-right',
            value: '7.68px',
        });
    });

    it('should have the clickable style when set', () => {
        cy.get('.cy-icon-clickable').shouldHaveComputedStyle({
            style: 'color',
            value: 'rgb(0, 85, 204)',
        });
    });
});
