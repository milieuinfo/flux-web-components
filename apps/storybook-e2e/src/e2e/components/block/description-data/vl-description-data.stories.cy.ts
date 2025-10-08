const descriptionDataUrl =
    'http://localhost:8080/iframe.html?id=components-block-description-data-description-data--description-data-default&viewMode=story';

describe('cypress-e2e - block components - vl-description-data - default story', () => {
    it('should contain a valid value and label of each description data item', () => {
        cy.visit(`${descriptionDataUrl}&args=type:error`);
        cy.getDataCy('description-data-item-1').shadow().find('.vl-description-data__label').contains('Uitgever');

        cy.getDataCy('description-data-item-1').shadow().find('.vl-description-data__value').contains('Kind en Gezin');

        cy.getDataCy('description-data-item-2')
            .shadow()
            .find('.vl-description-data__label')
            .contains('Publicatiedatum');

        cy.getDataCy('description-data-item-2').shadow().find('.vl-description-data__value').contains('Augustus 2018');

        cy.getDataCy('description-data-item-3').shadow().find('.vl-description-data__label').contains('Publicatietype');

        cy.getDataCy('description-data-item-3').shadow().find('.vl-description-data__value').contains('Brochure');

        cy.getDataCy('description-data-item-4').shadow().find('.vl-description-data__label').contains('Categorie');

        cy.getDataCy('description-data-item-4')
            .shadow()
            .find('.vl-description-data__value')
            .contains('Kinderen en jongeren');
    });
});
