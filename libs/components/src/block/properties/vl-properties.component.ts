import { BaseLitElement, onChildListChange, webComponent } from '@domg-wc/common';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { buildProperties } from './vl-properties.builder';
import { labelWidthPercentage, propertiesStyles, sizeQueryStyles } from './vl-properties.css';
import { propertiesDefaults } from './vl-properties.defaults';
import { Column, Item, Props } from './vl-properties.model';

@webComponent('vl-properties')
export class VlPropertiesComponent extends BaseLitElement {
    private attributeProps: Props = propertiesDefaults.props;
    private aggregatedProps: Props = propertiesDefaults.props;
    private labelWidth: number = propertiesDefaults.labelWidth;
    private labelWidthSheet: CSSStyleSheet = new CSSStyleSheet();
    /**
     * @deprecated Wordt verwijderd in v3 - de component houdt tegenwoordig zijn shadow DOM
     * automatisch synchroon na wijzigingen in de light DOM (tekst en attributen).
     */
    private noClone: boolean = false;
    private mutationObserverList: MutationObserver[] = [];
    private static noCloneDeprecationWarningShown = false;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLegacyStyles, propertiesStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            props: { type: Array },
            aggregatedProps: { type: Array, state: true },
            labelWidth: { type: Number, attribute: 'label-width' },
            noClone: { type: Boolean, attribute: 'no-clone' },
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
            // sizeQueryStyles (CSS voor media & container queries) moeten verwerkt worden na de CSS van
            // labelWidthSheet changes - anders wordt die CSS overschreven
            this.shadowRoot.adoptedStyleSheets = [
                ...this.shadowRoot.adoptedStyleSheets,
                this.labelWidthSheet,
                sizeQueryStyles.styleSheet!,
            ];
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('labelWidth') && this.labelWidth) {
            this.labelWidthSheet.replace(labelWidthPercentage(this.labelWidth).toString());
        }

        if (changedProperties.has('noClone') && this.noClone && !VlPropertiesComponent.noCloneDeprecationWarningShown) {
            console.warn(
                `Het no-clone attribuut van ${this.localName} is niet meer nodig en deprecated, het wordt verwijderd in v3`,
            );
            VlPropertiesComponent.noCloneDeprecationWarningShown = true;
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
        return html` ${this.renderLabels(item.labels)} ${this.renderData(item.data)} `;
    }

    private renderLabels(labels: string[] | Node[][]): TemplateResult[] {
        return labels.map((label: string | Node[]) => html` <dt>${label}</dt>`);
    }

    private renderData(itemData: string[] | Node[][]): TemplateResult[] {
        return itemData.map((data: string | Node[]) => html` <dd>${data}</dd>`);
    }

    private buildInternalProperties() {
        // de inhoud wordt altijd ge-cloned zodat de shadow DOM synchroon blijft met de light DOM
        this.aggregatedProps = [...this.attributeProps, ...buildProperties([...this.children])];
    }

    private disconnectMutationObservers() {
        this.mutationObserverList.forEach((mutationObserver) => mutationObserver.disconnect());
        this.mutationObserverList = [];
    }

    private observeLightPropertiesChange() {
        this.disconnectMutationObservers();
        // ondersteuning voor alle mogelijke mutaties - om de shadow-dom in-sync te houden met de light-dom
        this.mutationObserverList = [
            onChildListChange(this, () => this.buildInternalProperties(), {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
            }),
        ];
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-properties': VlPropertiesComponent;
    }
}
