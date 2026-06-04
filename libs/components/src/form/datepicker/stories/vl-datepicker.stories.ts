import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlFormLabelComponent } from '../../form-label';
import { VlFormMessageComponent } from '../../form-message';
import { VlDatepickerComponent } from '../vl-datepicker.component';
import { datepickerArgs, datepickerArgTypes } from './vl-datepicker.stories-arg';
import datepickerDocs from './vl-datepicker.stories-doc.mdx';
import { createDateRange } from './vl-datepicker.stories-util';

registerWebComponents([VlDatepickerComponent, VlFormMessageComponent, VlFormLabelComponent, VlButtonComponent]);

export default {
    id: 'components-form-datepicker',
    title: 'Components - Form/datepicker',
    tags: ['autodocs'],
    args: datepickerArgs,
    argTypes: datepickerArgTypes,
    parameters: {
        docs: {
            page: datepickerDocs,
            story: {
                inline: false,
                iframeHeight: 440,
            },
        },
    },
    decorators: [
        (storyFn) => {
            return html` <div style="height: 400px">${storyFn()}</div> `;
        },
    ],
} as Meta<typeof datepickerArgs>;

const DatepickerTemplate = story(
    datepickerArgs,
    ({
        id,
        type,
        format,
        minDate,
        maxDate,
        minTime,
        maxTime,
        amPm,
        success,
        blurValidation,
        block,
        disabled,
        error,
        readonly,
        required,
        disableMaskValidation,
        value,
        placeholder,
        autocomplete,
        label,
        pattern,
        regex,
        name,
        onVlChange,
        onVlInput,
        onVlReset,
        onVlValid,
        position,
        isStatic,
        helperText,
    }: typeof datepickerArgs) => {
        return html`
            <form @submit=${(e: Event) => e.preventDefault()} class="vl-grid">
                <div class="vl-column vl-column--12">
                    <vl-form-label for="${id}">${label}</vl-form-label>
                    <div>
                        <vl-datepicker
                            id=${id}
                            name=${name}
                            label=${label}
                            value=${value}
                            placeholder=${placeholder}
                            autocomplete=${autocomplete}
                            ?error=${error}
                            ?success=${success}
                            ?blur-validation=${blurValidation}
                            ?required=${required}
                            ?readonly=${readonly}
                            ?disabled=${disabled}
                            ?block=${block}
                            ?disable-mask-validation=${disableMaskValidation}
                            type=${type}
                            format=${format}
                            min-date=${minDate}
                            max-date=${maxDate}
                            min-time=${minTime}
                            max-time=${maxTime}
                            am-pm=${amPm}
                            pattern=${pattern}
                            .regex=${regex}
                            @vl-change=${onVlChange}
                            @vl-input=${onVlInput}
                            @vl-reset=${onVlReset}
                            @vl-valid=${onVlValid}
                            position=${position}
                            static=${isStatic}
                        >
                        </vl-datepicker>
                    </div>
                    ${!!helperText && html`<vl-text annotation>${helperText}</vl-text>`}
                    <vl-form-message for="${id}" state="patternMismatch"
                        >Waarde voldoet niet aan het opgegeven patroon.</vl-form-message
                    >
                    <vl-form-message for="${id}" state="rangeOverflow"
                        >Waarde overschrijdt het toegestane maximum.</vl-form-message
                    >
                    <vl-form-message for="${id}" state="rangeUnderflow"
                        >Waarde ligt onder het toegestane minimum.</vl-form-message
                    >
                </div>
                <div class="vl-column vl-column--12">
                    <vl-button type="submit">Submit</vl-button>
                </div>
            </form>
        `;
    }
);

export const DatepickerDefault = DatepickerTemplate.bind({});
DatepickerDefault.storyName = 'vl-datepicker - default';
DatepickerDefault.args = {
    id: 'datepicker-default',
    name: 'datepicker-default',
    placeholder: 'dd.mm.YYYY',
    label: 'Datum',
    helperText: 'Typ of selecteer een datum',
};

const format = 'd.m.Y';
const [minDateString, maxDateString] = createDateRange(new Date(), 2, format);

export const DatepickerMinDateAndMaxDate = DatepickerTemplate.bind({});
DatepickerMinDateAndMaxDate.storyName = 'vl-datepicker - min-date en max-date';
DatepickerMinDateAndMaxDate.args = {
    id: 'datepicker-min-max-date',
    name: 'datepicker-min-max-date',
    minDate: minDateString,
    maxDate: maxDateString,
    value: new Date().toISOString(),
    format,
    placeholder: 'dd.mm.YYYY',
    label: 'Datum',
    helperText: 'Typ of selecteer een datum tussen de minimum en maximum data',
};

export const DatepickerStatic = DatepickerTemplate.bind({});
DatepickerStatic.storyName = 'vl-datepicker - static';
DatepickerStatic.args = {
    id: 'datepicker-static',
    name: 'datepicker-static',
    isStatic: true,
    placeholder: 'dd.mm.YYYY',
    label: 'Datum',
    helperText: 'Typ of selecteer een datum',
};

const [minDateRangeString, maxDateRangeString] = createDateRange(new Date(), 10, format);
const rangeValue = createDateRange(new Date(), 4, 'Y-m-d', '/') as string;

export const DatepickerRange = DatepickerTemplate.bind({});
DatepickerRange.storyName = 'vl-datepicker - range';
DatepickerRange.args = {
    id: 'datepicker-range',
    name: 'datepicker-range',
    type: 'range',
    minDate: minDateRangeString,
    maxDate: maxDateRangeString,
    format,
    value: rangeValue,
    label: 'Start- en einddatum',
    placeholder: 'dd.mm.YYYY tot en met dd.mm.YYYY',
    helperText: 'Kies een start- en einddatum',
};

export const DatepickerTime = DatepickerTemplate.bind({});
DatepickerTime.storyName = 'vl-datepicker - time';
DatepickerTime.args = {
    id: 'datepicker-time',
    name: 'datepicker-time',
    type: 'time',
    format: 'H:i',
    label: 'Tijd',
    placeholder: 'hh:mm',
    helperText: 'Kies een tijd',
};

export const DatepickerMinTimeAndMaxTime = DatepickerTemplate.bind({});
DatepickerMinTimeAndMaxTime.storyName = 'vl-datepicker - min-time en max-time';
DatepickerMinTimeAndMaxTime.args = {
    id: 'datepicker-min-max-time',
    name: 'datepicker-min-max-time',
    minTime: '10:00',
    maxTime: '11:00',
    type: 'time',
    format: 'H:i',
    label: 'Tijd',
    placeholder: 'hh:mm',
    helperText: 'Kies een tijd tussen een minimum en maximum',
};

export const DatepickerDateTime = DatepickerTemplate.bind({});
DatepickerDateTime.storyName = 'vl-datepicker - date-time';
DatepickerDateTime.args = {
    id: 'datepicker-datetime',
    name: 'datepicker-datetime',
    type: 'date-time',
    format: `${format} H:i`,
    label: 'Datum en tijd',
    placeholder: 'dd.mm.YYYY hh:mm',
    helperText: 'Kies een datum en tijd',
};
