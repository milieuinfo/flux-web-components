import { story } from '@domg-wc/common-storybook';
import { selectRichArgs, selectRichArgTypes } from './vl-select-rich.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import selectRichDocs from './vl-select-rich.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlSelectRichComponent } from '../vl-select-rich.component';

registerWebComponents([VlSelectRichComponent]);

export default {
    id: 'form-next-select-rich',
    title: 'Form-next/select-rich',
    tags: ['autodocs'],
    args: selectRichArgs,
    argTypes: selectRichArgTypes,
    parameters: {
        docs: {
            page: selectRichDocs,
        },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 400px;">${story()}</div>`],
} as Meta<typeof selectRichArgs>;

const SelectRichTemplate = story(
    selectRichArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        options,
        placeholder,
        notDeletable,
        multiple,
        search,
        position,
        resultLimit,
        noResultsText,
        noChoicesText,
        searchPlaceholder,
        onVlChange,
        onVlInput,
        onVlSelectSearch,
        onVlReset,
        onVlValid,
    }) => {
        return html` <vl-select-rich-next
            id=${id}
            name=${name}
            label=${label}
            ?required=${required}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            .options=${options}
            placeholder=${placeholder}
            ?not-deletable=${notDeletable}
            ?multiple=${multiple}
            ?search=${search}
            position=${position}
            result-limit=${resultLimit}
            no-results-text=${noResultsText}
            no-choices-text=${noChoicesText}
            search-placeholder=${searchPlaceholder}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-select-search=${onVlSelectSearch}
            @vl-reset=${onVlReset}
            @vl-valid=${onVlValid}
        ></vl-select-rich-next>`;
    }
);

export const SelectRichDefault = SelectRichTemplate.bind({});
SelectRichDefault.storyName = 'vl-select-rich-next - default';
SelectRichDefault.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    options: [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectRichSearch = SelectRichTemplate.bind({});
SelectRichSearch.storyName = 'vl-select-rich-next - search';
SelectRichSearch.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    search: true,
    options: [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectRichNotDeletable = SelectRichTemplate.bind({});
SelectRichNotDeletable.storyName = 'vl-select-rich-next - not-deletable';
SelectRichNotDeletable.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    notDeletable: true,
    options: [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectRichGroups = SelectRichTemplate.bind({});
SelectRichGroups.storyName = 'vl-select-rich-next - groups';
SelectRichGroups.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    options: [
        {
            label: 'België',
            value: '',
            choices: [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
            ],
        },
        {
            label: 'Puerto Rico',
            value: '',
            choices: [{ label: 'Rio Piedras', value: 'rio piedras' }],
        },
    ],
};

export const SelectRichMultiple = SelectRichTemplate.bind({});
SelectRichMultiple.storyName = 'vl-select-rich-next - multiple';
SelectRichMultiple.args = {
    id: `hobby's`,
    name: `hobby's`,
    placeholder: `Kies je hobby's`,
    multiple: true,
    options: [
        { label: 'Padel', value: 'padel' },
        { label: 'Dans', value: 'dans' },
        { label: 'Drummen', value: 'drummen' },
        { label: 'Zwemmen', value: 'zwemmen' },
        { label: 'Boardgames', value: 'boardgames' },
        { label: 'Fietsen', value: 'fietsen' },
    ],
};

export const SelectRichSelectedOption = SelectRichTemplate.bind({});
SelectRichSelectedOption.storyName = 'vl-select-rich-next - selected option';
SelectRichSelectedOption.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    options: [
        { label: 'Hasselt', value: 'hasselt', selected: true },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectRichDisabledOption = SelectRichTemplate.bind({});
SelectRichDisabledOption.storyName = 'vl-select-rich-next - disabled option';
SelectRichDisabledOption.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    options: [
        { label: 'Hasselt', value: 'hasselt', disabled: true },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectRichReadOnly = SelectRichTemplate.bind({});
SelectRichReadOnly.storyName = 'vl-select-rich-next - read only';
SelectRichReadOnly.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    options: [
        { label: 'Hasselt', value: 'hasselt', disabled: true, selected: true },
        { label: 'Turnhout', value: 'turnhout', disabled: true },
        { label: 'Knokke-Heist', value: 'knokke-heist', disabled: true },
        { label: 'Waregem', value: 'waregem', disabled: true },
        { label: 'Lier', value: 'lier', disabled: true },
        { label: 'Rio Piedras', value: 'rio piedras', disabled: true },
    ],
};
