import fontUrl from '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.woff2';

const VDS_ICON_ALIAS = 'vds-vlaanderen-icon';

if (!document.querySelector('style[data-flux704="vds-iconfont-alias"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-flux704', 'vds-iconfont-alias');
    style.textContent = `@font-face{font-family:'${VDS_ICON_ALIAS}';font-style:normal;font-weight:normal;font-display:block;src:url('${fontUrl}') format('woff2');}`;
    document.head.appendChild(style);
}

let aliasSheet: CSSStyleSheet | undefined;

const getAliasSheet = (): CSSStyleSheet => {
    if (!aliasSheet) {
        aliasSheet = new CSSStyleSheet();
        aliasSheet.replaceSync(`:host [class*='vl-vi-']::before{font-family:'${VDS_ICON_ALIAS}' !important;}`);
    }
    return aliasSheet;
};

type FluxAliasedRoot = ShadowRoot & { __fluxAliased?: boolean };

export const aliasVdsIcon = (icon: Element): void => {
    const sr = (icon as HTMLElement).shadowRoot as FluxAliasedRoot | null;
    if (sr && !sr.__fluxAliased) {
        sr.adoptedStyleSheets = [...sr.adoptedStyleSheets, getAliasSheet()];
        sr.__fluxAliased = true;
    }
};
