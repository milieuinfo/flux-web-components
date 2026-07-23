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
    }
}
declare module '@govflanders/vl-ui-design-system-web-components/css';
