import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlRichDataSorter } from './vl-rich-data-sorter.component';

@webComponent('vl-rich-data-field')
export class VlRichDataField extends BaseHTMLElement {
    protected _renderer: ((td: HTMLTableCellElement, rowData: unknown) => void | undefined) | undefined;

    static {
        registerWebComponents([VlRichDataSorter]);
    }

    static get headerAttributes(): string[] {
        return ['name', 'label', 'sortable', 'sorting-direction', 'sorting-priority'];
    }

    static get bodyAttributes(): string[] {
        return ['selector', 'renderer'];
    }

    static get _observedAttributes(): string[] {
        return this.headerAttributes.concat(this.bodyAttributes);
    }

    static get is(): string {
        return 'vl-rich-data-field';
    }

    headerTemplate(): HTMLTableCellElement {
        const th = document.createElement('th');
        const headerContent = this.__getHeaderContentElement();
        if (headerContent) {
            th.appendChild(headerContent);
        }
        if (this.sortable) {
            th.setAttribute('sortable', '');
        }
        return th;
    }

    valueTemplate(rowData: unknown): HTMLTableCellElement {
        const td = document.createElement('td');
        if (this.label) {
            td.setAttribute('data-title', this.label);
        }
        const element = this.__getValueContentElement(rowData);
        if (element) {
            td.appendChild(element);
        } else if (this._renderer) {
            this._renderer(td, rowData);
        }
        return td;
    }

    /**
     * Geeft de naam terug die gebruikt wordt om het veld te identificeren.
     * @return {string}
     */
    get name() {
        return this.getAttribute('name');
    }

    /**
     * Geeft de selector terug die gebruikt wordt om de juiste waarde uit de data te halen.
     * @return {string}
     */
    get selector() {
        return this.getAttribute('selector');
    }

    /**
     * Geeft de naam terug die getoond kan worden aan de gebruiker.
     * @return {string}
     */
    get label() {
        return this.getAttribute('label');
    }

    /**
     * Geeft terug of er op het veld gesorteerd kan worden.
     * @return {boolean}
     */
    get sortable() {
        return this.getAttribute('sortable') !== null;
    }

    /**
     * Geeft de sorteerrichting terug.
     * @return {asc | desc}
     */
    get sortingDirection() {
        return this.getAttribute('sorting-direction');
    }

    /**
     * Geeft de prioriteit van het sorteren terug.
     * @return {number}
     */
    get sortingPriority() {
        return this.getAttribute('sorting-priority');
    }

    get _labelSlotElement() {
        return this.querySelector<HTMLSlotElement>('template[slot="label"]');
    }

    get _contentSlotElement() {
        return this.querySelector<HTMLSlotElement>('template[slot="content"]');
    }

    set renderer(renderer: any) {
        this._renderer = renderer;
        this._changed(['renderer']);
    }

    _nameChangedCallback(oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this._changed(['name']);
        }
    }

    _selectorChangedCallback(oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this._changed(['selector']);
        }
    }

    _labelChangedCallback(oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this._changed(['label']);
        }
    }

    _sortableChangedCallback(oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this._changed(['sortable']);
        }
    }

    _sortingDirectionChangedCallback(oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this._changed(['sorting-direction']);
        }
    }

    _sortingPriorityChangedCallback(oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this._changed(['sorting-priority']);
        }
    }

    _changed(properties: any) {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    properties: properties,
                },
            })
        );
    }

    get __headerContent(): string | undefined {
        return this.label || (this._labelSlotElement ? this._labelSlotElement.innerHTML : undefined);
    }

    __getHeaderContentElement(): DocumentFragment | undefined {
        const content = this.__headerContent;
        if (content) {
            if (this.sortable) {
                const direction = this.sortingDirection ? `direction="${this.sortingDirection}"` : '';
                const priority = this.sortingPriority ? `priority="${this.sortingPriority}"` : '';
                const sorter = `<vl-rich-data-sorter for="${this.name}" ${direction} ${priority}></vl-rich-data-sorter>`;
                return this._template(`<a>${content}${sorter}</a>`);
            } else {
                return this._template(`${content}`);
            }
        } else {
            return undefined;
        }
    }

    __getValueContentElement(data: unknown): DocumentFragment | null {
        if (this.selector) {
            return this._template(
                `${this.selector.split('.').reduce((prev: any, curr: any) => (prev ? prev[curr] : null), data)}`
            );
        } else if (this._contentSlotElement) {
            const literal = `${this.querySelector('template[slot="content"]')?.innerHTML}`;
            const template = ((literal: any, item: any) => new Function('item', 'return `' + literal + '`')(item)).call(
                this,
                literal,
                data
            );
            return this._template(template);
        } else {
            return null;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-rich-data-field': VlRichDataField;
    }
}
