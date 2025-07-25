import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlDatepickerComponent } from '../vl-datepicker.component';
import { datepickerArgs, datepickerArgTypes } from './vl-datepicker.stories-arg';
import datepickerDocs from './vl-datepicker.stories-doc.mdx';
import { createDateRange } from './vl-datepicker.stories-util';

registerWebComponents([VlDatepickerComponent]);

export default {
    id: 'form-next-datepicker',
    title: 'Form-next/datepicker',
    tags: ['autodocs'],
    args: datepickerArgs,
    argTypes: datepickerArgTypes,
    parameters: {
        docs: {
            page: datepickerDocs,
            story: {
                inline: false,
                iframeHeight: 400,
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
        block,
        disabled,
        error,
        readonly,
        required,
        disableMobileNativeInput,
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
    }) => {
        return html`
                <vl-datepicker-next
                id=${id}
                name=${name}
                label=${label}
                value=${value}
                placeholder=${placeholder}
                autocomplete=${autocomplete}
                ?error=${error}
                ?success=${success}
                ?required=${required}
                ?readonly=${readonly}
                ?disabled=${disabled}
                ?block=${block}
                ?disable-mobile-native-input=${disableMobileNativeInput}
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
        `;
    }
);

export const DatepickerDefault = DatepickerTemplate.bind({});
DatepickerDefault.storyName = 'vl-datepicker-next - default';
DatepickerDefault.args = {
    id: 'datepicker-default',
    name: 'datepicker-default',
};

const format = 'd.m.Y';
const [minDateString, maxDateString] = createDateRange(new Date(), 2, format);

export const DatepickerMinDateAndMaxDate = DatepickerTemplate.bind({});
DatepickerMinDateAndMaxDate.storyName = 'vl-datepicker-next - min-date en max-date';
DatepickerMinDateAndMaxDate.args = {
    id: 'datepicker-default',
    name: 'datepicker-default',
    minDate: minDateString,
    maxDate: maxDateString,
    value: new Date().toISOString(),
    format,
};

export const DatepickerStatic = DatepickerTemplate.bind({});
DatepickerStatic.storyName = 'vl-datepicker-next - static';
DatepickerStatic.args = {
    id: 'datepicker-static',
    name: 'datepicker-static',
    isStatic: true,
};

const [minDateRangeString, maxDateRangeString] = createDateRange(new Date(), 10, format);
const rangeValue = createDateRange(new Date(), 4, 'Y-m-d', '/') as string;

export const DatepickerRange = DatepickerTemplate.bind({});
DatepickerRange.storyName = 'vl-datepicker-next - range';
DatepickerRange.args = {
    id: 'datepicker-range',
    name: 'datepicker-range',
    type: 'range',
    minDate: minDateRangeString,
    maxDate: maxDateRangeString,
    format,
    value: rangeValue,
};

export const DatepickerTime = DatepickerTemplate.bind({});
DatepickerTime.storyName = 'vl-datepicker-next - time';
DatepickerTime.args = {
    id: 'datepicker-time',
    name: 'datepicker-time',
    type: 'time',
    format: 'H:i',
};

export const DatepickerDateTime = DatepickerTemplate.bind({});
DatepickerDateTime.storyName = 'vl-datepicker-next - date-time';
DatepickerDateTime.args = {
    id: 'datepicker-datetime',
    name: 'datepicker-datetime',
    type: 'date-time',
    format: `${format} H:i`,
};
