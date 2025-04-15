export const accessibilityHtml = (importType, packageName) => `
    <style>
        .accessibility-wrapper {
            display: block;
            height: 500px;
            overflow: scroll;
        }
    </style>
s    <vl-title type="h2">Accessibility - ${importType} - ${packageName}</vl-title>
    <div class="container accessibility-wrapper">
        <vl-title type="h3" underline>Accessibility</vl-title>
        <vl-accessibility></vl-accessibility>
    </div>
`;
