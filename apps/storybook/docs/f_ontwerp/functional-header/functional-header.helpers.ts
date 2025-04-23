const createFunctionalHeaderHtmlWithExtraComponent = (component: string, sourceCode = false) => `
<vl-functional-header
    title="School- en studietoelagen"
    hide-back-link
    custom-css=".vl-functional-header__sub-actions, .vl-functional-header__sub__action { width: 100% } ::slotted(.vl-group) { width: 100% } ${
        sourceCode ? '' : '.vl-layout { min-width: 900px}'
    }"
>
    <div class="vl-group vl-group--space-between" slot="sub-title">
        <vl-breadcrumb slot="sub-title">
            <vl-breadcrumb-item href="#1">Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#2">Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item href="#3">Webuniversum</vl-breadcrumb-item>
            <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
        </vl-breadcrumb>
        ${component}
    </div>
</vl-functional-header>
`;

export const functionalHeaderWithButtonHtml = createFunctionalHeaderHtmlWithExtraComponent(
    '<vl-button>Actie knop</vl-button>'
);
export const functionalHeaderWithSearchHtml = createFunctionalHeaderHtmlWithExtraComponent(
    '<vl-search id="search-inline" inline></vl-search>'
);
export const functionalHeaderWithButtonHtmlSourceCode = createFunctionalHeaderHtmlWithExtraComponent(
    '<vl-button>Actie knop</vl-button>',
    true
);
export const functionalHeaderWithSearchHtmlSourceCode = createFunctionalHeaderHtmlWithExtraComponent(
    '<vl-search id="search-inline" inline></vl-search>',
    true
);
