// deze imports van alle elements werkt IN de monorepo
import { story } from '@resources/utils-storybook';
// -> buiten de monorepo werkt dat niet omdat sideEffects disabled worden voor de root-barrel file in de artifacts
import { registerWebComponents } from '@domg-wc/common';
import { VlTextComponent } from '@domg-wc/components/atom';
import { VlCheckboxComponent } from '@domg-wc/components/form';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlButtonComponent } from '../../../atom/button';
import { VlTitleComponent } from '../../../atom/title';
import { VlFormLabelComponent } from '../../../form/form-label';
import { VlInputFieldComponent } from '../../../form/input-field';
import { VlSelectComponent } from '../../../form/select';
import { RichData } from '../../rich-data/vl-rich-data.component';
import { VlSearchFilterComponent } from '../../search-filter';
import '../vl-rich-data-table.component';
import { VlRichDataTable } from '../vl-rich-data-table.component';
import { filterRichTableImplementation } from './vl-rich-data-table-filter.stories-util';
import richDataFilterPagerData from './vl-rich-data-table-pagination.stories-mock';
import { paginationRichTableImplementation } from './vl-rich-data-table-pagination.stories-util';
import selectableRichTableImplementation from './vl-rich-data-table-selectable.stories-util';
import { sortingRichTableImplementation } from './vl-rich-data-table-sorting.stories-util';
import { richDataTableArgs, richDataTableArgTypes } from './vl-rich-data-table.stories-arg';
import richDataTableDoc from './vl-rich-data-table.stories-doc.mdx';

registerWebComponents([
    VlRichDataTable,
    VlSearchFilterComponent,
    VlTitleComponent,
    VlButtonComponent,
    VlFormLabelComponent,
    VlInputFieldComponent,
    VlSelectComponent,
    VlCheckboxComponent,
    VlTextComponent,
]);

export default {
    id: 'components-block-rich-data-table',
    title: 'Components - Block/rich-data-table',
    tags: ['autodocs'],
    args: richDataTableArgs,
    argTypes: richDataTableArgTypes,
    parameters: {
        docs: {
            page: richDataTableDoc,
        },
    },
} as Meta<typeof richDataTableArgs>;

const TemplateBase = story(richDataTableArgs, ({ collapsedM, collapsedS, collapsedXS, zebra, fluxZebra }) => {
    const data =
        '{"data": [{ "id" : 0, "name" : "Project #1" , "owner" : "Jan Jansens" }, { "id" : 1, "name" : "Project #2" , "owner" : "Marie Vermeersch" }]}';

    return html`
        <vl-rich-data-table
            data="${data}"
            ?collapsed-m=${collapsedM}
            ?collapsed-s=${collapsedS}
            ?collapsed-xs=${collapsedXS}
            ?zebra=${zebra}
            ?flux-zebra=${fluxZebra}
        >
            <vl-rich-data-field name="id" label="ID" selector="id"></vl-rich-data-field>
            <vl-rich-data-field name="name" label="Naam" selector="name"></vl-rich-data-field>
            <vl-rich-data-field name="owner" selector="owner">
                <template slot="label">
                    <span>Eigenaar</span>
                </template>
            </vl-rich-data-field>
        </vl-rich-data-table>
    `;
});

export const RichDataTableDefault = TemplateBase.bind({});
RichDataTableDefault.storyName = 'vl-rich-data-table - default';
RichDataTableDefault.args = {
    collapsedM: false,
    collapsedS: false,
    collapsedXS: false,
};

const TemplateSorting = story(richDataTableArgs, ({ collapsedM, collapsedS, collapsedXS, zebra, fluxZebra }) => {
    const data =
        '{"data": [{ "id" : 0, "name" : "Water" , "owner" : "Kevin Jansens" }, { "id" : 1, "name" : "Vuur" , "owner" : "Anton Vanherrewege" }, { "id" : 2, "name" : "Aarde" , "owner" : "Hedwig Jansens" }]}';
    sortingRichTableImplementation();
    return html`
        <vl-rich-data-table
            id="rich-data-table-sorting"
            data="${data}"
            ?collapsed-m=${collapsedM}
            ?collapsed-s=${collapsedS}
            ?collapsed-xs=${collapsedXS}
            ?zebra=${zebra}
            ?flux-zebra=${fluxZebra}
        >
            <vl-rich-data-field
                name="id"
                label="ID"
                selector="id"
                sortable=""
                sorting-direction="asc"
            ></vl-rich-data-field>
            <vl-rich-data-field name="name" label="Naam" selector="name" sortable=""></vl-rich-data-field>
            <vl-rich-data-field name="owner" selector="owner" sortable="">
                <template slot="label">
                    <span>Eigenaar</span>
                </template>
            </vl-rich-data-field>
        </vl-rich-data-table>
    `;
});
export const RichDataTableSorting = TemplateSorting.bind({});
RichDataTableSorting.storyName = 'vl-rich-data-table - sorting';
RichDataTableSorting.args = {
    collapsedM: false,
    collapsedS: false,
    collapsedXS: false,
};

