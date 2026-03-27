import {
    BaseHTMLElement,
    findElementsThroughShadowRoot,
    formatNumber,
    registerWebComponents,
    webComponent,
} from '@domg-wc/common';
import { vlAccessibilityStyles, vlGridStyles, vlLegacyStyles, vlMediaScreenSmall } from '@domg-wc/styles';
import { VlButtonComponent } from '../../atom/button';
import { vlIconStyles } from '../../atom/icon-style/vl-icon-style.css';
import { VlFormLabelComponent } from '../../form/form-label';
import { Pagination, VlPagerComponent } from '../pager';
import { VlSearchFilterComponent } from '../search-filter';
import { vlRichDataFluxStyles } from './vl-rich-data.flux-css';

export interface RichDataMeta {
    sorting?: any;
    filter?: any;
    paging?: Pagination;
}

export type RichData<T = unknown> = { data: T[] } & RichDataMeta;

const resultsTextMultiple = 'We vonden <strong>[x] resultaten</strong>';
const resultsTextSingle = 'We vonden <strong>1 resultaat</strong>';
const resultsTextNone = 'We vonden <strong>geen resultaten</strong>';

@webComponent('vl-rich-data')
export class VlRichData extends BaseHTMLElement {
    protected _sorting: any;

    static {
        registerWebComponents([VlFormLabelComponent, VlPagerComponent, VlButtonComponent]);
    }

    constructor(content = '') {
        const html = `
            <div class="vl-rich-data">
                <div id="toggle-filter" class="vl-u-align-right vl-u-hidden--s" hidden>
                    <vl-button id="toggle-filter-button" icon="content-filter" secondary
                     narrow label="Filteren" aria-controls="filter-slot-container" aria-expanded="true">
                        <slot name="toggle-filter-button-text" hidden>Filter tonen</slot>
                        <slot name="close-filter-button-text">Filter verbergen</slot>
                    </vl-button>
                </div>
                <div id="open-filter" class="vl-u-align-right">
                    <vl-button id="open-toggle-filter-button" icon="content-filter"
                     secondary narrow label="Filteren" aria-controls="filter-slot-container" aria-expanded="false">
                        <slot name="toggle-filter-button-text">Filter</slot>
                    </vl-button>
                </div>
                <div id="search" tabindex="-1" aria-label="Filteren en zoeken">
                    <div id="filter-slot-container">
                        <slot id="filter-slot" name="filter"></slot>
                    </div>
                </div>
                <div id="content">
                    <div class="vl-grid vl-stacked-small">
                        <div id="search-results" class="vl-column vl-column--6 vl-column--m-6 vl-column--s-6 vl-column--xs-6"></div>
                        <div aria-live="polite" class="vl-visually-hidden" id="sr-search-results"></div>
                        <div id="sorter" class="vl-column vl-column--6 vl-column--m-6 vl-column--s-6 vl-column--xs-6">
                            <vl-form-label>
                                Sorteer
                            </vl-form-label>
                            <slot name="sorter"></slot>
                        </div>
                        <div class="vl-column vl-column--12 vl-column--m-12">
                            <slot name="content">${content}</slot>
                            <slot name="no-content" hidden>Er werden geen resultaten gevonden</slot>
                        </div>
                    </div>
                </div>
                <div id="pager">
                    <slot name="pager"></slot>
                </div>
            </div>
        `;
        const styleSheets = [
            ...vlLegacyStyles.map((style) => style.styleSheet!),
            vlRichDataFluxStyles.styleSheet!,
            vlIconStyles.styleSheet!,
            vlGridStyles.styleSheet!,
            vlAccessibilityStyles.styleSheet!,
        ];
        super(html, styleSheets);

        this.setFilterMaxWidthCssProperty();
    }

    static get _observedAttributes(): string[] {
        return [
            'data',
            'collapsed-m',
            'collapsed-s',
            'collapsed-xs',
            'filter-closable',
            'filter-closed',
            'filter-max-width',
        ];
    }

    protected setFilterMaxWidthCssProperty() {
        /* Standaard waarde voor linker kolom max-width: 4/12 van pagina max-width */
        this.style.setProperty(
            '--vl-rich-data-filter-max-width',
            this.getAttribute('filter-max-width') || 'calc(var(--vl-page--max-width-wide) / 3)'
        );
    }

    _filterMaxWidthChangedCallback() {
        this.setFilterMaxWidthCssProperty();
    }

    protected _data: RichData | undefined;

