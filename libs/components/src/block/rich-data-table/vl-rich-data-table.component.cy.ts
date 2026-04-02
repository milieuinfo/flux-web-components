import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlCheckboxComponent } from '../../form/checkbox';
import { VlFormLabelComponent } from '../../form/form-label';
import { VlInputFieldComponent } from '../../form/input-field';
import { VlPagerComponent } from '../pager';
import { VlSearchFilterComponent } from '../search-filter';
import richDataFilterData from './stories/vl-rich-data-table-filter.stories-mock';
import richDataFilterPagerData from './stories/vl-rich-data-table-pagination.stories-mock';
import { VlRichDataField } from './vl-rich-data-field.component';
import { VlRichDataSorter } from './vl-rich-data-sorter.component';
import { VlRichDataTable } from './vl-rich-data-table.component';

registerWebComponents([
    VlRichDataTable,
    VlRichDataField,
    VlRichDataSorter,
    VlPagerComponent,
    VlSearchFilterComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlButtonComponent,
    VlCheckboxComponent,
]);

// ============================================================
// Shared helper functions
// ============================================================

const executeForEveryRow = (test: (row: JQuery<HTMLElement>, rowIndex: number) => void) => {
    cy.get('vl-rich-data-table').shadow().find('tbody').find('tr').each(test);
};

const shouldMatchCellWithData = (row: JQuery<HTMLElement>, rowIndex: number, rowData: unknown[]) => {
    cy.wrap(row)
        .find('td')
        .each((cell, cellIndex) => {
            const dataRowObject = rowData[rowIndex];
            const dataRowValuesList = Object.values(dataRowObject as object);
            const valueForCell = dataRowValuesList[cellIndex];
            if (typeof valueForCell !== 'object') {
                cy.wrap(cell).should('have.text', String(dataRowValuesList[cellIndex]));
            }
        });
};

const shouldNotMatchCellWithData = (row: JQuery<HTMLElement>, rowIndex: number, rowData: unknown[]) => {
    cy.wrap(row)
        .find('td')
        .each((cell, cellIndex) => {
            const dataRowObject = rowData[rowIndex];
            if (dataRowObject) {
                const dataRowValuesList = Object.values(dataRowObject as object);
                const valueForCell = dataRowValuesList[cellIndex];
                if (typeof valueForCell !== 'object') {
                    cy.wrap(cell).should('not.have.text', String(dataRowValuesList[cellIndex]));
                }
            }
        });
};

const shouldMatchRowCountWithDataLength = (rowData: unknown[]) => {
    cy.get('vl-rich-data-table').shadow().find('tbody').find('tr').its('length').should('eq', rowData.length);
};

const shouldMatchTableData = (rowData: unknown[]) => {
    shouldMatchRowCountWithDataLength(rowData);
    executeForEveryRow((row, rowIndex) => shouldMatchCellWithData(row, rowIndex, rowData));
};

const getTitleForField = (field: string): string => {
    switch (field) {
        case 'name':
            return 'Naam';
        case 'id':
            return 'ID';
        default:
            return field;
    }
};

const shouldSortFieldsAsExpected = (
    row: JQuery<HTMLElement>,
    rowIndex: number,
    dataRows: unknown[],
    sortField: string,
    direction = 'asc'
) => {
    const listForField = (rows: unknown[]) => rows.map((r: any) => r[sortField]);
    const unsortedValues = listForField(dataRows);
    const valuesAfterSorting = direction === 'asc' ? [...unsortedValues].sort() : [...unsortedValues].sort().reverse();
    cy.wrap(row)
        .find(`[data-title="${getTitleForField(sortField)}"]`)
        .should('have.text', valuesAfterSorting[rowIndex]);
};

const shouldHaveActiveSorterAndMatchExpectedDirection = (sortField: string, direction: string) => {
    cy.get('vl-rich-data-table')
        .shadow()
        .find(`[for="${sortField}"]`)
        .shadow()
        .find('#direction')
        .should('have.attr', 'icon', direction === 'asc' ? 'arrow-down' : 'arrow-up');
};