const TemplateFilter = story(
    richDataTableArgs,
    ({ collapsedM, collapsedS, collapsedXS, filterClosable, filterClosed, filterMaxWidth, zebra, fluxZebra }) => {
        filterRichTableImplementation();
        return html`
            <vl-rich-data-table
                id="rich-data-table-filter"
                ?collapsed-m=${collapsedM}
                ?collapsed-s=${collapsedS}
                ?collapsed-xs=${collapsedXS}
                ?filter-closable=${filterClosable}
                ?filter-closed=${filterClosed}
                filter-max-width=${filterMaxWidth}
                ?zebra=${zebra}
                ?flux-zebra=${fluxZebra}
            >
                <vl-rich-data-field label="ID" selector="id"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Project" selector="name"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Manager" selector="manager.lastName"></vl-rich-data-field>
                <vl-rich-data-field label="Eerste medewerker" selector="medewerkers.0.lastName"></vl-rich-data-field>
                <vl-search-filter slot="filter" alt>
                    <form>
                        <section>
                            <vl-title type="h2" alt no-space-bottom="">Doorzoek projecten</vl-title>
                            <div>
                                <vl-form-label for="filterOpId" label="Project id" light></vl-form-label>
                                <vl-input-field id="filterOpId" type="text" name="id" block></vl-input-field>
                            </div>
                            <div>
                                <vl-form-label for="filterOpNaamProject" label="Project naam" light></vl-form-label>
                                <vl-input-field type="text" id="filterOpNaamProject" name="name" block></vl-input-field>
                            </div>
                            <div>
                                <vl-form-label
                                    for="filterOpNaamManager"
                                    label="Manager familienaam"
                                    light
                                ></vl-form-label>
                                <vl-input-field
                                    type="text"
                                    id="filterOpNaamManager"
                                    name="manager.lastName"
                                    block
                                    autocomplete="family-name"
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
                    id="rich-data-table-filter"
                    slot="pager"
                    total-items="6"
                    items-per-page="10"
                    current-page="1"
                    align-center=""
                ></vl-pager>
            </vl-rich-data-table>
        `;
    }
);
export const RichDataTableFilter = TemplateFilter.bind({});
RichDataTableFilter.storyName = 'vl-rich-data-table - filter';
RichDataTableFilter.args = {
    filterClosable: true,
};

const TemplateFilterPaging = story(
    richDataTableArgs,
    ({ collapsedM, collapsedS, collapsedXS, filterClosable, filterClosed, filterMaxWidth, zebra, fluxZebra }) => {
        paginationRichTableImplementation();
        return html`
            <vl-rich-data-table
                id="rich-data-table-pagination"
                ?collapsed-m=${collapsedM}
                ?collapsed-s=${collapsedS}
                ?collapsed-xs=${collapsedXS}
                ?filter-closable=${filterClosable}
                ?filter-closed=${filterClosed}
                filter-max-width=${filterMaxWidth}
                ?zebra=${zebra}
                ?flux-zebra=${fluxZebra}
            >
                <vl-rich-data-field label="ID" selector="id"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Project" selector="name"></vl-rich-data-field>
                <vl-rich-data-field label="Naam Manager" selector="manager.lastName"></vl-rich-data-field>
                <vl-rich-data-field label="Eerste medewerker" selector="medewerkers.0.lastName"></vl-rich-data-field>
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
                                <vl-form-label
                                    for="filterOpNaamManager"
                                    label="Manager familienaam"
                                    light
                                ></vl-form-label>
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
                    id="pager-for-rich-data-table"
                    slot="pager"
                    total-items=${richDataFilterPagerData.data.length}
                    items-per-page="10"
                    current-page="1"
                ></vl-pager>
            </vl-rich-data-table>
        `;
    }
);