    /**
     * Geeft de data terug die in de tabel wordt getoond.
     * @return {Object[]}
     */
    get data() {
        return this._data || <any>{ data: [] };
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

    get __contentColumn() {
        return this.shadowRoot?.querySelector<HTMLElement>('#content');
    }

    get __searchFilter(): (VlSearchFilterComponent & HTMLElement) | undefined | null {
        return this.querySelector<VlSearchFilterComponent & HTMLElement>('[slot="filter"]');
    }

    get __filterSlotContainer() {
        return this.shadowRoot?.querySelector<HTMLElement>('#filter-slot-container');
    }

    get __filterSlot() {
        return this.shadowRoot?.querySelector<HTMLElement>('#filter-slot');
    }

    get __filterOpenContainer() {
        return this.shadowRoot?.querySelector<HTMLElement>('#open-filter');
    }

    get __filterOpenButton() {
        return this.shadowRoot?.querySelector<HTMLElement>('#open-toggle-filter-button');
    }

    get __filterToggleContainer() {
        return this.shadowRoot?.querySelector<HTMLElement>('#toggle-filter');
    }

    get __filterToggleButton() {
        return this.shadowRoot?.querySelector<HTMLElement>('#toggle-filter-button');
    }

    get __filterToggleButtonTextSlot() {
        return this.shadowRoot?.querySelector<HTMLElement>('slot[name="toggle-filter-button-text"]');
    }

    get __filterCloseButtonTextSlot() {
        return this.shadowRoot?.querySelector<HTMLElement>('slot[name="close-filter-button-text"]');
    }

    get __searchResults() {
        return this.shadowRoot?.querySelector<HTMLElement>('#search-results');
    }

    get __screenReaderSearchResults(): HTMLElement | null | undefined {
        return this.shadowRoot?.querySelector<HTMLElement>('#sr-search-results');
    }

    get __sorterContainer() {
        return this.shadowRoot?.querySelector<HTMLElement>('#sorter');
    }

    get __sorter() {
        return this.querySelector<HTMLElement>('[slot="sorter"]');
    }

    get __pager() {
        return this.querySelector<VlPagerComponent>('[slot="pager"]');
    }

    get __searchColumn() {
        return this.shadowRoot?.querySelector<HTMLElement>('#search');
    }

    get __searchFilterForm(): HTMLFormElement | null {
        return this.__searchFilter ? this.__searchFilter.querySelector('form') : this.__searchFilter!.form;
    }

    get __contentSlot() {
        return this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="content"]');
    }

