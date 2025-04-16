import { BaseElementOfType, webComponent } from '@domg-wc/common';
import { iconStyle, linkStyle, pagerStyle } from '@domg/govflanders-style/component';
import { accessibilityStyle, resetStyle } from '@domg/govflanders-style/common';
import pagerUigStyle from './vl-pager.uig-css';

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
export class VlPagerComponent extends BaseElementOfType(HTMLElement) implements Pagination {
    static get _observedAttributes() {
        return ['total-items', 'items-per-page', 'current-page', 'pagination-disabled'];
    }

    static get _observedChildClassAttributes() {
        return ['align-center', 'align-right'];
    }

    constructor() {
        super();
        this.shadow(`
          <style>
            ${resetStyle}
            ${pagerStyle}
            ${pagerUigStyle}
            ${iconStyle}
            ${linkStyle}
            ${accessibilityStyle}
          </style>
          <div class="vl-pager">
            <ul id="pager-list" class="vl-pager__list">
              <li id="bounds" class="vl-pager__element"></li>
              <li id="page-back-list-item" class="vl-pager__element">
                <a id="page-back-link" class="vl-pager__element__cta vl-link vl-link--bold" href="#" tabindex="0">
                  <i class="vl-link__icon vl-link__icon--before vl-vi vl-vi-arrow-left-fat" aria-hidden="true"></i>
                  Vorige <span id="previous-items-per-page" class="vl-u-visually-hidden"></span>
                </a>
              </li>
              <li id="page-forward-list-item" class="vl-pager__element">
                <a id="page-forward-link" class="vl-pager__element__cta vl-link vl-link--bold" href="#" tabindex="0">
                  Volgende <span id="next-items-per-page" class="vl-u-visually-hidden"></span>
                  <i class="vl-link__icon vl-link__icon--after vl-vi vl-vi-arrow-right-fat" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        `);

        this.__addPageBackLinkListener();
        this.__addPageForwardLinkListener();
    }

    get _classPrefix() {
        return 'vl-pager--';
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    get totalItems() {
        return parseInt(this.getAttribute('total-items'));
    }

    get currentPage() {
        const currentPage = parseInt(this.getAttribute('current-page'));
        if (currentPage < 1) {
            return 1;
        } else {
            return currentPage <= this.totalPages ? currentPage : this.totalPages;
        }
    }

    get itemsPerPage() {
        return parseInt(this.getAttribute('items-per-page'));
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
        return this._shadow.querySelector('#bounds');
    }

    get _pagesListElement() {
        return this._shadow.querySelector('.vl-pager__list');
    }

    get _pageElements() {
        return [...this._pagesListElement.querySelectorAll('[data-vl-pager-page]')];
    }

    get _pageSkippedElements() {
        return [...this._pagesListElement.querySelectorAll('[data-vl-pager-page-skipped]')];
    }

    get _pageBackLink() {
        return this._shadow.querySelector('#page-back-link');
    }

    get _pageForwardLink() {
        return this._shadow.querySelector('#page-forward-link');
    }

    get _pageBackListItem() {
        return this._shadow.querySelector('#page-back-list-item');
    }

    get _pageForwardListItem() {
        return this._shadow.querySelector('#page-forward-list-item');
    }

    get _totalItemsElement() {
        return this._shadow.querySelector('#totalItems');
    }

    get _itemsPerPageElementen() {
        const previous = this._shadow.querySelector('#previous-items-per-page');
        const next = this._shadow.querySelector('#next-items-per-page');
        return [previous, next];
    }

    _getBoundsTemplate() {
        return `
      <span class="vl-u-visually-hidden">Rij</span>
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
      <li data-vl-pager-page=${number} class="vl-pager__element">
        <label>${number}</label>
      </li>
    `);
    }

    __getSkippedPageTemplate() {
        return this._template(`
      <li data-vl-pager-page-skipped class="vl-pager__element">
        <div class="vl-pager__element__cta">...</div>
      </li>
    `);
    }

    __getPageTemplate(number: string) {
        const template = this._template(`
      <li data-vl-pager-page=${number} class="vl-pager__element">
        <a href="#" class="vl-pager__element__cta vl-link vl-link--bold">${number}</a>
      </li>
    `);
        template.firstElementChild.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.setAttribute('data-vl-current-page', number);
        });
        return template;
    }

    _getItemsPerPageContentTemplate() {
        return `${this.itemsPerPage} rijen`;
    }

    _itemsPerPageChangedCallback(oldValue: string, newValue: string) {
        this._update();
    }

    _totalItemsChangedCallback(oldValue: string, newValue: string) {
        if (this.totalItems === 0) {
            this._hide(this._element);
        } else {
            this._show(this._element);
            this._update();
        }
    }

    _currentPageChangedCallback(oldValue: string, newValue: string) {
        this._update();
        if (oldValue && newValue != oldValue) {
            const event = {
                detail: {
                    currentPage: Number(newValue),
                    totalPage: this.totalPages,
                    itemsPerPage: this.itemsPerPage,
                    totalItems: this.totalItems,
                },
                bubbles: true,
            };
            this.dispatchEvent(new CustomEvent('change', event));
        }
    }

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
        this._boundsElement.innerHTML = this._getBoundsTemplate();
        this._itemsPerPageElementen.forEach((span) => {
            span.innerHTML = this._getItemsPerPageContentTemplate();
        });
    }

    _updatePagination() {
        if (this._isPagination) {
            this.__removePageElements();
            if (this.totalPages > 1) {
                const pages = this.__generatePagination(this.currentPage, this.totalPages);
                const templates = pages.map((number) => this._getPageTemplate(number));
                templates.forEach((template) =>
                    this._pagesListElement.insertBefore(template, this._pageForwardListItem)
                );
            }
        }
    }

    _updateListItems() {
        this.currentPage <= 1 ? this._hide(this._pageBackListItem) : this._show(this._pageBackListItem);
        this.currentPage >= this.totalPages
            ? this._hide(this._pageForwardListItem)
            : this._show(this._pageForwardListItem);
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
        this._pageBackLink.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (!(this.currentPage - 1 <= 0)) {
                this.setAttribute('data-vl-current-page', this.currentPage - 1);
            }
        });
    }

    __addPageForwardLinkListener() {
        this._pageForwardLink.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (!(this.currentPage + 1 > this.totalPages)) {
                this.setAttribute('data-vl-current-page', this.currentPage + 1);
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
