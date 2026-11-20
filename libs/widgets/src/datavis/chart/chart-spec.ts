/** Het font en de kleuren die die worden doorgegeven aan Plotly. Via
 *  `buildLayout` worden deze als attributen op de svg gezet. */
export type ChartSpec = {
    fontFamily: string;
    fontSize: number;
    textColor: string;
    /** Rasterlijnen van de waarde/x-as. */
    gridColor: string;
    /** Nullijn, ticks en ticklabels. */
    axisColor: string;
    /** Referentielijnen en hun labels. */
    referenceColor: string;
    backgroundColor: string;
};

/** Leest berekende waarden uit de CSS van `.plot` (vl-chart.flux-css.ts)
 *  aangezien Plotly geen `var()` kan inlezen. Wordt opgeroepen bij elke
 *  nieuwe draw van de grafiek en PNG-export. */
export function readChartSpec(plotElement: HTMLElement): ChartSpec {
    const style = getComputedStyle(plotElement);
    return {
        fontFamily: style.fontFamily,
        fontSize: parseFloat(style.fontSize),
        textColor: style.color,
        gridColor: style.getPropertyValue('--vl-chart-grid-color').trim(),
        axisColor: style.getPropertyValue('--vl-chart-axis-color').trim(),
        referenceColor: style.getPropertyValue('--vl-chart-reference-color').trim(),
        backgroundColor: style.getPropertyValue('--vl-chart-background').trim(),
    };
}
