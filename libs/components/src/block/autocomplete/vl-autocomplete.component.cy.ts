import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlModalComponent } from '../modal/vl-modal.component';
import { VlAutocomplete } from './vl-autocomplete.component';
import { AutocompleteItemTemplateFn } from './vl-autocomplete.model';

registerWebComponents([VlAutocomplete, VlModalComponent]);

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

    it('should announce again when the suggestions change but their number stays the same', () => {
        const resultsPerTerm: Record<string, typeof complexItems> = {
            g: complexItems.slice(0, 2),
            ge: complexItems.slice(2, 4),
        };
        const search = (event: CustomEvent) => {
            (event.target as VlAutocomplete).matches = resultsPerTerm[event.detail.searchTerm] ?? [];
        };
        cy.mount(html`
            <vl-autocomplete placeholder="Hint: typ Gent" min-chars="1" @search=${search}></vl-autocomplete>
        `);
        const statusText = () =>
            cy.get('vl-autocomplete').shadow().find('[role="status"]').invoke('prop', 'textContent');

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        statusText().should('contain', '2 resultaten beschikbaar');
        statusText().then((first) => {
            cy.get('vl-autocomplete').shadow().find('input').type('e');
            cy.get('vl-autocomplete').shadow().find('#suggestions').should('contain.text', 'Gentbruggestraat');
            statusText().should((second) => {
                expect(second, 'de DOM-tekst verandert zodat de screenreader opnieuw aankondigt').not.to.equal(first);
                expect((second as string).replace(/\s+/g, ' ').trim()).to.equal('2 resultaten beschikbaar');
            });
        });
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

    it('should expose the no matches suggestion as disabled and not select it with enter', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                no-matches-text="Geen resultaat"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.createStubForEvent('vl-autocomplete', 'selected-autocomplete');
        cy.get('vl-autocomplete').shadow().find('input').type('xyz');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .should('have.length', 1)
            .and('have.attr', 'aria-disabled', 'true');
        cy.get('vl-autocomplete').shadow().find('input').type('{enter}');
        cy.get('@selected-autocomplete').should('not.have.been.called');
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
                caption-format="title-only"
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
            .should('not.have.attr', 'aria-label');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .first()
            .find('.flux-autocomplete__group-name')
            .should('have.text', 'Gemeente: ')
            .and('have.css', 'position', 'absolute');
    });

    it('should not repeat the group name when the suggestion already shows it', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('Gentbos');
        cy.get('vl-autocomplete').shadow().find('#suggestions .flux-autocomplete__group-name').should('not.exist');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .first()
            .invoke('text')
            .then((text) => expect(text.match(/Adres/g), 'groepsnaam één keer').to.have.length(1));
    });

    it('should keep the item template content in the accessible name of a grouped suggestion', () => {
        cy.mount(html`
            <vl-autocomplete
                placeholder="Hint: typ Gent"
                min-chars="1"
                max-suggestions="10"
                group-by="subtitle"
                .items=${complexItems}
                .itemTemplate=${itemTemplate}
            ></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('Gentbos');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .first()
            .should('not.have.attr', 'aria-label');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .first()
            .invoke('text')
            .then((text) => expect(text.replace(/\s+/g, ' ').trim()).to.equal('Adres: Gentbos, Merelbeke - custom'));
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

    it('should close the suggestions with the escape key', () => {
        cy.mount(html`
            <vl-autocomplete placeholder="Hint: typ Gent" min-chars="1" .items=${complexItems}></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').should('have.attr', 'aria-expanded', 'true');
        cy.get('vl-autocomplete').shadow().find('input').type('{esc}');

        cy.get('vl-autocomplete').shadow().find('input').should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', 'aria-activedescendant');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete').should('have.attr', 'hidden');
        cy.get('vl-autocomplete').shadow().find('input').should('have.value', 'g');
    });

    it('should close only the suggestions with the first escape inside a modal, the modal with the second', () => {
        cy.mount(html`
            <vl-modal id="modal" title="Modal" open closable>
                <div slot="content">
                    <vl-autocomplete placeholder="Hint: typ Gent" min-chars="1" .items=${complexItems}></vl-autocomplete>
                </div>
            </vl-modal>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').type('{esc}');
        cy.get('vl-autocomplete').shadow().find('input').should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-modal').should(($modal) => expect(($modal[0] as VlModalComponent).isOpen()).to.be.true);

        cy.get('vl-autocomplete').shadow().find('input').type('{esc}');
        cy.get('vl-modal').should(($modal) => expect(($modal[0] as VlModalComponent).isOpen()).to.be.false);
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
            .and('have.id', 'flux-autocomplete-item-1');

        cy.get('vl-autocomplete').shadow().find('input').type('{upArrow}');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions')
            .find('.vl-autocomplete__cta--focus')
            .should('have.length', 1)
            .and('have.id', 'flux-autocomplete-item-0');
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
            .and('have.id', 'flux-autocomplete-item-0');
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

    it('should give every suggestion a unique id that is a valid id reference', () => {
        const items = [
            { title: 'Gent centrum', subtitle: 'Wijk', value: 'wijk 12' },
            { title: 'Gent noord', subtitle: 'Wijk', value: 'dubbel' },
            { title: 'Gent zuid', subtitle: 'Wijk', value: 'dubbel' },
        ];
        cy.mount(html` <vl-autocomplete min-chars="1" .items=${items}></vl-autocomplete> `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .should('have.length', 3)
            .then(($options) => {
                const ids = [...$options].map((option) => option.id);
                expect(new Set(ids).size, 'unieke ids').to.equal(ids.length);
                ids.forEach((id) => expect(id, 'geen whitespace').not.to.match(/\s/));
            });
    });

    it('should make the first suggestion the active one for assistive technology when the list opens', () => {
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
            .find('#suggestions li[aria-selected="true"]')
            .should('have.length', 1)
            .and('have.id', 'flux-autocomplete-item-0')
            .and('have.class', 'vl-autocomplete__cta--focus');
        cy.get('vl-autocomplete')
            .shadow()
            .find('input')
            .should('have.attr', 'aria-activedescendant', 'flux-autocomplete-item-0');
    });

    it('should keep the highlight and the announced suggestion in sync when the list changes while typing', () => {
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
        cy.get('vl-autocomplete').shadow().find('input').type('entb');
        cy.get('vl-autocomplete').shadow().find('#suggestions li[role="option"]').should('have.length', 2);

        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions .vl-autocomplete__cta--focus')
            .should('have.length', 1)
            .and('have.attr', 'aria-selected', 'true')
            .and('have.id', 'flux-autocomplete-item-0');
        cy.get('vl-autocomplete').shadow().find('#suggestions li[aria-selected="true"]').should('have.length', 1);
        cy.get('vl-autocomplete')
            .shadow()
            .find('input')
            .should('have.attr', 'aria-activedescendant', 'flux-autocomplete-item-0');

        cy.get('vl-autocomplete').shadow().find('input').type('{enter}');
        cy.get('@selected-autocomplete')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail.title')
            .should('equal', 'Gentbos, Merelbeke');
    });

    it('should restore keyboard navigation when the list is reopened without a new search', () => {
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
        cy.get('vl-autocomplete').then(($el) => {
            const autocomplete = $el[0] as VlAutocomplete;
            autocomplete.close();
            autocomplete.open();
        });
        cy.waitForLitUpdate('vl-autocomplete');
        cy.get('vl-autocomplete').shadow().find('input').type('{downArrow}');
        cy.get('vl-autocomplete')
            .shadow()
            .find('input')
            .should('have.attr', 'aria-activedescendant', 'flux-autocomplete-item-1');
        cy.get('vl-autocomplete').shadow().find('input').type('{enter}');
        cy.get('@selected-autocomplete')
            .should('have.been.calledOnce')
            .its('firstCall.args.0.detail.title')
            .should('equal', 'Gentbos, Merelbeke');
    });

    it('should present itself as a combobox before typing when it has items', () => {
        cy.mount(html`
            <vl-autocomplete placeholder="Hint: typ Gent" min-chars="1" .items=${complexItems}></vl-autocomplete>
        `);

        cy.get('vl-autocomplete')
            .shadow()
            .find('input')
            .should('have.attr', 'role', 'combobox')
            .and('have.attr', 'aria-autocomplete', 'list')
            .and('have.attr', 'aria-haspopup', 'listbox')
            .and('have.attr', 'aria-expanded', 'false');
    });

    it('should stay a combobox once suggestions arrived from a search, also after clearing the field', () => {
        const search = (event: CustomEvent) => {
            const autocomplete = event.target as VlAutocomplete;
            autocomplete.matches = complexItems.filter((item) =>
                item.title.toLowerCase().includes(event.detail.searchTerm.toLowerCase())
            );
        };
        cy.mount(html`
            <vl-autocomplete placeholder="Hint: typ Gent" min-chars="1" @search=${search}></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', 'role');
        cy.get('vl-autocomplete').shadow().find('input').type('gent');
        cy.get('vl-autocomplete').shadow().find('input').should('have.attr', 'role', 'combobox');

        cy.get('vl-autocomplete').shadow().find('input').clear();
        cy.get('vl-autocomplete')
            .shadow()
            .find('input')
            .should('have.attr', 'role', 'combobox')
            .and('have.attr', 'aria-expanded', 'false');
    });

    it('should name the listbox after the label and not after the typed text', () => {
        cy.mount(html`
            <vl-autocomplete label="Zoek een plaats" min-chars="1" .items=${complexItems}></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('[role="listbox"]').should('not.have.attr', 'aria-labelledby');
        cy.get('vl-autocomplete').shadow().find('[role="listbox"]').should('have.attr', 'aria-label', 'Zoek een plaats');
    });

    it('should not present itself as a combobox when there are no suggestions', () => {
        cy.mount(html` <vl-autocomplete min-chars="1" placeholder="Hint: typ Gent" disable-loading></vl-autocomplete> `);

        ['role', 'aria-autocomplete', 'aria-controls', 'aria-haspopup', 'aria-expanded'].forEach((attribute) => {
            cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', attribute);
        });

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('input').should('not.have.attr', 'role');
    });

    it('should outline the active suggestion and only that one', () => {
        cy.mount(html`
            <vl-autocomplete placeholder="Hint: typ Gent" min-chars="1" .items=${complexItems}></vl-autocomplete>
        `);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions .vl-autocomplete__cta--focus')
            .should('have.css', 'outline-style', 'solid')
            .and('have.css', 'outline-width', '3px');
        cy.get('vl-autocomplete')
            .shadow()
            .find('#suggestions li[role="option"]')
            .eq(1)
            .should('have.css', 'outline-style', 'none');
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