    get __noContentSlot() {
        return this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="no-content"]');
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
                this.__pager?.setAttribute('current-page', String(paging.currentPage));
            }
            if (paging.itemsPerPage != null) {
                this.__pager?.setAttribute('items-per-page', String(paging.itemsPerPage));
            }
            if (paging.totalItems != null) {
                this.__pager?.setAttribute('total-items', String(paging.totalItems));
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

    onResize = () => {
        if (window.innerWidth > vlMediaScreenSmall) {
            // In case the search filter was moved for the mobile view, put it back for desktop
            // TODO: in a future version avoid moving the html around
            if (
                !!this.__filterSlotContainer &&
                !!this.__filterSlot &&
                !this.__filterSlotContainer.contains(this.__filterSlot)
            ) {
                this.__filterSlotContainer.appendChild(this.__filterSlot);
            }

            if (!this.hasAttribute('filter-closable')) {
                this.removeAttribute('filter-closed');
            }
        }
    };

    connectedCallback(): void {
        super.connectedCallback();

        this.__processSearchFilter();
        this.__processSorter();
        this.__processContent();

        this.__observePager();
        this.__observeFilterButtons();
        this._observer = this.__observeSearchFilter(() => this.__processSearchFilter());

        this.__updateNumberOfSearchResults(null);

        window.addEventListener('resize', this.onResize);
    }

    disconnectedCallback(): void {
        this._observer?.disconnect();

        window.removeEventListener('resize', this.onResize);
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
        this.__filterToggleContainer!.hidden = newValue == null;
        if (newValue == null) {
            this.__searchColumn?.classList.remove('vl-u-hidden--s');
        } else {
            this.__searchColumn?.classList.add('vl-u-hidden--s');
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

    _onToggleFilter = () => {
        this.__filterSlotContainer!.appendChild(this.__filterSlot!);
        this.__searchFilter!.hidden = false;
        this.__showHiddenInModalElements();
        this.toggleAttribute('filter-closed');
        if (!this.hasAttribute('filter-closed')) {
            if (this.__searchColumn) {
                const selector =
                    'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
                const focusableElements = findElementsThroughShadowRoot(this.__searchColumn, selector) as HTMLElement[];
                const firstFocusableElement = focusableElements?.[0];
                firstFocusableElement?.focus();
            }
        }
    };

    __observeFilterButtons() {
        this.__filterToggleButton?.addEventListener('click', this._onToggleFilter);
        this.__filterOpenButton?.addEventListener('click', () => {
            this.removeAttribute('filter-closed');
            this._element.appendChild(this.__filterSlot);
            this.__hideHiddenInModalElements();
            if (this.__searchFilter instanceof VlSearchFilterComponent) {
                this.__searchFilter.removeAttribute('hidden');
                requestAnimationFrame(() => {
                    if (this.__searchFilterForm) {
                        const selector =
                            'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
                        const focusableElements = findElementsThroughShadowRoot(
                            this.__searchFilterForm,
                            selector
                        ) as HTMLElement[];
                        const firstFocusableElement = focusableElements?.[0];
                        firstFocusableElement?.focus();
                    }
                });
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
        this.__searchFilter?.querySelectorAll('[hidden-in-modal]').forEach((element: any) => (element.hidden = hidden));
    }

    __observePager(): void {
        if (this.__pager) {
            this.__pager.setAttribute('align-right', String(true));
            this.__pager.addEventListener('change', (e: any) => {
                this.__onStateChange(e, { paging: true });
                if (this.__contentSlot?.assignedNodes()[0]) {
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
            this.__searchFilter.setAttribute('alt', '');

            if (!this.hasAttribute('filter-closed')) {
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
            if (this.hasAttribute('filter-closed')) {
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
            this.__contentSlot!.hidden = false;
            this.__noContentSlot!.hidden = true;
        } else {
            this.__contentSlot!.hidden = true;
            this.__noContentSlot!.hidden = false;
        }
    }

    __hideSearchColumn(): void {
        this.__searchColumn!.hidden = true;
        this.__filterToggleButton?.setAttribute('aria-expanded', 'false');
        this.__filterToggleButton?.setAttribute('aria-controls', 'filter-slot-container');
        this.__filterOpenButton?.setAttribute('aria-expanded', 'false');
        this.__filterOpenButton?.setAttribute('aria-controls', 'filter-slot-container');
        this.__filterToggleButtonTextSlot!.hidden = false;
        this.__filterCloseButtonTextSlot!.hidden = true;
        this.__searchColumn!.removeEventListener('keyup', this.__onEscapeFilter);

        if (window.innerWidth > vlMediaScreenSmall) {
            this.__filterToggleButton?.shadowRoot?.querySelector('button')?.focus();
        } else {
            this.__filterOpenButton?.shadowRoot?.querySelector('button')?.focus();
        }
    }

    __hideSearchResults(): void {
        this.__searchResults!.hidden = true;
    }

    __hideSorter(): void {
        this.__sorterContainer!.hidden = true;
    }

    __onEscapeFilter = ({ code }: KeyboardEvent): void => {
        const isClosable = this.hasAttribute('filter-closable');
        const isMobile = this.hasAttribute('mobile-modal') || this.__searchFilter?.hasAttribute('mobile-modal');
        if (code.toLowerCase() === 'escape' && !this.hasAttribute('filter-closed') && (isClosable || isMobile)) {
            this.setAttribute('filter-closed', '');
            this.__hideSearchColumn();
        }
    };

    __showSearchColumn(): void {
        this.__searchColumn!.hidden = false;
        this.__searchColumn!.addEventListener('keyup', this.__onEscapeFilter);
        this.__filterToggleButton?.setAttribute('aria-expanded', 'true');
        this.__filterToggleButton?.setAttribute('aria-controls', 'filter-slot-container');
        this.__filterOpenButton?.setAttribute('aria-expanded', 'true');
        this.__filterOpenButton?.setAttribute('aria-controls', 'filter-slot-container');
        this.__filterToggleButtonTextSlot!.hidden = true;
        this.__filterCloseButtonTextSlot!.hidden = false;
    }

    __showSearchResults() {
        this.__searchResults!.hidden = false;
    }

    __showSorter() {
        this.__sorterContainer!.hidden = false;
    }

    __updateNumberOfSearchResults(number: number | null) {
        if (number) {
            this.__searchResults!.innerHTML =
                number === 1 ? resultsTextSingle : resultsTextMultiple.replace('[x]', formatNumber(number));
        } else if (this.__pager) {
            customElements.whenDefined('vl-pager').then(() => {
                if (this.__pager!.totalItems === 0) {
                    this.__searchResults!.innerHTML = resultsTextNone;
                    return;
                }
                this.__searchResults!.innerHTML =
                    this.__pager!.totalItems === 1
                        ? resultsTextSingle
                        : resultsTextMultiple.replace('[x]', formatNumber(this.__pager!.totalItems));
            });
        } else {
            this.__searchResults!.innerHTML = resultsTextNone;
        }
        // add some timeout to allow the screen reader to finish reading the input value
        setTimeout(() => {
            this.__screenReaderSearchResults!.textContent = this.__searchResults!.textContent;
        }, 500);
    }

    __addSearchFilterEventListeners() {
        this.__searchFilter?.addEventListener('vl-change', this.stopPropagationPreventDefault);
        this.__searchFilter?.addEventListener('vl-input', this.__onFilterFieldChanged);

        if (this.__searchFilterForm) {
            this.__searchFilterForm.addEventListener('reset', (e: any) => {
                setTimeout(() => {
                    this.__onFilterFieldChanged(e);
                });
            });
            this.__searchFilterForm.addEventListener('keyup', this.__onEscapeFilter);
            this.__searchFilterForm.addEventListener('submit', () => {
                if (window.innerWidth <= vlMediaScreenSmall) {
                    requestAnimationFrame(() => {
                        this.__filterOpenButton?.shadowRoot?.querySelector('button')?.focus();
                    });
                }
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
        if (!(this.__searchFilter instanceof VlSearchFilterComponent) && this.__searchFilter) {
            observer.observe(this.__searchFilter, { attributeFilter: ['mobile-modal'] });
        }
        return observer;
    }

    __processScrollableBody() {
        if (this.__searchFilter?.hasAttribute('mobile-modal')) {
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

    private stopPropagationPreventDefault = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-rich-data': VlRichData;
    }
}
