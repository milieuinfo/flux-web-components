import { rowsForFiltering, rowsForPagination } from './vl-rich-data-table.mock';
import { Pagination } from '@domg-wc/components';

const richDataTableUrl =
    'http://localhost:8080/iframe.html?args=&id=components-rich-data-table--rich-data-table-default&viewMode=story';
const richDataTableSortingUrl =
    'http://localhost:8080/iframe.html?args=&id=components-rich-data-table--rich-data-table-sorting&viewMode=story';
const richDataTableFilterUrl =
    'http://localhost:8080/iframe.html?args=&id=components-rich-data-table--rich-data-table-filter&viewMode=story';
const richDataTablePagingUrl =
    'http://localhost:8080/iframe.html?args=&id=components-rich-data-table--rich-data-table-filter-and-pagination&viewMode=story';

const executeForEveryRow = (test: (row: JQuery<HTMLElement>, rowIndex: number) => void) => {
    cy.get('vl-rich-data-table').shadow().find('tbody').find('tr').each(test);
};

const shouldMatchCellWithData = (row: JQuery<HTMLElement>, rowIndex: number, rowData: unknown[]) => {
    cy.wrap(row)
        .find('td')
        .each((cell, cellIndex) => {
            const dataRowObject = rowData[rowIndex];
            const dataRowValuesList = Object.values(dataRowObject);
            const valueForCell = dataRowValuesList[cellIndex];
            // in the data used, complex data objects are used for custom template instead of simply showing the value
            // in that case, it won't match one on one
            if (typeof valueForCell !== 'object') {
                cy.wrap(cell).should('have.text', dataRowValuesList[cellIndex]);
            }
        });
};