const shouldHaveSorterAndDirectionShouldBeHidden = (sortField: string) => {
    cy.get('vl-rich-data-table')
        .shadow()
        .find(`[for="${sortField}"]`)
        .shadow()
        .find('div')
        .should('have.class', 'vl-u-visually-hidden');
};

const clickSorterForField = (sortField: string) => {
    cy.get('vl-rich-data-table').shadow().find(`[for="${sortField}"]`).click({ force: true });
};

const getPage = (pageNum: number, itemsPerPage: number, data: any[]) => {
    const start = (pageNum - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
};

const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
    const modulo = totalItems % itemsPerPage;
    return modulo ? (totalItems - modulo) / itemsPerPage + 1 : totalItems / itemsPerPage;
};

const shouldPaginateCorrectly = (dataRows: unknown[], pagination: { currentPage: number; itemsPerPage: number }) => {
    const { currentPage, itemsPerPage } = pagination;
    const dataForPage = getPage(currentPage, itemsPerPage, dataRows);
    const itemsInCurrentPage = dataForPage.length;

    cy.get('vl-rich-data-table').shadow().find('tbody').find('tr').its('length').should('eq', itemsInCurrentPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsInCurrentPage;
    const dataRowsForThisPage = dataRows.slice(startIndex, endIndex);
    shouldMatchTableData(dataRowsForThisPage);

    const dataForNextPage = getPage(currentPage + 1, itemsPerPage, dataRows);
    const nextPageRows = dataRows.slice(endIndex, endIndex + dataForNextPage.length);
    executeForEveryRow((row, rowIndex) => shouldNotMatchCellWithData(row, rowIndex, nextPageRows));
};

const selectPagerPage = (pageNumber: number) => {
    cy.get('vl-rich-data-table').find('vl-pager').shadow().find(`[pager-page=${pageNumber}]`).click();
};

const findValueByPath = (item: any, pathToKey: string): string | undefined => {
    const keys = pathToKey.split('.');
    let current = item;
    for (const key of keys) {
        if (current?.[key] !== undefined) current = current[key];
        else return undefined;
    }
    return current?.toString();
};

// ============================================================
// Mobile filter behavior tests
// ============================================================

describe('cypress-component - block components - vl-rich-data-table - mobile filter behavior', () => {
    const mountWithFilter = (filterClosable = false) => {
        cy.mount(html`
            <vl-rich-data-table ?filter-closable=${filterClosable}>
                <vl-rich-data-field label="ID" selector="id"></vl-rich-data-field>
                <vl-rich-data-field label="Naam" selector="name"></vl-rich-data-field>
                <vl-search-filter slot="filter">
                    <form>
                        <div>
                            <vl-form-label for="filterInput" label="Project id" light></vl-form-label>
                            <vl-input-field id="filterInput" type="text" name="id" block></vl-input-field>
                        </div>
                        <footer>
                            <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                            <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                        </footer>
                    </form>
                </vl-search-filter>
                <span slot="no-content">Geen resultaten gevonden</span>
            </vl-rich-data-table>
        `);
    };

    it('should hide the search column on mobile on page load without filter-closable', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data-table').shadow().find('#search').should('have.class', 'vl-u-hidden--s');
    });

    it('should hide the search column on mobile on page load with filter-closable', () => {
        cy.viewport(375, 667);
        mountWithFilter(true);

        cy.get('vl-rich-data-table').shadow().find('#search').should('have.class', 'vl-u-hidden--s');
    });

    it('should show the search filter when the open button is clicked on mobile', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data-table').shadow().find('#search').should('have.class', 'vl-u-hidden--s');

        cy.get('vl-rich-data-table').shadow().find('#open-toggle-filter-button').click({ force: true });

        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
    });

    it('should hide the search filter after submitting the form on mobile', () => {
        cy.viewport(375, 667);
        mountWithFilter(false);

        cy.get('vl-rich-data-table').shadow().find('#open-toggle-filter-button').click({ force: true });
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');

        cy.get('vl-search-filter').find('form').submit();

        cy.get('vl-search-filter').should('have.attr', 'hidden');
    });

    it('should show the search filter inline on desktop without filter-closable', () => {
        cy.viewport(1280, 800);
        mountWithFilter(false);

        cy.get('vl-rich-data-table').shadow().find('#search').should('not.have.attr', 'hidden');
        cy.get('vl-search-filter').should('not.have.attr', 'hidden');
    });
});

