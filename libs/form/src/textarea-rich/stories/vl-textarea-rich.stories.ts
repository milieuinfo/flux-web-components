import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import textareaRichDocs from './vl-textarea-rich.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTextareaRichComponent } from '../vl-textarea-rich.component';
import { textareaRichArgTypes, textareaRichArgs } from './vl-textarea-rich.stories-arg';

registerWebComponents([VlTextareaRichComponent]);

export default {
    id: 'form-textarea-rich',
    title: 'Form/textarea-rich',
    tags: ['autodocs'],
    args: textareaRichArgs,
    argTypes: textareaRichArgTypes,
    parameters: {
        // Excluding 'block' en 'cols': veld neemt altijd de volledige breedte van de parent in
        // Excluding 'placeholder': de vl-typography CSS van DV zorgt ervoor dat de placeholder niet zichtbaar is
        controls: { exclude: ['block', 'cols', 'placeholder'] },
        docs: {
            page: textareaRichDocs,
        },
    },
} as Meta<typeof textareaRichArgs>;

const Template = story(
    textareaRichArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        readonly,
        value,
        autocomplete,
        minLength,
        maxLength,
        rows,
        toolbar,
        plugins,
        preview,
        customConfig,
        onVlChange,
        onVlInput,
        onVlReset,
        onVlValid,
    }) => {
        return html` <vl-textarea-rich
            id=${id}
            name=${name}
            label=${label}
            ?required=${required}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            ?readonly=${readonly}
            value=${value}
            autocomplete=${autocomplete}
            min-length=${minLength}
            max-length=${maxLength}
            rows=${rows}
            toolbar=${toolbar}
            plugins=${plugins}
            ?preview=${preview}
            .customConfig=${customConfig}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-reset=${onVlReset}
            @vl-valid=${onVlValid}
        ></vl-textarea-rich>`;
    }
);

export const TextareaRichDefault = Template.bind({});
TextareaRichDefault.storyName = 'vl-textarea-rich - default';
TextareaRichDefault.args = {
    id: 'textarea-rich-default',
    value: '<p><b>b-tag</b></p><p><i>i-tag</i></p><p><u>u-tag</u></p><p><s>s-tag</s></p>',
    toolbar: 'undo redo | bold italic underline | link | h1 h2 | bullist numlist | paste pastetext',
    plugins: 'link lists',
};

export const TextareaRichToolbar = Template.bind({});
TextareaRichToolbar.storyName = 'vl-textarea-rich - toolbar';
TextareaRichToolbar.args = {
    id: 'textarea-rich-toolbar',
    rows: 40,
    toolbar: 'undo redo | h1 h2 h3 h4 h5 h6 | bold italic underline strikethrough | blockquote | hr',
    value: '<h1>h1 title</h1><h2>h2 title</h2><h3>h3 title</h3><h4>h4 title</h4><h5>h5 title</h5><h6>h6 title</h6><hr><p><b>b-tag</b></p><p><i>i-tag</i></p><p><u>u-tag</u></p><p><s>s-tag</s></p><hr><blockquote>blockquote-tag</blockquote>',
};

export const TextareaRichPlugins = Template.bind({});
TextareaRichPlugins.storyName = 'vl-textarea-rich - plugins';
TextareaRichPlugins.args = {
    id: 'textarea-rich-plugins',
    rows: 30,
    toolbar: 'undo redo | h5 | bold italic underline strikethrough | bullist numlist | link',
    plugins: 'lists link',
    value: '<h5>Link</h5><p><a href="https://www.vlaanderen.be/" target="_blank" rel="noopener">https://www.vlaanderen.be/</a></p><h5>Unordered list</h5><ul><li>Unordered list item 1</li><li>Unordered list item 2</li><ul><li>Unordered list subitem 1</li><li>Unordered list subitem 2</li></ul><li>Unordered list item 3</ul><h5>Ordered list</h5><ol><li>Ordered list item 1</li><li>Ordered list item 2</li><ol><li>Ordered list subitem 1</li><li>Ordered list subitem 2</li></ol><li>Ordered list item 3</ol>',
};
