import { story } from '@resources/utils-storybook';
import { selectArgs, selectArgTypes } from './vl-select.stories-arg';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import selectDocs from './vl-select.stories-doc.mdx';
import { registerWebComponents } from '@domg-wc/common';
import { VlSelectComponent } from '../vl-select.component';

registerWebComponents([VlSelectComponent]);

export default {
    id: 'components-form-select',
    title: 'Components - Form/select',
    tags: ['autodocs'],
    args: selectArgs,
    argTypes: selectArgTypes,
    parameters: {
        docs: {
            page: selectDocs,
        },
    },
} as Meta<typeof selectArgs>;

const SelectTemplate = story(
    selectArgs,
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
        autocomplete,
        block,
        onVlChange,
        onVlInput,
        onVlValid,
        onVlReset,
    }) => {
        return html` <vl-select
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
            ?block=${block}
            autocomplete=${autocomplete}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-valid=${onVlValid}
            @vl-reset=${onVlReset}
        ></vl-select>`;
    }
);

export const SelectDefault = SelectTemplate.bind({});
SelectDefault.storyName = 'vl-select - default';
SelectDefault.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    // ! Vergeet niet de options op de docs pagina aan te passen als je deze opties aanpast
    options: [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectNotDeletable = SelectTemplate.bind({});
SelectNotDeletable.storyName = 'vl-select - not-deletable';
SelectNotDeletable.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    notDeletable: true,
    // ! Vergeet niet de options op de docs pagina aan te passen als je deze opties aanpast
    options: [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectGroups = SelectTemplate.bind({});
SelectGroups.storyName = 'vl-select - groups';
SelectGroups.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    // ! Vergeet niet de options op de docs pagina aan te passen als je deze opties aanpast
    options: [
        { label: 'Hasselt', value: 'hasselt', group: 'België' },
        { label: 'Turnhout', value: 'turnhout', group: 'België' },
        { label: 'Knokke-Heist', value: 'knokke-heist', group: 'België' },
        { label: 'Waregem', value: 'waregem', group: 'België' },
        { label: 'Lier', value: 'lier', group: 'België' },
        { label: 'Rio Piedras', value: 'rio piedras', group: 'Puerto Rico' },
    ],
};

export const SelectSelectedOption = SelectTemplate.bind({});
SelectSelectedOption.storyName = 'vl-select - selected option';
SelectSelectedOption.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    // ! Vergeet niet de options op de docs pagina aan te passen als je deze opties aanpast
    options: [
        { label: 'Hasselt', value: 'hasselt', selected: true },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectDisabledOption = SelectTemplate.bind({});
SelectDisabledOption.storyName = 'vl-select - disabled option';
SelectDisabledOption.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    // ! Vergeet niet de options op de docs pagina aan te passen als je deze opties aanpast
    options: [
        { label: 'Hasselt', value: 'hasselt', disabled: true },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
        { label: 'Rio Piedras', value: 'rio piedras' },
    ],
};

export const SelectReadOnly = SelectTemplate.bind({});
SelectReadOnly.storyName = 'vl-select - read only';
SelectReadOnly.args = {
    id: 'geboorteplaats',
    name: 'geboorteplaats',
    placeholder: 'Kies je geboorteplaats',
    notDeletable: true,
    // ! Vergeet niet de options op de docs pagina aan te passen als je deze opties aanpast
    options: [
        { label: 'Hasselt', value: 'hasselt', disabled: true, selected: true },
        { label: 'Turnhout', value: 'turnhout', disabled: true },
        { label: 'Knokke-Heist', value: 'knokke-heist', disabled: true },
        { label: 'Waregem', value: 'waregem', disabled: true },
        { label: 'Rio Piedras', value: 'rio piedras', disabled: true },
    ],
};

const SelectDeclarativeOptionsTemplate = story(
    selectArgs,
    ({
        id,
        name,
        label,
        required,
        disabled,
        error,
        success,
        placeholder,
        notDeletable,
        autocomplete,
        block,
        onVlChange,
        onVlInput,
        onVlValid,
        onVlReset,
    }) => {
        return html` <vl-select
            id=${id}
            name=${name}
            label=${label}
            ?required=${required}
            ?disabled=${disabled}
            ?error=${error}
            ?success=${success}
            placeholder=${placeholder}
            ?not-deletable=${notDeletable}
            ?block=${block}
            autocomplete=${autocomplete}
            @vl-change=${onVlChange}
            @vl-input=${onVlInput}
            @vl-valid=${onVlValid}
            @vl-reset=${onVlReset}
        >
            <option value="antwerpen">Antwerpen</option>
            <option value="brussel" selected>Brussel</option>
            <option value="gent">gent</option>
            <option value="hasselt" disabled>Hasselt (niet beschikbaar)</option>
            <option value="waregem">Waregem</option>
            <option value="lier">Lier</option>
            <option value="rio-piedras">Rio Piedras</option>
        </vl-select>`;
    }
);

export const SelectDeclarativeStates = SelectDeclarativeOptionsTemplate.bind({});
SelectDeclarativeStates.storyName = 'vl-select - declarative options';
SelectDeclarativeStates.args = {
    id: 'woonplaats',
    name: 'woonplaats',
    label: 'Kies je woonplaats',
    placeholder: 'Kies je woonplaats',
};
