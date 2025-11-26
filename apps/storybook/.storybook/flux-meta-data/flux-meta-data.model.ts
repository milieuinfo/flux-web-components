export interface ComponentEvolution {
    vStatus: string;
    legacyText?: string;
    nextText?: string;
    planningInfo?: string;
}

export interface ComponentCondition {
    base: BaseCondition;
    generation: GenerationCondition;
    css: CSSCondition;
    tests: TestCondition[]; // meerdere mogelijk
    documentation: DocumentationCondition;
    wcagLevel: WCAGLevelCondition;
    jiraMeta: string; // link naar de Jira Meta pagina
}

export interface FluxMetaDataComponent {
    name?: string;
    docs?: string;
    condition?: ComponentCondition;
    evolution?: ComponentEvolution;
}

export const BaseCondition = {
    cssResult: 'CSSResult',
    htmlElement: 'HTMLElement',
    litElement: 'LitElement',
    mapAction: 'MapAction',
    nvt: 'n.v.t.',
} as const;

export type BaseCondition = (typeof BaseCondition)[keyof typeof BaseCondition];

export const GenerationCondition = {
    legacy: 'legacy',
    v1: 'v1',
    v2: 'v2',
    v3Next: 'v3-next',
} as const;

export type GenerationCondition = (typeof GenerationCondition)[keyof typeof GenerationCondition];

export const CSSCondition = {
    govflanders: 'govflanders',
    flux: 'Flux',
    nvt: 'n.v.t.'
} as const;

export type CSSCondition = (typeof CSSCondition)[keyof typeof CSSCondition];

export const TestCondition = {
    jest: 'Jest',
    component: 'Component',
    storybook: 'Storybook',
} as const;

export type TestCondition = (typeof TestCondition)[keyof typeof TestCondition];

export const DocumentationCondition = {
    geen: 'geen',
    nvt: 'n.v.t.',
    template: 'template',
    minimaal: 'minimaal',
    basis: 'basis',
    uitgebreid: 'uitgebreid',
} as const;

export type DocumentationCondition = (typeof DocumentationCondition)[keyof typeof DocumentationCondition];

export const WCAGLevelCondition = {
    todo: 'TODO',
    insufficient: 'insufficient',
    bronsBasis: 'brons[basis]',
    bronsPlus: 'brons[plus]',
    zilverBasis: 'zilver[basis]',
    zilverPlus: 'zilver[plus]',
} as const;

export type WCAGLevelCondition = (typeof WCAGLevelCondition)[keyof typeof WCAGLevelCondition];
