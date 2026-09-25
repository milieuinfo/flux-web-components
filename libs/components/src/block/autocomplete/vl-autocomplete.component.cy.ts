import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlAutocomplete } from './vl-autocomplete.component';
import { AutocompleteItemTemplateFn } from './vl-autocomplete.model';

registerWebComponents([VlAutocomplete]);

describe('cypress-component - block components - vl-autocomplete', () => {
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

    it('should render the suggestion content with the item template when set', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
                .itemTemplate=${itemTemplate}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('Gentbos');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('li')
            .first()
            .find('.custom-item')
            .should('have.text', 'Gentbos, Merelbeke - custom');
    });

    it('should keep the caption format for the suggestion content when no item template is set', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('Gentbos');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('.custom-item').should('not.exist');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('li')
            .first()
            .find('.flux-autocomplete_title')
            .should('have.text', 'Gentbos, Merelbeke');
    });

    it('should not apply the item template to the no matches suggestion', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                no-matches-text="Geen resultaat"
                .items=${complexItems}
                .itemTemplate=${itemTemplate}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('xyz');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li').should('have.length', 1);
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('.custom-item').should('not.exist');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('li')
            .first()
            .should('contain.text', 'Geen resultaat');
    });

    it('should upgrade vl-text inside an item template without the consumer registering it', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
                .itemTemplate=${textItemTemplate}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('Gentbos');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('vl-text[bold]')
            .should('have.text', 'Gentbos, Merelbeke')
            .and(($el) => {
                expect($el[0].shadowRoot, 'vl-text is upgraded').to.not.be.null;
            });
    });

    it('should show loading animation when typing without suggestions by default', () => {
        cy.mount(html` <vl-autocomplete min-chars="1" placeholder="Hint: typ Gent"></vl-autocomplete> `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete__loader').should('not.have.attr', 'hidden');
    });

    it('should not show loading animation when typing without suggestions when disabled', () => {
        cy.mount(html`
            <vl-autocomplete min-chars="1" placeholder="Hint: typ Gent" disable-loading></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete__loader').should('have.attr', 'hidden');
    });

    it('should identify the input as a combobox controlling the suggestion listbox', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete')
            .shadow()
            .find('input')
            .should('have.attr', 'role', 'combobox')
            .and('have.attr', 'aria-haspopup', 'listbox')
            .and('have.attr', 'aria-controls', 'suggestions')
            .and('have.attr', 'aria-expanded', 'true')
            .and('not.have.attr', 'aria-owns');
    });

    it('should announce the number of available suggestions in a status region', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete')
            .shadow()
            .find('[role="status"]')
            .should('have.attr', 'aria-live', 'polite')
            .and('have.attr', 'aria-atomic', 'true')
            .and('contain.text', '5 resultaten beschikbaar');

        cy.get('vl-autocomplete').shadow().find('input').type('entbos');
        cy.get('vl-autocomplete').shadow().find('[role="status"]').should('contain.text', '1 resultaat beschikbaar');
    });

    it('should announce the no matches text when nothing is found', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                no-matches-text="Geen resultaat"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('xyz');
        cy.get('vl-autocomplete').shadow().find('[role="status"]').should('contain.text', 'Geen resultaat');
    });

    it('should clear the status region when the suggestions close', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('[role="status"]').should('contain.text', 'resultaten beschikbaar');

        cy.get('vl-autocomplete').shadow().find('input').clear();
        cy.get('vl-autocomplete')
            .shadow()
            .find('[role="status"]')
            .invoke('text')
            .invoke('trim')
            .should('eq', '');
    });

    it('should expose group headings as presentational and the suggestions with their group name', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li[role="presentation"]').should('have.length', 3);
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li[role="option"]').should('have.length', 6);
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('li[role="option"]')
            .first()
            .should('have.attr', 'aria-label', 'Gemeente: Gent');
    });

    it('should skip the group headings when navigating with the arrow keys', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').type('{downArrow}');

        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('.vl-autocomplete__cta--focus')
            .should('have.length', 1)
            .and('have.class', 'flux-autocomplete-item')
            .and('contain.text', 'Gentbos, Merelbeke');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('li.flux-autocomplete-group.vl-autocomplete__cta--focus')
            .should('not.exist');
    });

    it('should move aria-activedescendant and aria-selected along with the arrow keys', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').type('{downArrow}');

        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('li[aria-selected="true"]')
            .should('have.length', 1)
            .then(([selected]) => {
                cy.get('vl-autocomplete')
                    .shadow()
                    .find('input')
                    .should('have.attr', 'aria-activedescendant', selected.id);
            });
    });

    it('should select the highlighted suggestion with the enter key', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.createStubForEvent('vl-autocomplete', 'selected-autocomplete');
        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').type('{downArrow}');
        cy.get('vl-autocomplete').shadow().find('input').type('{enter}');

        cy.get('@selected-autocomplete')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail')
            .should('deep.equal', { title: 'Gentbos, Merelbeke', subtitle: 'Adres', value: '2', custom: 'custom' });
        cy.get('vl-autocomplete').shadow().find('input').should('have.value', 'Gentbos, Merelbeke');
    });

    it('should close the suggestions and drop aria-activedescendant after a selection', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').should('have.attr', 'aria-expanded', 'true');

        cy.get('vl-autocomplete').shadow().find('input').type('{downArrow}');
        cy.get('vl-autocomplete').shadow().find('input').type('{enter}');

        cy.get('vl-autocomplete').shadow().find('input').should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', 'aria-activedescendant');
    });

    it('should walk back up through the suggestions and skip the group headings', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').type('{downArrow}{downArrow}{upArrow}');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('.vl-autocomplete__cta--focus')
            .should('have.length', 1)
            .and('have.id', 'flux-autocomplete-item-2-1');

        cy.get('vl-autocomplete').shadow().find('input').type('{upArrow}');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('.vl-autocomplete__cta--focus')
            .should('have.length', 1)
            .and('have.id', 'flux-autocomplete-item-1-0');
    });

    it('should stay on the first suggestion when navigating up from the top', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').type('{upArrow}{upArrow}');

        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('.vl-autocomplete__cta--focus')
            .should('have.length', 1)
            .and('have.id', 'flux-autocomplete-item-1-0');
    });

    it('should not select anything when a group heading is clicked', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.createStubForEvent('vl-autocomplete', 'selected-autocomplete');
        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li[role="presentation"]').first().click();

        cy.get('@selected-autocomplete').should('not.have.been.called');
        cy.get('vl-autocomplete').shadow().find('input').should('have.value', 'g');
    });

    it('should not present itself as a combobox when there are no suggestions', () => {
        cy.mount(html` <vl-autocomplete min-chars="1" placeholder="Hint: typ Gent" disable-loading></vl-autocomplete> `);

        ['role', 'aria-autocomplete', 'aria-controls', 'aria-haspopup', 'aria-expanded'].forEach((attribute) => {
            cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', attribute);
        });

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', 'role');
    });

    it('should be accessible with a closed suggestion list', () => {
        cy.mount(html`
            <vl-autocomplete label="Zoek een plaats" min-chars="1" .items=${complexItems}></vl-autocomplete>
        `);
        cy.injectAxe();

        cy.checkA11y('vl-autocomplete');
    });

    it('should take the subtitle colour from the flux palette', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions .vl-autocomplete__cta__sub')
            .first()
            .should('have.css', 'color', 'rgba(0, 20, 46, 0.6)');
    });

    it('should be accessible with an open suggestion list', () => {
        cy.mount(html`
            <vl-autocomplete
                label="Zoek een plaats"
                min-chars="1"
                max-suggestions="5"
                .items=${complexItems}
            ></vl-autocomplete>
        `);
        cy.injectAxe();

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li').should('have.length', 5);
        cy.checkA11y('vl-autocomplete');
    });

    it('should be accessible with grouped suggestions', () => {
        cy.mount(html`
            <vl-autocomplete
                label="Zoek een plaats"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);
        cy.injectAxe();

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li[role="option"]').should('have.length', 6);
        cy.checkA11y('vl-autocomplete');
    });
});

const itemTemplate: AutocompleteItemTemplateFn = (item) =>
    html`<span class="custom-item">${item.title} - ${item.custom ?? 'geen'}</span>`;

const textItemTemplate: AutocompleteItemTemplateFn = (item) => html`
    <div class="vl-stacked">
        <vl-text bold>${item.title}</vl-text>
        <vl-text annotation>${item.subtitle}</vl-text>
    </div>
`;

export const complexItems = [
    { title: 'Gent', subtitle: 'Gemeente', value: '1' },
    { title: 'Gentbos, Merelbeke', subtitle: 'Adres', value: '2', custom: 'custom' },
    { title: 'Gentbruggestraat, Gent', subtitle: 'Adres', value: '3' },
    { title: 'Gentele, Brugge', subtitle: 'Adres', value: '5' },
    { title: 'Automotive Contractors Gent ', subtitle: 'Project', value: '6' },
    { title: 'Buurtshuis Watersportbaan Gent', subtitle: 'Project', value: '7' },
];
