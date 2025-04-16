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
import { VlSelectComponent } from '@domg-wc/form';

export default {
    id: 'components-rich-data',
    title: 'components/rich-data',
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
        <vl-rich-data ?data-vl-filter-closable=${filterClosable} ?data-vl-filter-closed=${filterClosed}>
            <span slot="no-content">Geen resultaten gevonden</span>
            <vl-search-result slot="content"></vl-search-result>
        </vl-rich-data>
    `;
};
RichDataDefault.storyName = 'vl-rich-data - default';

export const RichDataPager = story(richDataArgs, ({ filterClosable, filterClosed }: typeof richDataArgs) => {
    richDataPaginationImplementation();
    return html`
        <vl-rich-data id="rich-data" ?data-vl-filter-closable=${filterClosable} ?data-vl-filter-closed=${filterClosed}>
            <span slot="no-content">Geen resultaten</span>
            <div slot="content"></div>
            <vl-select-next slot="sorter" aria-label="Sorteer" .options=${[
                { label: 'ID', value: 'id' },
                { label: 'Naam manager', value: 'manager.lastName' },
            ]}></vl-select-next>
            <vl-search-filter-next slot="filter" alt>
                <form>
                    <section>
                        <vl-title-next type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title-next>
                        <div>
                            <vl-form-label-next
                                for="filterOpId"
                                label="Project id"
                                light
                            ></vl-form-label-next>
                            <vl-input-field-next
                                id="filterOpId"
                                type="text"
                                name="id"
                                block
                            ></vl-input-field-next>
                        </div>
                    </section>
                    <section>
                        <vl-title-next type="h2" alt no-space-bottom="">Project details</vl-title-next>
                        <div>
                            <vl-form-label-next for="filterOpNaamProject" label="Project naam"
                                                light></vl-form-label-next>
                            <vl-input-field-next
                                type="text"
                                id="filterOpNaamProject"
                                name="name"
                                block
                            ></vl-input-field-next>
                        </div>
                        <div>
                            <vl-form-label-next for="filterOpNaamManager" label="Manager familienaam"
                                                light></vl-form-label-next>
                            <vl-input-field-next
                                type="text"
                                id="filterOpNaamManager"
                                name="manager.lastName"
                                block
                            ></vl-input-field-next>
                        </div>
                    </section>
                    <footer>
                        <vl-button-next type="submit" custom-css="button {flex:1}">Zoeken</vl-button-next>
                        <vl-button-next type="reset" custom-css="button {flex:1}" secondary>Reset</vl-button-next-->
                    </footer>
                </form>
            </vl-search-filter-next>
            <vl-pager
                id="rich-data-table-filter-sorting-paging-pager"
                slot="pager"
                data-vl-total-items="25"
                data-vl-items-per-page="10"
                data-vl-current-page="1"
                data-vl-align-center
            ></vl-pager>
        </vl-rich-data>
    `;
});
RichDataPager.storyName = 'vl-rich-data - pager';
