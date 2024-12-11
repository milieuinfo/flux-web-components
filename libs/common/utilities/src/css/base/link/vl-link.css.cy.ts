import { html } from 'lit';
import { hexToString } from '../../../util/utils';
import { RegisterGlobalStyles } from '../../global-styles-decorator';
import { vlIconStyles } from '../icon/vl-icon.css';
import { vlLinkStyles } from './vl-link.css';

describe('link styles', () => {
    beforeEach(() => {
        cy.then(() => RegisterGlobalStyles.register());
        cy.mount(html`
            <style>
                ${vlLinkStyles()}
                ${vlIconStyles}
            </style>
            <div>
                <a class="cy-link-default">link - default</a>
                <a class="bold cy-link-bold">link - bold</a>
                <a class="small cy-link-small">link - small</a>
                <a class="large cy-link-large">link - large</a>
                <a class="error cy-link-error">link - error</a>
                <a class="cy-link-icon">
                    <span class="vl-icon vl-icon--before vl-icon--paperplane"></span>
                    link - fiets
                    <span class="vl-icon vl-icon--after vl-icon--paperplane"></span>
                </a>
            </div>
        `);
    });

    it('should have been reset', () => {
        cy.get('.cy-link-default').shouldHaveComputedStyle({
            style: 'margin',
            value: '0px',
        });
        cy.get('.cy-link-default').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px',
        });
        cy.get('.cy-link-default').shouldHaveComputedStyle({
            style: 'border-width',
            value: '0px',
        });
    });

    it('should have bold style when set', () => {
        cy.get('.cy-link-bold').shouldHaveComputedStyle({
            style: 'font-weight',
            value: '500',
        });
    });

    it('should have small style when set', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-link-small').shouldHaveComputedStyle({
            style: 'font-size',
            value: '16px',
        });
        cy.viewport(700, 800);
        cy.get('.cy-link-small').shouldHaveComputedStyle({
            style: 'font-size',
            value: '15px',
        });
    });

    it('should have large style when set', () => {
        cy.viewport(1100, 800);
        cy.get('.cy-link-large').shouldHaveComputedStyle({
            style: 'font-size',
            value: '20px',
        });
        cy.viewport(700, 800);
        cy.get('.cy-link-large').shouldHaveComputedStyle({
            style: 'font-size',
            value: '18px',
        });
    });

    it('should have error style when set', () => {
        cy.get('.cy-link-error').shouldHaveComputedStyle({
            style: 'color',
            value: 'rgb(210, 55, 60)',
        });
    });

    it('should display the paperplane icon', () => {
        // het paperplane icon is gespecifieerd als
        // .vl-icon--paperplane::before {
        //     content: '\F231';
        // }
        cy.get('.cy-link-icon')
            .find('.vl-icon--before')
            .shouldHaveComputedStyle({
                style: 'content',
                value: hexToString('0x22 0xF231 0x22'),
                pseudo: '::before',
            });
    });
});
