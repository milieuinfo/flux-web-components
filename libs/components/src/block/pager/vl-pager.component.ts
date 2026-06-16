import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { vlIconStyles, vlLinkStyles } from '@domg-wc/components/atom';
import { vlAccessibilityStyles, vlResetStyles } from '@domg-wc/styles';
import { vlPagerFluxStyles } from './vl-pager.flux-css';

/**
 * Pager changed event
 * @event VlPager#change
 * @property {number} currentPage - Huidige pagina.
 * @property {number} totalPage - Totaal aantal paginas.
 * @property {number} itemsPerPage - Items per pagina.
 * @property {number} totalItems - Totaal aantal items.
 */
export interface Pagination {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
}

@webComponent('vl-pager')
export class VlPagerComponent extends BaseHTMLElement implements Pagination {
    constructor() {
        const html = `
          <div class="vl-pager">
            <div id="bounds"></div>
            <div class="vl-pager__list">
                <a id="page-back-link" class="vl-pager__control vl-link bold" href="#" tabindex="0">
                    <vl-icon icon="arrow-left-fat"></vl-icon>
                    <span class="vl-pager__control-label">Vorige</span> <span id="previous-items-per-page" class="vl-visually-hidden"></span>
                </a>
                <ul id="pager-list"></ul>
                <a id="page-forward-link" class="vl-pager__control vl-link bold" href="#" tabindex="0">
                    <span class="vl-pager__control-label">Volgende</span> <span id="next-items-per-page" class="vl-visually-hidden"></span>
                    <vl-icon icon="arrow-right-fat"></vl-icon>
                </a>
            </div>
            <span class="vl-visually-hidden" aria-live="polite" id="sr-current-page"></span>
          </div>
        `;
        const styleSheets = [
            vlResetStyles.styleSheet!,
            vlAccessibilityStyles.styleSheet!,
            vlIconStyles.styleSheet!,
            vlLinkStyles('a').styleSheet!,
            vlPagerFluxStyles.styleSheet!,
        ];
        super(html, styleSheets);

        this.__addPageBackLinkListener();
        this.__addPageForwardLinkListener();
    }

    static get _observedAttributes() {
        return ['total-items', 'items-per-page', 'current-page', 'pagination-disabled'];
    }

    static get _observedChildClassAttributes() {
        return ['align-center', 'align-right'];
    }

