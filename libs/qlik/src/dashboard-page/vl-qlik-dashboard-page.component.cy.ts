import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlQlikDashboardPageComponent } from './vl-qlik-dashboard-page.component';
import { VlLayoutElement, VlRegionElement } from '@domg-wc/elements';
import viz_without_views from '../utils/stories/demo-visuals-without-views.json'; // TODO should have an assert
import viz_with_views from '../utils/stories/demo-visuals-with-views.json'; // TODO should have an assert
import filters from '../utils/stories/demo-filters.json'; // TODO should have an assert

registerWebComponents([VlRegionElement, VlLayoutElement, VlQlikDashboardPageComponent]);

describe('qlik dashboard page with views, without exportid', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);

        cy.mount(html` <vl-qlik-dashboard-page
            title="Dashboard page"
            app-id="594c04b6-f319-4cb9-962c-24b0f7aa6f5e"
            url="omgevingsloketrapport.omgeving.vlaanderen.be"
            .filters="${filters}"
            .views="${viz_with_views}"
        >
            <span slot="introduction"> Introduction </span>
        </vl-qlik-dashboard-page>`);
    });

    it('qlik dashboard page with views, without exportid', () => {
        // dashboard page top
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('h1[is="vl-h1"]')
            .should('exist')
            .should('contain.text', 'Dashboard page');

        // dashboard page refresh info
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('p[is="vl-icon-wrapper"]')
            .find('vl-text-next')
            .should('have.length', 2)
            .eq(0)
            .find('span')
            .should('exist')
            .should('contain.text', 'Laatste wijziging:');

        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('p[is="vl-icon-wrapper"]')
            .find('vl-text-next')
            .should('have.length', 2)
            .eq(1)
            .find('span')
            .should('exist')
            .invoke('text')
            .should('match', /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);

        // introduction
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('slot')
            .then(($el) => $el.get()[0].assignedNodes()[0])
            .should('exist')
            .should('contain.text', 'Introduction');

        //export button does not exist
        cy.get('vl-qlik-dashboard-page').shadow().find('#export-dashboard').should('not.exist');

        // change view
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('form select[is="vl-select"]')
            .parent()
            .parent()
            .should('have.class', 'js-vl-select')
            .should('have.attr', 'aria-expanded', 'false')
            .click()
            .should('have.class', 'is-open')
            .should('have.attr', 'aria-expanded', 'true');
        Object.keys(viz_with_views).forEach((v) => {
            cy.get('vl-qlik-dashboard-page')
                .shadow()
                .find('form select[is="vl-select"]')
                .parent()
                .parent()
                .should('have.class', 'is-open')
                .should('have.attr', 'aria-expanded', 'true')
                .find(`.vl-select__list .vl-select__item[data-value="${v}"]`)
                .should('exist');
        });

        viz_with_views.project.visualisations
            .flatMap((vRow) => vRow)
            .forEach((v) => {
                cy.get('vl-qlik-dashboard-page')
                    .shadow()
                    .find('vl-qlik-dashboard')
                    .shadow()
                    .find(`vl-qlik-visual[qlik-id="${v.id}"]`)
                    .should('exist');
            });

        viz_with_views.barcharts.visualisations
            .flatMap((vRow) => vRow)
            .forEach((v) => {
                cy.get('vl-qlik-dashboard-page')
                    .shadow()
                    .find('vl-qlik-dashboard')
                    .shadow()
                    .find(`vl-qlik-visual[qlik-id="${v.id}"]`)
                    .should('not.exist');
            });

        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('form select[is="vl-select"]')
            .parent()
            .parent()
            .should('have.class', 'is-open')
            .should('have.attr', 'aria-expanded', 'true')
            .find('.vl-select__list .vl-select__item[data-value="barcharts"]')
            .click({ timeout: 6000 });

        viz_with_views.barcharts.visualisations
            .flatMap((vRow) => vRow)
            .forEach((v) => {
                cy.get('vl-qlik-dashboard-page')
                    .shadow()
                    .find('vl-qlik-dashboard')
                    .shadow()
                    .find(`vl-qlik-visual[qlik-id="${v.id}"]`)
                    .should('exist');
            });

        viz_with_views.project.visualisations
            .flatMap((vRow) => vRow)
            .forEach((v) => {
                cy.get('vl-qlik-dashboard-page')
                    .shadow()
                    .find('vl-qlik-dashboard')
                    .shadow()
                    .find(`vl-qlik-visual[qlik-id="${v.id}"]`)
                    .should('not.exist');
            });
    });
});

