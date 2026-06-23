import { html } from 'lit';
import { vlGroupStyles } from './vl-group.css';

describe('cypress-component - layout styles - vl-group', () => {
    it('should have default styles', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group cy-group-default">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-default').shouldHaveComputedStyle({
            style: 'display',
            value: 'flex',
        });
        cy.get('.cy-group-default').shouldHaveComputedStyle({
            style: 'align-items',
            value: 'normal',
        });
        cy.get('.cy-group-default').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-default').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'normal',
        });
    });

    it('should have column direction when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--column cy-group-column ">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-column').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
    });

    it('should stretch children when specified', () => {
        const width = 500;
        cy.viewport(width, 800);
        cy.mount(html`
            <style>
                body { margin: 0; }
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--column vl-group--stretch-children">
                <span data-cy="first-level">
                    <span data-cy="second-level">item-1</span>
                </span>
            </div>
        `);
        cy.getDataCy('first-level').shouldHaveComputedStyle({
            style: 'width',
            value: `${width}px`,
        });
        cy.getDataCy('second-level').shouldHaveComputedStyle({
            style: 'width',
            value: `${width}px`,
            not: true,
        });
    });

    it('should have no gap when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--no-gap cy-group-no-gap">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-no-gap').shouldHaveComputedStyle({
            style: 'gap',
            value: '0px',
        });
    });

    it('should have no row gap when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--no-row-gap cy-group-no-row-gap">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-no-row-gap').shouldHaveComputedStyle({
            style: 'row-gap',
            value: '0px',
        });
    });

    it('should have no column gap when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--no-column-gap cy-group-no-column-gap">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-no-column-gap').shouldHaveComputedStyle({
            style: 'column-gap',
            value: '0px',
        });
    });

    it('should wrap when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--wrap cy-group-wrap">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-wrap').shouldHaveComputedStyle({
            style: 'flex-wrap',
            value: 'wrap',
        });
    });

    it('should have content with space between when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--space-between cy-group-justify-content">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-justify-content').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'space-between',
        });
    });

    it('should have content at the start when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--justify-start cy-group-justify-start">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-justify-start').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'flex-start',
        });
    });

    it('should have content in the center when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--justify-center cy-group-justify-content">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-justify-content').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'center',
        });
    });

    it('should have content at the end when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--justify-end cy-group-justify-content">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-justify-content').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'flex-end',
        });
    });

    it('should align items at the start when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--align-start cy-group-align-start">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-align-start').shouldHaveComputedStyle({
            style: 'align-items',
            value: 'flex-start',
        });
    });

    it('should align items at the center when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--align-center cy-group-align-center">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-align-center').shouldHaveComputedStyle({
            style: 'align-items',
            value: 'center',
        });
    });

    it('should align items at the end when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--align-end cy-group-align-end">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-align-end').shouldHaveComputedStyle({
            style: 'align-items',
            value: 'flex-end',
        });
    });

    it('should have content at the text baseline when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--baseline cy-group-baseline">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-baseline').shouldHaveComputedStyle({
            style: 'align-items',
            value: 'baseline',
        });
    });

    it('should have row separators when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--separator-row">
                <span class="item-1">item-1</span>
                <span class="item-2">item-2</span>
            </div>
        `);
        cy.get('.item-1').shouldHaveComputedStyle({
            style: 'border-left',
            value: '0px none rgb(0, 0, 0)',
            pseudo: '::before',
        });
        cy.get('.item-2').shouldHaveComputedStyle({
            style: 'border-left',
            value: '1px solid rgb(203, 210, 218)',
            pseudo: '::before',
        });
    });

    it('should have column separators when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group vl-group--column vl-group--separator-column">
                <span class="item-1">item-1</span>
                <span class="item-2">item-2</span>
            </div>
        `);
        cy.get('.item-1').shouldHaveComputedStyle({
            style: 'border-top',
            value: '0px none rgb(0, 0, 0)',
        });
        cy.get('.item-2').shouldHaveComputedStyle({
            style: 'border-top',
            value: '1px solid rgb(203, 210, 218)',
        });
    });

    const collapseHtml = html`
        <style>
            ${vlGroupStyles}
        </style>
        <div class="vl-group cy-group-no-collapse">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group vl-group--collapse-l cy-group-collapse-l">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group vl-group--collapse-m cy-group-collapse-m">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group vl-group--collapse-s cy-group-collapse-s">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group vl-group--collapse-xs cy-group-collapse-xs">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
    `;

    it('should collapse correct on large screens', () => {
        cy.mount(collapseHtml);
        cy.viewport(1100, 800);
        cy.get('.cy-group-no-collapse').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-l').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
        cy.get('.cy-group-collapse-m').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-s').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-xs').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
    });

    it('should collapse correct on medium screens', () => {
        cy.mount(collapseHtml);
        cy.viewport(1000, 800);
        cy.get('.cy-group-no-collapse').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-l').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-m').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
        cy.get('.cy-group-collapse-s').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-xs').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
    });

    it('should collapse correct on small screens', () => {
        cy.mount(collapseHtml);
        cy.viewport(700, 800);
        cy.get('.cy-group-no-collapse').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-l').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-m').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
        cy.get('.cy-group-collapse-s').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
        cy.get('.cy-group-collapse-xs').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
    });

    it('should collapse correct on extra-small screens', () => {
        cy.mount(collapseHtml);
        cy.viewport(400, 800);
        cy.get('.cy-group-no-collapse').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-l').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'row',
        });
        cy.get('.cy-group-collapse-m').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
        cy.get('.cy-group-collapse-s').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
        cy.get('.cy-group-collapse-xs').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
    });

    const inputGroupHtml = html`
        <style>
            ${vlGroupStyles}
        </style>
        <div class="vl-group vl-group--input-group">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
    `;

    it('should have no gap when its an input-group', () => {
        cy.mount(inputGroupHtml);
        cy.viewport(400, 800);
        cy.get('.vl-group').shouldHaveComputedStyle({
            style: 'gap',
            value: '0px',
        });
    });
});
