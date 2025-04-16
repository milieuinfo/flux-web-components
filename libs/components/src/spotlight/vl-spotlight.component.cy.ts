import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlSpotlight } from './index';

registerWebComponents([VlSpotlight]);

describe('vl-spotlight', () => {
    it('should render', () => {
        cy.mount(html`<vl-spotlight></vl-spotlight>`);

        cy.get(`vl-spotlight`).should('be.visible');
    });

    it.skip('should be accessible', () => {
        cy.mount(html`<vl-spotlight></vl-spotlight>`);

        // TODO: 2 accessibility violations to be solved
        cy.injectAxe();
        cy.checkA11y();
    });

    it('should have a title', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Premies voor renovatie');
    });

    it('should have a subtitle', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
                <span slot="subtitle">Artikel 3.3.1</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Artikel 3.3.1');
    });

    it('should have content', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
                <span slot="content">Er zijn er verschillende...</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Er zijn er verschillende...');
    });

    it('should have a border by default', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`)
            .shadow()
            .find('article')
            .shouldHaveComputedStyle({ pseudo: 'before', style: 'height', value: '2px' })
            .shouldHaveComputedStyle({ pseudo: 'before', style: 'background-color', value: 'rgb(203, 210, 218)' });
    });

    it('should have no border', () => {
        cy.mount(html`
            <vl-spotlight data-vl-no-border>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).shadow().find('article').should('have.class', 'vl-spotlight--no-border');
    });

    it('should have an external link', () => {
        cy.mount(html`
            <vl-spotlight data-vl-link="http://www.google.com" data-vl-external>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`)
            .shadow()
            .find('a')
            .should('have.attr', 'href', 'http://www.google.com')
            .and('have.attr', 'target', '_blank');
    });
});
