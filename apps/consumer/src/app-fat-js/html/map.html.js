export const mapWithGrayBaselayerHtml = (importType, packageName) => `
    <div id="consumer-map">
        <vl-title-next type="h2">Map With Gray Baselayer - ${importType} - ${packageName}</vl-title-next>
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        </vl-map>
    </div>
`;
