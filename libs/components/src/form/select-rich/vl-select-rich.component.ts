import { webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { FormValue } from '@open-wc/form-control/src/types';
import Choices, { Options } from 'choices.js';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { FormControl } from '../form-control';
import { vlSelectRichComponentStyles } from './vl-select-rich.component.css';
import { selectRichDefaults } from './vl-select-rich.defaults';
import { SelectRichOption } from './vl-select-rich.model';
import { getSearchMatcher, SelectRichSearchMatcher } from './vl-select-rich.search-matchers';

@webComponent('vl-select-rich')
export class VlSelectRichComponent extends FormControl {
    // Properties
    options = selectRichDefaults.options;
    initialOptions = selectRichDefaults.initialOptions;
    protected placeholder = selectRichDefaults.placeholder;
    protected search = selectRichDefaults.search;
    protected searchPlaceholder = selectRichDefaults.searchPlaceholder;
    // Variables
    protected choices: Choices | null = null;
    // Attributes
    private notDeletable = selectRichDefaults.notDeletable;
    private multiple = selectRichDefaults.multiple;
    private position = selectRichDefaults.position;
    private resultLimit = selectRichDefaults.resultLimit;
    private noResultsText = selectRichDefaults.noResultsText;
    private noChoicesText = selectRichDefaults.noChoicesText;
    private searchStrategy = selectRichDefaults.searchStrategy;
    // Search matcher
    private searchMatcher: SelectRichSearchMatcher | null = null;
    private nativeSearchMethod: ((value: string) => number | null) | null = null;
    // State
    private value: FormValue = null;
    private dropdownInitialised = false;
    private isDropdownOpen = false;
    private dispatchInput = false;
    private initialised = false;

    constructor() {
        super();
        this.submitFormOnEnter = false;
    }

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlSelectRichComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            initialOptions: { type: Array, attribute: 'initial-options' },
            options: {
                type: Array,
                hasChanged: (value, oldValue) => {
                    if (value instanceof Array && oldValue instanceof Array) {
                        // We vergelijken de arrays
                        return JSON.stringify([...value]) !== JSON.stringify([...oldValue]);
                    } else {
                        return value !== oldValue;
                    }
                },
            },
            placeholder: { type: String },
            notDeletable: { type: Boolean, attribute: 'not-deletable' },
            multiple: { type: Boolean },
            search: { type: Boolean },
            position: { type: String },
            resultLimit: { type: Number, attribute: 'result-limit' },
            noResultsText: { type: String, attribute: 'no-results-text' },
            noChoicesText: { type: String, attribute: 'no-choices-text' },
            searchPlaceholder: { type: String, attribute: 'search-placeholder' },
            searchStrategy: { type: String, attribute: 'search-strategy' },
            value: {
                type: FormData,
                state: true,
                hasChanged: (value, oldValue) => this.compareValue(oldValue, value),
            },
        };
    }

    static compareValue = (value: unknown, oldValue: unknown) => {
        if (value instanceof FormData && oldValue instanceof FormData) {
            // We vergelijken de letterlijke inhoud van de entries van dit FormData object, omdat default FormData vergelijking niet voldoet
            return JSON.stringify([...value.entries()]) !== JSON.stringify([...oldValue.entries()]);
        } else {
            return value !== oldValue;
        }
    };

    connectedCallback() {
        super.connectedCallback();

        if (this.initialised) {
            this.choices = new Choices(this.validationTarget!, this.getChoicesConfig());
            this.initialOptions = structuredClone(this.options);
        }
    }

    async firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        this.choices = new Choices(this.validationTarget!, this.getChoicesConfig());
        this.initialOptions = structuredClone(this.options);
    }

    private callbackOnInit = async (): Promise<void> => {
        this.getChoicesElement()?.addEventListener('click', this.onClickChoices);
        this.internals.labels[0]?.addEventListener('click', this.onClickChoices);
        this.getChoicesElement()?.addEventListener('showDropdown', () => {
            const dropdownElement = this.getChoicesElement()?.querySelector('.vl-select__list--dropdown');
            if (dropdownElement && !this.dropdownInitialised) {
                dropdownElement.setAttribute('role', 'group');
                dropdownElement.setAttribute('id', 'vl-select__list');
                this.dropdownInitialised = true;
            }
            this.isDropdownOpen = true;
        });
        this.getChoicesElement()?.addEventListener('hideDropdown', () => {
            this.isDropdownOpen = false;
        });

        this.setChoicesInputAttributes();

        await Promise.resolve();

        // Fix voor required validator
        if (!this.value) {
            this.setValue(null);
        }

        // Fix voor Choices.js search event dat niet afgevuurd wordt als de search value verwijderd wordt.
        this.choices?.input?.element?.addEventListener('input', this.onSearchInput);

        // Installeer de search wrapper die dynamisch de juiste matcher gebruikt
        this.installSearchWrapper();

        this.initialised = true;
    };

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (!this.choices) {
            return;
        }

        if (changedProperties.has('options')) {
            if (this.choices.initialised) {
                this.choices.clearStore();
                this.choices.setChoices(this.options, 'value', 'label', true);
                this.updateSelectedOptions(this.options);
            }
            if (VlSelectRichComponent.compareValue(this.value, changedProperties.has('value'))) {
                this.value = this.collectFormData();
            }
        }

        if (changedProperties.has('value')) {
            const detail = { value: this.getSelected() };
            this.setValue(this.value);
            this.dispatchEvent(new CustomEvent('vl-change', { bubbles: true, composed: true, detail }));
            if (this.validity.valid) {
                this.dispatchEventIfValid(detail);
            }
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

        if (changedProperties.has('searchStrategy')) {
            // Update de matcher - de wrapper zal automatisch de juiste gebruiken
            this.searchMatcher = getSearchMatcher(this.searchStrategy);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.getChoicesElement()?.removeEventListener('click', this.onClickChoices);
        this.internals.labels[0]?.removeEventListener('click', this.onClickChoices);
        this.choices?.input?.element?.removeEventListener('input', this.onSearchInput);
        this.choices?.destroy();
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
                @change=${this.onInput}
                @addItem=${this.onChange}
                @removeItem=${this.onChange}
            ></select>
        `;
    }

    get validationTarget(): HTMLSelectElement | null | undefined {
        return this.shadowRoot?.querySelector('select');
    }

    /**
     * Reset de form control naar de initiële staat.
     */
    resetFormControl() {
        super.resetFormControl();

        this.choices?.clearStore();
        this.choices?.setChoices(this.options, 'value', 'label', true);
        this.updateSelectedOptions(this.initialOptions);
        this.value = this.collectFormData();
    }

    /**
     * Vervangt de huidige opties van de select.
     * @param options
     */
    setOptions(options: SelectRichOption[]): void {
        if (!options || !options.length) {
            return;
        }
        this.options = structuredClone(options);
    }

    /**
     * Registreert een custom search matcher voor het zoeken in de opties.
     * Gebruik null om terug te keren naar het native Choices.js gedrag.
     * @param matcher - De search matcher functie die gebruikt moet worden, of null voor native gedrag
     * @example
     * ```typescript
     * import { exactAndMatcher } from './vl-select-rich.search-matchers';
     * selectRichComponent.setSearchMatcher(exactAndMatcher);
     * // Of terug naar native gedrag:
     * selectRichComponent.setSearchMatcher(null);
     * ```
     */
    setSearchMatcher(matcher: SelectRichSearchMatcher | null): void {
        this.searchMatcher = matcher;
        // De wrapper functie zal automatisch de juiste matcher gebruiken
    }

    /**
     * Update de opties van de select met de opgegeven opties.
     * @param options
     */
    updateSelectedOptions(options: SelectRichOption[]): void {
        const selectedValues = options.filter((option) => option.selected).map((option) => option.value);
        const unselectedValues = options.filter((option) => !option.selected).map((option) => option.value);
        this.removeSelectionByValue(unselectedValues);
        this.selectByValue(selectedValues);
    }

    /**
     * Stelt de geselecteerde optie(s) in op basis van de opgegeven waarde(s).
     * @param value
     */
    setSelectedValues(value: string | string[]): void {
        this.removeAllSelections();
        this.selectByValue(value);
    }

    getSelected(): string | string[] | null {
        return this.multiple ? this.getSelectedValues() : this.getSelectedValues()[0] || null;
    }

    /**
     * Selecteert 1 of meerdere keuzes op basis van de opgegeven waarde(s).
     * @param value
     */
    selectByValue(value: string | string[]): void {
        if (!this.choices) {
            return;
        }
        this.choices.setChoiceByValue(value);
        this.setValue(this.collectFormData());
    }

    /**
     * Deselecteert 1 of meerdere keuzes op basis van de opgegeven waarde(s).
     * @param value
     */
    removeSelectionByValue(value: string | string[]): void {
        if (!this.choices) {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((val) => this.choices!.removeActiveItemsByValue(val));
        } else {
            this.choices.removeActiveItemsByValue(value);
        }
        this.setValue(this.collectFormData());
    }

    /**
     * Verwijdert alle selecties.
     */
    removeAllSelections(): void {
        if (!this.choices) {
            return;
        }

        this.choices.removeActiveItems();
        this.setValue(this.collectFormData());
    }

    protected onKeydown(event: KeyboardEvent) {
        // de keyboard-events mogen niet buiten deze component bubbelen
        // om te vermijden dat - bij integratie in bvb. de tabs - navigeren met de pijltjes een tab wissel veroorzaakt
        event.stopPropagation();
        super.onKeydown(event);
    }

    private setChoicesInputAttributes(): void {
        const inputElement =
            this.choices?.input?.element ||
            this.shadowRoot?.querySelector<HTMLInputElement>('input.vl-input-field');
        if (inputElement) {
            inputElement.setAttribute('type', 'text');
            inputElement.classList.add('vl-input-field', 'vl-input-field-cloned');
            inputElement.setAttribute('autocomplete', 'off');
            inputElement.setAttribute('autocapitalize', 'off');
            inputElement.setAttribute('spellcheck', 'false');
            inputElement.setAttribute('role', 'textbox');
            inputElement.setAttribute('aria-autocomplete', 'list');
            inputElement.setAttribute('aria-label', 'zoek item');
        }
    }

    private getSelectedValues(): string[] {
        const selectedOptions = (this.validationTarget! as HTMLSelectElement).selectedOptions;
        return (
            Array.from(selectedOptions)
                // Filter placeholders en niet-geselecteerde opties eruit
                .filter((option) => option.value && option.hasAttribute('selected'))
                .map((option) => option.value)
        );
    }

    private collectFormData(): FormData | FormValue {
        const name = this.name || this.id;
        const selectedValues = this.getSelectedValues();
        return selectedValues?.length
            ? selectedValues.reduce((formData: FormData, string, currentIndex) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
            callbackOnInit: this.callbackOnInit,
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
            shadowRoot: this.shadowRoot,
            classNames: {
                ...Choices.defaults.allOptions.classNames,
                containerOuter: 'js-vl-select',
                containerInner: 'vl-select__inner',
                input: 'vl-input-field',
                inputCloned: 'vl-input-field-cloned',
                list: 'vl-select__list',
                listItems: 'vl-select__list--multiple',
                listSingle: 'vl-select__list--single',
                listDropdown: ['vl-select__list', 'vl-select__list--dropdown'],
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
                            `
                            <div
                                class="js-vl-select vl-vi vl-vi-nav-down"
                                data-type="${this.multiple ? 'select-multiple' : 'select-one'}"
                                ${this.search ? 'aria-autocomplete="list"' : ''}
                                part="vl-select-rich__combobox"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded=${this.isDropdownOpen ? 'true' : 'false'}
                                tabindex="0"
                                aria-controls="vl-select__list"
                                aria-label="${
                                    this.multiple ? 'selecteer één of meerdere opties' : 'selecteer één optie'
                                }"
                            ></div>
                            `
                        ) as HTMLDivElement;
                    },
                    item: (_config: Partial<Options>, data: SelectRichOption) => {
                        const isPlaceholder = data.placeholder === true;
                        if (this.notDeletable) {
                            return template(`
                            <div class="vl-select__item
                                ${data.highlighted ? 'is-highlighted' : 'vl-select__item--selectable'}
                                ${this.multiple ? 'vl-pill' : ''}
                                ${data.placeholder ? 'vl-select__placeholder' : ''}"
                                role="option"
                                data-item
                                data-id="${data.id}"
                                data-value="${data.value}"
                                ${data.disabled ? 'aria-disabled="true"' : ''}
                            >
                                ${data.label}
                            </div>
                        `) as HTMLDivElement;
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
                                            ${isPlaceholder ? 'role="option"' : ''}
                                    ${data.disabled ? 'aria-disabled="true"' : 'data-deletable'}
                                >
                                    <span>${data.label}</span>
                                    <button type="button"
                                    ${isPlaceholder ? '' : 'role="option"'}
                                     class="vl-pill__close ${
                                         !this.multiple ? 'vl-vi vl-vi-close' : ''
                                     }" data-button aria-label="verwijder ${data.label}">
                                        ${
                                            this.multiple
                                                ? `<span class="vl-pill__close__icon vl-vi vl-vi-close" aria-hidden="true"></span>`
                                                : ''
                                        }
                                    </button>
                                </div>`
                        ) as HTMLDivElement;
                    },
                    itemList: () =>
                        template(
                            `<div class="vl-input-field ${
                                !this.multiple ? '' : 'vl-select__list--multiple'
                            }" role="listbox"></div>`
                        ) as HTMLDivElement,
                    choiceList: () =>
                        template(
                            `<div class="vl-select__list" role="listbox" aria-label="item lijst" tabindex="0"></div>`
                        ) as HTMLDivElement,
                };
            },
        };
    }

    /**
     * Event handler voor de change event van de select. Deze wordt aangeroepen wanneer de waarde van de
     * select verandert, ongeacht de bron (bijv. door de gebruiker of door code).
     * @private
     */
    private onChange() {
        this.value = this.collectFormData();
    }

    /**
     * Event handler voor de input event van de select. Deze wordt aangeroepen wanneer de gebruiker
     * de waarde van de select wijzigt.
     * @private
     */
    private onInput() {
        this.dispatchEvent(
            new CustomEvent('vl-input', { bubbles: true, composed: true, detail: { value: this.getSelected() } })
        );
    }

    private onClickChoices = () => {
        if (!this.disabled) {
            this.choices?.showDropdown();
        }
    };

    private onSearchInput = (event: Event) => {
        const value = (event?.target as HTMLInputElement)?.value;
        this.dispatchEvent(new CustomEvent('vl-select-search', { bubbles: true, composed: true, detail: { value } }));
    };

    /**
     * Installeert een wrapper functie die dynamisch tussen native en custom search schakelt.
     * Deze wrapper blijft altijd aanwezig en roept de juiste matcher aan op basis van searchMatcher.
     */
    private installSearchWrapper(): void {
        if (!this.choices) {
            return;
        }

        // Sla de originele native search methode op
        this.nativeSearchMethod = (this.choices as any)._searchChoices.bind(this.choices);

        // Installeer een permanente wrapper die dynamisch de juiste matcher gebruikt
        (this.choices as any)._searchChoices = (value: string) => {
            // Als er een custom matcher is, gebruik die
            if (this.searchMatcher) {
                return this.searchMatcher(this.choices!, value);
            }
            // Anders gebruik de native Choices.js methode
            return this.nativeSearchMethod!(value);
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-select-rich': VlSelectRichComponent;
    }
}