// ============================================================
// Default table tests
// ============================================================

describe('cypress-component - block components - vl-rich-data-table - default', () => {
    const data = [
        { id: 0, name: 'Project #1', owner: 'Jan Jansens' },
        { id: 1, name: 'Project #2', owner: 'Marie Vermeersch' },
    ];

    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data-table
                data="${JSON.stringify({ data })}"
                caption="Tabel met projectgegevens"
            >
                <vl-rich-data-field name="id" label="ID" selector="id"></vl-rich-data-field>
                <vl-rich-data-field name="name" label="Naam" selector="name"></vl-rich-data-field>
                <vl-rich-data-field name="owner" label="Eigenaar" selector="owner"></vl-rich-data-field>
            </vl-rich-data-table>
        `);
    });

    it('should set data in the table', () => {
        shouldMatchTableData(data);
    });

    it('should render the caption text provided via the caption attribute', () => {
        cy.get('vl-rich-data-table').shadow().find('caption').should('have.text', 'Tabel met projectgegevens');
    });

    it('should update the caption when the attribute changes', () => {
        const newCaption = 'Andere titel';
        cy.get('vl-rich-data-table').invoke('attr', 'caption', newCaption);
        cy.get('vl-rich-data-table').shadow().find('caption').should('have.text', newCaption);
    });

    it('should apply an aria-label when only a label attribute is present', () => {
        const ariaLabel = 'Mijn tabel label';
        cy.get('vl-rich-data-table').invoke('removeAttr', 'caption').invoke('attr', 'label', ariaLabel);
        cy.get('vl-rich-data-table').shadow().find('table').should('have.attr', 'aria-label', ariaLabel);
    });
});

// ============================================================
// Sorting tests
// ============================================================

describe('cypress-component - block components - vl-rich-data-table - sorting', () => {
    const rowData = [
        { id: 0, name: 'Water', owner: 'Kevin Jansens' },
        { id: 1, name: 'Vuur', owner: 'Anton Vanherrewege' },
        { id: 2, name: 'Aarde', owner: 'Hedwig Jansens' },
    ];

    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data-table
                id="rich-data-table-sorting"
                data="${JSON.stringify({ data: rowData })}"
            >
                <vl-rich-data-field
                    name="id"
                    label="ID"
                    selector="id"
                    sortable
                    sorting-direction="asc"
                ></vl-rich-data-field>
                <vl-rich-data-field name="name" label="Naam" selector="name" sortable></vl-rich-data-field>
                <vl-rich-data-field name="owner" label="Eigenaar" selector="owner" sortable></vl-rich-data-field>
            </vl-rich-data-table>
        `);
        cy.get('vl-rich-data-table').then((tableEl: JQuery) => {
            const table = tableEl[0] as any;
            const originalData = [...rowData];
            table.addEventListener('change', (e: any) => {
                const { sorting } = e.detail;
                if (sorting) {
                    table.data = {
                        data: [...originalData].sort((a, b) => {
                            for (const criteria of sorting) {
                                const aVal = a[criteria.name];
                                const bVal = b[criteria.name];
                                if (aVal < bVal) return criteria.direction === 'asc' ? -1 : 1;
                                if (aVal > bVal) return criteria.direction === 'asc' ? 1 : -1;
                            }
                            return 0;
                        }),
                        sorting,
                    };
                } else {
                    table.data = { data: [...originalData] };
                }
            });
        });
    });

    it('should set data in the table', () => {
        shouldMatchTableData(rowData);
    });

    it('should have default sorting as ascending', () => {
        const keyToSortOn = 'id';
        const direction = 'asc';

        shouldHaveActiveSorterAndMatchExpectedDirection(keyToSortOn, direction);

        executeForEveryRow((row, rowIndex) =>
            shouldSortFieldsAsExpected(row, rowIndex, rowData, keyToSortOn, direction)
        );
    });

    it('should have sorting as descending when active sorter is clicked once', () => {
        const keyToSortOn = 'id';
        const direction = 'desc';

        clickSorterForField(keyToSortOn);

        shouldHaveActiveSorterAndMatchExpectedDirection(keyToSortOn, direction);

        executeForEveryRow((row, rowIndex) =>
            shouldSortFieldsAsExpected(row, rowIndex, rowData, keyToSortOn, direction)
        );
    });

    it('should have no sorting when sorter is currently sorting descending and clicked again', () => {
        const keyToSortOn = 'id';
        clickSorterForField(keyToSortOn);
        clickSorterForField(keyToSortOn);

        shouldHaveSorterAndDirectionShouldBeHidden(keyToSortOn);
    });
});

