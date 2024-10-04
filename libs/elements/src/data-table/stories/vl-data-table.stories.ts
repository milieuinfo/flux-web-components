import { formattedSourceCode, story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-data-table.element';
import { VlDataTable } from '../vl-data-table.element';
import { dataTableArgs, dataTableArgTypes } from './vl-data-table.stories-arg';
import dataTableDoc from './vl-data-table.stories-doc.mdx';

export default {
    id: 'elements-data-table',
    title: 'Elements/data-table',
    tags: ['autodocs'],
    args: dataTableArgs,
    argTypes: dataTableArgTypes,
    parameters: {
        docs: { page: dataTableDoc },
        layout: 'fullscreen',
        controls: { hideNoControlsWarning: true },
    },
} as Meta<typeof dataTableArgs>;

export const DataTableDefault = story(
    dataTableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }) => html`
        <table
            is="vl-data-table"
            ?data-vl-hover=${hover}
            ?data-vl-matrix=${matrix}
            ?data-vl-grid=${grid}
            ?data-vl-zebra=${zebra}
            ?data-vl-uig-zebra=${uigZebra}
            ?data-vl-collapsed-m=${collapsedM}
            ?data-vl-collapsed-s=${collapsedS}
            ?data-vl-collapsed-xs=${collapsedXS}
        >
            <caption>
                Data table
            </caption>
            <thead>
                <tr>
                    <th>Entry Header 1</th>
                    <th>Entry Header 2</th>
                    <th>Entry Header 3</th>
                    <th>Entry Header 4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-title="Entry Header 1">Entry line 1</td>
                    <td data-title="Entry Header 2">Entry line 2</td>
                    <td data-title="Entry Header 3">Entry line 3</td>
                    <td data-title="Entry Header 4">Entry line 4</td>
                </tr>
                <tr>
                    <td data-title="Entry Header 1">Entry line 1</td>
                    <td data-title="Entry Header 2" colspan="2">Entry line 2</td>
                    <td data-title="Entry Header 3">Entry line 3</td>
                </tr>
                <tr>
                    <td data-title="Entry Header 1">Entry line 1</td>
                    <td data-title="Entry Header 2">Entry line 2</td>
                    <td data-title="Entry Header 3">Entry line 3</td>
                    <td data-title="Entry Header 4">Entry line 4</td>
                </tr>
            </tbody>
        </table>
    `
);
DataTableDefault.storyName = 'vl-data-table - default';

export const DataTableJoinedRowTitles = story(
    dataTableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }) => html`
        <table
            is="vl-data-table"
            ?data-vl-hover=${hover}
            ?data-vl-matrix=${matrix}
            ?data-vl-grid=${grid}
            ?data-vl-zebra=${zebra}
            ?data-vl-uig-zebra=${uigZebra}
            ?data-vl-collapsed-m=${collapsedM}
            ?data-vl-collapsed-s=${collapsedS}
            ?data-vl-collapsed-xs=${collapsedXS}
        >
            <caption>
                Data table Matrix - Joined row titles
            </caption>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowspan="3" scope="rowgroup">Horizontal title 1</th>
                    <td>Thomas H. &amp; Marie L. Farr</td>
                    <td>110</td>
                    <td>Didymiaceae</td>
                </tr>

                <tr>
                    <td>Critchfield R.L.</td>
                    <td>715</td>
                    <td>Didymiaceae</td>
                </tr>

                <tr>
                    <td>Rammeloo J.</td>
                    <td>4572</td>
                    <td>Didymiaceae</td>
                </tr>
                <tr>
                    <th rowspan="3" scope="rowgroup">Horizontal title 2</th>
                    <td>Franz Heylemans</td>
                    <td>160</td>
                    <td>Onagraceae</td>
                </tr>

                <tr>
                    <td>Stam A.B.</td>
                    <td>477</td>
                    <td>Onagraceae</td>
                </tr>

                <tr>
                    <td>Van Hoeck Eddy</td>
                    <td>42</td>
                    <td>Onagraceae</td>
                </tr>
            </tbody>
        </table>
    `
);
DataTableJoinedRowTitles.storyName = 'vl-data-table - joined row titles';

