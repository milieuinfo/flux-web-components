import { html } from 'lit';
import { vlGroupStyles } from './vl-group.css';

describe('group styles', () => {
    it('should have default styles', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next cy-group-default">
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
            value: 'center',
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
            <div class="vl-group-next vl-group-next--column cy-group-column ">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-column').shouldHaveComputedStyle({
            style: 'flex-direction',
            value: 'column',
        });
    });

    it('should have content with space between when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--space-between cy-group-justify-content">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-justify-content').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'space-between',
        });
    });

    it('should have content in the center when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--justify-center cy-group-justify-content">
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
            <div class="vl-group-next vl-group-next--justify-end cy-group-justify-content">
                <span>item-1</span>
                <span>item-2</span>
            </div>
        `);
        cy.get('.cy-group-justify-content').shouldHaveComputedStyle({
            style: 'justify-content',
            value: 'flex-end',
        });
    });

    it('should have row separators when specified', () => {
        cy.mount(html`
            <style>
                ${vlGroupStyles}
            </style>
            <div class="vl-group-next vl-group-next--separator-row">
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
            <div class="vl-group-next vl-group-next--column vl-group-next--separator-column">
                <span class="item-1">item-1</span>
                <span class="item-2">item-2</span>
            </div>
        `);
        cy.get('.item-1').shouldHaveComputedStyle({
            style: 'border-top',
            value: '1px solid rgb(203, 210, 218)',
        });
        cy.get('.item-2').shouldHaveComputedStyle({
            style: 'border-top',
            value: '1px solid rgb(203, 210, 218)',
        });
        cy.get('.item-2').shouldHaveComputedStyle({
            style: 'border-bottom',
            value: '1px solid rgb(203, 210, 218)',
        });
    });

    const collapseHtml = html`
        <style>
            ${vlGroupStyles}
        </style>
        <div class="vl-group-next cy-group-no-collapse">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group-next vl-group-next--collapse-l cy-group-collapse-l">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group-next vl-group-next--collapse-m cy-group-collapse-m">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group-next vl-group-next--collapse-s cy-group-collapse-s">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
        <div class="vl-group-next vl-group-next--collapse-xs cy-group-collapse-xs">
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
        <div class="vl-group-next vl-group-next--input-group">
            <span class="item-1">item-1</span>
            <span class="item-2">item-2</span>
        </div>
    `;

    it('should have no gap when its an input-group', () => {
        cy.mount(inputGroupHtml);
        cy.viewport(400, 800);
        cy.get('.vl-group-next').shouldHaveComputedStyle({
            style: 'gap',
            value: '0px',
        });
    });
});
