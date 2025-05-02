import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { radioGroupArgs, radioGroupArgTypes } from './vl-radio-group.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import radioGroupDoc from './vl-radio-group.stories-doc.mdx';
import { VlRadioComponent } from '../vl-radio.component';
import { VlRadioGroupComponent } from '../vl-radio-group.component';

registerWebComponents([VlRadioComponent, VlRadioGroupComponent]);

export default {
    id: 'components-form-radio-group',
    title: 'Components - Form/radio-group',
    tags: ['autodocs'],
    args: radioGroupArgs,
    argTypes: radioGroupArgTypes,
    parameters: {
        docs: {
            page: radioGroupDoc,
        },
    },
} as Meta<typeof radioGroupArgs>;

export const RadioGroupDefault = story(
    radioGroupArgs,
    ({
        id,
        required,
        readonly,
        disabled,
        error,
        success,
        label,
        name,
        value,
        onVlChange,
        onVlInput,
        onVlReset,
        onVlValid,
    }) => html`
        <vl-radio-group
            id=${id}
            name=${name}
            label=${label}
            value=${value}
            ?required=${required}
            ?readonly=${readonly}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-reset=${onVlReset}
            @vl-valid=${onVlValid}
        >
            <vl-radio value="land">Land</vl-radio>
            <vl-radio value="zee">Zee</vl-radio>
            <vl-radio value="lucht">Lucht</vl-radio>
        </vl-radio-group>
    `
);
RadioGroupDefault.storyName = 'vl-radio-group - default';
RadioGroupDefault.args = {
    id: 'land-zee',
    name: 'land-zee',
    label: 'land-zee',
    value: 'land',
};
