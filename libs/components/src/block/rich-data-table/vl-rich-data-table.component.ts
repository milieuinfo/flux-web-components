import { registerWebComponents, webComponentPromised } from '@domg-wc/common';
import { buttonAsLinkStyles } from '../../atom/link/vl-button-as-link.css';
import { RichData, VlRichData } from '../rich-data/vl-rich-data.component';
import { VlTableComponent } from '../table/vl-table.component';
import { VlRichDataField } from './vl-rich-data-field.component';
import { VlRichDataSorter } from './vl-rich-data-sorter.component';
import { vlAccessibilityStyles } from '@domg-wc/styles';

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

    constructor() {
        const content = `
            <vl-table slot="content">
                <table>
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <span class="vl-visually-hidden" id="sort-label" aria-live="polite"></span>
                <span id="sort-description" hidden>Sorteer: oplopend, aflopend of niet gesorteerd.</span>
            </vl-table>
        `;
        super(content);
    }

    // Vaste referenties: removeEventListener verwijdert enkel dezelfde functie die addEventListener kreeg.
    private readonly __boundFieldChanged = this.__fieldChanged.bind(this);
    private readonly __boundSortingChanged = this.__sortingChanged.bind(this);
    private __fieldsObserver: MutationObserver | undefined;

    static get _observedAttributes() {
        return super._observedAttributes.concat([
            'data',
            'collapsed-m',
            'collapsed-s',
            'collapsed-xs',
            'zebra',
            'flux-zebra',
            'label',
            'caption',
        ]);
    }

    static get _tableAttributes(): string[] {
        return ['collapsed-m', 'collapsed-s', 'collapsed-xs', 'zebra', 'flux-zebra'];
    }

    static get is(): string {
        return 'vl-rich-data-table';
    }

    /**
     * Geeft de data terug die in de tabel wordt getoond.
     * @return {{data: Object[]}}
     */
    get data(): RichData {
        return super.data;
    }

    /**
     * Stelt in welke data de tabel moet tonen.
     * @param {{data: Object[]} | Object[]} object - Een object met de rijen in `data` (en eventueel `paging`,
     * `sorting` en `filter`), of enkel de Array van rijen, die als `{ data: [...] }` behandeld wordt.
     */
    set data(object: RichData | unknown[]) {
        const previousData = this.data ? this.data.data : undefined;
        super.data = Array.isArray(object) ? { data: object } : object;
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
        return this.shadowRoot?.querySelector<HTMLElement>('#content');
    }

    get __fields() {
        return this.querySelectorAll<VlRichDataField>(VlRichDataField.is);
    }

    get __richDataFields(): VlRichDataField[] {
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

    get __table() {
        return this.shadowRoot?.querySelector<VlTableComponent>('vl-table');
    }

    get __tableElement(): HTMLTableElement | null | undefined {
        return this.__table?.querySelector('table');
    }

    get __tableHeader() {
        return this.__table?.querySelector<HTMLElementTagNameMap['thead']>('thead');
    }

    get __tableHeaderRow(): HTMLTableRowElement | null | undefined {
        const header = this.__tableHeader;
        if (header) {
            return header.querySelector('tr');
        } else {
            return undefined;
        }
    }

    get __tableBody() {
        return this.__table?.querySelector<HTMLElementTagNameMap['tbody']>('tbody');
    }

    get __screenReaderSortLabel(): HTMLSpanElement {
        return this.__table?.querySelector<HTMLSpanElement>('#sort-label')!;
    }

    get _isMultisortingEnabled(): boolean {
        return this.getAttribute('multi-sort') !== null;
    }

    // @ts-expect-error: TS2611: _sorting is defined as a property in class VlRichData,
    // but is overridden here in VlRichDataTable as an accessor.
    set _sorting(sorting: (unknown & { name: string; for: string; direction: string; priority: string })[]) {
        if (sorting) {
            if (this.__sorters)
                this.__sorters.forEach((sorter: any) => {
                    const matchedSorter = sorting.find((sort) => sort.name === sorter.for);
                    sorter.direction = matchedSorter ? matchedSorter.direction : undefined;
                    sorter.priority = matchedSorter ? matchedSorter.priority : undefined;
                });
            this.__updateAriaSort();
        }
    }

    get _hasResults(): boolean {
        return Boolean(this._data && this._data.data && this._data.data.length > 0);
    }

    get __label(): string | null {
        return this.getAttribute('label') || this.getAttribute('caption') || 'Tabel';
    }

    // De caption wordt enkel gerenderd wanneer er een caption attribuut is: een lege caption neemt
    // ruimte in en de toegankelijke naam van de vl-table host zou leeg zijn.
    __processName(): void {
        const caption = this.getAttribute('caption');
        const label = this.getAttribute('label');

        if (caption) {
            this.__tableElement?.createCaption().replaceChildren(caption);
        } else {
            this.__tableElement?.deleteCaption();
        }

        if (label && !caption) {
            this.__tableElement?.setAttribute('aria-label', label);
        } else {
            this.__tableElement?.removeAttribute('aria-label');
        }

        // De vl-table host krijgt de rol group en wordt focusbaar als de tabel scrollt: hij heeft een eigen naam nodig.
        const name = label || caption;
        if (name) {
            this.__table?.setAttribute('aria-label', name);
        } else {
            this.__table?.removeAttribute('aria-label');
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this._render();
        this.__observeFields();

        this.__processName();

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
                ...(this.shadowRoot.adoptedStyleSheets || []),
                vlAccessibilityStyles.styleSheet!,
                buttonAsLinkStyles.styleSheet!,
            ];
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // bij een nieuwe connectedCallback komt er een nieuwe observer; de oude mag niet blijven renderen
        this.__fieldsObserver?.disconnect();
    }

    attributeChangedCallback(attr: string, oldValue: any, newValue: any) {
        super.attributeChangedCallback(attr, oldValue, newValue);
        if (VlRichDataTable._tableAttributes.includes(attr)) {
            this.__table?.toggleAttribute(attr);
        }
    }

    __getState({ paging }: any) {
        const state: any = super.__getState({ paging });
        state.sorting = this.__sortingState;
        return state;
    }

    _validate(data: unknown[]): void {
        if (data) {
            if (!Array.isArray(data)) {
                throw new Error('vl-rich-data-table verwacht een Array als data');
            }
        }
    }

    _render(): void {
        this._renderHeaders();
        this._renderBody();
    }

    _renderHeaders(): void {
        const { __tableHeaderRow, __richDataFields, __addHeaderColumn } = this;
        // De koppen worden opnieuw gemaakt: stond de focus op een sorteerknop, dan gaat ze naar de nieuwe knop.
        const focusedElement = this.shadowRoot?.activeElement;
        const focusedSorterFor =
            focusedElement && __tableHeaderRow?.contains(focusedElement)
                ? focusedElement.querySelector(VlRichDataSorter.is)?.getAttribute('for')
                : undefined;
        if (__tableHeaderRow) __tableHeaderRow.innerHTML = '';
        const headerColumns = __richDataFields.map((field) => field.headerTemplate());
        const atLeastOneHeaderColumnHasContent = headerColumns.some((header) => !!header.textContent);
        if (atLeastOneHeaderColumnHasContent) {
            headerColumns.forEach(__addHeaderColumn.bind(this));
            this.__showHeader();
        } else {
            this.__hideHeader();
        }
        this.__updateAriaSort();
        if (focusedSorterFor) {
            this.__tableHeaderRow
                ?.querySelector<HTMLElement>(`vl-rich-data-sorter[for="${focusedSorterFor}"]`)
                ?.closest<HTMLElement>('a, button')
                ?.focus();
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
        // Support both legacy anchors and new buttons used as sort toggles
        const sorterButton = header.querySelector('th[data-sortable] > a, th[data-sortable] > button');
        if (sorterButton) {
            // meteen koppelen: een klik vlak na de eerste render mag niet verloren gaan
            sorterButton.querySelector(VlRichDataSorter.is)?.addEventListener('change', this.__boundSortingChanged);
            sorterButton.setAttribute('aria-describedby', 'sort-description');
            sorterButton.addEventListener('click', () => {
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
                    rowTemplate?.appendChild(field.valueTemplate(rowData));
                });
                __tableBody.appendChild(rowTemplate!);
            });
        }
    }

    _dataChangedCallback(oldValue: string, newValue: string): void {
        this.data = JSON.parse(newValue);
    }

    _labelChangedCallback(oldValue: string, newValue: string): void {
        if (!this.hasAttribute('label') && !this.hasAttribute('caption')) {
            console.warn('vl-rich-data-table vereist een label of caption attribuut.');
        }
        if (newValue !== oldValue) {
            this.__processName();
        }
    }

    _captionChangedCallback(oldValue: string, newValue: string): void {
        if (!this.hasAttribute('label') && !this.hasAttribute('caption')) {
            console.warn('vl-rich-data-table vereist een label of caption attribuut.');
        }
        if (newValue !== oldValue) {
            this.__processName();
        }
    }

    __listenToFieldChanges(field: any) {
        field.addEventListener('change', this.__boundFieldChanged);
    }

    __stopListeningToFieldChanges(field: any) {
        field.removeEventListener('change', this.__boundFieldChanged);
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
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.__activeSorters &&
                this.__activeSorters.forEach((sorter: any, index: number) => (sorter.priority = index + 1));
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.__activeSorters &&
                this.__activeSorters
                    .filter((sorter) => sorter !== event.target)
                    .forEach((sorter: any) => (sorter.direction = undefined));
        }

        const allSortableHeaderCells: HTMLElement[] = Array.from(
            this.__tableHeaderRow?.querySelectorAll('th[data-sortable]') || []
        ) as HTMLElement[];

        this.__updateAriaSort();

        const headerNamesMap = new Map(
            allSortableHeaderCells.map((th) => [
                th.querySelector('vl-rich-data-sorter')?.getAttribute('for'),
                th.innerText,
            ]) || []
        );

        // zonder sortering meldt de live region dat de sortering wegviel, anders hoort een schermlezer niets
        const removedSorterFor = event?.target?.getAttribute?.('for');
        const removedSorterLabel = removedSorterFor
            ? ` op ${headerNamesMap.get(removedSorterFor) || removedSorterFor}`
            : '';
        this.__screenReaderSortLabel.textContent = !!this.__sortingState?.length
            ? `Gesorteerd op ${this.__sortingState
                  .map(
                      ({ name, direction }) =>
                          `${headerNamesMap.get(name) || name} ${direction === 'asc' ? 'oplopend' : 'aflopend'}`
                  )
                  .join(', en ')}`
            : `Niet meer gesorteerd${removedSorterLabel}`;

        this.__onStateChange(event);
    }

    // aria-sort volgt de richting van de sorters, ook bij het laden en wanneer de sortering via data wijzigt.
    // Enkel gesorteerde kolommen krijgen aria-sort.
    __updateAriaSort(): void {
        this.__tableHeaderRow?.querySelectorAll('th[data-sortable]').forEach((th) => th.removeAttribute('aria-sort'));

        this.__sortingState?.forEach(({ name, direction }) => {
            const header = this.__tableHeaderRow
                ?.querySelector(`th[data-sortable] vl-rich-data-sorter[for="${name}"]`)
                ?.closest('th');

            header?.setAttribute('aria-sort', direction === 'asc' ? 'ascending' : 'descending');
        });
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
        this.__fieldsObserver = this.__createObserver(
            this.__listenToFieldChanges.bind(this),
            this.__stopListeningToFieldChanges.bind(this),
            true
        );
        this.__fieldsObserver.observe(this as any, { childList: true });
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
