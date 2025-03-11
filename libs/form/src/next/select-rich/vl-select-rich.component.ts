import { webComponent } from '@domg-wc/common-utilities';
import { SelectRichOption } from '@domg-wc/form/next/select-rich/vl-select-rich.model';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { iconStyle, inputFieldStyle } from '@domg/govflanders-style/component';
import { FormValue } from '@open-wc/form-control/src/types';
import * as choices from 'choices.js';
import { Item, Options } from 'choices.js';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { FormControl } from '../form-control/form-control';
import multiselectStyle from './styles/vl-multiselect.dv-css';
import selectRichUigStyle from './styles/vl-select-rich.uig-css';
import selectStyle from './styles/vl-select.dv-css';
import { selectRichDefaults } from './vl-select-rich.defaults';

// web-dev-server (rollup) fix: ambiguous indirect export
export const DEFAULT_CLASSNAMES = choices.DEFAULT_CLASSNAMES;
export const Choices = choices.default;
export type Choices = choices.default;

@webComponent('vl-select-rich-next')
export class VlSelectRichComponent extends FormControl {
    // Properties
    options = selectRichDefaults.options;

    // Attributes
    private notDeletable = selectRichDefaults.notDeletable;
    private multiple = selectRichDefaults.multiple;
    private position = selectRichDefaults.position;
    private resultLimit = selectRichDefaults.resultLimit;
    private noResultsText = selectRichDefaults.noResultsText;
    private noChoicesText = selectRichDefaults.noChoicesText;
    protected placeholder = selectRichDefaults.placeholder;
    protected search = selectRichDefaults.search;
    protected searchPlaceholder = selectRichDefaults.searchPlaceholder;

    // State
    private value: FormValue = null;
    private dispatchInput = false;

    // Variables
    protected choices: Choices | null = null;
    private initialOptions: SelectRichOption[] = [];

    static get styles(): CSSResult[] {
        return [resetStyle, baseStyle, inputFieldStyle, selectStyle, multiselectStyle, iconStyle, selectRichUigStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            options: { type: Array },
            placeholder: { type: String },
            notDeletable: { type: Boolean, attribute: 'not-deletable' },
            multiple: { type: Boolean },
            search: { type: Boolean },
            position: { type: String },
            resultLimit: { type: Number, attribute: 'result-limit' },
            noResultsText: { type: String, attribute: 'no-results-text' },
            noChoicesText: { type: String, attribute: 'no-choices-text' },
            searchPlaceholder: { type: String, attribute: 'search-placeholder' },
            value: {
                type: FormData,
                state: true,
                hasChanged: (value: FormValue, oldValue: FormValue) => {
                    if (value instanceof FormData && oldValue instanceof FormData) {
                        // We vergelijken de letterlijke inhoud van de entries van dit FormData object, omdat default FormData vergelijking niet voldoet
                        return JSON.stringify([...value.entries()]) !== JSON.stringify([...oldValue.entries()]);
                    } else {
                        return value !== oldValue;
                    }
                },
            },
        };
    }

    constructor() {
        super();

        this.submitFormOnEnter = false;
    }

    firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        this.choices = new Choices(this.validationTarget!, this.getChoicesConfig());
        this.initialOptions = [...JSON.parse(JSON.stringify(this.options))];

        setTimeout(() => {
            // Fix voor Choices.js dropdown te openen in een Shadow DOM
            this.getChoicesElement()?.addEventListener('click', this.onClickChoices);

            // Fix voor Choices.js dropdown te openen als er geklikt wordt op het label
            this.internals.labels[0]?.addEventListener('click', this.onClickChoices);

            // Fix voor required validator
            if (!this.value) {
                this.setValue(null);
            }

            // Fix voor Choices.js search event dat niet afgevuurd wordt als de search value verwijderd wordt.
            this.choices?.input?.element?.addEventListener('input', this.onSearchInput);
        }, 0);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (!this.choices) {
            return;
        }

        if (changedProperties.has('options')) {
            this.choices.clearStore();
            this.choices.setChoices(this.getOptions(), 'value', 'label', true);
            this.onChange();
        }