const shouldNotMatchCellWithData = (row: JQuery<HTMLElement>, rowIndex: number, rowData: unknown[]) => {
    cy.wrap(row)
        .find('td')
        .each((cell, cellIndex) => {
            const dataRowObject = rowData[rowIndex];
            if (dataRowObject) {
                const dataRowValuesList = Object.values(dataRowObject);
                const valueForCell = dataRowValuesList[cellIndex];
                // in the data used, complex data objects are used for custom template instead of simply showing the value
                // in that case, it won't match one on one
                if (typeof valueForCell !== 'object') {
                    cy.wrap(cell).should('not.have.text', dataRowValuesList[cellIndex]);
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

const getTitleForField = (field) => {
    switch (field) {
        case 'name':
            return 'Naam';
        case 'id':
            return 'ID';
    }
};
const shouldSortFieldsAsExpected = (
    row: JQuery<HTMLElement>,
    rowIndex: number,
    dataRows: unknown[],
    sortField: string,
    direction = 'asc'
) => {
    const listForField = (rows: unknown[]) => rows.map((row) => row[sortField]);
    const unsortedValues = listForField(dataRows);
    const valuesAfterSorting = direction === 'asc' ? unsortedValues.sort() : unsortedValues.sort().reverse();
    cy.wrap(row)
        .find(`[data-title="${getTitleForField(sortField)}"]`)
        .should('have.text', valuesAfterSorting[rowIndex]);
};

const shouldHaveActiveSorterAndMatchExpectedDirection = (sortField: string, direction: string) => {
    cy.get('vl-rich-data-table')
        .shadow()
        .find(`[data-vl-for="${sortField}"]`)
        .shadow()
        .find('#direction')
        .should('have.attr', 'data-vl-icon', direction === 'asc' ? 'arrow-down' : 'arrow-up');
};

const shouldHaveSorterAndDirectionShouldBeHidden = (sortField: string) => {
    cy.get('vl-rich-data-table')
        .shadow()
        .find(`[data-vl-for="${sortField}"]`)
        .shadow()
        .find('div')
        .should('have.class', 'vl-u-visually-hidden');
};

const clickSorterForField = (sortField: string) => {
    cy.get('vl-rich-data-table').shadow().find(`[data-vl-for="${sortField}"]`).click({ force: true });
};

const page = (page: number, itemsPerPage: number, data: any[]) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
};

const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
    const modulo = totalItems % itemsPerPage;
    return modulo ? (totalItems - modulo) / itemsPerPage + 1 : totalItems / itemsPerPage;
};

const shouldPaginateCorrectly = (selector: string, dataRows: unknown[], pagination: Pagination) => {
    const { currentPage, itemsPerPage }: Pagination = pagination;
    // update data of table & pagination data
    const dataForPage = page(currentPage, itemsPerPage, dataRows);
    const itemsInCurrentPage = dataForPage.length;

    // test if number of html rows match amount of items that should be in the page
    cy.get('vl-rich-data-table').shadow().find('tbody').find('tr').its('length').should('eq', dataForPage.length);

    const startIndexCurrentPage = (currentPage - 1) * itemsPerPage;
    const endIndexCurrentPage = startIndexCurrentPage + itemsInCurrentPage;
    // we should expect to find the data for this specific page in the html elements
    const dataRowsForThisPage = dataRows.slice(startIndexCurrentPage, endIndexCurrentPage);
    shouldMatchTableData(dataRowsForThisPage);
    // we should expect not to find the data for the next page in the html table
    const dataForNextPage = page(currentPage + 1, itemsPerPage, dataRows);
    const nextPageRows = dataRows.slice(endIndexCurrentPage, endIndexCurrentPage + dataForNextPage.length);
    executeForEveryRow((row, rowIndex) => shouldNotMatchCellWithData(row, rowIndex, nextPageRows));
};

const selectPage = (pageNumber: number) => {
    cy.get('vl-rich-data-table').find('vl-pager').shadow().find(`[data-vl-pager-page=${pageNumber}]`).click();
};

describe('story vl-rich-data-table default', () => {
    it('should set data in the table', () => {
        cy.visit(richDataTableUrl);

        const { data: dataRows } = {
            data: [
                { id: 0, name: 'Project #1', owner: 'Jan Jansens' },
                { id: 1, name: 'Project #2', owner: 'Marie Vermeersch' },
            ],
        };

        shouldMatchTableData(dataRows);
    });
});

describe('story vl-rich-data-table - sorting', () => {
    beforeEach(() => cy.visit(`${richDataTableSortingUrl}`));

    const { data: rowData } = {
        data: [
            { id: 0, name: 'Water', owner: 'Kevin Jansens' },
            { id: 1, name: 'Vuur', owner: 'Anton Vanherrewege' },
            { id: 2, name: 'Aarde', owner: 'Hedwig Jansens' },
        ],
    };

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

    it('should have no sorting, when sorter is currently sorting descending', () => {
        const keyToSortOn = 'id';
        clickSorterForField(keyToSortOn);
        clickSorterForField(keyToSortOn);

        shouldHaveSorterAndDirectionShouldBeHidden(keyToSortOn);
    });
});

describe('story vl-rich-data-table - filter', () => {
    beforeEach(() => cy.visit(`${richDataTableFilterUrl}`));
    const data = rowsForFiltering;
    const filterField = 'name';
    const filterValue = 'Grond';

    it('should be able to find data', () => {
        shouldMatchTableData(data);
    });

    it('should be able to filter on a field', () => {
        cy.get('vl-rich-data-table').find(`[name="${filterField}"]`).shadow().find('input').type(filterValue);
    });

    it('should be able to find the filtered data in the table', () => {
        cy.get('vl-rich-data-table').find(`[name="${filterField}"]`).shadow().find('input').type(filterValue);
        const filteredData = data.filter((row) => row[filterField].indexOf(filterValue) !== -1);
        shouldMatchTableData(filteredData);
    });

    it('should not be able to find data not corresponding to search fields', () => {
        cy.get('vl-rich-data-table').find(`[name="${filterField}"]`).shadow().find('input').type(filterValue);
        executeForEveryRow((row, rowIndex) => shouldNotMatchCellWithData(row, rowIndex, data));
    });
});

describe('story vl-rich-data-table - paging', () => {
    beforeEach(() => cy.visit(`${richDataTablePagingUrl}`));

    const data = rowsForPagination;
    const itemsPerPage = 10; // this can be changed but should be lower than total amount of records

    it('should be able to select the first page', () => {
        selectPage(1);
    });

    it('should match displayed rows with data for first page & not with the next page', () => {
        shouldPaginateCorrectly('vl-rich-data-table', data, {
            currentPage: 1,
            totalPages: getTotalPages(data.length, itemsPerPage),
            itemsPerPage: itemsPerPage,
            totalItems: data.length,
        });
    });

    it('should be able to select the second page', () => {
        selectPage(2);
    });

    it('should match displayed rows with data for second page & not with the next page', () => {
        selectPage(2);
        shouldPaginateCorrectly('vl-rich-data-table', data, {
            currentPage: 2,
            totalPages: getTotalPages(data.length, itemsPerPage),
            itemsPerPage: itemsPerPage,
            totalItems: data.length,
        });
    });
});
