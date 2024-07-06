import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDataComponent } from './vl-form-data.component';

registerWebComponents([VlFormDataComponent]);

describe('integrations - form data', () => {
    it('should render', () => {
        cy.mount(html`<vl-form-data></vl-form-data>`);

        cy.get('vl-form-data').shadow();
    });

    it('should set form data and verify all form elements are populated correctly', () => {
        cy.mount(html`<vl-form-data></vl-form-data>`);

        cy.get('vl-form-data').shadow().find('vl-button[type="button"]').click();

        cy.get('vl-form-data').shadow().find('vl-input-field[name="naam"]').should('have.value', 'Dehbi');

        cy.get('vl-form-data')
            .shadow()
            .find('vl-select[name="geboorteplaats"]')
            .shadow()
            .find('select')
            .should('have.value', 'knokke-heist');

        cy.get('vl-form-data')
            .shadow()
            .find('vl-select-rich[name="hobbies"]')
            .shadow()
            .find('select')
            .find('option[selected]')
            .should('have.length', 2);
        cy.get('vl-form-data')
            .shadow()
            .find('vl-select-rich[name="hobbies"]')
            .shadow()
            .find('select')
            .find('option')
            .contains('Drummen')
            .should('have.attr', 'selected');
        cy.get('vl-form-data')
            .shadow()
            .find('vl-select-rich[name="hobbies"]')
            .shadow()
            .find('select')
            .find('option')
            .contains('Dans')
            .should('have.attr', 'selected');

        cy.get('vl-form-data')
            .shadow()
            .find('vl-checkbox[value="plannende-overheid"]')
            .shadow()
            .find('input[type="checkbox"]')
            .should('be.checked');
        cy.get('vl-form-data')
            .shadow()
            .find('vl-checkbox[value="hogere-overheid"]')
            .shadow()
            .find('input[type="checkbox"]')
            .should('be.checked');
        cy.get('vl-form-data')
            .shadow()
            .find('vl-checkbox[value="adviesverlener"]')
            .shadow()
            .find('input[type="checkbox"]')
            .should('not.be.checked');

        cy.get('vl-form-data')
            .shadow()
            .find('vl-radio-group[name="vervoer"]')
            .find('vl-radio[value="zee"]')
            .shadow()
            .find('input[type="radio"]')
            .should('be.checked');
        cy.get('vl-form-data')
            .shadow()
            .find('vl-radio-group[name="vervoer"]')
            .find('vl-radio[value="land"]')
            .shadow()
            .find('input[type="radio"]')
            .should('not.be.checked');
        cy.get('vl-form-data')
            .shadow()
            .find('vl-radio-group[name="vervoer"]')
            .find('vl-radio[value="lucht"]')
            .shadow()
            .find('input[type="radio"]')
            .should('not.be.checked');

        cy.get('vl-form-data').shadow().find('vl-datepicker[name="startDate"]').should('exist');

        cy.get('vl-form-data').shadow().find('vl-upload[name="file"]').should('exist');
    });

    it('should parse form data and display it correctly', () => {
        cy.mount(html`<vl-form-data></vl-form-data>`);

        // stel form data in
        cy.get('vl-form-data').shadow().find('vl-button[type="button"]').click();

        // haal form data op & print in <pre> tag
        cy.get('vl-form-data').shadow().find('vl-button[type="submit"]').shadow().find('button').click({ force: true });

        cy.get('vl-form-data').shadow().find('pre').should('exist');

        cy.get('vl-form-data').shadow().find('pre').should('contain', '"naam": "Dehbi"');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"geboorteplaats": "knokke-heist"');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"hobbies": [');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"drummen"');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"dans"');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"betrokkenheid": [');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"plannende-overheid"');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"hogere-overheid"');
        cy.get('vl-form-data').shadow().find('pre').should('contain', '"vervoer": "zee"');

        cy.get('vl-form-data')
            .shadow()
            .find('pre')
            .invoke('text')
            .then((text) => {
                const parsedData = JSON.parse(text);
                expect(parsedData.naam).to.equal('Dehbi');
                expect(parsedData.geboorteplaats).to.equal('knokke-heist');
                expect(parsedData.hobbies).to.include('drummen');
                expect(parsedData.hobbies).to.include('dans');
                expect(parsedData.betrokkenheid).to.include('plannende-overheid');
                expect(parsedData.betrokkenheid).to.include('hogere-overheid');
                expect(parsedData.vervoer).to.equal('zee');
            });
    });

    it('should reset the form correctly', () => {
        cy.mount(html`<vl-form-data></vl-form-data>`);

        // stel form data in
        cy.get('vl-form-data').shadow().find('vl-button[type="button"]').click();

        cy.get('vl-form-data').shadow().find('vl-input-field[name="naam"]').should('have.value', 'Dehbi');

        cy.get('vl-form-data').shadow().find('vl-button[type="reset"]').shadow().find('button').click({ force: true });

        cy.get('vl-form-data').shadow().find('vl-input-field[name="naam"]').should('have.value', '');
        cy.get('vl-form-data')
            .shadow()
            .find('vl-select-rich[name="hobbies"]')
            .shadow()
            .find('select')
            .find('option[selected]')
            .should('not.exist');

        cy.get('vl-form-data').shadow().find('pre').should('not.exist');
    });
});
