import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlTextareaComponent } from '../vl-textarea.component';
import { textareaArgs, textareaArgTypes } from './vl-textarea.stories-arg';
import textareaDocs from './vl-textarea.stories-doc.mdx';

registerWebComponents([VlTextareaComponent]);

export default {
    id: 'components-form-textarea',
    title: 'Components - Form/textarea',
    tags: ['autodocs'],
    args: textareaArgs,
    argTypes: textareaArgTypes,
    parameters: {
        docs: {
            page: textareaDocs,
        },
    },
} as Meta<typeof textareaArgs>;

export const TextareaDefault = story(
    textareaArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        blurValidation,
        block,
        readonly,
        value,
        placeholder,
        autocomplete,
        minLength,
        maxLength,
        rows,
        cols,
        onVlChange,
        onVlInput,
        onVlReset,
        onVlValid,
    }) => {
        return html` <vl-textarea
            id=${id}
            name=${name}
            label=${label}
            ?required=${required}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            ?blur-validation=${blurValidation}
            ?block=${block}
            ?readonly=${readonly}
            value=${value}
            placeholder=${placeholder}
            autocomplete=${autocomplete}
            min-length=${minLength}
            max-length=${maxLength}
            rows=${rows}
            cols=${cols}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-reset=${onVlReset}
            @vl-valid=${onVlValid}
        ></vl-textarea>`;
    }
);
TextareaDefault.storyName = 'vl-textarea - default';

export const TextareaBlurValidation = TextareaDefault.bind({});
TextareaBlurValidation.storyName = 'vl-textarea - blur validation';
TextareaBlurValidation.args = {
    required: true,
    minLength: 5,
    blurValidation: true,
    placeholder: 'Min. 5 karakters',
};
