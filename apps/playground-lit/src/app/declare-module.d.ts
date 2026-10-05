declare module '*.css';
declare module '*.css?raw' {
    const content: string;
    export default content;
}
declare module '*.woff2' {
    const url: string;
    export default url;
}

// FLUX-704: the VDS package ships an `exports` map; TS `moduleResolution: node`
// (classic, from tsconfig.base) does not read it, so the bare specifier fails
// to resolve. Minimal ambient shim for the PoC (only `defineAll` is used).
// Proper fix for a real consumer: set `moduleResolution: "bundler"`.
declare module '@govflanders/vl-ui-design-system-web-components' {
    export function defineAll(prefix?: string): void;
    // VlButton wordt overerfd door flux-button.component.ts. Los getypeerd
    // (de echte types zitten in de package maar moduleResolution: node leest de
    // exports-map niet). LitElement-achtig genoeg om `extends` + static styles.
    export class VlButton extends HTMLElement {
        static styles: unknown;
        static elementName: string;
        protected willUpdate(changed: Map<PropertyKey, unknown>): void;
    }
    export class VlInput extends HTMLElement {
        static styles: unknown;
        static elementName: string;
        protected willUpdate(changed: Map<PropertyKey, unknown>): void;
    }
    export class VlLink extends HTMLElement {
        static styles: unknown;
        static elementName: string;
        protected willUpdate(changed: Map<PropertyKey, unknown>): void;
    }
    export class VlSelect extends HTMLElement {
        static styles: unknown;
        static elementName: string;
    }
    export class VlCheckbox extends HTMLElement {
        static styles: unknown;
        static elementName: string;
    }
    export class VlTextarea extends HTMLElement {
        static styles: unknown;
        static elementName: string;
    }
    export class VlFieldset extends HTMLElement {
        static styles: unknown;
        static elementName: string;
    }
    export class VlRadioGroup extends HTMLElement {
        static styles: unknown;
        static elementName: string;
    }
    export class VlDatepicker extends HTMLElement {
        static styles: unknown;
        static elementName: string;
    }
    export class VlIcon extends HTMLElement {
        static styles: unknown;
        static elementName: string;
        protected willUpdate(changed: Map<PropertyKey, unknown>): void;
    }
    class VlLitElement extends HTMLElement {
        static styles: unknown;
        static elementName: string;
        connectedCallback(): void;
        disconnectedCallback(): void;
        protected willUpdate(changed: Map<PropertyKey, unknown>): void;
        protected updated(changed: Map<PropertyKey, unknown>): void;
    }
    export class VlInformativeTag extends VlLitElement {}
    export class VlRemovableTag extends VlLitElement {}
    export class VlSelectableTag extends VlLitElement {}
    export class VlClickableTag extends VlLitElement {}
    export class VlCollapsible extends VlLitElement {
        open: boolean;
        level: string;
        show(): void;
        hide(): void;
        toggle(): void;
    }
    export class VlDivider extends VlLitElement {
        appearance: string;
    }
    export class VlSectionMessage extends VlLitElement {
        status: string;
        closable: boolean;
    }
    export class VlBannerMessage extends VlLitElement {}
    export class VlInlineMessage extends VlLitElement {}
    export class VlAvatar extends VlLitElement {}
    export class VlGrid extends VlLitElement {}
    export class VlGridItem extends VlLitElement {}
    export class VlTabs extends VlLitElement {}
    export class VlTab extends VlLitElement {}
    export class VlTabpanel extends VlLitElement {}
    export class VlTable extends VlLitElement {
        layout: string;
    }
}
declare module '@govflanders/vl-ui-design-system-web-components/css';
declare module '@govflanders/vl-ui-design-system-web-components/components/vl-table' {
    export const lightStyles: string;
}
