import { BaseLitElement, onChildListChange } from '@domg-wc/common';
import { vlGridStyles, vlResetStyles } from '@domg-wc/styles';
import { descriptionDataStyle } from '@domg/govflanders-style/component';
import { html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlDescriptionDataItem } from './vl-description-data-item.component';

type DescriptionDataEntry = {
    item: VlDescriptionDataItem;
    label: string | Node[];
    value: string | Node[];
};

@customElement('vl-description-data')
export class VlDescriptionData extends BaseLitElement {
    private size = 0;
    private mediumSize = 0;
    private smallSize = 0;
    private extraSmallSize = 0;
    private bordered = false;
    private entries: DescriptionDataEntry[] = [];
    private mutationObserver: MutationObserver | null = null;
    private ignoredChildrenWarningShown = false;

    static get styles() {
        return [vlResetStyles, descriptionDataStyle, vlGridStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            size: { type: Number, attribute: 'items-size' },
            mediumSize: { type: Number, attribute: 'items-medium-size' },
            smallSize: { type: Number, attribute: 'items-small-size' },
            extraSmallSize: { type: Number, attribute: 'items-extra-small-size' },
            bordered: { type: Boolean, attribute: 'bordered' },
            entries: { state: true },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        this.buildEntries();
        this.observeLightDomChange();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.disconnectMutationObserver();
    }

    render(): TemplateResult {
        const classes = {
            'vl-description-data--bordered': this.bordered,
        };
        return html`
            <div class="vl-description-data ${classMap(classes)}">
                <dl class="vl-grid">${this.entries.map((entry) => this.renderEntry(entry))}</dl>
            </div>
        `;
    }

    private renderEntry(entry: DescriptionDataEntry): TemplateResult {
        return html`
            <div class="vl-column ${classMap(this.buildColumnClasses(entry.item))}">
                <dt class="vl-description-data__label">${entry.label}</dt>
                <dd class="vl-description-data__value">${entry.value}</dd>
            </div>
        `;
    }

    private get columnSize(): number {
        return this.size || 12 / this.entries.length;
    }

    private buildColumnClasses(item: VlDescriptionDataItem) {
        const size = item.itemsSize ?? this.columnSize;
        const mediumSize = item.itemsMediumSize ?? this.mediumSize;
        const smallSize = item.itemsSmallSize ?? this.smallSize;
        const extraSmallSize = item.itemsExtraSmallSize ?? this.extraSmallSize;
        return {
            [`vl-column--${size}`]: !!size,
            [`vl-column--m-${mediumSize}`]: !!mediumSize,
            [`vl-column--s-${smallSize}`]: !!smallSize,
            [`vl-column--xs-${extraSmallSize}`]: !!extraSmallSize,
        };
    }

    // De dt/dd moeten in dezelfde shadow root staan als de dl: ge-slot vanuit het item zouden ze anders in de
    // flattened tree gescheiden zijn van de dl door de item-host, waardoor de term/definitie-relatie wegvalt.
    private buildEntries() {
        const children = Array.from(this.children);

        this.entries = children
            .filter((child): child is VlDescriptionDataItem => child instanceof VlDescriptionDataItem)
            .map((item) => ({
                item,
                label: this.buildContent(item, 'label'),
                value: this.buildContent(item, 'value'),
            }));

        this.warnAboutIgnoredChildren(children);
    }

    private buildContent(item: Element, name: 'label' | 'value'): string | Node[] {
        const slotted = Array.from(item.children).filter((child) => child.getAttribute('slot') === name);

        if (!slotted.length) {
            return item.getAttribute(name) ?? '';
        }
        // het ge-slotte element zelf wordt mee gekloond: een consumer kan er rechtstreeks bv. een <a> in plaatsen,
        // dus door enkel zijn kinderen te clonen zou er inhoud verloren gaan.
        return slotted.map((child) => {
            const clone = child.cloneNode(true) as Element;
            clone.removeAttribute('slot');
            return clone;
        });
    }

    private warnAboutIgnoredChildren(children: Element[]) {
        if (this.ignoredChildrenWarningShown || children.length === this.entries.length) {
            return;
        }

        console.warn(
            `${this.localName} rendert enkel vl-description-data-item kinderen, andere elementen worden genegeerd`,
        );
        this.ignoredChildrenWarningShown = true;
    }

    private observeLightDomChange() {
        this.disconnectMutationObserver();
        // ook attributen en tekst worden geobserveerd, zodat de gekloonde inhoud synchroon blijft met de light DOM
        this.mutationObserver = onChildListChange(this, () => this.buildEntries(), {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
        });
    }

    private disconnectMutationObserver() {
        this.mutationObserver?.disconnect();
        this.mutationObserver = null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-description-data': VlDescriptionData;
    }
}
