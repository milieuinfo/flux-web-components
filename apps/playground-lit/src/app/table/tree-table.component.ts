import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlPillComponent, VlTableComponent } from '@domg-wc/components/block';
import { css, html, LitElement, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

interface OnderdeelNode {
    id: string;
    naam: string;
    type: string;
    inkomend: string[];
    uitgaand: string[];
    children?: OnderdeelNode[];
}

interface Row {
    node: OnderdeelNode;
    depth: number;
    expandable: boolean;
    expanded: boolean;
}

const NAAM = '[Naam element]';
const TYPE = '[Type element]';

@customElement('tree-table')
export class TreeTableComponent extends LitElement {
    private collapsed = new Set<string>();

    static get properties(): PropertyDeclarations {
        return {
            collapsed: { type: Object, state: true },
        };
    }

    static {
        registerWebComponents([VlTableComponent, VlPillComponent, VlButtonComponent]);
    }

    // Breedte van de chevron-kolom per boomniveau. Een icon-only vl-button is 3.5rem breed;
    // de slot is iets ruimer zodat de knop wat witruimte (en focus-outline) links/rechts krijgt.
    // De inspringing per niveau volgt exact deze breedte, zodat leaf-rijen onder het label van
    // hun parent uitlijnen.
    private static readonly INDENT_REM = 5;

    private readonly onderdelen: OnderdeelNode[] = [
        {
            id: 'a',
            naam: NAAM,
            type: TYPE,
            inkomend: [],
            uitgaand: [],
            children: [
                { id: 'a1', naam: NAAM, type: TYPE, inkomend: [], uitgaand: [NAAM] },
                { id: 'a2', naam: NAAM, type: TYPE, inkomend: [NAAM], uitgaand: [] },
            ],
        },
        {
            id: 'b',
            naam: NAAM,
            type: TYPE,
            inkomend: [],
            uitgaand: [],
            children: [
                { id: 'b1', naam: NAAM, type: TYPE, inkomend: [], uitgaand: [NAAM] },
                { id: 'b2', naam: NAAM, type: TYPE, inkomend: [NAAM], uitgaand: [] },
            ],
        },
        {
            id: 'n1',
            naam: '[Niveau 1]',
            type: TYPE,
            inkomend: [],
            uitgaand: [],
            children: [
                {
                    id: 'n2',
                    naam: '[Niveau 2]',
                    type: TYPE,
                    inkomend: [],
                    uitgaand: [],
                    children: [
                        { id: 'n2a', naam: NAAM, type: TYPE, inkomend: [], uitgaand: [NAAM, NAAM, NAAM] },
                        { id: 'n2b', naam: NAAM, type: TYPE, inkomend: [NAAM, NAAM, NAAM, NAAM], uitgaand: [] },
                    ],
                },
            ],
        },
    ];

    static get styles() {
        return css`
            :host {
                display: block;
            }

            .tree-cell {
                display: flex;
                align-items: center;
            }

            .tree-cell__toggle {
                flex: 0 0 auto;
                display: flex;
                justify-content: center;
                width: 5rem;
            }

            .tree-cell__label {
                font-weight: 500;
            }

            .connections {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }

            .actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
                white-space: nowrap;
            }

            .add {
                margin-top: 1.5rem;
            }
        `;
    }

    render(): TemplateResult {
        const rows = this.flatten(this.onderdelen, 0);

        return html`
            <vl-table>
                <table>
                    <thead>
                        <tr>
                            <th>Structureel element</th>
                            <th>Type</th>
                            <th>Inkomende verbinding</th>
                            <th>Uitgaande verbinding</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map((row) => this.renderRow(row))}
                    </tbody>
                </table>
            </vl-table>
        `;
    }

    private renderRow({ node, depth, expandable, expanded }: Row): TemplateResult {
        return html`
            <tr>
                <td>
                    <span class="tree-cell" style="margin-left: ${depth * TreeTableComponent.INDENT_REM}rem">
                        ${expandable
                            ? html`
                                  <span class="tree-cell__toggle">
                                      <vl-button
                                          ghost
                                          icon=${expanded ? 'nav-down' : 'nav-right'}
                                          aria-expanded=${expanded}
                                          label=${expanded ? 'Klap in' : 'Klap uit'}
                                          @vl-click=${() => this.toggle(node.id)}
                                      ></vl-button>
                                  </span>
                              `
                            : ''}
                        <span class="tree-cell__label">${node.naam}</span>
                    </span>
                </td>
                <td>${node.type}</td>
                <td>${this.renderConnections(node.inkomend)}</td>
                <td>${this.renderConnections(node.uitgaand)}</td>
                <td>
                    <span class="actions">
                        <vl-button ghost icon="move-up" label="Verplaats naar boven"></vl-button>
                        <vl-button ghost icon="move-down" label="Verplaats naar onder"></vl-button>
                        <vl-button ghost error icon="trash" label="Verwijder onderdeel"></vl-button>
                    </span>
                </td>
            </tr>
        `;
    }

    private renderConnections(verbindingen: string[]): TemplateResult | typeof nothing {
        if (verbindingen.length === 0) return nothing;

        return html`
            <span class="connections">
                ${verbindingen.map((verbinding) => html`<vl-pill clickable>${verbinding}</vl-pill>`)}
            </span>
        `;
    }

    private flatten(nodes: OnderdeelNode[], depth: number): Row[] {
        return nodes.flatMap((node) => {
            const expandable = !!node.children?.length;
            const expanded = expandable && !this.collapsed.has(node.id);
            const row: Row = { node, depth, expandable, expanded };

            return expanded ? [row, ...this.flatten(node.children!, depth + 1)] : [row];
        });
    }

    private toggle(id: string): void {
        const collapsed = new Set(this.collapsed);
        collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id);
        this.collapsed = collapsed;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'tree-table': TreeTableComponent;
    }
}
