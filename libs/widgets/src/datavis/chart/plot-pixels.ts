/** Bepaalt waar de data op de getekende grafiek staat. Plotly plaatst assen
 *  op het element `_fullLayout`. `d2p` (data to pixel) zet de waarde om
 *  naar pixel binnen de as.
 *  @bron: https://github.com/plotly/plotly.js/blob/v4.1.1/src/plots/cartesian/set_convert.js*/
type PlotlyAxis = { d2p(value: number | string): number; _offset: number; _length: number };
type PlotlyElement = HTMLElement & { _fullLayout?: { xaxis?: PlotlyAxis; yaxis?: PlotlyAxis } };

/** Het vlak, binnen de assen, waar de lijnen staan; InnerChart */
export type PlotArea = { left: number; top: number; width: number; height: number };

export type PlotPixels = {
    area: PlotArea;
    toX(position: number | string): number;
    toY(value: number): number;
};

export function readPlotPixels(plotElement: HTMLElement): PlotPixels | null {
    const { xaxis, yaxis } = (plotElement as PlotlyElement)._fullLayout ?? {};
    if (!xaxis || !yaxis) return null;
    return {
        area: { left: xaxis._offset, top: yaxis._offset, width: xaxis._length, height: yaxis._length },
        toX: (position) => xaxis.d2p(position) + xaxis._offset,
        toY: (value) => yaxis.d2p(value) + yaxis._offset,
    };
}
