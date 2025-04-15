import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlSelectLocationComponent } from '../vl-select-location';
import { selectLocationArgs, selectLocationArgTypes } from './vl-select-location.stories-arg';
import selectLocationDocs from './vl-select-location.stories-doc.mdx';

registerWebComponents([VlSelectLocationComponent]);

export default {
    id: 'map-select-location',
    title: 'map/select-location',
    tags: ['autodocs'],
    args: selectLocationArgs,
    argTypes: selectLocationArgTypes,
    parameters: {
        docs: {
            page: selectLocationDocs,
        },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 400px;">${story()}</div>`],
} as Meta<typeof selectLocationArgs>;

const SelectLocationTemplate = story(
    selectLocationArgs,
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
        position,
        resultLimit,
        noResultsText,
        noChoicesText,
        searchPlaceholder,
    }) => {
        return html` <vl-select-location
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
            position=${position}
            result-limit=${resultLimit}
            no-results-text=${noResultsText}
            no-choices-text=${noChoicesText}
            search-placeholder=${searchPlaceholder}
        ></vl-select-location>`;
    }
);

export const SelectLocationDefault = SelectLocationTemplate.bind({});
SelectLocationDefault.storyName = 'vl-select-location - default';
SelectLocationDefault.args = {
    id: 'zoeken-op-kaart',
    name: 'zoeken-op-kaart',
};
