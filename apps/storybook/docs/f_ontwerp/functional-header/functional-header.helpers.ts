const createFunctionalHeaderHtmlWithExtraComponent = (component: string, sourceCode = false) => `
<vl-functional-header
    data-vl-title="School- en studietoelagen"
    data-vl-hide-back-link
    data-vl-custom-css=".vl-functional-header__sub-actions, .vl-functional-header__sub__action { width: 100% } ::slotted(.vl-group-next) { width: 100% } ${sourceCode ? '' : '.vl-layout { min-width: 900px}'}"
>
    <div class="vl-group-next vl-group-next--space-between" slot="sub-title">
        <vl-breadcrumb slot="sub-title">
            <vl-breadcrumb-item data-vl-href="#1">Vlaanderen Intern</vl-breadcrumb-item>
            <vl-breadcrumb-item data-vl-href="#2">Regelgeving</vl-breadcrumb-item>
            <vl-breadcrumb-item data-vl-href="#3">Webuniversum</vl-breadcrumb-item>
            <vl-breadcrumb-item>Componenten</vl-breadcrumb-item>
        </vl-breadcrumb>
        ${component}
    </div>
</vl-functional-header>
`;

export const functionalHeaderWithButtonHtml = createFunctionalHeaderHtmlWithExtraComponent('<vl-button-next>Actie knop</vl-button-next>');
export const functionalHeaderWithSearchHtml = createFunctionalHeaderHtmlWithExtraComponent('<vl-search id="search-inline" data-vl-inline></vl-search>');
export const functionalHeaderWithButtonHtmlSourceCode = createFunctionalHeaderHtmlWithExtraComponent('<vl-button-next>Actie knop</vl-button-next>', true);
export const functionalHeaderWithSearchHtmlSourceCode = createFunctionalHeaderHtmlWithExtraComponent('<vl-search id="search-inline" data-vl-inline></vl-search>', true);