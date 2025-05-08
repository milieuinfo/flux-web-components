import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlFormMessageComponent } from '../vl-form-message.component';
import { formMessageArgs, formMessageArgTypes } from './vl-form-message.stories-arg';
import formMessageDocs from './vl-form-message.stories-doc.mdx';

registerWebComponents([VlFormMessageComponent]);

export default {
    id: 'components-form-form-message',
    title: 'Components - Form/form-message',
    tags: ['autodocs'],
    args: formMessageArgs,
    argTypes: formMessageArgTypes,
    parameters: {
        docs: {
            page: formMessageDocs,
        },
    },
} as Meta<typeof formMessageArgs>;

export const FormMessageDefault = story(formMessageArgs, ({ for: forValue, state, show, preLine, defaultSlot }) => {
    return html`
        <vl-form-message
            for=${forValue}
            state=${state}
            ?show=${show}
            ?pre-line=${preLine}
            validation-message=${defaultSlot}
        ></vl-form-message>
    `;
});
FormMessageDefault.storyName = 'vl-form-message - default';
FormMessageDefault.args = {
    show: true,
    defaultSlot: 'Dit is een form message.',
};
