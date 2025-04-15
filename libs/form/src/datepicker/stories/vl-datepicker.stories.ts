import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlDatepickerComponent } from '../vl-datepicker.component';
import { datepickerArgs, datepickerArgTypes } from './vl-datepicker.stories-arg';
import datepickerDocs from './vl-datepicker.stories-doc.mdx';
import { formatEpoch } from './vl-datepicker.stories-util';

registerWebComponents([VlDatepickerComponent]);

export default {
    id: 'form-datepicker',
    title: 'Form/datepicker',
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
            <div style="height: 400px;">
                <vl-datepicker
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
                    position=${position}
                    static=${isStatic}
                >
                </vl-datepicker>
            </div>
        `;
    }
);

export const DatepickerDefault = DatepickerTemplate.bind({});
DatepickerDefault.storyName = 'vl-datepicker - default';
DatepickerDefault.args = {
    id: 'datepicker-default',
    name: 'datepicker-default',
};

export const DatepickerStatic = DatepickerTemplate.bind({});
DatepickerStatic.storyName = 'vl-datepicker - static';
DatepickerStatic.args = {
    id: 'datepicker-static',
    name: 'datepicker-static',
    isStatic: true,
};
