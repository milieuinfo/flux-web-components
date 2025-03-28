import { registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { LitElement, PropertyDeclarations, PropertyValues } from 'lit';
import { VlButtonComponent } from '../button';
import { tableStyles } from './vl-table.css';

registerWebComponents([VlButtonComponent]);

@webComponent('vl-table-next')
export class VlTableComponent extends LitElement {
    private observer: MutationObserver | undefined;

    static get properties(): PropertyDeclarations {
        return {
            hover: { type: Boolean, reflect: true },
            matrix: { type: Boolean, reflect: true },
            grid: { type: Boolean, reflect: true },
            zebra: { type: Boolean, reflect: true },
            uigZebra: { type: Boolean, reflect: true, attribute: 'uig-zebra' },
            collapsedM: { type: Boolean, reflect: true, attribute: 'collapsed-m' },
            collapsedS: { type: Boolean, reflect: true, attribute: 'collapsed-s' },
            collapsedXs: { type: Boolean, reflect: true, attribute: 'collapsed-xs' },
        };
    }

    constructor() {
        super();
        this.table?.classList.add('vl-table-next');
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();
        this.processScopeAttributes();
        this.processRowElements();
        this.observer = this.observeHeaderElements(() => this.processScopeAttributes());
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.observer?.disconnect();
    }

    protected firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);

        // Gezien dit component geen shadow dom heeft, moeten de styles van de children toegevoegd worden
        // aan de adoptedStyleSheets van de omliggende shadow dom, anders zullen de styles niet toegepast worden
        const shadowRoot = this.shadowRoot || this.getRootNode();
        if (shadowRoot instanceof ShadowRoot) {
            shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, tableStyles.styleSheet as CSSStyleSheet];
        } else {
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, tableStyles.styleSheet as CSSStyleSheet];
        }

        this.caption?.classList.add('vl-table-next__caption');
    }

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);

        if (!this.table) return;

        // Map van properties naar class namen
        const classMap: { [key: string]: string } = {
            hover: 'vl-table-next--hover',
            matrix: 'vl-table-next--matrix',
            grid: 'vl-table-next--grid',
            zebra: 'vl-table-next--zebra',
            uigZebra: 'vl-table-next--uig-zebra',
            collapsedM: 'vl-table-next--collapsed-m',
            collapsedS: 'vl-table-next--collapsed-s',
            collapsedXs: 'vl-table-next--collapsed-xs',
        };

        // voeg of verwijder klassen op basis van property waarden
        Object.entries(classMap).forEach(([property, className]) => {
            if (this[property as keyof this]) {
                this.table!.classList.add(className);
            } else {
                this.table!.classList.remove(className);
            }
        });
    }

    private get table() {
        return this.querySelector('table');
    }

    private get caption() {
        return this.querySelector('caption');
    }

    private get headHeaderElements(): HTMLTableCellElement[] {
        return Array.from(this.querySelectorAll<HTMLTableCellElement>('thead tr th'));
    }

    private get bodyHeaderElements(): HTMLTableCellElement[] {
        return Array.from(this.querySelectorAll<HTMLTableCellElement>('tbody tr th'));
    }

    private get bodyRowElements(): HTMLTableRowElement[] {
        return Array.from(this.querySelectorAll<HTMLTableRowElement>('tbody tr'));
    }

    private detailsToggleButtonElement(id: string): HTMLButtonElement | null {
        return this.querySelector<HTMLButtonElement>(`tbody tr td vl-button-next[id="details-toggle-${id}"]`);
    }

    private detailsTableRowElements(id: string): NodeListOf<HTMLTableRowElement> | null | undefined {
        return this.table?.querySelectorAll<HTMLTableRowElement>(`tbody tr[data-details-id="${id}"]`);
    }

    private processScopeAttributes() {
        this.headHeaderElements
            .filter((header) => !header.hasAttribute('scope'))
            .forEach((header) => header.setAttribute('scope', 'col'));
        this.bodyHeaderElements
            .filter((header) => !header.hasAttribute('scope'))
            .forEach((header) => header.setAttribute('scope', 'row'));
    }

    private expandCollapseTemplate(id: string) {
        const button = document.createElement('vl-button-next');
        button.id = `details-toggle-${id}`;
        button.setAttribute('type', 'button');
        button.setAttribute('narrow', '');
        button.setAttribute('secondary', '');
        button.setAttribute('icon', 'arrow-down-fat');

        button.addEventListener('vl-click', (e: Event) => {
            e.preventDefault();
            this.toggleDetails(id);
        });

        return button;
    }

    collapseDetails(id: string) {
        this.showDetails(id, false);
    }

    expandDetails(id: string) {
        this.showDetails(id, true);
    }

    private showDetails(id: string, show: boolean) {
        const details = this.detailsTableRowElements(id);
        const vlButton = this.detailsToggleButtonElement(id);
        if (show) {
            details?.forEach((detail) => detail.style.removeProperty('display'));
            vlButton?.shadowRoot?.querySelector('button')?.setAttribute('aria-expanded', 'true');
            vlButton?.setAttribute('icon', 'arrow-up-fat');
        } else {
            details?.forEach((detail) => (detail.style.display = 'none'));
            vlButton?.shadowRoot?.querySelector('button')?.setAttribute('aria-expanded', 'false');
            vlButton?.setAttribute('icon', 'arrow-down-fat');
        }
    }

    private processRowElements(): void {
        const rows = this.bodyRowElements;
        let dataRowIndex = 0;

        rows.forEach((row, i) => {
            const isDataRow = (rowValue: HTMLTableRowElement) => !rowValue.hasAttribute('data-details-id');
            if (isDataRow(row)) {
                dataRowIndex++;
            } else {
                const id = row.getAttribute('data-details-id');
                row.style.display = 'none';

                const dataRow = rows[i - 1];
                if (dataRow.querySelectorAll('td[data-with-expand-details]').length === 0 && id && isDataRow(dataRow)) {
                    const cell = document.createElement('td');
                    const vlButton = this.expandCollapseTemplate(id);
                    cell.appendChild(vlButton);
                    dataRow.appendChild(cell);

                    vlButton.updateComplete.then(() => {
                        vlButton.shadowRoot?.querySelector('button')?.setAttribute('aria-expanded', 'false');
                        vlButton.shadowRoot
                            ?.querySelector('button')
                            ?.setAttribute('aria-label', 'toggle details for ' + id);
                    });
                }

                const detailsCellCount = row?.querySelectorAll('td')?.length;
                if (detailsCellCount === 1) {
                    const dataCellCount = dataRow.querySelectorAll('td').length;
                    const detailsCell = row.querySelector('td');
                    if (detailsCell) detailsCell.colSpan = dataCellCount;
                }
            }

            row.classList.add(dataRowIndex % 2 === 0 ? 'even' : 'odd');
        });
    }

    private observeHeaderElements(callback: MutationCallback): MutationObserver {
        const observer = new MutationObserver(callback);
        observer.observe(this, { childList: true });
        return observer;
    }

    toggleDetails(id: string) {
        console.log('toggleDetails id', id);
        const details = this.detailsTableRowElements(id);
        const detailsVisible = details ? details[0].style.display !== 'none' : false;
        details?.forEach((detail) => (detail.style.display = detailsVisible ? 'none' : 'table-row'));
        this.showDetails(id, !detailsVisible);
    }
}