export const RichDataTableFilterAndPagination = TemplateFilterPaging.bind({});
RichDataTableFilterAndPagination.storyName = 'vl-rich-data-table - filter and pagination';
RichDataTableFilterAndPagination.args = {
    filterClosable: true,
    filterClosed: true,
};

const TemplateSelectable = story(richDataTableArgs, ({ collapsedM, collapsedS, collapsedXS, zebra, fluxZebra }) => {
    type MyDataItem = { selected: boolean; name: string; extension: string; filesize: string };
    type MyData = MyDataItem[];

    const data: RichData<MyDataItem> = {
        data: [
            { selected: true, name: 'document.pdf', extension: 'pdf', filesize: '123 MB' },
            { selected: false, name: 'bestand.docx', extension: 'docx', filesize: '2 GB' },
            { selected: false, name: 'Een bestand met een lange naam.pptx', extension: 'pptx', filesize: '10 KB' },
        ],
    };

    const { checkActions, headerTemplate, dataFieldRenderer, applySelectionToAllRows } =
        selectableRichTableImplementation();

    return html`
        <style>
            vl-title::part(h1) {
                font-size: var(--vl-font-size);
                margin-bottom: 0;
            }
            vl-rich-data-table {
                --vl-grid-col-gap: 0;
                --vl-grid-row-gap: 0;
            }
        </style>
        <div>
            <div class="vl-group vl-group--space-between vl-group--collapse-s">
                <vl-title type="h1">Documenten</vl-title>
                <span
                    id="selection-status"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    class="vl-visually-hidden"
                >
                    Selectie
                </span>
                <div id="default-actions">
                    <div class="vl-group vl-group--collapse-xs">
                        <vl-button
                            tertiary
                            narrow
                            type="button"
                            icon="add"
                            id="add-folder"
                            @vl-click=${() => {
                                console.log('add folder');
                            }}
                            >Subfolder toevoegen</vl-button
                        >
                        <vl-button
                            tertiary
                            narrow
                            type="button"
                            icon="add"
                            id="add-document"
                            @vl-click=${() => {
                                console.log('add document');
                            }}
                            >Document toevoegen</vl-button
                        >
                    </div>
                </div>
                <div id="selection-actions" hidden>
                    <div class="vl-group vl-group--collapse-xs">
                        <vl-button
                            ghost
                            narrow
                            icon="close"
                            icon-placement="after"
                            label="Alles deselecteren"
                            id="remove-selection"
                            type="button"
                            @vl-click=${() => {
                                applySelectionToAllRows(false);
                            }}
                            >Selectie</vl-button
                        >
                        <vl-button
                            tertiary
                            narrow
                            type="button"
                            icon="move-left-right"
                            @vl-click=${() => {
                                console.log('move selection', getSelection());
                            }}
                            >Verplaatsen</vl-button
                        >
                        <vl-button
                            tertiary
                            narrow
                            type="button"
                            icon="data-download"
                            @vl-click=${() => {
                                console.log('download selection', getSelection());
                            }}
                            >Downloaden</vl-button
                        >
                        <vl-button
                            tertiary
                            narrow
                            error
                            type="button"
                            icon="trash"
                            @vl-click=${() => {
                                console.log('delete selection', getSelection());
                            }}
                            >Verwijderen</vl-button
                        >
                    </div>
                </div>
            </div>
            <vl-rich-data-table
                id="rich-data-table-selectable"
                data="${JSON.stringify(data)}"
                ?collapsed-m=${collapsedM}
                ?collapsed-s=${collapsedS}
                ?collapsed-xs=${collapsedXS}
                ?zebra=${zebra}
                ?flux-zebra=${fluxZebra}
                @vl-change=${() => checkActions()}
            >
                <vl-rich-data-field
                    .renderer=${dataFieldRenderer}
                    .headerTemplate=${headerTemplate}
                ></vl-rich-data-field>
                <vl-rich-data-field name="name" label="Naam" selector="name"></vl-rich-data-field>
                <vl-rich-data-field name="filesize" label="Grootte" selector="filesize"></vl-rich-data-field>
                <vl-rich-data-field name="extension" label="Type" selector="extension"></vl-rich-data-field>
            </vl-rich-data-table>
        </div>
    `;
});

export const RichDataTableSelectable = TemplateSelectable.bind({});
RichDataTableSelectable.storyName = 'vl-rich-data-table - selectable';
RichDataTableSelectable.args = {};
