import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { nothing } from 'lit';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlCheckboxComponent } from '../vl-checkbox.component';
import { checkboxArgs, checkboxArgTypes } from './vl-checkbox.stories-arg';
import checkboxDoc from './vl-checkbox.stories-doc.mdx';

registerWebComponents([VlCheckboxComponent]);

export default {
    id: 'components-form-checkbox',
    title: 'Components - Form/checkbox',
    tags: ['autodocs'],
    args: checkboxArgs,
    argTypes: checkboxArgTypes,
    parameters: {
        docs: {
            page: checkboxDoc,
        },
    },
} as Meta<typeof checkboxArgs>;

const CheckboxTemplate = story(
    checkboxArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        block,
        value,
        checked,
        indeterminate,
        isSwitch,
        contentSlot,
        onVlChange,
        onVlInput,
        onVlReset,
        onVlValid,
    }) => html`
        <vl-checkbox
            id=${id}
            name=${name}
            label=${label}
            ?required=${required}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            ?block=${block}
            value=${value}
            ?checked=${checked}
            ?indeterminate=${indeterminate}
            ?switch=${isSwitch}
            @vl-input=${onVlInput}
            @vl-change=${onVlChange}
            @vl-reset=${onVlReset}
            @vl-valid=${onVlValid}
        >
            ${unsafeHTML(contentSlot)}
        </vl-checkbox>
    `
);

export const CheckboxDefault = CheckboxTemplate.bind({});
CheckboxDefault.storyName = 'vl-checkbox - default';
CheckboxDefault.args = {
    id: 'checkbox-default',
    name: 'checkbox',
    contentSlot: '<span>Bevestig</span>',
};

export const CheckboxValue = CheckboxTemplate.bind({});
CheckboxValue.storyName = 'vl-checkbox - value';
CheckboxValue.args = {
    id: 'checkbox-value',
    name: 'checkbox',
    value: 'bevestigd',
    contentSlot: '<span>Bevestig</span>',
};

export const CheckboxSwitch = CheckboxTemplate.bind({});
CheckboxSwitch.storyName = 'vl-checkbox - switch';
CheckboxSwitch.args = {
    id: 'checkbox-switch',
    name: 'checkbox',
    isSwitch: true,
    contentSlot: '<span>Instellingen toepassen</span>',
};

export const CheckboxReadonly = story(
    checkboxArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        block,
        value,
        checked,
        isSwitch,
        contentSlot,
        onVlInput,
    }) => html`
        <vl-checkbox
            id=${id}
            name=${name}
            label=${label}
            ?required=${required}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            ?block=${block}
            value=${value}
            ?checked=${checked}
            ?switch=${isSwitch}
            @vl-input=${onVlInput}
        >
            ${unsafeHTML(contentSlot)}
        </vl-checkbox>
        <input type="hidden" name=${name} value=${checked ? value || 'on' : nothing} />
    `
);
CheckboxReadonly.storyName = 'vl-checkbox - readonly';
CheckboxReadonly.args = {
    id: 'checkbox-readonly',
    name: 'checkbox',
    disabled: true,
    checked: true,
    value: 'bevestigd',
    contentSlot: '<span>Bevestig</span>',
};
