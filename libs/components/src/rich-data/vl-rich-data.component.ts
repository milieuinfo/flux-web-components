import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import {
    VlButtonElement,
    VlColumnElement,
    VlFormLabel,
    VlGridElement,
    VlIconElement,
    VlSearchFilterElement,
} from '@domg-wc/elements';
import { number } from 'prop-types';
import { VlSearchFilterComponent } from '../next/search-filter';
import { Pagination, VlPagerComponent } from '../pager/vl-pager.component';
import styles from './vl-rich-data.uig-css';

export interface RichDataMeta {
    sorting?: any;
    filter?: any;
    paging?: Pagination;
}

export type RichData = { data: unknown[] } & RichDataMeta;

@webComponent('vl-rich-data')
export class VlRichData extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([
            VlButtonElement,
            VlColumnElement,
            VlFormLabel,
            VlGridElement,
            VlIconElement,
            VlPagerComponent,
        ]);
    }

    static get _observedAttributes(): string[] {
        return ['data', 'collapsed-m', 'collapsed-s', 'collapsed-xs', 'filter-closable', 'filter-closed'];
    }

    static get _defaultSearchColumnSize(): number {
        return 4;
    }

    protected _data: RichData | undefined;

    constructor(style = '', content = '') {
        super(`
          <style>
            ${styles}
          </style>
          <div>
            <div is="vl-grid" is-stacked>
              <div id="toggle-filter" is="vl-column" class="vl-u-align-right vl-u-hidden--s" hidden data-vl-size="12" data-vl-medium-size="12">
                <button id="toggle-filter-button" is="vl-button" data-vl-secondary data-vl-narrow type="button" aria-label="Filter verbergen">
                  <span is="vl-icon" data-vl-icon="content-filter" data-vl-before></span><slot name="toggle-filter-button-text" hidden>Filter tonen</slot><slot name="close-filter-button-text">Filter verbergen</slot>
                </button>
              </div>
              <div id="open-filter" is="vl-column" class="vl-u-align-right vl-u-hidden" hidden data-vl-size="12" data-vl-medium-size="12">
                <button id="open-filter-button" is="vl-button" data-vl-secondary data-vl-narrow type="button" aria-label="Filter tonen">
                  <span is="vl-icon" data-vl-icon="content-filter" data-vl-before></span><slot name="toggle-filter-button-text">Filter</slot>
                </button>
              </div>
              <div id="search" is="vl-column" data-vl-size="0" data-vl-medium-size="0" data-vl-small-size="0" data-vl-extra-small-size="0">
                <div id="filter-slot-container">
                  <slot id="filter-slot" name="filter"></slot>
                </div>
              </div>
              <div id="content" is="vl-column" data-vl-size="12" data-vl-medium-size="12" data-vl-small-size="12" data-vl-extra-small-size="12">
                <div is="vl-grid" is-stacked>
                  <div id="search-results" is="vl-column" data-vl-size="6" data-vl-medium-size="6" data-vl-small-size="6" data-vl-extra-small-size="6" aria-live="polite">
                    <span>We vonden</span> <strong><span id="search-results-number">0</span> resultaten</strong>
                  </div>
                  <div id="sorter" is="vl-column" data-vl-size="6" data-vl-medium-size="6" data-vl-small-size="6" data-vl-extra-small-size="6">
                    <label is="vl-form-label">
                      Sorteer
                    </label>
                    <slot name="sorter"></slot>
                  </div>
                  <div is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                    <slot name="content">${content}</slot>
                    <slot name="no-content" hidden>Er werden geen resultaten gevonden</slot>
                  </div>
                </div>
              </div>
              <div id="pager" is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                <slot name="pager"></slot>
              </div>
            </div>
          </div>
        `);
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.__processSearchFilter();
        this.__processSorter();
        this.__processContent();

        this.__observePager();
        this.__observeFilterButtons();
        this._observer = this.__observeSearchFilter(() => this.__processSearchFilter());

        this.__updateNumberOfSearchResults(null);
    }

    disconnectedCallback(): void {
        this._observer.disconnect();
    }

    /**
     * Stelt in welke data de tabel moet tonen.
     * @param {Object[]} object - Een Array van objecten die de data voorstellen.
     */
    set data(object: RichData) {
        if (this._data !== object) {
            const { paging, sorting, filter } = object;
            this._paging = paging;
            this._sorting = sorting;
            this._filter = filter;
            this._data = object;
            this.__processContent();
        }
    }

    /**
     * Geeft de data terug die in de tabel wordt getoond.
     * @return {Object[]}
     */
    get data() {
        return this._data || <any>{ data: [] };
    }

    get __contentColumn(): HTMLElement {
        return this.shadowRoot.querySelector('#content');
    }

    get __searchFilter(): (VlSearchFilterElement & HTMLElement) | VlSearchFilterComponent {
        return this.querySelector('[slot="filter"]');
    }

    get __filterSlotContainer(): HTMLElement {
        return this.shadowRoot.querySelector('#filter-slot-container');
    }

    get __filterSlot(): HTMLElement {
        return this.shadowRoot.querySelector('#filter-slot');
    }

    get __filterOpenContainer(): HTMLElement {
        return this.shadowRoot.querySelector('#open-filter');
    }

    get __filterOpenButton(): HTMLElement {
        return this.shadowRoot.querySelector('#open-filter-button');
    }

    get __filterToggleContainer(): HTMLElement {
        return this.shadowRoot.querySelector('#toggle-filter');
    }

    get __filterToggleButton(): HTMLElement {
        return this.shadowRoot.querySelector('#toggle-filter-button');
    }

    get __filterToggleButtonTextSlot(): HTMLElement {
        return this.shadowRoot.querySelector('slot[name="toggle-filter-button-text"]');
    }

    get __filterCloseButtonTextSlot(): HTMLElement {
        return this.shadowRoot.querySelector('slot[name="close-filter-button-text"]');
    }

    get __searchResults(): HTMLElement {
        return this.shadowRoot.querySelector('#search-results');
    }

    get __numberOfSearchResults(): HTMLElement | null {
        return this.__searchResults ? this.__searchResults.querySelector('#search-results-number') : null;
    }

    get __sorterContainer(): HTMLElement {
        return this.shadowRoot.querySelector('#sorter');
    }

    get __sorter(): HTMLSlotElement {
        return this.querySelector('[slot="sorter"]');
    }

    get __pager(): VlPagerComponent {
        return this.querySelector('[slot="pager"]');
    }

    get __searchColumn(): HTMLElement {
        return this.shadowRoot.querySelector('#search');
    }

    get __searchFilterForm(): HTMLFormElement | null {
        return this.__searchFilter
            ? this.__searchFilter.querySelector('form')
            : (<VlSearchFilterComponent>this.__searchFilter).form;
    }

    get __contentSlot(): HTMLSlotElement {
        return this.shadowRoot.querySelector('slot[name="content"]');
    }

    get __noContentSlot(): HTMLSlotElement {
        return this.shadowRoot.querySelector('slot[name="no-content"]');
    }

    get __formDataState(): FormData | undefined {
        if (this.__searchFilter && this.__searchFilter.formData) {
            const hasFilterValue = [...this.__searchFilter.formData.values()].find(Boolean);
            return hasFilterValue ? this.__searchFilter.formData : undefined;
        } else {
            return undefined;
        }
    }

    get _hasResults(): boolean {
        return Boolean(this._paging && this._paging.totalItems > 0);
    }

    get _paging(): Pagination | void {
        if (this.__pager) {
            return {
                currentPage: this.__pager.currentPage,
                totalPages: this.__pager.totalPages,
                itemsPerPage: this.__pager.itemsPerPage,
                totalItems: this.__pager.totalItems,
            };
        }
    }

    set _paging(paging: Pagination | void) {
        if (paging) {
            if (paging.currentPage != null) {
                this.__pager.setAttribute('data-vl-current-page', paging.currentPage);
            }
            if (paging.itemsPerPage != null) {
                this.__pager.setAttribute('data-vl-items-per-page', paging.itemsPerPage);
            }
            if (paging.totalItems != null) {
                this.__pager.setAttribute('data-vl-total-items', paging.totalItems);
                this.__updateNumberOfSearchResults(paging.totalItems);
            }
        }
    }

    set _filter(filter: any) {
        if (filter && this.__searchFilter) {
            const form = this.__searchFilter.querySelector('form') || this.__searchFilter.form;
            if (form) {
                filter.forEach((entry: { value: string; name: number }) => {
                    const formElements = form.elements;
                    // should be > formElements.namedItem(entry.name)
                    const formElement = formElements[entry.name];
                    if (formElement) {
                        (formElement as HTMLFormElement).value = entry.value;
                    }
                });
            }
        }
    }

    __onStateChange(event: Event, { paging = false } = {}) {
        event.stopPropagation();
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: this.__getState({ paging }),
                bubbles: true,
            })
        );
    }

    __getState({ paging }: { paging: boolean }): {
        formData: FormData | undefined;
        paging: Pagination | void;
    } {
        const state: {
            formData: FormData | undefined;
            paging: Pagination | void;
        } = {
            formData: this.__formDataState,
            paging: this._paging,
        };
        if (!paging && state.paging) {
            state.paging.currentPage = 1;
        }
        return state;
    }

    _filterClosableChangedCallback(oldValue: any, newValue: any) {
        this.__filterToggleContainer.hidden = newValue == null;
        this.__filterOpenContainer.hidden = newValue == null;
        if (newValue == null) {
            this.__filterOpenContainer.classList.remove('vl-u-visible--s');
            this.__searchColumn.classList.remove('vl-u-hidden--s');
        } else {
            this.__filterOpenContainer.classList.add('vl-u-visible--s');
            this.__searchColumn.classList.add('vl-u-hidden--s');
        }
    }

    _filterClosedChangedCallback(oldValue: any, newValue: any) {
        if (newValue == null) {
            this.__showSearchColumn();
        } else {
            this.__hideSearchColumn();
        }
        this.__handleSearchFilterClosing();
    }

    __observeFilterButtons() {
        this.__filterToggleButton.addEventListener('click', () => {
            this.__filterSlotContainer.appendChild(this.__filterSlot);
            this.__searchFilter.hidden = false;
            this.__showHiddenInModalElements();
            this.toggleAttribute('data-vl-filter-closed');
        });
        this.__filterOpenButton.addEventListener('click', () => {
            this.setAttribute('data-vl-filter-closed', '');
            this._element.appendChild(this.__filterSlot);
            this.__hideHiddenInModalElements();
            if (!(this.__searchFilter instanceof VlSearchFilterComponent)) {
                this.__searchFilter.setAttribute('data-vl-mobile-modal', '');
            } else {
                this.__searchFilter.removeAttribute('hidden');
            }
        });
    }

    __showHiddenInModalElements() {
        this.__setHiddenInModalElements(false);
    }

    __hideHiddenInModalElements() {
        this.__setHiddenInModalElements(true);
    }

    __setHiddenInModalElements(hidden: any) {
        this.__searchFilter
            .querySelectorAll('[data-vl-hidden-in-modal]')
            .forEach((element: any) => (element.hidden = hidden));
    }

    __observePager(): void {
        if (this.__pager) {
            this.__pager.setAttribute('data-vl-align-right', String(true));
            this.__pager.addEventListener('change', (e: any) => {
                this.__onStateChange(e, { paging: true });
                if (this.__contentSlot.assignedNodes()[0]) {
                    const firstAssignedNode: any = this.__contentSlot.assignedNodes()[0];
                    // const firstAssignedNode = this.__contentSlot.assignedNodes()[0];
                    // should be childNodes (on Node) but children here? TODO debug
                    firstAssignedNode.children[0]?.querySelector('a')?.focus();
                }
            });
        }
    }

    __observeSearchFilter(callback: () => void): MutationObserver {
        const observer = new MutationObserver((mutations) => {
            mutations = mutations.filter((mutation) => mutation.target && (mutation.target as any).slot != 'content');
            if (mutations && mutations.length > 0) {
                callback();
            }
        });
        observer.observe(this as any, { childList: true });
        return observer;
    }

    __processSearchFilter(): void {
        if (this.__searchFilter) {
            if (!(this.__searchFilter instanceof VlSearchFilterComponent)) {
                this.__searchFilter.setAttribute('data-vl-mobile-modal', '');
            } else {
                this.__searchFilter.setAttribute('alt', '');
            }
            if (!this.hasAttribute('data-vl-filter-closed')) {
                this.__showSearchColumn();
            }
            this.__showSearchResults();
            this.__addSearchFilterEventListeners();
            this.__observeMobileModal(() => {
                this.__processScrollableBody();

                this.__handleSearchFilterClosing();
            });
        } else {
            this.__hideSearchColumn();
            this.__hideSearchResults();
        }
    }

    __handleSearchFilterClosing(): void {
        if (this.__searchFilter instanceof VlSearchFilterComponent) {
            if (this.hasAttribute('data-vl-filter-closed')) {
                this.__searchFilter.setAttribute('hidden', 'true');
            } else {
                this.__searchFilter.removeAttribute('hidden');
            }
        }
    }

    __processSorter(): void {
        if (this.__sorter) {
            this.__showSorter();
        } else {
            this.__hideSorter();
        }
    }

    __processContent(): void {
        if (this._hasResults) {
            this.__contentSlot.hidden = false;
            this.__noContentSlot.hidden = true;
        } else {
            this.__contentSlot.hidden = true;
            this.__noContentSlot.hidden = false;
        }
    }

    __hideSearchColumn(): void {
        this.__searchColumn.hidden = true;
        this.__setGridColumnWidth(0);
        this.__filterToggleButton.setAttribute('aria-label', 'Filter tonen');
        this.__filterToggleButtonTextSlot.hidden = false;
        this.__filterCloseButtonTextSlot.hidden = true;
    }

    __hideSearchResults(): void {
        this.__searchResults.hidden = true;
    }

    __hideSorter(): void {
        this.__sorterContainer.hidden = true;
    }

    __showSearchColumn(): void {
        this.__searchColumn.hidden = false;
        this.__setGridColumnWidth(VlRichData._defaultSearchColumnSize);
        this.__filterToggleButton.setAttribute('aria-label', 'Filter verbergen');
        this.__filterToggleButtonTextSlot.hidden = true;
        this.__filterCloseButtonTextSlot.hidden = false;
    }

    __showSearchResults() {
        this.__searchResults.hidden = false;
    }

    __showSorter() {
        this.__sorterContainer.hidden = false;
    }

    __setGridColumnWidth(width: number) {
        ['size', 'medium-size'].forEach((size) => {
            this.__searchColumn.setAttribute(`data-vl-${size}`, String(width));
            this.__contentColumn.setAttribute(`data-vl-${size}`, String(12 - width));
        });
    }

    __updateNumberOfSearchResults(number: number | null) {
        if (number) {
            if (this.__numberOfSearchResults) this.__numberOfSearchResults.textContent = String(number);
        } else {
            if (this.__pager) {
                customElements.whenDefined('vl-pager').then(() => {
                    if (this.__numberOfSearchResults)
                        this.__numberOfSearchResults.textContent = String(this.__pager.totalItems || 0);
                });
            }
        }
    }

    private stopPropagationPreventDefault = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    __addSearchFilterEventListeners() {
        if (!(this.__searchFilter instanceof VlSearchFilterComponent)) {
            this.__searchFilter.addEventListener('change', this.stopPropagationPreventDefault);
            this.__searchFilter.addEventListener('input', this.__onFilterFieldChanged);
        } else {
            this.__searchFilter.addEventListener('vl-change', this.stopPropagationPreventDefault);
            this.__searchFilter.addEventListener('vl-input', this.__onFilterFieldChanged);
        }

        if (this.__searchFilterForm) {
            this.__searchFilterForm.addEventListener('reset', (e: any) => {
                setTimeout(() => {
                    this.__onFilterFieldChanged(e);
                });
            });
        }
    }

    __onFilterFieldChanged = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        this.__onStateChange(event);
    };

    __observeMobileModal(callback: any) {
        const observer = new MutationObserver(callback);
        if (!(this.__searchFilter instanceof VlSearchFilterComponent)) {
            observer.observe(this.__searchFilter, { attributeFilter: ['data-vl-mobile-modal'] });
        } else {
            observer.observe(this.__searchFilter, { attributeFilter: ['mobile-modal'] });
        }
        return observer;
    }

    __processScrollableBody() {
        if (
            this.__searchFilter.hasAttribute('data-vl-mobile-modal') ||
            this.__searchFilter.hasAttribute('mobile-modal')
        ) {
            this.__disableBodyScroll();
        } else {
            this.__enableBodyScroll();
        }
    }

    __disableBodyScroll() {
        document.body.style.overflow = 'hidden';
    }

    __enableBodyScroll() {
        document.body.style.overflow = 'auto';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-rich-data': VlRichData;
    }
}
