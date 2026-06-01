import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
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

export const FormMessageDefault = story(
    formMessageArgs,
    ({ for: forValue, state, variant, show, preLine, defaultSlot }) => {
        return html`
            <vl-form-message
                for=${forValue}
                state=${state}
                variant=${variant}
                ?show=${show}
                ?pre-line=${preLine}
                validation-message=${defaultSlot}
            ></vl-form-message>
        `;
    }
);
FormMessageDefault.storyName = 'vl-form-message - default';
FormMessageDefault.args = {
    show: true,
    defaultSlot: 'Dit is een form message.',
};

export const FormMessageSuccess = story(formMessageArgs, ({ show, defaultSlot }) => {
    return html` <vl-form-message variant="success" ?show=${show}>${defaultSlot}</vl-form-message> `;
});
FormMessageSuccess.storyName = 'vl-form-message - success';
FormMessageSuccess.args = {
    show: true,
    defaultSlot: 'Dit veld is correct ingevuld.',
};

export const FormMessageAnnotation = story(formMessageArgs, ({ show, defaultSlot }) => {
    return html` <vl-form-message variant="annotation" ?show=${show}>${defaultSlot}</vl-form-message> `;
});
FormMessageAnnotation.storyName = 'vl-form-message - annotation';
FormMessageAnnotation.args = {
    show: true,
    defaultSlot: 'Extra toelichting bij dit veld.',
};
