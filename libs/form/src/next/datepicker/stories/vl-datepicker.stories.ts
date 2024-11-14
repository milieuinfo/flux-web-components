import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { datepickerArgs, datepickerArgTypes } from './vl-datepicker.stories-arg';
import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { formatEpoch } from './vl-datepicker.stories-util';
import datepickerDocs from './vl-datepicker.stories-doc.mdx';
import { VlDatepickerComponent } from '../vl-datepicker.component';

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
        },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 400px;">${story()}</div>`],
} as Meta<typeof datepickerArgs>;

export const DatepickerDefault = story(
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
    }) => {
        return html`
            <div style="height: 400px;">
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
                    min-date=${formatEpoch(minDate, format)}
                    max-date=${formatEpoch(maxDate, format)}
                    min-time=${minTime}
                    max-time=${maxTime}
                    am-pm=${amPm}
                    pattern=${pattern}
                    .regex=${regex}
                    @vl-change=${onVlChange}
                    @vl-input=${onVlInput}
                    @vl-reset=${onVlReset}
                    @vl-valid=${onVlValid}
                >
                </vl-datepicker-next>
            </div>
        `;
    }
);
DatepickerDefault.storyName = 'vl-datepicker-next - default';