// ============================================================
// Filter tests
// ============================================================

describe('cypress-component - block components - vl-rich-data-table - filter', () => {
    const data = richDataFilterData.data;
    const filterField = 'name';
    const filterValue = 'Grond';

    beforeEach(() => {
        cy.viewport(1280, 800);
        cy.mount(html`
            <vl-rich-data-table id="rich-data-table-filter" filter-closable>
                <vl-rich-data-field label="ID" selector="id"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Project" selector="name"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Manager" selector="manager.lastName"></vl-rich-data-field>
                <vl-rich-data-field label="Eerste medewerker" selector="medewerkers.0.lastName"></vl-rich-data-field>
                <vl-search-filter slot="filter" alt>
                    <form>
                        <section>
                            <vl-form-label for="filterOpNaamProject" label="Project naam" light></vl-form-label>
                            <vl-input-field
                                type="text"
                                id="filterOpNaamProject"
                                name="name"
                                block
                            ></vl-input-field>
                        </section>
                        <footer>
                            <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                            <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                        </footer>
                    </form>
                </vl-search-filter>
            </vl-rich-data-table>
        `);
        cy.get('vl-rich-data-table').then((tableEl: JQuery) => {
            const table = tableEl[0] as any;
            table.data = richDataFilterData;
            table.addEventListener('change', (e: any) => {
                let filteredData = [...richDataFilterData.data];
                if (e.detail.formData) {
                    for (const [key, value] of e.detail.formData.entries()) {
                        if (value) {
                            filteredData = filteredData.filter((item) =>
                                findValueByPath(item, key)?.includes(value)
                            );
                        }
                    }
                }
                table.data = {
                    data: filteredData,
                    paging: { currentPage: 1, totalItems: filteredData.length },
                };
            });
        });
    });

    it('should be able to find data', () => {
        shouldMatchTableData(data);
    });

    it('should be able to filter on a field', () => {
        cy.get('vl-rich-data-table').find(`[name="${filterField}"]`).shadow().find('input').type(filterValue);
    });

    it('should be able to find the filtered data in the table', () => {
        cy.get('vl-rich-data-table').find(`[name="${filterField}"]`).shadow().find('input').type(filterValue);
        const filteredData = data.filter((row) => (row[filterField as keyof typeof row] as string).indexOf(filterValue) !== -1);
        shouldMatchTableData(filteredData);
    });

    it('should not be able to find data not corresponding to search fields', () => {
        cy.get('vl-rich-data-table').find(`[name="${filterField}"]`).shadow().find('input').type(filterValue);
        executeForEveryRow((row, rowIndex) => shouldNotMatchCellWithData(row, rowIndex, data));
    });
});

// ============================================================
// Pagination tests
// ============================================================

