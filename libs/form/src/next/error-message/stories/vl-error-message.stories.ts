import { story } from '@domg-wc/common-storybook';
import { errorMessageArgs, errorMessageArgTypes } from './vl-error-message.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import errorMessageDocs from './vl-error-message.stories-doc.mdx';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlErrorMessageComponent } from '../vl-error-message.component';

registerWebComponents([VlErrorMessageComponent]);

export default {
    id: 'form-next-error-message',
    title: 'Form-next/error-message',
    tags: ['autodocs'],
    args: errorMessageArgs,
    argTypes: errorMessageArgTypes,
    parameters: {
        docs: {
            page: errorMessageDocs,
        },
    },
} as Meta<typeof errorMessageArgs>;

export const ErrorMessageDefault = story(errorMessageArgs, ({ for: forValue, state, show, preLine, defaultSlot }) => {
    return html`
        <vl-error-message-next
            for=${forValue}
            state=${state}
            ?show=${show}
            ?pre-line=${preLine}
            validation-message=${defaultSlot}
        ></vl-error-message-next>
    `;
});
ErrorMessageDefault.storyName = 'vl-error-message-next - default';
ErrorMessageDefault.args = {
    show: true,
    defaultSlot: 'Dit is een error message.',
};
