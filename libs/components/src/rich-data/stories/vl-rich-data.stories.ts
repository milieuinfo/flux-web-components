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

registerWebComponents([VlRichData, VlSearchResultComponent]);

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
            <select is="vl-select" slot="sorter" aria-label="Sorteer">
                <option value="id">ID</option>
                <option value="manager.lastName">Naam manager</option>
            </select>
            <div is="vl-search-filter" alt slot="filter">
                <form is="vl-form" id="rich-data-table-filter-form">
                    <section>
                        <h2>Doorzoek projecten</h2>
                        <div>
                            <label is="vl-form-label" for="filterOpId">Project id</label>
                            <input is="vl-input-field" id="filterOpId" type="text" name="id" value="" block />
                        </div>
                    </section>
                    <section>
                        <h2>Project details</h2>
                        <div>
                            <label is="vl-form-label" for="filterOpNaamProject">Project naam</label>
                            <input
                                is="vl-input-field"
                                id="filterOpNaamProject"
                                type="text"
                                name="name"
                                value=""
                                block
                            />
                        </div>
                        <div>
                            <label is="vl-form-label" for="filterOpNaamManager">Manager familienaam</label>
                            <input
                                is="vl-input-field"
                                id="filterOpNaamManager"
                                type="text"
                                name="manager.lastName"
                                value=""
                                block
                            />
                        </div>
                    </section>
                    <div>
                        <button is="vl-button" type="submit">Zoeken</button>
                    </div>
                </form>
                <div>
                    <button is="vl-button-link" type="reset" form="rich-data-table-filter-form">
                        Zoekopdracht verwijderen
                    </button>
                </div>
            </div>
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
