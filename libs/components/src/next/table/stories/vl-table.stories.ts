import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTableComponent } from '../vl-table.component';
import { tableArgTypes, tableArgs } from './vl-table.stories-arg';
import tableDoc from './vl-table.stories-doc.mdx';

registerWebComponents([VlTableComponent]);

export default {
    id: 'components-next-table',
    title: 'Components-next/table',
    tags: ['autodocs'],
    args: tableArgs,
    argTypes: tableArgTypes,

    parameters: {
        docs: {
            page: tableDoc,
        },
    },
} as Meta<typeof tableArgs>;

export const TableDefault = story(
    tableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }) => html`
        <vl-table-next
            ?hover=${hover}
            ?matrix=${matrix}
            ?grid=${grid}
            ?zebra=${zebra}
            ?uig-zebra=${uigZebra}
            ?collapsed-m=${collapsedM}
            ?collapsed-s=${collapsedS}
            ?collapsed-xs=${collapsedXS}
        >
            <table>
                <caption>
                    Meise Botanic Garden herbarium collections
                </caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Collector</th>
                        <th>Collector number</th>
                        <th>Family</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowspan="3">Didymium clavus</th>
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
                        <th rowspan="3">Epilobium angustifolium</th>
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
                    <tr>
                        <th rowspan="3">Euphorbia scordifolia</th>
                        <td>Mission O. Olufsen</td>
                        <td>125</td>
                        <td>Euphorbiaceae</td>
                    </tr>
                    <tr>
                        <td>Brunel J.F.</td>
                        <td>7603</td>
                        <td>Euphorbiaceae</td>
                    </tr>
                    <tr>
                        <td>Bamps P.</td>
                        <td>7549</td>
                        <td>Euphorbiaceae</td>
                    </tr>
                    <tr>
                        <th rowspan="3">Hemitrichia</th>
                        <td>Madame F. Meyer</td>
                        <td>198</td>
                        <td>Trichiaceae</td>
                    </tr>
                    <tr>
                        <td>Johannesen E.W.</td>
                        <td>50B</td>
                        <td>Trichiaceae</td>
                    </tr>
                    <tr>
                        <td>Rammeloo J.</td>
                        <td>9438</td>
                        <td>Trichiaceae</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <div class="vl-annotation">Table annotation</div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </vl-table-next>
    `
);
TableDefault.storyName = 'vl-table-next - default';

export const TableJoinedRowTitles = story(
    tableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }) => html`
        <vl-table-next
                ?hover=${hover}
                ?matrix=${matrix}
                ?grid=${grid}
                ?zebra=${zebra}
                ?uig-zebra=${uigZebra}
                ?collapsed-m=${collapsedM}
                ?collapsed-s=${collapsedS}
                ?collapsed-xs=${collapsedXS}
        >
            <table>
                <caption>
                    Table Matrix - Joined row titles
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
        </vl-table-next>
    `
);
TableJoinedRowTitles.storyName = 'vl-table-next - joined row titles';

export const TableExpandable = story(
    tableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }: typeof tableArgs) => {
        return html`
            <vl-table-next
                ?hover=${hover}
                ?matrix=${matrix}
                ?grid=${grid}
                ?zebra=${zebra}
                ?uig-zebra=${uigZebra}
                ?collapsed-m=${collapsedM}
                ?collapsed-s=${collapsedS}
                ?collapsed-xs=${collapsedXS}
            >
                <table id="vl-data-table-with-expandable-details">
                    <caption>
                        Table with expandable details
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
                        <tr data-details-id="details-row1">
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
                            <td data-title="details-title 3">Al die willen te kaap'ren varen:</td>
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
            </vl-table-next>
        `;
    }
);
TableExpandable.storyName = 'vl-table-next - expandable';

export const TableExpandableCustomToggleDetailsColumn = story(
    tableArgs,
    ({ hover, matrix, grid, zebra, uigZebra, collapsedM, collapsedS, collapsedXS }) => {
        let table: (VlTableComponent & Element) | null;
        customElements.whenDefined('vl-data-table').then(() => {
            table = document.querySelector<VlTableComponent & Element>('#vl-table-with-custom-expandable-details');
        });
        return html`
            <vl-table-next
                id="vl-table-with-custom-expandable-details"
                ?hover=${hover}
                ?matrix=${matrix}
                ?grid=${grid}
                ?zebra=${zebra}
                ?uig-zebra=${uigZebra}
                ?collapsed-m=${collapsedM}
                ?collapsed-s=${collapsedS}
                ?collapsed-xs=${collapsedXS}
            >
                <table>
                    <caption>
                        Table
                    </caption>
                    <thead>
                        <tr>
                            <th>Entry Header 1</th>
                            <th data-title="Entry Header 2" colspan="2">Entry line 2</th>
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
                            <td data-with-expand-details>
                                <button
                                    is="vl-button"
                                    @click=${() => {
                                        console.log('clicked table', table);
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
            </vl-table-next>
        `;
    }
);
TableExpandableCustomToggleDetailsColumn.storyName = 'vl-table-next - expandable custom toggle details column';
TableExpandableCustomToggleDetailsColumn.parameters = {
    docs: {
        language: 'html',
        source: {
            format: true,
            type: 'code',
        },
    },
};
