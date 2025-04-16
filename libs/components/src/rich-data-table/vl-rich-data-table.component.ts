import { registerWebComponents, webComponentPromised } from '@domg-wc/common';
import { VlTableComponent } from '../table/vl-table.component';
import { tableStyles } from '../table/vl-table.css';
import { RichData, VlRichData } from '../rich-data/vl-rich-data.component';
import { VlRichDataField } from './vl-rich-data-field.component';
import { VlRichDataSorter } from './vl-rich-data-sorter.component';
import styles from './vl-rich-data-table.uig-css';

type ForEachNodeFn = (value: Node, key: number, parent: NodeList) => void;
type Sorter = Pick<VlRichDataSorter, 'name' | 'direction' | 'priority'>;

@webComponentPromised(
    [customElements.whenDefined(VlRichDataField.is), customElements.whenDefined(VlRichDataSorter.is)],
    'vl-rich-data-table'
)
export class VlRichDataTable extends VlRichData {
    static {
        registerWebComponents([VlTableComponent]);
    }

    static get _observedAttributes() {
        return super._observedAttributes.concat(['data', 'collapsed-m', 'collapsed-s', 'collapsed-xs']);
    }

    static get _tableAttributes(): string[] {
        return ['data-vl-collapsed-m', 'data-vl-collapsed-s', 'data-vl-collapsed-xs'];
    }

    static get is(): string {
        return 'vl-rich-data-table';
    }

    constructor() {
        super(
            `
          <style>
            ${styles}
            ${tableStyles}
          </style>
        <vl-table slot="content">
          <table>
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </vl-table>
        `
        );
        this.__observeSorters();
    }

    connectedCallback() {
        super.connectedCallback();
        this._render();
        this.__observeFields();
    }

    attributeChangedCallback(attr: string, oldValue: any, newValue: any) {
        super.attributeChangedCallback(attr, oldValue, newValue);
        if (VlRichDataTable._tableAttributes.includes(attr)) {
            const withoutDataVlPrefix = attr.substring('data-vl-'.length);
            this.__table.toggleAttribute(withoutDataVlPrefix);
        }
    }

    /**
     * Stelt in welke data de tabel moet tonen.
     * @param {data: Object[]} object - Een Array van objecten die de data voorstellen.
     */
    set data(object: RichData) {
        const previousData = this.data ? this.data.data : undefined;
        super.data = object;
        const hasNewData = previousData !== this.data.data;
        if (hasNewData) {
            try {
                this._validate(this.data.data);
                this._renderBody();
            } catch (error) {
                if (this._data) this._data.data = [];
                throw error;
            }
        }
    }

    /**
     * Geeft de data terug die in de tabel wordt getoond.
     * @return {Object[]}
     */
    get data(): RichData {
        return super.data;
    }

    get __activeSorters(): VlRichDataSorter[] | undefined {
        if (Boolean(this.__sorters) && this.__sorters !== undefined) {
            const sorters: unknown[] = Array.from(this.__sorters);
            return (<VlRichDataSorter[]>sorters)
                .filter((sorter: VlRichDataSorter) => sorter.direction !== undefined)
                .sort(VlRichDataSorter.PRIORITY_COMPARATOR);
        } else {
            return undefined;
        }
    }

    get __contentColumn() {
        return this.shadowRoot.querySelector('#content');
    }

    get __fields() {
        return this.querySelectorAll(VlRichDataField.is);
    }

    get __richDataFields() {
        return [...this.__fields].filter((field) => field.constructor === VlRichDataField);
    }

    get __sorters(): NodeListOf<Element & VlRichDataSorter> | undefined {
        return this.__tableHeaderRow ? this.__tableHeaderRow.querySelectorAll(VlRichDataSorter.is) : undefined;
    }

    get __sortingState(): Sorter[] | null {
        if (this.__activeSorters && this.__activeSorters.length > 0) {
            return this.__activeSorters.map((criteria) => {
                return {
                    name: criteria.for,
                    priority: criteria.priority,
                    direction: criteria.direction,
                };
            });
        } else {
            return null;
        }
    }

    get __table(): HTMLTableElement {
        return this.shadowRoot.querySelector('table');
    }

    get __tableHeader(): HTMLElementTagNameMap['thead'] | null {
        return this.__table.querySelector('thead');
    }

    get __tableHeaderRow(): HTMLTableRowElement | null | undefined {
        const header = this.__tableHeader;
        if (header) {
            return header.querySelector('tr');
        } else {
            return undefined;
        }
    }

    get __tableBody(): HTMLElementTagNameMap['tbody'] | null {
        return this.__table.querySelector('tbody');
    }

    __getState({ paging }: any) {
        const state: any = super.__getState({ paging });
        state.sorting = this.__sortingState;
        return state;
    }

    get _isMultisortingEnabled(): boolean {
        return this.dataset.vlMultisort !== undefined;
    }

    _validate(data: unknown[]): void {
        if (data) {
            if (!Array.isArray(data)) {
                throw new Error('vl-rich-data-table verwacht een Array als data');
            }
        }
    }

    set _sorting(sorting: (unknown & { name: string; for: string; direction: string; priority: string })[]) {
        if (sorting) {
            if (this.__sorters)
                this.__sorters.forEach((sorter: any) => {
                    const matchedSorter = sorting.find((sort) => sort.name === sorter.for);
                    sorter.direction = matchedSorter ? matchedSorter.direction : undefined;
                    sorter.priority = matchedSorter ? matchedSorter.priority : undefined;
                });
        }
    }

