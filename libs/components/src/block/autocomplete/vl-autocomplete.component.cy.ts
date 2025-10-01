import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlAutocomplete } from './vl-autocomplete.component';

registerWebComponents([VlAutocomplete]);

describe('component vl-autocomplete', () => {
    it('should set placeholder', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);
        cy.get('vl-autocomplete').shadow().find('input').invoke('attr', 'placeholder').should('eq', 'Hint: typ Gent');
    });

    it('should display 5 suggestions after typing the g character', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li').should('have.length', 5);
    });

    it('should return entire item in event detail', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
                @selected-autocomplete=${() => console.log('selected')}
            ></vl-autocomplete>
        `);

        cy.createStubForEvent('vl-autocomplete', 'selected-autocomplete');
        cy.get('vl-autocomplete').shadow().find('input').type('Gentbos');
        cy.get('vl-autocomplete').shadow().find('#suggestions').first().click();

        cy.get('@selected-autocomplete')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { title: 'Gentbos, Merelbeke', subtitle: 'Adres', value: '2', custom: 'custom' });
    });

    it('should show loading animation when typing without suggestions by default', () => {
        cy.mount(html` <vl-autocomplete min-chars="1" placeholder="Hint: typ Gent"></vl-autocomplete> `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete__loader').should('not.have.attr', 'hidden');
    });

    it('should not show loading animation when typing without suggestions when disabled', () => {
        cy.mount(
            html` <vl-autocomplete min-chars="1" placeholder="Hint: typ Gent" disable-loading></vl-autocomplete> `
        );

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete__loader').should('have.attr', 'hidden');
    });
});

export const complexItems = [
    { title: 'Gent', subtitle: 'Gemeente', value: '1' },
    { title: 'Gentbos, Merelbeke', subtitle: 'Adres', value: '2', custom: 'custom' },
    { title: 'Gentbruggestraat, Gent', subtitle: 'Adres', value: '3' },
    { title: 'Gentele, Brugge', subtitle: 'Adres', value: '5' },
    { title: 'Automotive Contractors Gent ', subtitle: 'Project', value: '6' },
    { title: 'Buurtshuis Watersportbaan Gent', subtitle: 'Project', value: '7' },
];