describe('cypress-component - block components - vl-rich-data-table - paging', () => {
    const data = richDataFilterPagerData.data;
    const itemsPerPage = 10;

    beforeEach(() => {
        cy.mount(html`
            <vl-rich-data-table id="rich-data-table-pagination" filter-closable>
                <vl-rich-data-field label="ID" selector="id"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Project" selector="name"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Manager" selector="manager.lastName"></vl-rich-data-field>
                <vl-rich-data-field label="Eerste medewerker" selector="medewerkers.0.lastName"></vl-rich-data-field>
                <vl-search-filter slot="filter" alt>
                    <form>
                        <section>
                            <vl-form-label for="filterOpId" label="Project id" light></vl-form-label>
                            <vl-input-field type="text" id="filterOpId" name="id" block></vl-input-field>
                        </section>
                        <footer>
                            <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                            <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                        </footer>
                    </form>
                </vl-search-filter>
                <vl-pager
                    id="pager-for-rich-data-table"
                    slot="pager"
                    total-items="${data.length}"
                    items-per-page="${itemsPerPage}"
                    current-page="1"
                ></vl-pager>
            </vl-rich-data-table>
        `);
        cy.get('vl-rich-data-table').then((tableEl: JQuery) => {
            const table = tableEl[0] as any;
            const pager = document.querySelector('#pager-for-rich-data-table') as any;
            table.data = { data: getPage(1, itemsPerPage, data) };
            table.addEventListener('change', (e: any) => {
                let newData: any[] = data;
                let totalItems = data.length;
                if (e.detail.formData) {
                    for (const [key, value] of e.detail.formData.entries()) {
                        if (value) {
                            newData = newData.filter((item) => findValueByPath(item, key)?.includes(value));
                            totalItems = newData.length;
                        }
                    }
                }
                if (e.detail.paging) {
                    const currentItemsPerPage = pager?.itemsPerPage || itemsPerPage;
                    newData = getPage(e.detail.paging.currentPage, currentItemsPerPage, newData);
                }
                table.data = {
                    data: newData,
                    paging: {
                        currentPage: e.detail.paging?.currentPage || 1,
                        totalItems,
                    },
                };
            });
        });
    });

    it('should be able to select the first page', () => {
        selectPagerPage(1);
    });

    it('should match displayed rows with data for first page & not with the next page', () => {
        shouldPaginateCorrectly(data, { currentPage: 1, itemsPerPage });
    });

    it('should be able to select the second page', () => {
        selectPagerPage(2);
    });

    it('should match displayed rows with data for second page & not with the next page', () => {
        selectPagerPage(2);
        shouldPaginateCorrectly(data, {
            currentPage: 2,
            itemsPerPage,
        });
    });
});

// ============================================================
// Selectable tests
// ============================================================

