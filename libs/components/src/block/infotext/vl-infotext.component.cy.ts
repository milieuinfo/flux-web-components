import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlInfotextComponent } from './vl-infotext.component';

registerWebComponents([VlInfotextComponent]);

describe('component - vl-infotext', () => {
    it('should mount', () => {
        cy.mount(html`<vl-infotext></vl-infotext>`);

        cy.get('vl-infotext').shadow();
    });

    it('should be accessible', () => {
        cy.mount(html`
            <vl-infotext>
                <span slot="value">32</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-infotext');
    });

    it('should set value', () => {
        cy.mount(html`
            <vl-infotext>
                <span slot="value">32</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);

        cy.get('vl-infotext').find('span[slot="value"]').contains('32');
        cy.get('vl-infotext').shadow().find('.vl-infotext__value').contains('32');
    });

    it('should set text', () => {
        cy.mount(html`
            <vl-infotext>
                <span slot="value">32</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);

        cy.get('vl-infotext').find('span[slot="text"]').contains('Bezoekers per dag');
        cy.get('vl-infotext').shadow().find('.vl-infotext__text').find('slot[name="text"]');
    });

    it('should set href', () => {
        cy.mount(html`
            <vl-infotext href="https://www.vlaanderen.be">
                <span slot="value">32</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);

        cy.get('vl-infotext').should('have.attr', 'href', 'https://www.vlaanderen.be');
        cy.get('vl-infotext').shadow().find('a[href="https://www.vlaanderen.be"]');
    });

    it('should set external', () => {
        cy.mount(html`
            <vl-infotext href="https://www.vlaanderen.be" external>
                <span slot="value">32</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);

        cy.get('vl-infotext').should('have.attr', 'external', '');
        cy.get('vl-infotext').shadow().find('a[target="_blank"]');
    });

    it('should format value', () => {
        cy.mount(html`
            <vl-infotext>
                <span slot="value">32000</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);

        cy.get('vl-infotext').find('span[slot="value"]').contains('32000');
        cy.get('vl-infotext').shadow().find('.vl-infotext__value').contains('32 000');
    });

    it('should alter font-size based on value length', () => {
        cy.mount(html`
            <vl-infotext>
                <span slot="value">32</span>
                <span slot="text">Bezoekers per dag</span>
            </vl-infotext>
        `);

        cy.get('vl-infotext')
            .shadow()
            .find('.vl-infotext__value')
            .shouldHaveComputedStyle({ style: 'font-size', value: '24px' });
        cy.get('vl-infotext').find('span[slot="value"]').invoke('text', '320000');
        cy.get('vl-infotext')
            .shadow()
            .find('.vl-infotext__value')
            .shouldHaveComputedStyle({ style: 'font-size', value: '24px', not: true });
    });
});
