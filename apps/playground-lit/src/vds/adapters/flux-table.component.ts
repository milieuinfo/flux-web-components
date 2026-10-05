import { css } from 'lit';
import { VlTable } from '@govflanders/vl-ui-design-system-web-components';
import { lightStyles } from '@govflanders/vl-ui-design-system-web-components/components/vl-table';

export class FluxTable extends VlTable {
    static properties = {
        collapsedM: { type: Boolean, attribute: 'collapsed-m' },
        collapsedS: { type: Boolean, attribute: 'collapsed-s' },
        collapsedXs: { type: Boolean, attribute: 'collapsed-xs' },
    };

    declare collapsedM: boolean;
    declare collapsedS: boolean;
    declare collapsedXs: boolean;

    static styles = [
        (VlTable as unknown as { styles: unknown }).styles,
        css`
            :host(:not([bare])) {
                --base-space-selectable-inset-vertical-l: 1.2rem;
                --base-space-selectable-inset-horizontal-l: 1rem;
                --base-line-height-body: 1.3;
                --base-color-background-surface-table-cell-header-enabled: transparent;
                --base-color-background-surface-table-cell-enabled-zebra: transparent;
                border: 0;
                border-radius: 0;
            }
        `,
    ];

    connectedCallback(): void {
        super.connectedCallback();
        dropLeakedVdsTableSheet();
    }

    protected willUpdate(changed: Map<PropertyKey, unknown>): void {
        const breakpoint = this.collapsedM ? 1023 : this.collapsedS ? 767 : this.collapsedXs ? 500 : null;
        this.layout = breakpoint ? 'auto' : 'table';
        if (breakpoint) this.style.setProperty('--vl-table-list-breakpoint', String(breakpoint));
        else this.style.removeProperty('--vl-table-list-breakpoint');
        super.willUpdate(changed);
    }
}

const isLeakedVdsTableSheet = (sheet: CSSStyleSheet): boolean =>
    [...sheet.cssRules].some((rule) => /(^|[\s,(])vl-table table\b/.test((rule as CSSStyleRule).selectorText ?? ''));

const dropLeakedVdsTableSheet = (): void => {
    const sheets = document.adoptedStyleSheets;
    if (sheets.some(isLeakedVdsTableSheet)) {
        document.adoptedStyleSheets = sheets.filter((sheet) => !isLeakedVdsTableSheet(sheet));
    }
};

const FLUX_TABLE_LOOK = `
flux-table:not([bare]) caption {
  caption-side: bottom;
  margin: 1.5rem 0 0.5rem;
  padding: 0;
  color: #687483;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: left;
}
flux-table:not([bare]) thead tr {
  border-bottom: 2px solid #cbd2da;
}
flux-table:not([bare]) tbody tr {
  border-bottom: 1px solid #cbd2da;
}
flux-table:not([bare])[zebra] tbody tr:nth-child(odd) {
  background: #f3f5f6;
}
`;

const injectFluxTableLightStyles = (): void => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(lightStyles.replace(/(?<![\w.-])vl-table(?![\w-])/g, 'flux-table') + FLUX_TABLE_LOOK);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
};

if (!customElements.get('flux-table')) {
    injectFluxTableLightStyles();
    customElements.define('flux-table', FluxTable);
}
