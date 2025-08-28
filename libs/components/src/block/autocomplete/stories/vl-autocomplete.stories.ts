import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../vl-autocomplete.component';
import { VlSideSheet } from '../../side-sheet';
import { CAPTION_FORMAT, GROUP_BY } from '../vl-autocomplete.model';
import { fetchDataFromApiCall } from './vl-autocomplete-api.stories-util';
import { fetchDataFromMockedApiCall } from './vl-autocomplete-mocked-api.stories-util';
import { autocompleteArgs, autocompleteArgTypes, complexItems } from './vl-autocomplete.stories-arg';
import autocompleteDoc from './vl-autocomplete.stories-doc.mdx';

registerWebComponents([VlSideSheet]);

export default {
    id: 'components-block-autocomplete',
    title: 'Components - Block/autocomplete',
    tags: ['autodocs'],
    args: autocompleteArgs,
    argTypes: autocompleteArgTypes,
    parameters: {
        docs: {
            page: autocompleteDoc,
        },
    },
    decorators: [(story: () => unknown) => html` <div style="height: 400px;">${story()}</div>`],
} as Meta<typeof autocompleteArgs>;

export const AutocompleteDefault = story(
    autocompleteArgs,
    ({
        placeholder,
        initialValue,
        label,
        labelSmall,
        minChars,
        maxSuggestions,
        captionFormat,
        groupBy,
        items,
        showClear,
        clearTooltip,
        noMatchesText,
        disableLoading,
    }) =>
        html`
            <div class="container">
                <vl-autocomplete
                    placeholder=${placeholder}
                    initial-value=${initialValue}
                    label=${label}
                    ?label-small=${labelSmall}
                    min-chars=${minChars}
                    max-suggestions=${maxSuggestions}
                    caption-format=${captionFormat}
                    group-by=${groupBy}
                    ?show-clear=${showClear}
                    clear-tooltip=${clearTooltip}
                    no-matches-text=${noMatchesText}
                    ?disable-loading=${disableLoading}
                    .items=${complexItems}
                ></vl-autocomplete>
            </div>
        `
);
AutocompleteDefault.storyName = 'vl-autocomplete - default';
AutocompleteDefault.args = {
    placeholder: 'Hint: typ Gent',
    clearTooltip: 'Wissen',
    noMatchesText: 'Geen resultaat',
    minChars: 1,
    maxSuggestions: 5,
};

export const AutocompleteGroupBySubtitle = story(
    autocompleteArgs,
    () =>
        html`
            <vl-autocomplete
                min-chars="1"
                group-by="${GROUP_BY.SUBTITLE}"
                .items=${complexItems}
                caption-format="${CAPTION_FORMAT.TITLE}"
                placeholder="Hint: typ Gent"
            ></vl-autocomplete>
        `
);
AutocompleteGroupBySubtitle.storyName = 'vl-autocomplete - group by subtitle';

export const AutocompleteCustomCaptionFormatter = story(
    autocompleteArgs,
    () =>
        html`
            <vl-autocomplete
                min-chars="1"
                .items=${complexItems}
                caption-format="${CAPTION_FORMAT.SUBTITLE_TITLE_HORIZONTAL}"
                placeholder="Hint: typ Gent"
            ></vl-autocomplete>
        `
);
AutocompleteCustomCaptionFormatter.storyName = 'vl-autocomplete - custom caption formatter';

export const AutocompleteInputAndApiCall = story(
    autocompleteArgs,
    ({ disableLoading }) =>
        html`
            <vl-autocomplete
                @search=${(e: CustomEvent) => fetchDataFromApiCall(e.target, e.detail.searchTerm)}
                placeholder="Gemeente, Straat of Project"
                min-chars="2"
                max-suggestions="10"
                ?disable-loading=${disableLoading}
            ></vl-autocomplete>
        `
);
AutocompleteInputAndApiCall.storyName = 'vl-autocomplete - input and api call';

export const AutocompleteInputAndMockedApiCall = story(
    autocompleteArgs,
    () =>
        html`
            <vl-autocomplete
                @search=${(e: CustomEvent) => fetchDataFromMockedApiCall(e.target, e.detail.searchTerm)}
                placeholder="Gemeente, Straat of Project"
                min-chars="2"
                max-suggestions="5"
            ></vl-autocomplete>
        `
);
AutocompleteInputAndMockedApiCall.storyName = 'vl-autocomplete - input and mocked api call';

export const AutocompleteWithoutSuggestions = story(
    autocompleteArgs,
    ({ disableLoading }) =>
        html`
            <vl-autocomplete
                min-chars="1"
                placeholder="Hint: typ Gent"
                ?disable-loading=${disableLoading}
            ></vl-autocomplete>
        `
);
AutocompleteWithoutSuggestions.storyName = 'vl-autocomplete - without suggestions';

export const AutocompleteInSideSheet = story(
    autocompleteArgs,
    () => html`
        <vl-side-sheet>
            <vl-autocomplete
                min-chars="1"
                .items=${complexItems}
                caption-format="${CAPTION_FORMAT.SUBTITLE_TITLE_HORIZONTAL}"
                placeholder="Hint: typ Gent"
            ></vl-autocomplete>
        </vl-side-sheet>
    `
);
AutocompleteInSideSheet.storyName = 'vl-autocomplete - in side-sheet';
