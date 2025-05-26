import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../rich-data-table/vl-rich-data-field.component';
import '../vl-rich-data.component';
import { VlSearchResultComponent } from '../../search-result';
import { VlRichData } from '../vl-rich-data.component';
import { richDataArgs, richDataArgTypes } from './vl-rich-data.stories-arg';
import richDataDoc from './vl-rich-data.stories-doc.mdx';
import { richDataPaginationImplementation } from './vl-rich-data.stories-util';
import { VlSelectComponent } from '../../../form/select';

export default {
    id: 'components-block-rich-data',
    title: 'Components - Block/rich-data',
    tags: ['autodocs'],
    args: richDataArgs,
    argTypes: richDataArgTypes,
    parameters: {
        docs: {
            page: richDataDoc,
        },
    },
} as Meta<typeof richDataArgs>;

registerWebComponents([VlRichData, VlSearchResultComponent, VlSelectComponent]);

export const RichDataDefault = ({ filterClosable, filterClosed }: typeof richDataArgs) => {
    return html`
        <vl-rich-data ?filter-closable=${filterClosable} ?filter-closed=${filterClosed}>
            <span slot="no-content">Geen resultaten gevonden</span>
            <vl-search-result slot="content"></vl-search-result>
        </vl-rich-data>
    `;
};
RichDataDefault.storyName = 'vl-rich-data - default';

export const RichDataPager = story(richDataArgs, ({ filterClosable, filterClosed }: typeof richDataArgs) => {
    richDataPaginationImplementation();
    return html`
        <vl-rich-data id="rich-data" ?filter-closable=${filterClosable} ?filter-closed=${filterClosed}>
            <span slot="no-content">Geen resultaten</span>
            <div slot="content"></div>
            <vl-select
                slot="sorter"
                aria-label="Sorteer"
                .options=${[
                    { label: 'ID', value: 'id' },
                    { label: 'Naam manager', value: 'manager.lastName' },
                ]}
            ></vl-select>
            <vl-search-filter slot="filter" alt>
                <form>
                    <section>
                        <vl-title type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title>
                        <div>
                            <vl-form-label for="filterOpId" label="Project id" light></vl-form-label>
                            <vl-input-field id="filterOpId" type="text" name="id" block></vl-input-field>
                        </div>
                    </section>
                    <section>
                        <vl-title type="h2" alt no-space-bottom="">Project details</vl-title>
                        <div>
                            <vl-form-label for="filterOpNaamProject" label="Project naam" light></vl-form-label>
                            <vl-input-field type="text" id="filterOpNaamProject" name="name" block></vl-input-field>
                        </div>
                        <div>
                            <vl-form-label for="filterOpNaamManager" label="Manager familienaam" light></vl-form-label>
                            <vl-input-field
                                type="text"
                                id="filterOpNaamManager"
                                name="manager.lastName"
                                block
                            ></vl-input-field>
                        </div>
                    </section>
                    <footer>
                        <vl-button type="submit" custom-css="button {flex:1}">Zoeken</vl-button>
                        <vl-button type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button>
                    </footer>
                </form>
            </vl-search-filter>
            <vl-pager
                id="rich-data-table-filter-sorting-paging-pager"
                slot="pager"
                total-items="25"
                items-per-page="10"
                current-page="1"
                align-center
            ></vl-pager>
        </vl-rich-data>
    `;
});
RichDataPager.storyName = 'vl-rich-data - pager';
