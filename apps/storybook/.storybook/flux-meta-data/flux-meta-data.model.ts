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
    wcag: WCAGCondition;
    jiraMeta: string; // link naar de Jira Meta pagina
    dv?: DVCondition | DVCondition[]; // enkel als Digitaal Vlaanderen een nieuwe variant van het component maakt, een lijst als die over meerdere ideeën gespreid is
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

export const WCAGCondition = {
    todo: 'TODO',
    nvt: 'n.v.t.',
    reviewed: 'reviewed',
} as const;

// naast de vaste niveaus ook een verwijzing naar het openstaande WCAG ticket, bv. 'FLUX-726'
export type WCAGCondition =
    | (typeof WCAGCondition)[keyof typeof WCAGCondition]
    | `FLUX-${string}`;

// status van het idee in Jira Product Discovery van Digitaal Vlaanderen (project DS, 'Doneness matrix of new components')
export const DVStatus = {
    backlog: 'Backlog',
    discovery: 'Discovery',
    ontwerpen: 'Ontwerpen',
    spec: 'Spec',
    klaarVoorDelivery: 'Klaar voor delivery',
    productie: 'Productie',
    gepubliceerd: 'Gepubliceerd',
    wontDo: "Won't do",
} as const;

export type DVStatus = (typeof DVStatus)[keyof typeof DVStatus];

export interface DVCondition {
    idea: string; // sleutel van het idee, bv. 'DS-135'
    name: string; // naam van het component bij DV, bv. 'Card'
    status: DVStatus;
}

// een component kan over meerdere ideeën gespreid zijn, bv. vl-pill over de informatieve en de interactieve tag
export const dvIdeas = (dv?: DVCondition | DVCondition[]): DVCondition[] => (Array.isArray(dv) ? dv : dv ? [dv] : []);
