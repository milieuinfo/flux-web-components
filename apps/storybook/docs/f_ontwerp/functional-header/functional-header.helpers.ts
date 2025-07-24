const createFunctionalHeaderHtmlWithExtraComponent = (component: string, sourceCode = false) => `
<vl-functional-header
    title="School- en studietoelagen"
    hide-back-link
    custom-css=".vl-functional-header__sub-actions, .vl-functional-header__sub__action { width: 100% } ::slotted(.vl-group) { width: 100% } ${
        sourceCode ? '' : ':host .vl-content-block { min-width: 900px}'
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

const createFunctionalHeaderHtmlWithBackAndTabs = (sourceCode = false) => ` <vl-functional-header
        title="School- en studietoelagen"
        custom-css="${`
                #sub-title{ 
                    vertical-align: text-top;
                } 
                :host .vl-functional-header__sub-row { 
                    margin-bottom: 0; 
                }
                ${sourceCode ? '' : ':host .vl-content-block { min-width: 900px}'}
            `}"
    >
        <vl-tabs
            slot="sub-title"
            disable-links
            within-functional-header
            active-tab="trein"
            custom-css="${`
                :host(.vl-tabs--within-functional-header) .vl-tab__link { 
                    padding-top: 0;
                }
            `}"
        >
            <vl-tabs-pane id="trein" title="Trein"></vl-tabs-pane>
            <vl-tabs-pane id="metro" title="Metro, tram en bus"></vl-tabs-pane>
            <vl-tabs-pane id="fiets" title="Fiets"></vl-tabs-pane>
        </vl-tabs>
    </vl-functional-header>`;

export const functionalHeaderWithBackAndTabs = createFunctionalHeaderHtmlWithBackAndTabs();
export const functionalHeaderWithBackAndTabsSourceCode = createFunctionalHeaderHtmlWithBackAndTabs(true);
