import { isSafari, webComponent } from '@domg-wc/common';
import { vlGroupStyles } from '@domg-wc/styles';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { datepickerStyle, iconStyle, tooltipStyle } from '@domg/govflanders-style/component';
import Cleave from 'cleave.js';
import flatpickr from 'flatpickr';
import Dutch from 'flatpickr/dist/l10n/nl.js';
import { Instance } from 'flatpickr/dist/types/instance';
import { Options } from 'flatpickr/dist/types/options';
import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { vlInputAddonStyles } from '../../atom/button';
import { FormControl } from '../form-control';
import { inputFieldStyles } from '../input-field';
import { CleaveInstance, MaskOptions } from '../models/cleave.model';
import { createDateMask, createTimeMask } from './masks';
import { maskValidator } from './validators';
import { datepickerDefaults } from './vl-datepicker.defaults';
import { vlDatepickerFluxStyles } from './vl-datepicker.flux-css';

const dateRangeSeparator = ' tot en met ';

@webComponent('vl-datepicker')
export class VlDatepickerComponent extends FormControl {
    static formControlValidators = [...FormControl.formControlValidators, maskValidator];
    // Properties
    regex = datepickerDefaults.regex; // Wordt enkel gebruikt in de pattern validator
    // Attributes
    private block = datepickerDefaults.block;
    private readonly = datepickerDefaults.readonly;
    private value = datepickerDefaults.value;
    private placeholder = datepickerDefaults.placeholder;
    private autocomplete = datepickerDefaults.autocomplete;
    private type = datepickerDefaults.type;
    private format = datepickerDefaults.format;
    private amPm = datepickerDefaults.amPm;
    private minDate = datepickerDefaults.minDate;
    private maxDate = datepickerDefaults.maxDate;
    private minTime = datepickerDefaults.minTime;
    private maxTime = datepickerDefaults.maxTime;
    private disableMaskValidation = datepickerDefaults.disableMaskValidation; // Wordt enkel gebruikt in de mask validator
    private pattern = datepickerDefaults.pattern; // Wordt enkel gebruikt in de mask validator
    private disableMobileNativeInput = datepickerDefaults.disableMobileNativeInput;
    private position = datepickerDefaults.position;
    private isStatic = datepickerDefaults.isStatic;
    // Variables
    private initialValue = '';
    private inputHasFocus = false;
    private isOpen: boolean | undefined;
    private flatpickrInstance: Instance | null = null;
    private maskOptions: MaskOptions | null = null; // Wordt enkel gebruikt in de mask validator
    private cleaveInstance: CleaveInstance | null = null;
    private inputValue: string | undefined = ''; // Houdt de waarde van het getoonde inputveld bij
    private dispatchInput = false;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [
            resetStyle,
            baseStyle,
            iconStyle,
            inputFieldStyles,
            tooltipStyle,
            datepickerStyle,
            vlDatepickerFluxStyles,
            vlGroupStyles,
            vlInputAddonStyles,
        ];
    }

    static get properties() {
        return {
            block: { type: Boolean },
            readonly: { type: Boolean },
            value: { type: String }, // Bevat de waarde van het component
            placeholder: { type: String },
            autocomplete: { type: String },
            type: { type: String },
            format: { type: String },
            amPm: { type: Boolean, attribute: 'am-pm' },
            minDate: { type: String, attribute: 'min-date' },
            maxDate: { type: String, attribute: 'max-date' },
            minTime: { type: String, attribute: 'min-time' },
            maxTime: { type: String, attribute: 'max-time' },
            pattern: { type: String },
            disableMaskValidation: { type: Boolean, attribute: 'disable-mask-validation' },
            disableMobileNativeInput: { type: Boolean, attribute: 'disable-mobile-native-input' },
            rawValue: { type: Boolean, attribute: 'raw-value' },
            inputValue: { type: String, state: true }, // Houdt de waarde van het getoonde inputveld bij
            inputHasFocus: { type: Boolean, state: true },
            isOpen: { type: Boolean, state: true },
            position: { type: String },
            isStatic: { type: Boolean, attribute: 'static' },
        };
    }

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
    }

    connectedCallback() {
        super.connectedCallback();

        if (Dutch?.nl) {
            Dutch.nl = {
                ...Dutch.nl,
                rangeSeparator: dateRangeSeparator,
                yearAriaLabel: 'Jaar',
                monthAriaLabel: 'Maand',
                hourAriaLabel: 'Uur',
                minuteAriaLabel: 'Minuut',
            };
            flatpickr.l10ns.default.rangeSeparator = dateRangeSeparator;
        }

        if (!this.initialValue && typeof this.value === 'string' && this.type !== 'range') {
            this.initialValue = this.value;
        }
    }

    firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        // passen formaat aan indien niet opgegeven
        if (changedProperties.has('type') && !this.format) {
            const timeFormat = 'H:i';
            const dateFormat = 'd.m.Y';
            switch (this.type) {
                case 'date':
                    this.format = dateFormat;
                    break;
                case 'time':
                    this.format = timeFormat;
                    break;
                case 'date-time':
                    this.format = `${dateFormat} ${timeFormat}`;
                    break;
                default:
                    this.format = dateFormat;
            }
        }

        this.maskOptions = this.composeMaskForFormat(this.format, this.type);
        if (this.maskOptions && !this.disableMaskValidation) {
            this.cleaveInstance = new Cleave(this.validationTarget!, this.maskOptions);
        }

        this.initializeComponent();
        this.setInitialValue();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        const options = this.getDynamicOptions();
        const dynamicAttributes = ['disabled', 'readonly', 'minDate', 'maxDate', 'minTime', 'maxTime', 'position'];
        const nativeInputAttributes = ['disabled', 'readonly', 'placeholder', 'required', 'block', 'error', 'success'];

        if (dynamicAttributes.some((prop) => changedProperties.has(prop))) {
            this.updateOptionsForInstance(options);
        }

        const changedNativeAttributes = nativeInputAttributes.filter((prop) => changedProperties.has(prop));
        if (changedNativeAttributes.length) {
            this.updateOptionsForNativeInput(changedNativeAttributes, nativeInputAttributes);
        }

        if (changedProperties.has('value')) {
            // alleen als de inputValue niet aangepast is, updaten we deze met de nieuwe waarde
            // dit gebeurt typisch wanneer de waarde van buitenaf aangepast wordt
            if (!changedProperties.has('inputValue') && typeof this.value === 'string') {
                switch (this.type) {
                    case 'date-time':
                    case 'date': {
                        const date = flatpickr.parseDate(this.value, 'Z');
                        if (date) {
                            this.inputValue = flatpickr.formatDate(date, this.format);
                        } else if (!date && !this.value) {
                            this.flatpickrInstance?.clear();
                            this.inputValue = '';
                        }
                        break;
                    }
                    case 'time': {
                        const date = flatpickr.parseDate(this.value, this.format);
                        if (date) {
                            this.inputValue = flatpickr.formatDate(date, this.format);
                        } else if (!date && !this.value) {
                            this.flatpickrInstance?.clear();
                            this.inputValue = '';
                        }
                        break;
                    }
                    default:
                        this.inputValue = this.value;
                }
            }
        }

        if (changedProperties.has('inputValue')) {
            this.updateFormControlValue(this.inputValue ?? '');
        }

        if (changedProperties.has('block')) {
            if (this.block) {
                this.getFlatpickrWrapper()?.classList.add('flatpickr-wrapper--block');
            } else {
                this.getFlatpickrWrapper()?.classList.remove('flatpickr-wrapper--block');
            }
        }

        if (this.flatpickrInstance?.isMobile && !this.disableMobileNativeInput) {
            this.getNativeDateInput()?.classList.add(
                'js-vl-datepicker-input',
                'vl-input-field',
                'flatpickr-input',
                'flatpickr-mobile'
            );
            this.getNativeDateInput()?.classList.remove('vl-input-group');
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.flatpickrInstance?.destroy();
    }

    render(): TemplateResult {
        const inputClasses = {
            'vl-input-field': true,
            'vl-input-field--input-group-left': true,
            'js-vl-datepicker-toggle': true,
            'vl-input-field--error': this.error || this.isInvalid,
            'vl-input-field--success': this.success,
            'vl-input-field--block': this.block,
            'vl-input-field--disabled': this.disabled,
        };

        const buttonClasses = {
            'vl-input-addon': true,
            'js-vl-datepicker-toggle': true,
            'vl-input-addon--error': this.error || this.isInvalid,
            'vl-input-addon--success': this.success,
            'vl-input-addon--disabled': this.disabled,
        };

        return html`
            <div class="vl-group vl-group--input-group" id="datepicker-wrapper">
                ${!(this.flatpickrInstance?.isMobile && !this.disableMobileNativeInput)
                    ? html`
                          <input
                              id=${this.id || nothing}
                              name=${this.name || nothing}
                              class=${classMap(inputClasses)}
                              type="text"
                              aria-label=${this.label || nothing}
                              aria-invalid=${this.isInvalid || nothing}
                              ?required=${this.required}
                              ?disabled=${this.disabled}
                              ?error=${this.error}
                              ?readonly=${this.readonly}
                              .value=${live(this.inputValue)}
                              placeholder=${this.placeholder || nothing}
                              autocomplete=${this.autocomplete || nothing}
                              pattern=${this.pattern || nothing}
                              inputmode=${this.cleaveInstance ? 'numeric' : nothing}
                              @focus="${this.onInputFocus}"
                              @blur="${this.onInputBlur}"
                              @input=${!this.cleaveInstance ? this.onInput : nothing}
                          />
                          <button
                              id="toggle-calendar"
                              type="button"
                              class=${classMap(buttonClasses)}
                              ?disabled=${this.disabled || this.readonly}
                              aria-label="datumkiezer${this.label ? ` ${this.label}` : ''}"
                              aria-expanded=${this.isOpen}
                              aria-controls=${this.id || nothing}
                              @click=${this.toggleCalendar}
                          >
                              <span class="vl-icon vl-icon--small vl-vi vl-vi-calendar" aria-hidden="true"></span>
                          </button>
                      `
                    : nothing}
            </div>
            <div id="datepicker-calendar-placeholder"></div>
        `;
    }

    resetFormControl() {
        super.resetFormControl();

        this.setInitialValue();
    }

    getRawValue(): string | undefined {
        return this.cleaveInstance?.getRawValue();
    }

    getDates(): Date[] | undefined {
        return this.flatpickrInstance?.selectedDates;
    }

    private setInitialValue() {
        const initialDate = this.flatpickrInstance?.parseDate(this.initialValue, 'Z');
        this.value = this.initialValue;

        if (initialDate instanceof Date && !isNaN(initialDate as unknown as number) && this.type !== 'range') {
            this.flatpickrInstance?.setDate(initialDate, true);
            this.inputValue = flatpickr.formatDate(initialDate, this.format);
            this.dispatchInput = false;
        } else if (this.type === 'time' && this.initialValue) {
            this.inputValue = this.initialValue;
        } else {
            this.flatpickrInstance?.clear();
            this.inputValue = '';
        }
    }

    private parseTodayDate(dateString: 'today' | string | undefined): string | undefined {
        const formatDate = (date: Date) => flatpickr.formatDate(date, this.format);

        if (dateString === 'today') {
            return formatDate(new Date());
        } else if (dateString) {
            const parsedDate = flatpickr.parseDate(dateString, 'Z');
            return parsedDate ? formatDate(parsedDate) : undefined;
        } else {
            return undefined;
        }
    }

    private getDynamicOptions(): Options {
        const minimumDateTime = flatpickr.parseDate(this.minTime, this.format);
        return {
            allowInput: this.inputHasFocus && !(this.disabled || this.readonly),
            maxDate: this.maxDate,
            minDate: this.minDate,
            minTime: this.minTime,
            maxTime: this.maxTime,
            defaultHour: minimumDateTime?.getHours() ?? 12,
            defaultMinute: minimumDateTime?.getMinutes() ?? 0,
            position: this.position || 'auto',
        };
    }

    private addAccessibilityAttributes() {
        const calendar = this.shadowRoot?.querySelector('.flatpickr-calendar');
        calendar?.querySelectorAll('.flatpickr-day').forEach((day) => {
            // extend aria-label with the day of the week
            const dateString = day.getAttribute('aria-label');
            if (dateString) {
                const dateObj = new Date(dateString);
                const dayOfWeek = dateObj.toLocaleDateString('nl-NL', { weekday: 'long' });
                day.setAttribute('aria-label', `${dateString}, ${dayOfWeek}`);
                day.setAttribute('role', `button`);
            }
        });
        calendar?.querySelectorAll('.flatpickr-prev-month, .flatpickr-month')?.forEach((button) => {
            button.setAttribute(
                'aria-label',
                button.classList.contains('flatpickr-prev-month') ? 'Vorige maand' : 'Volgende maand'
            );
            button.setAttribute('role', 'button');
            button.querySelector('svg')?.setAttribute('aria-hidden', 'true');
        });
        calendar?.querySelector('.flatpickr-weekdays')?.setAttribute('aria-hidden', 'true');
    }

    private handleOpenChange = (isOpen: boolean) => {
        this.isOpen = isOpen;
        if (isOpen) {
            this.addAccessibilityAttributes();
        }
    };

    private getOptions(): Options {
        const datepickerButton = this.shadowRoot?.querySelector('button');
        const defaultDate = this.type !== 'range' && this.parseTodayDate(this.initialValue);
        const staticOptions = {
            dateFormat: this.format,
            locale: Dutch.nl,
            clickOpens: false,
            onChange: this.handleDatePickerChange,
            onOpen: this.handleOpenCalendar,
            onClose: this.handleCloseCalendar,
            positionElement: datepickerButton,
            static: this.isStatic,
            appendTo: this.getCalendarPlaceholder(),
            defaultDate: defaultDate,
            enableTime: this.type === 'time' || this.type === 'date-time',
            noCalendar: this.type === 'time',
            time_24hr: !this.amPm,
            mode: this.type !== 'range' ? 'single' : 'range',
            disableMobile: this.disableMobileNativeInput,
        };

        const options = {
            ...staticOptions,
            ...this.getDynamicOptions(),
        } as Options;

        Object.keys(options).forEach((key) => {
            if (options[key as keyof Options] === undefined) delete options[key as keyof Options];
        });
        return options;
    }

    private getDatePicker(): HTMLDivElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLDivElement>('#datepicker-wrapper');
    }

    private getFlatpickrWrapper(): HTMLDivElement | undefined | null {
        return this.shadowRoot?.querySelector<HTMLDivElement>('.flatpickr-wrapper');
    }

    private getNativeDateInput(): HTMLInputElement | undefined | null {
        return this.renderRoot?.querySelector<HTMLInputElement>('input[type="date"]');
    }

    private getCalendarPlaceholder(): HTMLDivElement {
        return this.shadowRoot?.querySelector('#datepicker-calendar-placeholder') as HTMLDivElement;
    }

    private updateOptionsForInstance(options: Options) {
        Object.keys(options)
            .map((key) => key as keyof Options)
            .forEach((key) => {
                this.flatpickrInstance?.set(key, options[key as keyof Options]);
            });
    }

    private updateOptionsForNativeInput(changedNativeAttributes: string[], nativeInputAttributes: string[]) {
        nativeInputAttributes.forEach((attribute) => {
            if (changedNativeAttributes.includes(attribute) && this.getNativeDateInput()) {
                this.updateInputForAttribute(attribute, this.getNativeDateInput()!);
            }
        });
    }

    private updateInputForAttribute(attribute: string, inputElement: HTMLInputElement) {
        const attributeKey = attribute as unknown as keyof VlDatepickerComponent;
        if (this[attributeKey]) {
            inputElement.setAttribute(attribute, typeof this[attributeKey] === 'boolean' ? '' : this[attributeKey]);
            inputElement.classList.add(`vl-input-field--${attributeKey}`);
        } else {
            inputElement.removeAttribute(attribute);
            inputElement.classList.remove(`vl-input-field--${attributeKey}`);
        }
    }

    private initializeComponent() {
        if (this.getDatePicker() && !this.flatpickrInstance) {
            this.flatpickrInstance = flatpickr(this.getDatePicker()!, this.getOptions()) as unknown as Instance;
            this.getDatePicker()?.classList.add('static');
            this.getDatePicker()?.removeAttribute('readonly');

            if (!this.isStatic) {
                this.calculateCalendarPlaceholderPosition();
            }
        }
    }

    private calculateCalendarPlaceholderPosition() {
        if (this.getDatePicker()) {
            const { top, left, height } = this.getDatePicker()!.getBoundingClientRect();
            const calendarPlaceholder = this.getCalendarPlaceholder();
            calendarPlaceholder.style.top = isSafari ? `calc(-${top}px - ${height}px)` : `-${top}px`;
            calendarPlaceholder.style.left = `-${left}px`;
        }
    }

    private toggleCalendar = () => {
        this.calculateCalendarPlaceholderPosition();
        this.flatpickrInstance?.toggle();
    };

    private handleCalendarClicked() {
        this.dispatchInput = true;
    }

    private onInputFocus = () => {
        this.inputHasFocus = true;
    };

    private onInputBlur = () => {
        this.inputHasFocus = false;
    };

    private onInput = (event: Event & { target: HTMLInputElement }) => {
        this.handleInputValueChanged(event.target?.value ?? '');
    };

    private getISODateString(date?: Date, date2?: Date): string {
        if (!date) return '';
        switch (this.type) {
            case 'time':
                return flatpickr.formatDate(date, this.format?.includes('S') ? 'H:i:S' : 'H:i');
            case 'date-time':
                return flatpickr.formatDate(date, 'Y-m-dTH:i');
            case 'range':
                return `${flatpickr.formatDate(date, 'Y-m-d')}${
                    date2 ? '/' + flatpickr.formatDate(date2, 'Y-m-d') : ''
                }`;
            case 'date':
            default:
                return flatpickr.formatDate(date, 'Y-m-d');
        }
    }

    // functie die de start- en einddatum zal extraheren uit de geformatteerde invoerwaarde met scheidingsteken (tot en met)
    private getDatesFromInputValue(inputValue: string): Date[] | undefined {
        const rangeSeparator = Dutch?.nl?.rangeSeparator;
        const dateStrings = (rangeSeparator && inputValue.split(rangeSeparator)) || [];
        const dates = dateStrings?.map((dateString) => flatpickr.parseDate(dateString, this.format));
        return dates.length && dates.every((date) => date instanceof Date) ? (dates as Date[]) : undefined;
    }

    private handleInputValueChanged(dateString: string, isValidDateString = true) {
        this.dispatchInput = true;
        let parsedDate, isValidFormat;
        // we verwachten een fout die opgeworpen wordt wanneer de waarde niet conform het formaat is
        // daarom gebruiken we een try-catch
        try {
            // indien een RegExp opgegeven is, controleren we of de waarde conform het formaat is
            const patternRegExp = this.pattern ? new RegExp(this.pattern) : undefined;
            const regex = this.regex || patternRegExp;
            isValidFormat = regex ? regex.test(dateString) : true;
            if (isValidFormat) parsedDate = flatpickr.parseDate(dateString, this.format);
            // eslint-disable-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // we vangen de error op, maar behandelen we die niet en gaan verder met de default waarde
        } finally {
            if (isValidDateString && isValidFormat && parsedDate && this.type !== 'range') {
                this.value = this.getISODateString(parsedDate);
            } else if (this.type === 'range') {
                const dates = this.getDatesFromInputValue(dateString);
                if (dates?.length) {
                    this.value = this.getISODateString(dates[0], dates[1]);
                } else {
                    this.value = dateString;
                }
                this.inputValue = dateString;
            } else {
                // indien de waarde niet conform het verwachte formaat is of niet kon geconverteerd worden
                // stellen we de value gelijk aan de inputValue
                this.inputValue = dateString;
                this.value = dateString;
            }
            if (parsedDate instanceof Date && !isNaN(parsedDate as unknown as number)) {
                this.flatpickrInstance?.setDate(dateString, false, this.format);
            }
        }
    }

    private handleDatePickerChange = (dates: Date[]) => {
        const format = (date: Date) => flatpickr.formatDate(date, this.format);
        if (dates.length === 1) {
            this.inputValue = format(dates[0]);
            this.value = this.getISODateString(dates[0]);
        } else if (dates.length === 2) {
            this.value = this.getISODateString(dates[0], dates[1]);
            this.inputValue = `${format(dates[0])}${Dutch?.nl?.rangeSeparator}${format(dates[1])}`;
        }
    };

    private handleOpenCalendar = () => {
        this.handleOpenChange(true);
        this.addEventListener('click', this.handleCalendarClicked);
    };

    private handleCloseCalendar = () => {
        this.handleOpenChange(false);
        this.removeEventListener('click', this.handleCalendarClicked);
    };

    private updateFormControlValue = (inputValue: string) => {
        const detail = { value: this.value };
        const date = this.flatpickrInstance?.parseDate(inputValue, this.format);
        // indien de waarde getypt wordt, updaten we de flatpickr instance zodat deze de nieuwe waarde toont
        if (this.inputValue !== this.flatpickrInstance?.input.value && date) {
            this.flatpickrInstance?.setDate(date, false, this.format);
        }
        this.setValue(this.value ?? '');
        this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
        if (this.dispatchInput) {
            this.dispatchEvent(new CustomEvent('vl-input', { composed: true, bubbles: true, detail }));
            this.dispatchInput = false;
        }
        this.dispatchEventIfValid(detail);
    };

    private composeMaskForFormat(format: string, type: string): MaskOptions | null {
        if (!format) return null;
        let maskOptions: MaskOptions | null = null;
        switch (type) {
            case 'date':
                maskOptions = createDateMask(format, this.minDate, this.maxDate);
                break;
            case 'time':
                maskOptions = createTimeMask(format);
                break;
            default:
                break;
        }
        return maskOptions
            ? {
                  ...maskOptions,
                  // als we een cleave mask gebruiken, willen we de transformed value verkrijgen
                  onValueChanged: ({
                      target: { value, rawValue },
                  }: {
                      target: { value: string; rawValue: string };
                  }) => {
                      // flatpickr gaat soms een string parsen naar een Date, ook al is de string niet conform het verwachte formaat
                      // daarom voegen we hier nog een extra check toe om te voorkomen dat we een ongeldige datum in de flatpickr instance instellen
                      const isValidDateString = maskOptions?.regex?.test(rawValue);
                      this.handleInputValueChanged(value ?? '', isValidDateString);
                  },
              }
            : null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-datepicker': VlDatepickerComponent;
    }
}