    get _hasResults(): boolean {
        return Boolean(this._data);
    }

    _render(): void {
        this._renderHeaders();
        this._renderBody();
    }

    _renderHeaders(): void {
        const { __tableHeaderRow, __richDataFields, __addHeaderColumn } = this;
        if (__tableHeaderRow) __tableHeaderRow.innerHTML = '';
        const headerColumns = __richDataFields.map((field) => field.headerTemplate());
        const atLeastOneHeaderColumnHasContent = headerColumns.some((header) => !!header.textContent);
        if (atLeastOneHeaderColumnHasContent) {
            headerColumns.forEach(__addHeaderColumn.bind(this));
            this.__showHeader();
        } else {
            this.__hideHeader();
        }
    }

    __addHeaderColumn(header: any) {
        this.__initializeSortingOnHeaderColumn(header);
        if (this.__tableHeaderRow) this.__tableHeaderRow.appendChild(header);
    }

    __hideHeader() {
        if (this.__tableHeader) this.__tableHeader.setAttribute('hidden', '');
    }

    __showHeader() {
        if (this.__tableHeader) this.__tableHeader.removeAttribute('hidden');
    }

    __initializeSortingOnHeaderColumn(header: any) {
        const sorterButton = header.querySelector('th[data-vl-sortable] > a');
        if (sorterButton) {
            sorterButton.addEventListener('click', (e: any) => {
                sorterButton.querySelector('vl-rich-data-sorter').nextDirection();
            });
        }
    }

    _renderBody(): void {
        const { __tableBody, data } = this;
        if (data && data.data && __tableBody) {
            __tableBody.innerHTML = '';
            this.data.data.forEach((rowData) => {
                const rowTemplate = this._template(`<tr></tr>`).firstElementChild;
                this.__richDataFields.map((field) => {
                    rowTemplate.appendChild(field.valueTemplate(rowData));
                });
                __tableBody.appendChild(rowTemplate);
            });
        }
    }

    _dataChangedCallback(oldValue: string, newValue: string): void {
        this.data = JSON.parse(newValue);
    }

    __listenToFieldChanges(field: any) {
        field.addEventListener('change', this.__fieldChanged.bind(this));
    }

    __stopListeningToFieldChanges(field: any) {
        field.removeEventListener('change', this.__fieldChanged.bind(this));
    }

    __listenToSortChanges(sorter: any) {
        sorter.addEventListener('change', this.__sortingChanged.bind(this));
    }

    __stopListeningToSortChanges(sorter: any) {
        sorter.removeEventListener('change', this.__sortingChanged.bind(this));
    }

    __fieldChanged(event: any): void {
        const propertiesChanged = event.detail.properties;
        if (propertiesChanged) {
            if (propertiesChanged.some((property: string) => VlRichDataField.headerAttributes.includes(property))) {
                this._renderHeaders();
            }

            if (propertiesChanged.some((property: string) => VlRichDataField.bodyAttributes.includes(property))) {
                this._renderBody();
            }
        }
    }

    __sortingChanged(event: any): void {
        if (this._isMultisortingEnabled) {
            this.__activeSorters &&
                this.__activeSorters.forEach((sorter: any, index: number) => (sorter.priority = index + 1));
        } else {
            this.__activeSorters &&
                this.__activeSorters
                    .filter((sorter) => sorter !== event.target)
                    .forEach((sorter: any) => (sorter.direction = undefined));
        }
        this.__onStateChange(event);
    }

    __createObserver(
        doWhenNodeIsAdded: ForEachNodeFn,
        doWhenNodeIsRemoved: ForEachNodeFn,
        render: boolean
    ): MutationObserver {
        return new MutationObserver((mutationsList) => {
            let shouldRender = false;
            mutationsList.forEach((mutation) => {
                if (mutation.addedNodes || mutation.removedNodes) {
                    shouldRender = true;
                    if (mutation.addedNodes) {
                        mutation.addedNodes.forEach(doWhenNodeIsAdded);
                    }
                    if (mutation.removedNodes) {
                        mutation.removedNodes.forEach(doWhenNodeIsRemoved);
                    }
                }
            });
            if (render && shouldRender) {
                this._render();
            }
        });
    }

    __observeFields(): void {
        this.__fields.forEach(this.__listenToFieldChanges.bind(this));
        const observer = this.__createObserver(
            this.__listenToFieldChanges.bind(this),
            this.__stopListeningToFieldChanges.bind(this),
            true
        );
        observer.observe(this as any, { childList: true });
    }

    __observeSorters(): void {
        const nodeToSorter = (doWithSorter: any) => {
            return (node: any) => {
                const sorter = node.querySelector(VlRichDataSorter.is);
                if (sorter) {
                    doWithSorter(sorter);
                }
            };
        };
        if (this.__tableHeaderRow) {
            this.__createObserver(
                nodeToSorter((sorter: any) => this.__listenToSortChanges(sorter)),
                nodeToSorter((sorter: any) => this.__stopListeningToSortChanges(sorter)),
                false
            ).observe(this.__tableHeaderRow, { childList: true });
        }
    }
}

// Promise.all([customElements.whenDefined(VlRichDataField.is), customElements.whenDefined(VlRichDataSorter.is)]).then(
//     () => define(VlRichDataTable.is, VlRichDataTable)
// );

declare global {
    interface HTMLElementTagNameMap {
        'vl-rich-data-table': VlRichDataTable;
    }
}