describe('cypress-component - block components - vl-rich-data-table - selectable', () => {
    const selectableData = {
        data: [
            { selected: true, name: 'document.pdf', extension: 'pdf', filesize: '123 MB' },
            { selected: false, name: 'bestand.docx', extension: 'docx', filesize: '2 GB' },
            { selected: false, name: 'Een bestand met een lange naam.pptx', extension: 'pptx', filesize: '10 KB' },
        ],
    };

    const getSelectAllCheckbox = () =>
        cy.get('vl-rich-data-table').shadow().find('vl-checkbox[label="Selecteer alles"]');
    const getDefaultActions = () => cy.get('#default-actions');
    const getSelectionActions = () => cy.get('#selection-actions');
    const getRemoveSelectionButton = () => getSelectionActions().find('#remove-selection');
    const getAllRows = () => cy.get('vl-rich-data-table').shadow().find('tbody').find('tr');

    beforeEach(() => {
        const getTable = () => document.querySelector<any>('#rich-data-table-selectable');
        const getTableData = (): any[] => getTable()?.data?.data || [];

        let headerCheckbox: any;

        const checkActions = () => {
            const hasSelection = getTableData().some((item: any) => item.selected);
            document.querySelector('#default-actions')?.toggleAttribute('hidden', hasSelection);
            document.querySelector('#selection-actions')?.toggleAttribute('hidden', !hasSelection);
        };

        const applySelectionToAllRows = (selected: boolean) => {
            const table = getTable();
            if (!table) return;
            table.data = { ...table.data, data: getTableData().map((item: any) => ({ ...item, selected })) };
            checkActions();
        };

        const headerTemplate = () => {
            headerCheckbox = document.createElement('vl-checkbox') as any;
            headerCheckbox.setAttribute('label', 'Selecteer alles');
            const td = document.createElement('td');
            td.appendChild(headerCheckbox);
            requestAnimationFrame(() => {
                headerCheckbox.addEventListener('vl-change', (e: any) => {
                    applySelectionToAllRows(e.detail.checked);
                });
            });
            return td;
        };

        const dataFieldRenderer = (td: HTMLTableCellElement, { selected, name: rowName }: any) => {
            const checkbox = document.createElement('vl-checkbox') as any;
            checkbox.setAttribute('label', `Selecteer ${rowName}`);
            checkbox.toggleAttribute('checked', selected);
            checkbox.addEventListener('vl-change', (e: any) => {
                const tableData = getTableData();
                const rowData = tableData.find(({ name }: any) => name === rowName);
                if (rowData) rowData.selected = e.detail.checked;

                const allSelected = tableData.every((item: any) => item.selected);
                const noneSelected = tableData.every((item: any) => !item.selected);
                if (headerCheckbox?.shadowRoot) {
                    const headerInput = headerCheckbox.shadowRoot.querySelector('input');
                    if (headerInput) {
                        if (allSelected) {
                            headerCheckbox.setAttribute('checked', '');
                            headerInput.indeterminate = false;
                        } else if (noneSelected) {
                            headerCheckbox.removeAttribute('checked');
                            headerInput.indeterminate = false;
                        } else {
                            headerInput.indeterminate = true;
                        }
                    }
                }
                checkActions();
            });
            td.appendChild(checkbox);
        };

        cy.mount(html`
            <div>
                <div id="default-actions">Default actions</div>
                <div id="selection-actions" hidden>
                    <vl-button
                        id="remove-selection"
                        type="button"
                        ghost
                        narrow
                        icon="close"
                        icon-placement="after"
                        label="Alles deselecteren"
                        @vl-click=${() => applySelectionToAllRows(false)}
                    >Selectie</vl-button>
                </div>
                <vl-rich-data-table
                    id="rich-data-table-selectable"
                    data="${JSON.stringify(selectableData)}"
                >
                    <vl-rich-data-field
                        .renderer=${dataFieldRenderer}
                        .headerTemplate=${headerTemplate}
                    ></vl-rich-data-field>
                    <vl-rich-data-field name="name" label="Naam" selector="name"></vl-rich-data-field>
                    <vl-rich-data-field name="filesize" label="Grootte" selector="filesize"></vl-rich-data-field>
                    <vl-rich-data-field name="extension" label="Type" selector="extension"></vl-rich-data-field>
                </vl-rich-data-table>
            </div>
        `);
    });

    it('should be able to select all using the select all checkbox', () => {
        cy.wait(500);
        getSelectAllCheckbox().shadow().find('input').click({ force: true });

        getDefaultActions().should('not.be.visible');
        getSelectionActions().should('be.visible');
        getAllRows().each(($row) => {
            cy.wrap($row).find('vl-checkbox').shadow().find('input').should('be.checked');
        });
    });

    it('should be able to deselect all using the remove-selection button', () => {
        getSelectAllCheckbox().shadow().find('input').click({ force: true });
        getRemoveSelectionButton().shadow().find('button').click({ force: true });

        getSelectionActions().should('not.be.visible');
        getDefaultActions().should('be.visible');
        getAllRows().each(($row) => {
            cy.wrap($row).find('vl-checkbox').shadow().find('input').should('not.be.checked');
        });
    });

    it('should be able to select a row using its checkbox', () => {
        getRemoveSelectionButton().shadow().find('button').click({ force: true });
        getAllRows().eq(2).find('vl-checkbox').shadow().find('input').click({ force: true });

        getDefaultActions().should('not.be.visible');
        getSelectionActions().should('be.visible');
    });

    it('should check the select-all checkbox by selecting all rows', () => {
        getRemoveSelectionButton().shadow().find('button').click({ force: true });
        getAllRows().each(($row) => {
            cy.wait(200);
            cy.wrap($row).find('vl-checkbox').shadow().find('input').click({ force: true });
        });

        getSelectAllCheckbox().shadow().find('input').should('be.checked');
        getDefaultActions().should('not.be.visible');
        getSelectionActions().should('be.visible');
    });
});
