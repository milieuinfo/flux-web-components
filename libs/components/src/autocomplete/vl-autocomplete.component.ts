import { BaseLitElement } from '@domg-wc/common-utilities';
import { vlIconStyles } from '@domg-wc/common-utilities/css';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { autocompleteStyle, inputFieldStyle } from '@domg/govflanders-style/component';
import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import 'reflect-metadata';
import { DEFAULT_CAPTION_FORMAT, DEFAULT_MAX_MATCHES, DEFAULT_MIN_CHARS } from './vl-autocomplete.defaults';
import { CAPTION_FORMAT } from './vl-autocomplete.model';
import autocompleteUigStyle from './vl-autocomplete.uig-css';

@customElement('vl-autocomplete')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class VlAutocomplete extends BaseLitElement {
    static get styles() {
        return [resetStyle, baseStyle, autocompleteStyle, inputFieldStyle, autocompleteUigStyle, vlIconStyles];
    }

    static get properties() {
        return {
            minChars: {
                type: Number,
                attribute: 'data-vl-min-chars',
                reflect: true,
            },
            items: Array,
            loading: { type: Boolean, reflect: true },
            opened: { type: Boolean, reflect: true },
            firstValidItemIndex: { type: Number, reflect: true },
            maxSuggestions: {
                type: Number,
                attribute: 'data-vl-max-suggestions',
            },
            groupBy: {
                type: String,
                attribute: 'data-vl-group-by',
            },
            captionFormat: {
                type: String,
                attribute: 'data-vl-caption-format',
            },
            placeholder: {
                type: String,
                attribute: 'placeholder',
            },
            initialValue: { type: String, attribute: 'data-vl-initial-value', reflect: true },
            showClear: { type: Boolean, attribute: 'data-vl-show-clear', reflect: true },
            label: { type: String, attribute: 'data-vl-label', reflect: true },
            noMatchesText: { type: String, attribute: 'data-vl-no-matches-text', reflect: true },
            labelSmall: { type: Boolean, attribute: 'data-vl-label-small', reflect: true },
            clearTooltip: { type: String, attribute: 'data-vl-clear-tooltip', reflect: true },
            disableLoading: { type: Boolean, attribute: 'data-vl-disable-loading', reflect: true },
        };
    }

    private initialised: boolean;
    private initialValue: string;
    private showClear: boolean;
    private disableLoading: boolean;
    private label: any; // string ?
    private noMatchesText: string;
    private minChars = 0;
    private items = [];
    private loading = false;
    private opened = false;
    private firstValidItemIndex: number | null;
    private maxSuggestions = 0;
    private groupBy = '';
    private captionFormat = '';
    private placeholder = '';
    private defaultInputId = '';
    private clearTooltip = '';
    private labelSmall = '';

    private _inputEl: HTMLInputElement | null;
    private _eventReferences: any;
    private _matches: any;
    private _groupedMatches: any;
    private _suggestionEl: HTMLElement | null;
    private _highlightedEl: any;
    private _blur = false;
    private _mouseEnter = false;

    get contentElement(): HTMLInputElement | null {
        if (this._inputEl) {
            return this._inputEl;
        }

        if (this.shadowRoot) {
            this._inputEl = this.shadowRoot.getElementById(this.defaultInputId) as unknown as HTMLInputElement;
            return this._inputEl;
        }

        return null;
    }

    set dataMinChars(value: any) {
        this.minChars = value;
    }

    constructor() {
        super();

        this.defaultInputId = 'autocompleteDefaultInput';

        this.initialised = false;

        this._eventReferences = {};

        this._matches = [];
        this._groupedMatches = new Map();
        this.firstValidItemIndex = null;

        this.minChars = DEFAULT_MIN_CHARS;

        this.items = [];

        this.initialValue = '';

        this._inputEl = null;
        this._highlightedEl = null;
        this._suggestionEl = null;

        this.loading = false;
        this.opened = false;
        this.showClear = false;
        this.disableLoading = false;

        this.maxSuggestions = DEFAULT_MAX_MATCHES;
        this.captionFormat = DEFAULT_CAPTION_FORMAT;

        this.noMatchesText = 'Geen resultaat';
        this.clearTooltip = 'Wissen';
    }

    firstUpdated() {
        this._suggestionEl = (this as any).shadowRoot.getElementById('suggestions');
        if (this._suggestionEl) this._suggestionEl.style.width = `100%`;

        this._eventReferences.onFocus = this._onFocus.bind(this);
        this._eventReferences.onBlur = this._onBlur.bind(this);

        this._eventReferences.onKeyDown = this._onKeyDown.bind(this);
        this._eventReferences.onKeyUp = this._onKeyUp.bind(this);

        if (this.contentElement) {
            this.contentElement.addEventListener('focus', this._eventReferences.onFocus);
            this.contentElement.addEventListener('blur', this._eventReferences.onBlur);

            this.contentElement.addEventListener('keydown', this._eventReferences.onKeyDown);
            this.contentElement.addEventListener('keyup', this._eventReferences.onKeyUp);
        }
    }

    updated(changed: PropertyValues) {
        const { _suggestionEl } = this;
        if (
            (changed.has('opened') || changed.has('firstValidItemIndex')) &&
            this.opened &&
            _suggestionEl &&
            _suggestionEl.childElementCount
        ) {
            for (const item of _suggestionEl.children) {
                item.classList.remove('vl-autocomplete__cta--focus');
            }

            if (this.firstValidItemIndex != null) {
                this._highlightedEl = _suggestionEl.children[this.firstValidItemIndex];
                if (this._highlightedEl) this._highlightedEl.classList.add('vl-autocomplete__cta--focus');
            }
        }
    }

    disconnectedCallback() {
        if (!this.contentElement) {
            return;
        }

        this.contentElement.removeEventListener('keydown', this._eventReferences.onKeyDown);
        this.contentElement.removeEventListener('keyup', this._eventReferences.onKeyUp);
        this.contentElement.removeEventListener('focus', this._eventReferences.onFocus);
        this.contentElement.removeEventListener('blur', this._eventReferences.onBlur);
    }

    _onKeyDown(ev: any) {
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    _onKeyUp(ev: any) {
        switch (ev.key) {
            case 'ArrowUp':
                ev.preventDefault();
                ev.stopPropagation();
                this._markPreviousElement();
                break;

            case 'ArrowDown':
                ev.preventDefault();
                ev.stopPropagation();

                this._markNextElement();
                break;

            case 'Enter':
                if (this._highlightedEl) {
                    this._highlightedEl.click();
                }
                break;
            default:
        }
    }

    formatCaption(item: any) {
        switch (this.captionFormat) {
            case CAPTION_FORMAT.TITLE:
                return html`<span class="uig-autocomplete_title">${item.title}</span>`;
            case CAPTION_FORMAT.SUBTITLE:
                return html`<span class="uig-autocomplete_subtitle">${item.subtitle}</span>`;
            case CAPTION_FORMAT.VALUE:
                return html`<span class="uig-autocomplete_value">${item.value}</span>`;
            default:
        }

        if (item.subtitle != null) {
            if (this.captionFormat === CAPTION_FORMAT.TITLE_SUBTITLE_VERTICAL || this.captionFormat == null) {
                return html`<span class="uig-autocomplete_title uig-autocomplete_title">${item.title}</span
                    ><span class="uig-autocomplete_subtitle vl-autocomplete__cta__sub">${item.subtitle}</span>`;
            }
            if (this.captionFormat === CAPTION_FORMAT.TITLE_SUBTITLE_HORIZONTAL) {
                return html`<span class="uig-autocomplete_title">${item.title}</span>:
                    <span class="uig-autocomplete_subtitle">${item.subtitle}</span>`;
            }
            if (this.captionFormat === CAPTION_FORMAT.SUBTITLE_TITLE_HORIZONTAL) {
                return html`<span class="uig-autocomplete_subtitle">${item.subtitle}</span>:
                    <span class="uig-autocomplete_title">${item.title}</span>`;
            }
        }
        return html`<span class="uig-autocomplete_title vl-autocomplete__cta__title">${item.title}</span>`;
    }

    filterAndSuggest(searchTerm: any, items: any) {
        let suggestions = [];
        suggestions =
            searchTerm &&
            items
                .filter(
                    (item: any) =>
                        item.title
                            .replace(',', '')
                            .replace(/\s/g, '')
                            .toLowerCase()
                            .search(searchTerm.replace(',', '').replace(/\s/g, '').toLowerCase()) !== -1
                )

                .slice(0, this.maxSuggestions); // Limit results
        this.suggest(suggestions);
    }

    _markPreviousElement() {
        if (!this._highlightedEl || !this._highlightedEl.previousElementSibling) {
            return;
        }

        this._highlightedEl.classList.remove('vl-autocomplete__cta--focus');
        this._highlightedEl = this._highlightedEl.previousElementSibling;
        this._highlightedEl.classList.add('vl-autocomplete__cta--focus');
        this._highlightedEl.scrollIntoView();
    }

    _markNextElement() {
        if (!this._highlightedEl || !this._highlightedEl.nextElementSibling) {
            return;
        }

        this._highlightedEl.classList.remove('vl-autocomplete__cta--focus');
        this._highlightedEl = this._highlightedEl.nextElementSibling;
        this._highlightedEl.classList.add('vl-autocomplete__cta--focus');
        this._highlightedEl.scrollIntoView();
    }

    _onFocus() {
        this._blur = false;
    }

    _onBlur() {
        this._blur = true;
        if (!this._mouseEnter) {
            this.close();
        }
    }

    _handleItemMouseEnter() {
        this._mouseEnter = true;
    }

    _handleItemMouseLeave() {
        this._mouseEnter = false;
        if (this._blur) {
            setTimeout(() => this.close(), 500);
        }
    }

    open() {
        if (this._matches.length) {
            this.opened = true;
        }
    }

    close() {
        this.opened = false;
        this._highlightedEl = null;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set matches(items: any) {
        this.suggest(items);
    }

    suggest(suggestions: any) {
        const searchTerm = this.contentElement ? this.contentElement.value : null;

        if (searchTerm && searchTerm.length >= this.minChars) {
            this._matches = suggestions || [];

            this._groupedMatches = new Map();
            if (this._matches.length > 0) {
                if (this.groupBy != null && this.groupBy.length > 0) {
                    this._matches.forEach((item: any) => {
                        const groupByValue = item[this.groupBy];
                        let group = this._groupedMatches.get(groupByValue);
                        if (group == null) {
                            group = [];
                            this._groupedMatches.set(groupByValue, group);
                        }
                        group[group.length] = item;
                    });
                    this.firstValidItemIndex = 1;
                } else {
                    this.firstValidItemIndex = 0;
                }
            } else {
                this._matches = [];
                this._matches.push({ value: null, title: this.noMatchesText });
                this.firstValidItemIndex = null;
            }
        } else {
            this._matches = [];
        }

        if (this._matches.length) {
            this.open();
        } else {
            this.close();
        }

        this.loading = false;

        this.requestUpdate();
    }

    generateItems() {
        let groupIndex = 0;
        if (this.groupBy && this._groupedMatches.size > 0) {
            const liElements: any = [];

            this._groupedMatches.forEach((items: any, groupName: string) => {
                liElements.push(html` <li
                    class="vl-autocomplete__cta uig-autocomplete-group"
                    groupindex="${groupIndex}"
                >
                    ${groupName}
                </li>`);
                items.forEach((item: any) => liElements.push(this.generateItem(item, groupIndex)));
                groupIndex += 1;
            });

            return html`${liElements}`;
        }

        return html`${this._matches.map((item: any) => this.generateItem(item, groupIndex))}`;
    }

    generateItem(item: any, groupIndex: number) {
        return html` <li
            @click=${() => this.autocomplete(item.title, item.value ? item.value : null)}
            class="vl-autocomplete__cta uig-autocomplete-item"
            groupindex="${groupIndex}"
            role="option"
            tabindex="-1"
        >
            ${this.formatCaption(item)}
        </li>`;
    }

    autocomplete(title: string, value: string) {
        if (value == null) return;

        if (this.contentElement) this.contentElement.value = title;

        this.close();

        this.dispatchEvent(
            new CustomEvent('selected-autocomplete', {
                detail: { title, value },
                composed: true,
                bubbles: true,
            })
        );
    }

    _hasSearchTerm() {
        return this.contentElement && this.contentElement.value && this.contentElement.value.length > 0;
    }

    async _notify() {
        this.loading = true;

        try {
            const searchTerm = this.contentElement && this.contentElement.value;
            if (searchTerm && searchTerm.length >= this.minChars) {
                if (this.items && this.items.length) {
                    this.filterAndSuggest(searchTerm, this.items);
                } else {
                    const options = {
                        detail: { searchTerm },
                        bubbles: true,
                        composed: true,
                    };
                    this.dispatchEvent(new CustomEvent('search', options));
                }
            } else {
                this.suggest([]);
            }
        } catch (e) {
            this.loading = false;
            throw e;
        }
    }

    _clear() {
        if (this.contentElement) this.contentElement.value = '';
        this.suggest([]);
        const options = {
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent('clear', options));
    }

    _generateClear() {
        if (this.showClear && (this._hasSearchTerm() || (!this.initialised && this.initialValue))) {
            return html` <div class="uig-autocomplete__clear" aria-hidden="true">
                <span
                    class="uig-autocomplete__clear-icon vl-icon vl-icon--close"
                    @click="${this._clear}"
                    title="${this.clearTooltip}"
                ></span>
            </div>`;
        }
        return ``;
    }

    _wrapInLabel(content: any) {
        if (!this.label || this.label.length === 0) return content;
        return html`<label class=${this.labelSmall ? 'small' : ''} for="${this.defaultInputId}">${this.label}</label
            >${content}`;
    }

    render() {
        const rendered = this._wrapInLabel(
            html`
                <div class="js-vl-autocomplete">
                    <slot id="dropdown-input">
                        <input
                            type="text"
                            name="vl-autocomplete-1-input-name"
                            id="${this.defaultInputId}"
                            placeholder="${this.placeholder}"
                            ?show-clear="${this.showClear}"
                            class="vl-input-field vl-input-field--block"
                            aria-describedby="vl-autocomplete-1-hint"
                            autocomplete="off"
                            autocapitalize="off"
                            spellcheck="off"
                            aria-autocomplete="list"
                            aria-owns="suggestions"
                            aria-controls="suggestions"
                            aria-haspopup="listbox"
                            .value=${this.initialValue}
                            @input=${this._notify}
                        />
                    </slot>
                    <div
                        class="vl-autocomplete__loader ${this._hasSearchTerm()
                            ? 'ui-autocomplete__loader-with-clear'
                            : ''}"
                        aria-hidden="true"
                        ?hidden=${!this.loading || this.disableLoading}
                    ></div>
                    ${this._generateClear()}
                    <div
                        class="vl-autocomplete"
                        ?hidden=${!this.opened}
                        @mouseenter=${this._handleItemMouseEnter}
                        @mouseleave=${this._handleItemMouseLeave}
                        aria-hidden="false"
                        aria-labelledby="vl-autocomplete-1-input"
                    >
                        <div class="vl-autocomplete__list-wrapper uig-autocomplete__list-wrapper">
                            <ul id="suggestions" class="vl-autocomplete__list" role="listbox">
                                ${this.generateItems()}
                            </ul>
                        </div>
                    </div>
                </div>
            `
        );

        this.initialised = true;

        return rendered;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-autocomplete': VlAutocomplete;
    }
}
