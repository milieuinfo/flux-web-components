import { webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { FormControl } from '../form-control';
import { vlSelectComponentStyles } from './vl-select.component.css';
import { selectDefaults } from './vl-select.defaults';
import { SelectOption } from './vl-select.model';

@webComponent('vl-select')
export class VlSelectComponent extends FormControl {
    // Properties
    options = selectDefaults.options;
    initialOptions = selectDefaults.initialOptions;
    // State
    public value = '';
    // Attributes
    private block = selectDefaults.block;
    private placeholder = selectDefaults.placeholder;
    private autocomplete = selectDefaults.autocomplete;
    private notDeletable = selectDefaults.notDeletable;
    // Variables
    private DEFAULT_GROUP_LABEL = 'Overig';
    private dispatchInput = false;
    private slotObserver?: MutationObserver;
    private parsedOptions: SelectOption[] = [];

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlSelectComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            options: {
                type: Array,
                attribute: false,
            },
            initialOptions: { type: Array, attribute: 'initial-options' },
            block: { type: Boolean },
            readonly: { type: Boolean },
            placeholder: { type: String },
            autocomplete: { type: String },
            notDeletable: { type: Boolean, attribute: 'not-deletable' },
            value: { type: String },
        };
    }

    get validationTarget(): HTMLSelectElement | undefined | null {
        return this.shadowRoot?.querySelector('select');
    }

    connectedCallback() {
        super.connectedCallback();

        this.parseSlottedOptions();
        const selectedOption = this.getSelectedOption();
        this.value = selectedOption?.value || '';
        this.initialOptions = structuredClone(this.getAllOptions());

        this.setupSlotObserver();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.slotObserver?.disconnect();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('options')) {
            const selectedOption = this.getSelectedOption();
            this.value = selectedOption?.value || '';
        }

        if (changedProperties.has('value')) {
            const detail = { value: this.value };

            this.setValue(this.value);
            this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
            if (this.dispatchInput) {
                this.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail }));
                this.dispatchInput = false;
            }
            this.dispatchEventIfValid(detail);
        }
    }

    render(): TemplateResult {
        const containerClasses = {
            'vl-select__container': true,
            'vl-select__container--block': this.block,
        };
        const selectClasses = {
            'vl-select': true,
            'vl-select--disabled': this.disabled,
            'vl-select--error': this.isInvalid || this.error,
            'vl-select--success': this.success,
            'vl-select--block': this.block,
        };
        const hasValue = !!this.value;
        const hasGroups = this.getAllOptions().some((option) => option.group);

        return html`
            <div class=${classMap(containerClasses)}>
                <select
                    id=${this.id || nothing}
                    name=${this.name || nothing}
                    class=${classMap(selectClasses)}
                    aria-label=${this.label || nothing}
                    aria-invalid=${this.isInvalid || nothing}
                    ?required=${this.required}
                    ?disabled=${this.disabled}
                    ?aria-disabled=${this.disabled}
                    ?error=${this.error}
                    .value=${live(this.value)}
                    autocomplete=${this.autocomplete || nothing}
                    @change=${this.onChange}
                    @input=${this.onSelect}
                >
                    ${this.placeholder ? this.renderPlaceholder(hasValue) : nothing}
                    ${hasGroups ? this.renderGroupedOptions() : this.renderSelectOptions(this.getAllOptions())}
                </select>
                ${hasValue && !this.notDeletable ? this.renderClearButton() : nothing}
                <span class="vl-icon vl-vi vl-vi-nav-down" aria-hidden="true"></span>
            </div>
            <div class="slot-container">
                <slot @slotchange=${this.onSlotChange}></slot>
            </div>
        `;
    }

    renderPlaceholder(hasValue: boolean): TemplateResult {
        return html` <option class="vl-select__placeholder" value="" ?selected=${!hasValue} disabled>
            ${this.placeholder}
        </option>`;
    }

    renderClearButton(): TemplateResult {
        return html`
            <button
                type="button"
                class="vl-select__button"
                aria-label=${`Verwijder ${this.label} keuze ${this.getSelectedOption()?.label || this.value || ''}`}
                @click=${this.clearValue}
            >
                <span class="vl-icon vl-vi vl-vi-close" aria-hidden="true"></span>
            </button>
        `;
    }

    renderGroupedOptions(): TemplateResult[] {
        const groupedOptions = this.getGroupedOptions();

        return Object.entries(groupedOptions).map(([group, options]) => {
            return html` <optgroup label=${group}>${this.renderSelectOptions(options)}</optgroup>`;
        });
    }

    renderSelectOptions(options: SelectOption[]): TemplateResult[] {
        return options.map((option) => {
            return html` <option
                value=${option.value}
                ?selected=${this.value === option.value}
                ?disabled=${option.disabled}
            >
                ${option.label || option.value}
            </option>`;
        });
    }

    resetFormControl() {
        super.resetFormControl();

        if (this.options.length > 0) {
            this.options = structuredClone(this.initialOptions);
        } else {
            this.parseSlottedOptions();
        }
        const selectedOption = this.getSelectedOption();
        this.value = selectedOption?.value || '';
    }

    private onChange(event: Event & { target: HTMLSelectElement }) {
        this.value = event?.target?.value;
    }

    private onSelect() {
        this.dispatchInput = true;
    }

    private clearValue() {
        this.dispatchInput = true;
        this.value = '';
    }

    private onSlotChange() {
        this.parseSlottedOptions();
        const selected = this.getSelectedOption();
        if (selected) this.value = selected.value;
        this.requestUpdate();
    }

    private getSelectedOption(): SelectOption | undefined {
        // Zoek de laatste optie met selected true, dit is dezelfde werking als een native select element.
        return [...this.getAllOptions()].reverse().find((option) => option.selected);
    }

    private getGroupedOptions(): Record<string, SelectOption[]> {
        const groupedOptions = this.getAllOptions().reduce((groups, option) => {
            const group = option.group || this.DEFAULT_GROUP_LABEL;

            if (!groups[group]) {
                groups[group] = [option];
            } else {
                groups[group].push(option);
            }

            return groups;
        }, {} as Record<string, SelectOption[]>);

        return groupedOptions;
    }

    private setupSlotObserver() {
        this.slotObserver = new MutationObserver(() => {
            this.parseSlottedOptions();
            const selected = this.getSelectedOption();
            if (selected) this.value = selected.value;
            this.requestUpdate();
        });

        this.slotObserver.observe(this, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['value', 'label', 'selected', 'disabled'],
        });
    }

    private parseSlottedOptions() {
        const slottedElements = Array.from(this.children);

        this.parsedOptions = slottedElements.reduce<SelectOption[]>((options, element) => {
            if (element.tagName.toLowerCase() === 'option') {
                options.push(this.parseOptionElement(element as HTMLOptionElement));
            } else if (element.tagName.toLowerCase() === 'optgroup') {
                const groupLabel = (element as HTMLOptGroupElement).label || this.DEFAULT_GROUP_LABEL;
                const optionElements = Array.from(element.querySelectorAll('option'));

                const groupOptions = optionElements.map((optionElement) => {
                    const option = this.parseOptionElement(optionElement);
                    option.group = groupLabel;
                    return option;
                });

                options.push(...groupOptions);
            }
            return options;
        }, []);
    }

    private parseOptionElement(optionElement: HTMLOptionElement): SelectOption {
        return {
            value: optionElement.value || optionElement.textContent?.trim() || '',
            label: optionElement.textContent?.trim() || optionElement.value || '',
            selected: optionElement.selected,
            disabled: optionElement.disabled,
        };
    }

    private getAllOptions(): SelectOption[] {
        // Als we programmatische options hebben, gebruik die; anders gebruik parsed options van slot
        return this.options.length > 0 ? this.options : this.parsedOptions;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-select': VlSelectComponent;
    }
}
