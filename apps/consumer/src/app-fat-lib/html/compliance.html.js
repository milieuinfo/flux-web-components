export const complianceHtml = (importType, packageName) => `
    <vl-header development simple identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"></vl-header>
    <vl-footer development identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b"></vl-footer>
    <main>
        <vl-title type="h2">vl-accessibility - ${importType} - ${packageName}</vl-title>
        <vl-accessibility></vl-accessibility>
    </main>
`;
