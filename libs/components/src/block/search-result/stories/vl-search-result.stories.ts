import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlSearchResultPropertiesComponent } from '../vl-search-result-properties.component';
import { VlSearchResultTitleComponent } from '../vl-search-result-title.component';
import { VlSearchResultComponent } from '../vl-search-result.component';
import { searchResultArgs, searchResultArgTypes } from './vl-search-result.stories-arg';
import searchResultDoc from './vl-search-result.stories-doc.mdx';

export default {
    id: 'components-block-search-result',
    title: 'Components - Block/search-result',
    tags: ['autodocs'],
    args: searchResultArgs,
    argTypes: searchResultArgTypes,
    parameters: {
        docs: {
            page: searchResultDoc,
        },
    },
} as Meta<typeof searchResultArgs>;

registerWebComponents([VlSearchResultComponent, VlSearchResultTitleComponent, VlSearchResultPropertiesComponent]);

export const SearchResultDefault = () => html`
    <vl-search-result>
        <vl-search-result-title>
            <a href="#">Vlaanderenkiest.be</a>
        </vl-search-result-title>
        <vl-search-result-text>
            <time>Maandag 22 oktober 2018</time>
        </vl-search-result-text>
        <vl-search-result-properties>
            <label>Vlaanderenkiest.be</label>
            <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
            <label>Vlaanderen intern</label>
            <data>Werkt u bij de Vlaamse overheid...</data>
        </vl-search-result-properties>
    </vl-search-result>
`;
SearchResultDefault.storyName = 'vl-search-result - default';

export const SearchResultGroup = () => html`
    <div class="vl-group vl-group--column vl-group--stretch-children vl-group--no-gap">
        <vl-search-result>
            <vl-search-result-title>
                <a href="#">Vlaanderenkiest.be</a>
            </vl-search-result-title>
            <vl-search-result-text>
                <time>Maandag 22 oktober 2018</time>
            </vl-search-result-text>
            <vl-search-result-properties>
                <label>Vlaanderenkiest.be</label>
                <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
                <label>Vlaanderen intern</label>
                <data>Werkt u bij de Vlaamse overheid...</data>
            </vl-search-result-properties>
        </vl-search-result>
        <vl-search-result>
            <vl-search-result-title>
                <a href="#">Vlaanderenkiest.be</a>
            </vl-search-result-title>
            <vl-search-result-text>
                <time>Maandag 22 oktober 2018</time>
            </vl-search-result-text>
            <vl-search-result-properties>
                <label>Vlaanderenkiest.be</label>
                <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
                <label>Vlaanderen intern</label>
                <data>Werkt u bij de Vlaamse overheid...</data>
            </vl-search-result-properties>
        </vl-search-result>
    </div>
`;
SearchResultGroup.storyName = 'vl-search-result - group';

export const SearchResultMultilineTitle = () => html`
    <vl-search-result>
        <vl-search-result-title>
            <a href="#">Een zeer lange zoekresultaat-titel die over meerdere regels loopt en de onderliggende inhoud niet mag overlappen</a>
        </vl-search-result-title>
        <vl-search-result-text>
            <time>Maandag 22 oktober 2018</time>
        </vl-search-result-text>
        <vl-search-result-properties>
            <label>Vlaanderenkiest.be</label>
            <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
        </vl-search-result-properties>
    </vl-search-result>
`;
SearchResultMultilineTitle.storyName = 'vl-search-result - multiline title';