describe('qlik dashboard page without views, with exportid', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);

        cy.wait(5000).mount(html` <vl-qlik-dashboard-page
            title="Dashboard page"
            app-id="594c04b6-f319-4cb9-962c-24b0f7aa6f5e"
            url="omgevingsloketrapport.omgeving.vlaanderen.be"
            export-id="cTTaQLd"
            .filters="${filters}"
            .views="${viz_without_views}"
        >
            <span slot="introduction"> Introduction </span>
        </vl-qlik-dashboard-page>`);
    });

    it('qlik dashboard page without views, with exportid', () => {
        // export & excel/csv selector exist
        cy.get('vl-qlik-dashboard-page').shadow().find('#export-dashboard').should('exist');

        cy.get('vl-qlik-dashboard-page').shadow().find('#format-select').should('exist');
        // views selector does not exist
        cy.get('vl-qlik-dashboard-page').shadow().find('form select[is="vl-select"]').should('not.exist');

        // export downloads file
        cy.get('vl-qlik-dashboard-page').shadow().find('#export-dashboard', { timeout: 6000 }).should('exist').click();

        const downloadsFolder = Cypress.config('downloadsFolder');
        const filename = downloadsFolder + '/dashboard_page.xlsx';
        cy.readFile(filename, 'binary', { timeout: 15000 }).should((buffer) => {
            // by having length assertion we ensure the file has text
            // since we don't know when the browser finishes writing it to disk

            // Tip: use expect() form to avoid dumping binary contents
            // of the buffer into the Command Log
            expect(buffer.length).to.be.gt(100);
        });
    });
});

describe('qlik dashboard page without filters', () => {
    beforeEach(() => {
        cy.viewport(960, 1440);

        cy.wait(5000).mount(html` <vl-qlik-dashboard-page
            title="Dashboard page"
            app-id="594c04b6-f319-4cb9-962c-24b0f7aa6f5e"
            url="omgevingsloketrapport.omgeving.vlaanderen.be"
            .views="${viz_without_views}"
        >
            <span slot="introduction"> Introduction </span>
        </vl-qlik-dashboard-page>`);
    });

    it('qlik dashboard page without filters', () => {
        // dashboard page top
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('h1[is="vl-h1"]')
            .should('exist')
            .should('contain.text', 'Dashboard page');

        // dashboard page refresh info
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('p[is="vl-icon-wrapper"]')
            .should('exist')
            .find('vl-text-next')
            .should('have.length', 2)
            .eq(0)
            .find('span')
            .should('exist')
            .should('contain.text', 'Laatste wijziging:');

        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('p[is="vl-icon-wrapper"]')
            .should('exist')
            .find('vl-text-next')
            .should('have.length', 2)
            .eq(1)
            .find('span')
            .should('exist')
            .invoke('text')
            .should('match', /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);

        // introduction
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('slot')
            .should('exist')
            .then(($el) => $el.get()[0].assignedNodes()[0])
            .should('exist')
            .should('contain.text', 'Introduction');

        // export button does not exist
        cy.get('vl-qlik-dashboard-page').shadow().find('#export-dashboard').should('not.exist');

        // filters dont exist
        cy.get('vl-qlik-dashboard-page')
            .shadow()
            .find('vl-qlik-dashboard')
            .should('exist')
            .shadow()
            .find('div[is="vl-search-filter"]')
            .should('not.exist');
    });
});
