import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlTableComponent } from './vl-table.component';
import { tableDefaults } from './vl-table.defaults';

registerWebComponents([VlTableComponent]);

const mountDefault = ({
    hover,
    matrix,
    grid,
    zebra,
    fluxZebra,
    collapsedM,
    collapsedS,
    collapsedXS,
}: Partial<typeof tableDefaults>) =>
    cy.mount(html`
        <vl-table
            ?hover=${hover}
            ?matrix=${matrix}
            ?grid=${grid}
            ?zebra=${zebra}
            ?flux-zebra=${fluxZebra}
            ?collapsed-m=${collapsedM}
            ?collapsed-s=${collapsedS}
            ?collapsed-xs=${collapsedXS}
        >
            <table>
                <caption>
                    Data table
                </caption>
                <thead>
                    <tr>
                        <th>Entry Header 1</th>
                        <th>Entry Header 2</th>
                        <th>Entry Header 3</th>
                        <th>Entry Header 4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2" colspan="2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                </tbody>
            </table>
        </vl-table>
    `);

describe('component - vl-table', () => {
    it('should mount', () => {
        mountDefault({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
    });

    it('should be accessible', () => {
        mountDefault({});
        cy.injectAxe();

        cy.checkA11y('vl-table');
    });

    it('should contain a table with headers', () => {
        mountDefault({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
        cy.get('vl-table')
            .find('table')
            .find('thead > tr')
            .children()
            .each((cell, index) => {
                cy.wrap(cell).should('have.text', 'Entry Header ' + (index + 1));
            });
    });

    it('should contain a table with columns', () => {
        mountDefault({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
        cy.get('vl-table')
            .find('table')
            .find('tbody')
            .children()
            .each((row) => {
                if (!row.attr('data-details-id')) {
                    cy.wrap(row)
                        .children()
                        .each((cell, cellIndex) => {
                            if (!cell.children('vl-button').length) {
                                cy.wrap(cell).should('contain.text', 'Entry line ' + (cellIndex + 1));
                            }
                        });
                }
            });
    });

    it('should contain a table with hover styling', () => {
        mountDefault({ hover: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--hover');
    });

    it('should contain a table with a matrix', () => {
        mountDefault({ matrix: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--matrix');
    });

    it('should contain a table with a grid', () => {
        mountDefault({ grid: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--grid');
    });

    it('should contain a table with a zebra grid', () => {
        mountDefault({ zebra: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--zebra');
    });

    it('should contain a table that collapsed on the medium breakpoint', () => {
        mountDefault({ collapsedM: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--collapsed-m');
    });

    it('should contain a table that collapsed on the small breakpoint', () => {
        mountDefault({ collapsedS: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--collapsed-s');
    });

    it('should contain a table that collapsed on the extra small breakpoint', () => {
        mountDefault({ collapsedXS: true });

        cy.get('vl-table')
            .find('table')
            .should('have.class', 'vl-table')
            .should('have.class', 'vl-table--collapsed-xs');
    });
});

const mountExpandable = ({
    hover,
    matrix,
    grid,
    zebra,
    fluxZebra,
    collapsedM,
    collapsedS,
    collapsedXS,
}: Partial<typeof tableDefaults>) =>
    cy.mount(html`
        <vl-table
            id="vl-table-with-expandable-details"
            ?hover=${hover}
            ?matrix=${matrix}
            ?grid=${grid}
            ?zebra=${zebra}
            ?flux-zebra=${fluxZebra}
            ?collapsed-m=${collapsedM}
            ?collapsed-s=${collapsedS}
            ?collapsed-xs=${collapsedXS}
        >
            <table>
                <caption>
                    Data table
                </caption>
                <thead>
                    <tr>
                        <th>Entry Header 1</th>
                        <th>Entry Header 2</th>
                        <th>Entry Header 3</th>
                        <th>Entry Header 4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr data-details-id="details-row1">
                        <td data-title="details-title 1">Title 1: generic details</td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2" colspan="2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                    </tr>
                    <tr data-details-id="details-row2">
                        <td data-title="details-title 2">Title 2: generic details</td>
                    </tr>
                    <tr id="multiple-cells">
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="details-title 3">Title 3: Zij die ter kaperen varen:</td>
                        <td>*</td>
                        <td>*</td>
                        <td>*</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Jan</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Piet</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Joris</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Korneel</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                </tbody>
            </table>
        </vl-table>
    `);

const shouldDetailsRowBeVisible = (isVisible: boolean, detailRowIndex = 0) => {
    const haveStyle = !isVisible ? 'have.css' : 'not.have.css';
    cy.get('vl-table')
        .find('table')
        .should('have.class', 'vl-table')
        .find('tbody')
        .find('[data-details-id]')
        .eq(detailRowIndex)
        .should(haveStyle, 'display', 'none');
};
const toggleDetailsButton = () => {
    cy.get('vl-table')
        .find('table')
        .find('tbody > tr')
        .first()
        .find('td')
        .last()
        .find('vl-button')
        .shadow()
        .find('button')
        .click({ force: true });
};

describe('component - vl-table - expandable', () => {
    it('should mount', () => {
        mountExpandable({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
    });

    it('should be accessible', () => {
        mountExpandable({});
        cy.injectAxe();

        cy.checkA11y('vl-table');
    });

    it('should contain a table with headers', () => {
        mountExpandable({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
        cy.get('vl-table')
            .find('table')
            .find('thead > tr')
            .children()
            .each((cell, index) => {
                cy.wrap(cell).should('have.text', 'Entry Header ' + (index + 1));
            });
    });

    it('should contain a table with columns', () => {
        mountExpandable({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
        cy.get('vl-table')
            .find('table')
            .find('tbody > tr:not([data-details-id])')
            .each((row, rowIndex) => {
                cy.wrap(row)
                    .children()
                    .each((cell, cellIndex) => {
                        if (!cell.children('vl-button').length) {
                            cy.wrap(cell).should('contain.text', 'Entry line ' + (cellIndex + 1));
                        } else {
                            cy.wrap(cell).find('vl-button');
                        }
                    });
                cy.wrap(row)
                    .next()
                    .find('td')
                    .should('contain.text', 'Title ' + (rowIndex + 1));
            });
    });

    it('should contain a table with hover styling', () => {
        mountExpandable({ hover: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--hover');
    });

    it('should contain a table with a matrix', () => {
        mountExpandable({ matrix: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--matrix');
    });

    it('should contain a table with a grid', () => {
        mountExpandable({ grid: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--grid');
    });

    it('should contain a table with a zebra grid', () => {
        mountExpandable({ zebra: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--zebra');
    });

    it('should set colspan for expandable row with one cell', () => {
        mountExpandable({});

        cy.get('vl-table').find('table').find('tbody > tr').first().find('td').last().find('vl-button').click();
        cy.get('vl-table')
            .find('table')
            .find('tbody > tr')
            .first()
            .next()
            .find('td')
            .should('have.attr', 'colspan', '5');
    });

    it('should not set colspan for expandable row with multiple cells', () => {
        mountExpandable({});

        cy.get('vl-table')
            .find('table')
            .find('tbody > tr#multiple-cells')
            .first()
            .find('td')
            .last()
            .find('vl-button')
            .click();
        cy.get('vl-table')
            .find('table')
            .find('tbody > tr#multiple-cells')
            .first()
            .next()
            .find('td')
            .should('not.have.attr', 'colspan');
    });

    it('should expand all relevant detail rows when clicking the expand button', () => {
        mountExpandable({});

        cy.get('vl-table')
            .find('table')
            .find('tbody > tr[data-details-id="details-row3"]')
            .should('have.css', 'display', 'none');
        cy.get('vl-table')
            .find('table')
            .find('tbody > tr#multiple-cells')
            .first()
            .find('td')
            .last()
            .find('vl-button')
            .click();
        cy.get('vl-table')
            .find('table')
            .find('tbody > tr[data-details-id="details-row3"]')
            .should('not.have.css', 'display', 'none');
    });

    it('should contain a table that collapsed on the medium breakpoint', () => {
        mountExpandable({ collapsedM: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--collapsed-m');
    });

    it('should contain a table that collapsed on the small breakpoint', () => {
        mountExpandable({ collapsedS: true });

        cy.get('vl-table').find('table').should('have.class', 'vl-table').should('have.class', 'vl-table--collapsed-s');
    });

    it('should contain a table that collapsed on the extra small breakpoint', () => {
        mountExpandable({ collapsedXS: true });

        cy.get('vl-table')
            .find('table')
            .should('have.class', 'vl-table')
            .should('have.class', 'vl-table--collapsed-xs');
    });

    it('should toggle expanding a detail row when clicking the button', () => {
        mountExpandable({});
        cy.injectAxe();

        shouldDetailsRowBeVisible(false);
        toggleDetailsButton();
        cy.checkA11y('vl-table');
        shouldDetailsRowBeVisible(true);
        toggleDetailsButton();
        cy.checkA11y('vl-table');
        shouldDetailsRowBeVisible(false);
    });
});

const mountExpandableCustom = ({
    hover,
    matrix,
    grid,
    zebra,
    fluxZebra,
    collapsedM,
    collapsedS,
    collapsedXS,
}: Partial<typeof tableDefaults>) =>
    cy.mount(html`
        <vl-table
            id="vl-table-with-custom-expandable-details"
            ?hover=${hover}
            ?matrix=${matrix}
            ?grid=${grid}
            ?zebra=${zebra}
            ?flux-zebra=${fluxZebra}
            ?collapsed-m=${collapsedM}
            ?collapsed-s=${collapsedS}
            ?collapsed-xs=${collapsedXS}
        >
            <table>
                <caption>
                    Data table
                </caption>
                <thead>
                    <tr>
                        <th>Entry Header 1</th>
                        <th data-title="Entry Header 2" colspan="2">Entry line 2</th>
                        <th>Entry Header 3</th>
                        <th>Entry Header 4</th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tbody>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                        <td data-with-expand-details>
                            <vl-button
                                secondary
                                narrow
                                @vl-click=${() => {
                                    const table = document.querySelector<VlTableComponent & Element>(
                                        '#vl-table-with-custom-expandable-details'
                                    );
                                    table?.toggleDetails('details-row1');
                                }}
                            >
                                click to toggle details
                            </vl-button>
                        </td>
                    </tr>
                    <tr data-details-id="details-row1">
                        <td data-title="details-title 1" colspan="5">
                            <div>
                                <ul>
                                    <li>Extra Details 1</li>
                                    <li>Extra Details 1</li>
                                    <li>Extra Details 1</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2" colspan="2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                    </tr>
                    <tr data-details-id="details-row2">
                        <td data-title="details-title 2" colspan="1">
                            <div>
                                <ul>
                                    <li>Extra Details 2</li>
                                    <li>Extra Details 2</li>
                                    <li>Extra Details 2</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Jan</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Piet</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Joris</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Korneel</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                </tbody>
            </table>
        </vl-table>
    `);

describe('component - vl-table - expandable with custom button', () => {
    it('should mount', () => {
        mountExpandableCustom({});

        cy.get('vl-table').find('table').should('have.class', 'vl-table');
    });

    it('should be accessible', () => {
        mountExpandableCustom({});
        cy.injectAxe();

        cy.checkA11y('vl-table');
    });

    it('should toggle expanding a detail row when clicking the button', () => {
        mountExpandableCustom({});
        cy.injectAxe();

        shouldDetailsRowBeVisible(false);
        toggleDetailsButton();
        cy.checkA11y('vl-table');
        shouldDetailsRowBeVisible(true);

        toggleDetailsButton();
        cy.checkA11y('vl-table');
        shouldDetailsRowBeVisible(false);
    });
});
