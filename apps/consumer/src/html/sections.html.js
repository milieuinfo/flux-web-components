export const accessibilityHtml = (importType, packageName) => `
    <style>
        .accessibility-wrapper {
            display: block;
            height: 500px;
            overflow: scroll;
        }
    </style>
s    <vl-title-next type="h2">Accessibility - ${importType} - ${packageName}</vl-title-next>
    <div class="container accessibility-wrapper">
        <vl-title-next type="h3" underline>Accessibility</vl-title-next>
        <vl-accessibility></vl-accessibility>
    </div>
`;