        if (changedProperties.has('value')) {
            const detail = { value: this.getSelected() };

            this.setValue(this.value);
            this.dispatchEvent(new CustomEvent('vl-change', { bubbles: true, composed: true, detail }));
            if (this.dispatchInput) {
                this.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail }));
                this.dispatchInput = false;
            }
            this.dispatchEventIfValid(detail);
        }

        if (changedProperties.has('disabled')) {
            if (this.disabled) {
                this.choices.disable();
            } else {
                this.choices.enable();
            }
        }

        if (changedProperties.has('error')) {
            (this.internals as ElementInternals).setValidity({ customError: this.error }, 'custom-error');
        }

        if (changedProperties.has('resultLimit')) {
            this.choices.config.searchResultLimit = this.resultLimit;
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.getChoicesElement()?.removeEventListener('click', this.onClickChoices);
        this.internals.labels[0]?.removeEventListener('click', this.onClickChoices);
        this.choices?.input?.element?.removeEventListener('input', this.onSearchInput);
    }

    render(): TemplateResult {
        const classes = {
            'vl-select': !this.multiple,
            'vl-multiselect': this.multiple,
            'vl-select--disabled': this.disabled,
            'vl-select--error': this.isInvalid || this.error,
            'vl-select--success': this.success,
        };

        return html`
            <select
                id=${this.id || nothing}
                name=${this.name || nothing}
                class=${classMap(classes)}
                aria-label=${this.label || nothing}
                aria-invalid=${this.isInvalid || nothing}
                ?required=${this.required}
                ?disabled=${this.disabled}
                ?error=${this.error}
                ?multiple=${this.multiple}
                @change=${this.onChange}
                @choice=${this.onSelect}
                @removeItem=${this.onSelect}
            ></select>
        `;
    }

    get validationTarget(): HTMLSelectElement | null | undefined {
        return this.shadowRoot?.querySelector('select');
    }

    resetFormControl() {
        super.resetFormControl();

        this.options = [...this.initialOptions];
    }

    getSelected(): string | string[] | null {
        return this.multiple ? this.getSelectedValues() : this.getSelectedValues()[0] || null;
    }

    private getSelectedValues(): string[] {
        const selectedOptions = (this.validationTarget! as HTMLSelectElement).selectedOptions;
        return (
            Array.from(selectedOptions)
                // Filter placeholder optie eruit
                .filter((option) => option.value)
                .map((option) => option.value)
        );
    }

    private collectFormData(): FormData | FormValue {
        const name = this.name || this.id;
        const selectedValues = this.getSelectedValues();
        return selectedValues?.length
            ? selectedValues.reduce((formData: FormData, string, currentIndex) => {
                  currentIndex ? formData.append(name, string) : formData.set(name, string);
                  return formData;
              }, new FormData())
            : null;
    }

    private getChoicesElement(): HTMLElement | null {
        return this.shadowRoot?.querySelector('.js-vl-select') as HTMLElement | null;
    }

    private getChoicesConfig(): Partial<Options> {
        return {
            shouldSort: false,
            removeItemButton: !this.notDeletable,
            removeItems: !this.notDeletable,
            searchEnabled: this.search,
            placeholder: !!this.placeholder,
            placeholderValue: this.placeholder,
            position: this.position,
            noResultsText: this.noResultsText,
            searchResultLimit: this.resultLimit,
            noChoicesText: this.noChoicesText,
            searchPlaceholderValue: this.searchPlaceholder,
            classNames: {
                ...DEFAULT_CLASSNAMES,
                containerOuter: 'js-vl-select',
                containerInner: 'vl-select__inner',
                input: 'vl-input-field',
                inputCloned: 'vl-input-field-cloned',
                list: 'vl-select__list',
                listItems: 'vl-select__list--multiple',
                listSingle: 'vl-select__list--single',
                listDropdown: 'vl-select__list--dropdown',
                item: 'vl-select__item',
                itemSelectable: 'vl-select__item--selectable',
                itemDisabled: 'vl-select__item--disabled',
                itemChoice: 'vl-select__item--choice',
                placeholder: 'vl-select__placeholder',
                group: 'vl-select__group',
                groupHeading: 'vl-select__heading',
                button: 'vl-select__button',
            },
            callbackOnCreateTemplates: (template) => {
                return {
                    containerOuter: () => {
                        return template(
                            `<div
                                class="js-vl-select vl-vi vl-vi-nav-down"
                                data-type="${this.multiple ? 'select-multiple' : 'select-one'}"
                                ${this.search ? 'aria-autocomplete="list"' : ''}
                                role="combobox"
                                part="vl-select-rich__combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabindex="0"
                                aria-controls="vl-select__list"
                                aria-label="${
                                    this.multiple ? 'selecteer één of meerdere opties' : 'selecteer één optie'
                                }">
                            </div>`
                        );
                    },
                    item: (_config: Partial<Options>, data: Item) => {
                        if (this.notDeletable) {
                            return template(`
                            <div class="vl-select__item
                                ${data.highlighted ? 'is-highlighted' : 'vl-select__item--selectable'}
                                ${this.multiple ? 'vl-pill' : ''}
                                ${data.placeholder ? 'vl-select__placeholder' : ''}"
                                data-item
                                data-id="${data.id}"
                                data-value="${data.value}"
                                ${data.disabled ? 'aria-disabled="true"' : ''}
                            >
                                ${data.label}
                            </div>
                        `);
                        }

                        return template(
                            `<div class="
                                    vl-select__item
                                    ${data.highlighted ? 'is-highlighted' : ''}
                                    ${!data.disabled ? 'vl-select__item--selectable' : ''}
                                    ${this.multiple ? 'vl-pill' : ''}
                                    ${data.placeholder ? 'vl-select__placeholder' : ''}"
                                    data-item
                                    data-id="${data.id}"
                                    data-value="${data.value}"
                                    ${data.disabled ? 'aria-disabled="true"' : 'data-deletable'}
                                >
                                    <span>${data.label}</span>
                                    <button type="button" class="vl-pill__close ${
                                        !this.multiple ? 'vl-vi vl-vi-close' : ''
                                    }" data-button aria-label="verwijder">
                                        ${
                                            this.multiple
                                                ? `<span class="vl-pill__close__icon vl-vi vl-vi-close" aria-hidden="true"></span>`
                                                : ''
                                        }
                                    </button>
                                </div>`
                        );
                    },

                    itemList: () => {
                        if (!this.multiple) {
                            return template(`<div class="vl-input-field"></div>`);
                        }

                        return template(`<div class="vl-input-field vl-select__list--multiple"></div>`);
                    },
                    input: () => {
                        return template(
                            `<input
                                    @keydown=${this.onKeydown}
                                    type="text"
                                    class="vl-input-field vl-input-field-cloned"
                                    autocomplete="off"
                                    autocapitalize="off"
                                    spellcheck="false"
                                    role="textbox"
                                    aria-autocomplete="list"
                                    aria-label="zoek item">`
                        );
                    },
                    dropdown: () => {
                        return template(
                            `<div class="vl-select__list vl-select__list--dropdown" role="group" id="vl-select__list"></div>`
                        );
                    },
                    choiceList: () => {
                        return template(
                            `<div class="vl-select__list" role="listbox" aria-label="item lijst" tabindex="0"></div>`
                        );
                    },
                };
            },
        };
    }

    protected onKeydown(event: KeyboardEvent) {
        // de keyboard-events mogen niet buiten deze component bubbelen
        // om te vermijden dat - bij integratie in bvb. de tabs - navigeren met de pijltjes een tab wissel veroorzaakt
        event.stopPropagation();
        super.onKeydown(event);
    }

    private getOptions(): SelectRichOption[] {
        const options = [...this.options];

        if (this.placeholder && !this.multiple) {
            const placeholderOption: SelectRichOption = {
                value: '',
                label: this.placeholder,
                placeholder: true,
                disabled: true,
                selected: true,
            };
            options.unshift(placeholderOption);
        }

        return options;
    }

    private onChange() {
        this.value = this.collectFormData();
    }

    private onSelect() {
        this.dispatchInput = true;
    }

    private onClickChoices = (event: Event) => {
        event.stopPropagation();

        if (!this.disabled) {
            this.choices?.showDropdown();
        }
    };

    private onSearchInput = (event: Event) => {
        const value = (event?.target as HTMLInputElement)?.value;
        this.dispatchEvent(new CustomEvent('vl-select-search', { bubbles: true, composed: true, detail: { value } }));
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-select-rich-next': VlSelectRichComponent;
    }
}
