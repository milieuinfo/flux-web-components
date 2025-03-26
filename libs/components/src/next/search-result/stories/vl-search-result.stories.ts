import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlSearchResultPropertiesComponent } from '../vl-search-result-properties.component';
import { VlSearchResultTitleComponent } from '../vl-search-result-title.component';
import { VlSearchResultComponent } from '../vl-search-result.component';
import { searchResultArgs, searchResultArgTypes } from './vl-search-result.stories-arg';
import searchResultDoc from './vl-search-result.stories-doc.mdx';

export default {
    id: 'components-next-search-result',
    title: 'Components-next/search-result',
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
    <vl-search-result-next>
        <vl-search-result-title-next>
            <a href="#">Vlaanderenkiest.be</a>
        </vl-search-result-title-next>
        <vl-search-result-text-next>
            <time>Maandag 22 oktober 2018</time>
        </vl-search-result-text-next>
        <vl-search-result-properties-next>
            <label>Vlaanderenkiest.be</label>
            <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
            <label>Vlaanderen intern</label>
            <data>Werkt u bij de Vlaamse overheid...</data>
        </vl-search-result-properties-next>
    </vl-search-result-next>
`;
SearchResultDefault.storyName = 'vl-search-result-next - default';

export const SearchResultGroup = () => html`
    <div class="vl-group-next vl-group-next--column vl-group-next--stretch-children vl-group-next--no-gap">
        <vl-search-result-next>
            <vl-search-result-title-next>
                <a href="#">Vlaanderenkiest.be</a>
            </vl-search-result-title-next>
            <vl-search-result-text-next>
                <time>Maandag 22 oktober 2018</time>
            </vl-search-result-text-next>
            <vl-search-result-properties-next>
                <label>Vlaanderenkiest.be</label>
                <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
                <label>Vlaanderen intern</label>
                <data>Werkt u bij de Vlaamse overheid...</data>
            </vl-search-result-properties-next>
        </vl-search-result-next>
        <vl-search-result-next>
            <vl-search-result-title-next>
                <a href="#">Vlaanderenkiest.be</a>
            </vl-search-result-title-next>
            <vl-search-result-text-next>
                <time>Maandag 22 oktober 2018</time>
            </vl-search-result-text-next>
            <vl-search-result-properties-next>
                <label>Vlaanderenkiest.be</label>
                <data>Verkiezingsresultaten op Vlaanderenkiest.be...</data>
                <label>Vlaanderen intern</label>
                <data>Werkt u bij de Vlaamse overheid...</data>
            </vl-search-result-properties-next>
        </vl-search-result-next>
    </div>
`;
SearchResultGroup.storyName = 'vl-search-result-next - group';