    get _classPrefix() {
        return 'vl-pager--';
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    get totalItems() {
        return parseInt(this.getAttribute('total-items') || '0');
    }

    get currentPage() {
        return this._clampPage(parseInt(this.getAttribute('current-page') ?? '0'));
    }

    private _clampPage(page: number): number {
        if (page < 1) {
            return 1;
        }
        return page <= this.totalPages ? page : this.totalPages;
    }

    get itemsPerPage() {
        return parseInt(this.getAttribute('items-per-page') ?? '0');
    }

    get _firstItemNumberOfPage() {
        if (!this.totalItems) {
            return 0;
        } else {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        }
    }

    get _lastItemNumberOfPage() {
        const lastItemNumber = this._firstItemNumberOfPage + this.itemsPerPage - 1;
        return lastItemNumber > this.totalItems ? this.totalItems : lastItemNumber;
    }

    get _isPagination() {
        return this.getAttribute('pagination-disabled') == undefined;
    }

    get _boundsElement() {
        return this._shadow?.querySelector('#bounds');
    }

    get _pagesListElement() {
        return this._shadow?.querySelector('#pager-list');
    }

    get _pageElements() {
        return [...this._pagesListElement!.querySelectorAll('[data-pager-page]')];
    }

    get _pageSkippedElements() {
        return [...this._pagesListElement!.querySelectorAll('[data-pager-page-skipped]')];
    }

    get _pageBackLink() {
        return this._shadow?.querySelector<HTMLElement>('#page-back-link');
    }

    get _pageForwardLink() {
        return this._shadow?.querySelector<HTMLElement>('#page-forward-link');
    }

    get _totalItemsElement() {
        return this._shadow?.querySelector('#totalItems');
    }

    get _itemsPerPageElementen() {
        const previous = this._shadow?.querySelector('#previous-items-per-page');
        const next = this._shadow?.querySelector('#next-items-per-page');
        return [previous, next];
    }

    _shouldCheckFocus = false;

    _getBoundsTemplate() {
        return `
      <span class="vl-visually-hidden">Rij</span>
      <strong>${this._firstItemNumberOfPage}-${this._lastItemNumberOfPage}</strong> van ${this.totalItems}
    `;
    }

    _getPageTemplate(number: any) {
        if (this._isPagination) {
            if (number === this.currentPage) {
                return this.__getActivePageTemplate(number);
            } else if (number === 'skipped') {
                return this.__getSkippedPageTemplate();
            } else {
                return this.__getPageTemplate(number);
            }
        } else {
            return ``;
        }
    }

    __getActivePageTemplate(number: string) {
        return this._template(`
      <li data-pager-page=${number} class="vl-pager__element vl-pager__element--active" aria-current="page" tabindex="-1">
        <span class="vl-pager__element-cta">${number}</span>
      </li>
    `);
    }

    __getSkippedPageTemplate() {
        return this._template(`
      <li data-pager-page-skipped class="vl-pager__element">
        <div class="vl-pager__element-cta">...</div>
      </li>
    `);
    }

    _announceActiveItem() {
        this._shadow!.querySelector<HTMLElement>('#sr-current-page')!.innerText = `Pagina ${this.currentPage}`;
    }

    _focusActiveItem() {
        // A small timeout is needed for screen readers (tested with VoiceOver)
        setTimeout(() => {
            this._shadow?.querySelector<HTMLElement>('.vl-pager__element--active')?.focus();
            this._announceActiveItem();
        }, 100);
    }

    __getPageTemplate(number: string) {
        const template = this._template(`
      <li data-pager-page=${number} class="vl-pager__element">
        <a href="#" class="vl-pager__element-cta vl-link bold">${number}</a>
      </li>
    `);
        template?.firstElementChild?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.setAttribute('current-page', number);
            this._focusActiveItem();
        });
        return template;
    }

    _getItemsPerPageContentTemplate() {
        return `${this.itemsPerPage} rijen`;
    }

    _itemsPerPageChangedCallback() {
        this._update();
    }

    _totalItemsChangedCallback() {
        if (this.totalItems === 0) {
            this._hide(this._element);
        } else {
            this._show(this._element);
            this._update();
        }
    }

    _currentPageChangedCallback(oldValue: string, newValue: string) {
        this._update();
        if (!oldValue) {
            return;
        }
        // Vergelijk de effectieve pagina's: een attribuut wijziging naar bv. "1" terwijl de effectieve pagina
        // al 1 was (door gekrompen total-items) mag geen event vuren. Het gedrag onafhankelijk van de volgorde
        // waarin de consumer de attributen zet.
        if (this.__previousPageBeforeChange == null) {
            this.__previousPageBeforeChange = parseInt(oldValue);
            queueMicrotask(() => {
                const previousPage = this._clampPage(this.__previousPageBeforeChange!);
                this.__previousPageBeforeChange = undefined;
                const currentPage = this.currentPage;
                if (currentPage !== previousPage) {
                    const event = {
                        detail: {
                            currentPage,
                            totalPage: this.totalPages,
                            itemsPerPage: this.itemsPerPage,
                            totalItems: this.totalItems,
                        },
                        bubbles: true,
                    };
                    this.dispatchEvent(new CustomEvent('change', event));
                }
            });
        }
    }

    private __previousPageBeforeChange?: number;

    _paginationDisabledChangedCallback(oldValue: string, newValue: string) {
        if (newValue !== null) {
            this.__removePageElements();
        } else {
            this._updatePagination();
        }
    }

    _hide(element: any) {
        element.hidden = true;
    }

    _show(element: any) {
        element.hidden = false;
    }

    _update() {
        this._updateInfoElement();
        this._updatePagination();
        this._updateListItems();
    }

    _updateInfoElement() {
        this._boundsElement!.innerHTML = this._getBoundsTemplate();
        this._itemsPerPageElementen.forEach((span) => {
            span!.innerHTML = this._getItemsPerPageContentTemplate();
        });
    }

    _updatePagination() {
        if (this._isPagination) {
            this.__removePageElements();
            if (this.totalPages > 1) {
                const pages = this.__generatePagination(this.currentPage, this.totalPages);
                const templates = pages.map((number) => this._getPageTemplate(number));
                templates.forEach((template) => this._pagesListElement?.append(<Node>template));
            }
        }
    }

    _updateListItems() {
        if (this.currentPage <= 1) {
            this._hide(this._pageBackLink);
            if (this._shouldCheckFocus) this._focusActiveItem();
        } else {
            this._show(this._pageBackLink);
        }

        if (this.currentPage >= this.totalPages) {
            this._hide(this._pageForwardLink);
            if (this._shouldCheckFocus) this._focusActiveItem();
        } else {
            this._show(this._pageForwardLink);
        }
    }

    __generatePagination(currentPage: number, pageCount: number) {
        const delta = 2;
        const range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            range.unshift('skipped');
        }
        if (currentPage + delta < pageCount - 1) {
            range.push('skipped');
        }
        range.unshift(1);
        range.push(pageCount);
        return range;
    }

    __addPageBackLinkListener() {
        this._pageBackLink?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (!(this.currentPage - 1 <= 0)) {
                this._shouldCheckFocus = true;
                this.setAttribute('current-page', String(this.currentPage - 1));
                this._announceActiveItem();
                setTimeout(() => {
                    this._pageBackLink?.focus();
                }, 100);
                this._shouldCheckFocus = false;
            }
        });
    }

    __addPageForwardLinkListener() {
        this._pageForwardLink?.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (!(this.currentPage + 1 > this.totalPages)) {
                this._shouldCheckFocus = true;
                this.setAttribute('current-page', String(this.currentPage + 1));
                this._announceActiveItem();
                setTimeout(() => {
                    this._pageForwardLink?.focus();
                }, 100);
                this._shouldCheckFocus = false;
            }
        });
    }

    __removePageElements() {
        this._pageElements.forEach((page) => page.remove());
        this._pageSkippedElements.forEach((element) => element.remove());
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-pager': VlPagerComponent;
    }
}
