import { BaseLitElement, onChildListChange, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css';
import { vlElementsStyle } from '@domg-wc/elements';
import { CSSResult, html, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { buildProperties } from './vl-properties.builder';
import propertiesStyles, { labelWidthRem } from './vl-properties.css';
import { propertiesDefaults } from './vl-properties.defaults';
import { Column, Item, Props } from './vl-properties.model';

@globalStylesNext()
@webComponent('vl-properties-next')
export class VlPropertiesComponent extends BaseLitElement {
    private attributeProps: Props = propertiesDefaults.props;
    private aggregatedProps: Props = propertiesDefaults.props;
    private mutationObserverList: MutationObserver[] = [];
    private labelWidth: number = propertiesDefaults.labelWidth;
    private labelWidthSheet: CSSStyleSheet = new CSSStyleSheet();

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, propertiesStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            props: { type: Array },
            aggregatedProps: { type: Array, state: true },
            labelWidth: { type: Number, attribute: 'label-width' },
        };
    }

    set props(props: Props) {
        this.attributeProps = props;
        this.buildInternalProperties();
    }

    get props(): Props {
        return this.attributeProps;
    }

    connectedCallback() {
        super.connectedCallback();

        this.buildInternalProperties();
        this.observeLightPropertiesChange();
    }

    firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);

        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this.labelWidthSheet];
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('labelWidth') && this.labelWidth) {
            this.labelWidthSheet.replace(labelWidthRem(this.labelWidth).toString());
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.disconnectMutationObservers();
    }

    render(): TemplateResult {
        return html` <dl>${this.aggregatedProps.map((column: Column) => this.renderColumn(column))}</dl> `;
    }

    private renderColumn(column: Column): TemplateResult {
        return column.class
            ? html` <div class="${column.class}">${column.items.map((item: Item) => this.renderItem(item))}</div>`
            : html` ${column.items.map((item: Item) => this.renderItem(item))}`;
    }

    private renderItem(item: Item): TemplateResult {
        return html` <div class="item">${this.renderLabels(item.labels)} ${this.renderData(item.data)}</div>`;
    }

    private renderLabels(labels: string[] | Node[][]): TemplateResult[] {
        return labels.map((label: string | Node[]) => html` <dt>${label}</dt>`);
    }

    private renderData(itemData: string[] | Node[][]): TemplateResult[] {
        return itemData.map((data: string | Node[]) => html` <dd>${data}</dd>`);
    }

    private buildInternalProperties() {
        this.aggregatedProps = [...this.attributeProps, ...buildProperties([...this.children])];
    }

    private disconnectMutationObservers() {
        this.mutationObserverList.forEach((mutationObserver) => mutationObserver.disconnect());
        this.mutationObserverList = [];
    }

    private observeLightPropertiesChange() {
        // verwijder alle bestaande mutation observers
        this.disconnectMutationObservers();
        // altijd de vl-properties zelf observeren
        this.mutationObserverList = [
            ...this.mutationObserverList,
            onChildListChange(this, (change: any) => {
                this.buildInternalProperties();
                // er kan een extra div toegevoegd zijn, deze heeft dan ook een mutation observer nodig
                this.observeLightPropertiesChange();
            }),
        ];
        // als de directe kinderen div's zijn deze ook observeren
        if (this.children.length > 0 && this.children[0].localName === 'div') {
            [...this.children].forEach(
                (element) =>
                    (this.mutationObserverList = [
                        ...this.mutationObserverList,
                        onChildListChange(element, (change: any) => {
                            this.buildInternalProperties();
                        }),
                    ])
            );
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-properties-next': VlPropertiesComponent;
    }
}