export const DataTableExpandable = story(
    dataTableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }: typeof dataTableArgs) => {
        return html`
            <table
                is="vl-data-table"
                id="vl-data-table-with-expandable-details"
                ?data-vl-hover=${hover}
                ?data-vl-matrix=${matrix}
                ?data-vl-grid=${grid}
                ?data-vl-zebra=${zebra}
                ?data-vl-uig-zebra=${uigZebra}
                ?data-vl-collapsed-m=${collapsedM}
                ?data-vl-collapsed-s=${collapsedS}
                ?data-vl-collapsed-xs=${collapsedXS}
            >
                <caption>
                    Data table
                </caption>
                <thead>
                    <tr>
                        <th>Entry Header 1</th>
                        <th>Entry Header 2</th>
                        <th>Entry Header 3</th>
                        <th>Entry Header 4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="vl-data-table__element--disabled">
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr class="vl-data-table__element--disabled" data-details-id="details-row1">
                        <td data-title="details-title 1">Title 1: generic details</td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2" colspan="2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                    </tr>
                    <tr data-details-id="details-row2">
                        <td data-title="details-title 2">Title 2: generic details</td>
                    </tr>
                    <tr id="multiple-cells">
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="details-title 3">Title 3: Zij die ter kaperen varen:</td>
                        <td>*</td>
                        <td>*</td>
                        <td>*</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Jan</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Piet</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Joris</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Korneel</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
);
DataTableExpandable.storyName = 'vl-data-table - expandable';

export const DataTableExpandableCustomToggleDetailsColumn = story(
    dataTableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }) => {
        let table: (VlDataTable & Element) | null;
        customElements.whenDefined('vl-data-table').then(() => {
            table = document.querySelector<VlDataTable & Element>('#vl-data-table-with-custom-expandable-details');
        });
        return html`
            <table
                is="vl-data-table"
                id="vl-data-table-with-custom-expandable-details"
                ?data-vl-hover=${hover}
                ?data-vl-matrix=${matrix}
                ?data-vl-grid=${grid}
                ?data-vl-zebra=${zebra}
                ?data-vl-uig-zebra=${uigZebra}
                ?data-vl-collapsed-m=${collapsedM}
                ?data-vl-collapsed-s=${collapsedS}
                ?data-vl-collapsed-xs=${collapsedXS}
            >
                <caption>
                    Data table
                </caption>
                <thead>
                    <tr>
                        <th>Entry Header 1</th>
                        <th data-title="Entry Header 2" colspan="2">Entry line 2</th>
                        <th>Entry Header 3</th>
                        <th>Entry Header 4</th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tbody>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                        <td with-expand-details>
                            <button
                                is="vl-button"
                                @click=${() => {
                                    table?.toggleDetails('details-row1');
                                }}
                            >
                                click to toggle details
                            </button>
                        </td>
                    </tr>
                    <tr data-details-id="details-row1">
                        <td data-title="details-title 1" colspan="5">
                            <div>
                                <ul>
                                    <li>Extra Details 1</li>
                                    <li>Extra Details 1</li>
                                    <li>Extra Details 1</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2" colspan="2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                    </tr>
                    <tr data-details-id="details-row2">
                        <td data-title="details-title 2" colspan="1">
                            <div>
                                <ul>
                                    <li>Extra Details 2</li>
                                    <li>Extra Details 2</li>
                                    <li>Extra Details 2</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-title="Entry Header 1">Entry line 1</td>
                        <td data-title="Entry Header 2">Entry line 2</td>
                        <td data-title="Entry Header 3">Entry line 3</td>
                        <td data-title="Entry Header 4">Entry line 4</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Jan</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Piet</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Joris</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                    <tr data-details-id="details-row3">
                        <td data-title="naam">Korneel</td>
                        <td data-title="familienaam">familienaam</td>
                        <td data-title="telefoon">telefoon</td>
                        <td data-title="adres">adres</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
);
DataTableExpandableCustomToggleDetailsColumn.storyName = 'vl-data-table - expandable custom toggle details column';
DataTableExpandableCustomToggleDetailsColumn.parameters = formattedSourceCode;
