import { VlButtonComponent } from "@domg-wc/components/atom";
import { VlCheckboxComponent } from "@domg-wc/components/form";
import { vlAccessibilityStyles } from "@domg-wc/styles";
import { VlRichDataTable } from "../vl-rich-data-table.component";

type MyDataItem = { selected: boolean; name: string; extension: string; filesize: string };
type MyData = MyDataItem[];

type SelectableRichTableImplementation = {
    checkActions: () => void,
    headerTemplate: () => HTMLTableCellElement,
    dataFieldRenderer: (td: HTMLTableCellElement, { selected, name }: MyDataItem) => void,
    applySelectionToAllRows: (selected: boolean) => void,
}

export const selectableRichTableImplementation = (): SelectableRichTableImplementation => {
    const headerCheckbox: VlCheckboxComponent = document.createElement('vl-checkbox');
    headerCheckbox.setAttribute('label', 'Selecteer alles');

    const getHeaderCheckboxInput = (): HTMLInputElement =>
        headerCheckbox.shadowRoot!.querySelector<HTMLInputElement>('input')!;

    const getTable = (): VlRichDataTable | null =>
        document.querySelector<VlRichDataTable>('#rich-data-table-selectable');

    const getTableData = (): MyData => {
        return (getTable()?.data.data || []) as MyData;
    };

    const syncHeaderCheckbox = (): void => {
        const tableData = getTableData();
        const allSelected = tableData.length > 0 && tableData.every((item) => item.selected);
        const noneSelected = tableData.every((item) => !item.selected);

        headerCheckbox.toggleAttribute('indeterminate', !allSelected && !noneSelected);
        headerCheckbox.toggleAttribute('checked', allSelected);
    };

    const applySelectionToAllRows = (selected: boolean): void => {
        headerCheckbox.removeAttribute('indeterminate');
        const table = getTable();
        if (!table) return;
        const tableData = getTableData();
        table.data = { ...table.data, data: [...tableData.map((item) => ({ ...item, selected }))] };
    };

    const handleSelectAllToggle = (e: Event): void => {
        const {
            detail: { checked },
        } = e as CustomEvent<{ checked: boolean }>;
        applySelectionToAllRows(checked);
    };

    const getSelection = (): MyData => getTableData().filter((item) => item.selected);

    const checkActions = (): void => {
        const selection = getSelection();
        const selectionCount = selection.length;
        const hasSelection = selectionCount > 0;

        document.querySelector('#default-actions')?.toggleAttribute('hidden', hasSelection);
        document.querySelector('#selection-actions')?.toggleAttribute('hidden', !hasSelection);

        const removeSelectionButton = document.querySelector<VlButtonComponent>('#remove-selection');
        const selectionStatus = document.querySelector<VlButtonComponent>('#selection-status');

        if (removeSelectionButton && selectionStatus) {
            const selectionText = `${selectionCount} item${selectionCount !== 1 ? 's' : ''} geselecteerd`;
            selectionStatus.innerText = selectionText;
            removeSelectionButton.innerText = selectionText;
            return;
        }

        if (!hasSelection && headerCheckbox) {
            getHeaderCheckboxInput()?.focus();
            return;
        }
    };

    const dataFieldRenderer = (td: HTMLTableCellElement, { selected, name: rowName }: MyDataItem): void => {
        const checkbox: VlCheckboxComponent = document.createElement('vl-checkbox');
        checkbox.setAttribute('label', `Selecteer ${rowName}`);
        checkbox.toggleAttribute('checked', selected);
        checkbox.addEventListener('vl-change', (e) => {
            const {
                detail: { checked },
            } = e as CustomEvent<{ checked: boolean }>;

            const tableData = getTableData();
            const rowData = tableData.find(({ name }) => name === rowName);
            if (rowData) rowData.selected = checked;

            syncHeaderCheckbox();
        });
        td.appendChild(checkbox);
    };

    const headerTemplate = (): HTMLTableCellElement => {
        const td: HTMLTableCellElement = document.createElement('td');
        const headerLabel = document.createElement('span');
        headerLabel.setAttribute('class', 'vl-visually-hidden');
        headerLabel.innerText = 'Maak selectie';
        td.innerHTML = `<style>${vlAccessibilityStyles}</style>`;
        td.appendChild(headerLabel);
        td.appendChild(headerCheckbox);
        requestAnimationFrame(() => {
            headerCheckbox.addEventListener('vl-input', handleSelectAllToggle);
            syncHeaderCheckbox();
        });
        return td;
    };

    return {
        checkActions,
        headerTemplate,
        dataFieldRenderer,
        applySelectionToAllRows,
    }
};

export default selectableRichTableImplementation;
