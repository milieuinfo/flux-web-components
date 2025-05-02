const autocompleteUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-autocomplete--autocomplete-default&viewMode=story';
const autocompleteWithoutSuggestionsUrl =
    'http://localhost:8080/iframe.html?id=components-block-autocomplete--autocomplete-without-suggestions&viewMode=story';

describe('story vl-autocomplete', () => {
    it('as a user, I can see the autocomplete placeholder', () => {
        cy.visit(`${autocompleteUrl}`);
        cy.get('vl-autocomplete').shadow().find('input').invoke('attr', 'placeholder').should('eq', 'Hint: typ Gent');
    });

    it('as a user, I can see 5 suggestions after typing the g character', () => {
        cy.visit(`${autocompleteUrl}`);
        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('#suggestions').find('li').should('have.length', 5);
    });

    it('should show loading animation when typing without suggestions by default', () => {
        cy.visit(`${autocompleteWithoutSuggestionsUrl}`);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete__loader').should('not.have.attr', 'hidden');
    });

    it('should show loading animation when typing without suggestions when disabled', () => {
        cy.visit(`${autocompleteWithoutSuggestionsUrl}&args=disableLoading:true`);

        cy.get('vl-autocomplete').shadow().find('input').type('g');
        cy.get('vl-autocomplete').shadow().find('div.vl-autocomplete__loader').should('have.attr', 'hidden');
    });
});
