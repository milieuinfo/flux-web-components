declare module '*.css';
declare module '*.css?raw' {
    const content: string;
    export default content;
}

// FLUX-704: the VDS package ships an `exports` map; TS `moduleResolution: node`
// (classic, from tsconfig.base) does not read it, so the bare specifier fails
// to resolve. Minimal ambient shim for the PoC (only `defineAll` is used).
// Proper fix for a real consumer: set `moduleResolution: "bundler"`.
declare module '@govflanders/vl-ui-design-system-web-components' {
    export function defineAll(prefix?: string): void;
}
declare module '@govflanders/vl-ui-design-system-web-components/css';
