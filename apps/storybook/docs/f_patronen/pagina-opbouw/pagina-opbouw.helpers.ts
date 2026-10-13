const createPageHtml = (mainContent: string) => `
<vl-page>
    <vl-header-next
        slot="header"
        identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
        skip-to-content-id="title"
        development
        simple
    ></vl-header-next>
    <div slot="main">
        ${mainContent.trim()}
    </div>
    <vl-footer-next
        slot="footer"
        identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b"
        development
    ></vl-footer-next>
</vl-page>
`;

const createSectionsHtml = (fullWidth = false) => {
    const contentBlockClass = fullWidth ? 'vl-content-block vl-content-block--full-width' : 'vl-content-block';

    return `
        <vl-functional-header
            title-label="Naam applicatie"
            link="#"
            sub-title="Paginatitel"
            back="Startpagina"
            back-link="#"
            skip-to-content-id="page-title"${fullWidth ? '\n            full-width' : ''}
        ></vl-functional-header>
        <section class="vl-section">
            <div class="${contentBlockClass}">
                <div class="vl-stacked vl-stacked-medium">
                    <vl-title type="h1" id="page-title" no-space-bottom>Paginatitel</vl-title>
                    <vl-paragraph>Korte inleiding op de pagina.</vl-paragraph>
                    <vl-paragraph>
                        Elke sectie is een .vl-section met daarin een .vl-content-block. De verticale ruimte tussen
                        elementen komt van .vl-stacked op de container.
                    </vl-paragraph>
                </div>
            </div>
        </section>
        <section class="vl-section">
            <div class="${contentBlockClass}">
                <div class="vl-stacked vl-stacked-medium">
                    <vl-title type="h2" no-space-bottom>Tweede sectie</vl-title>
                    <vl-paragraph>Korte inleiding op de sectie.</vl-paragraph>
                    <vl-paragraph>
                        Elke sectie is een .vl-section met daarin een .vl-content-block. De verticale ruimte tussen
                        elementen komt van .vl-stacked op de container.
                    </vl-paragraph>
                </div>
            </div>
        </section>
    `;
};

export const pageLayoutDefaultHtml = createPageHtml(createSectionsHtml());

export const pageLayoutFullWidthHtml = createPageHtml(createSectionsHtml(true));

export const pageLayoutSideNavigationHtml = createPageHtml(`
        <vl-functional-header
            title-label="Naam applicatie"
            link="#"
            sub-title="Paginatitel"
            back="Startpagina"
            back-link="#"
            skip-to-content-id="page-title"
        ></vl-functional-header>
        <section class="vl-section">
            <div class="vl-content-block">
                <vl-side-navigation-layout-next heading-root-selector="#page-content" min-level="2">
                    <div slot="content" id="page-content" class="vl-stacked vl-stacked-medium">
                        <div class="vl-stacked vl-stacked-small">
                            <vl-title type="h1" id="page-title" no-space-bottom>Paginatitel</vl-title>
                            <vl-paragraph>Korte inleiding op de pagina.</vl-paragraph>
                            <vl-paragraph>
                                De side navigation wordt opgebouwd uit de headings met een id in de content.
                            </vl-paragraph>
                        </div>
                        <div class="vl-stacked vl-stacked-small">
                            <vl-title type="h2" id="eerste-onderdeel" no-space-bottom>Eerste onderdeel</vl-title>
                            <vl-paragraph>Inhoud van het eerste onderdeel.</vl-paragraph>
                        </div>
                        <div class="vl-stacked vl-stacked-small">
                            <vl-title type="h2" id="tweede-onderdeel" no-space-bottom>Tweede onderdeel</vl-title>
                            <vl-paragraph>Inhoud van het tweede onderdeel.</vl-paragraph>
                        </div>
                        <div class="vl-stacked vl-stacked-small">
                            <vl-title type="h2" id="derde-onderdeel" no-space-bottom>Derde onderdeel</vl-title>
                            <vl-paragraph>Inhoud van het derde onderdeel.</vl-paragraph>
                        </div>
                    </div>
                </vl-side-navigation-layout-next>
            </div>
        </section>
`);
