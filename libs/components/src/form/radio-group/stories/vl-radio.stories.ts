import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { radioArgs, radioArgTypes } from './vl-radio.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlRadioComponent } from '../vl-radio.component';

registerWebComponents([VlRadioComponent]);

export default {
    id: 'components-form-radio-group',
    title: 'Components - Form/radio-group',
    tags: ['autodocs'],
    args: radioArgs,
    argTypes: radioArgTypes,
} as Meta<typeof radioArgs>;

export const RadioDefault = story(
    radioArgs,
    ({
        id,
        name,
        label,
        block,
        readonly,
        checked,
        disabled,
        error,
        success,
        value,
        defaultSlot,
        onVlChange,
        onVlInput,
        onVlValid,
    }) => html`
        <vl-radio
            id=${id}
            name=${name}
            label=${label}
            value=${value}
            ?block=${block}
            ?readonly=${readonly}
            ?checked=${checked}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-valid=${onVlValid}
        >
            ${unsafeHTML(defaultSlot)}
        </vl-radio>
    `
);
RadioDefault.storyName = 'vl-radio - default';
RadioDefault.args = {
    value: 'Optie 1',
    defaultSlot: 'Optie 1',
};
