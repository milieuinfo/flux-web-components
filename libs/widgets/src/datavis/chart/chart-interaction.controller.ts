import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { StyleInfo } from 'lit/directives/style-map.js';
import {
    buildHoverSummary,
    collectPositions,
    describePosition,
    findNearestPositionIndex,
    toPlotlyPosition,
    type HoverSummary,
    type Position,
} from '../layout/hover-positions';
import { countDecimalsInData } from '../layout/value-format';
import type { ChartModel } from '../models/chart.model';
import { readPlotPixels, type PlotArea, type PlotPixels } from './plot-pixels';

/** Afstand van de vinger wanneer een tap een swipe wordt. */
const TAP_DISTANCE = 10;
/** Afstand in px tussen de verticale lijn van de hover en de tooltip. */
const TOOLTIP_GAP = 12;
/** Afstand in px tussen de tooltip en de boven- en onderrand van de grafiek. */
const TOOLTIP_INSET = 8;

/** Gekleurde stip op een reekslijn bij het hoveren van grafiek */
export type HoverDot = { y: number; color: string };

/** Tekent bij het hoveren een tooltip, een verticale lijn op de x-as en een
 *  stip op elke reekslijn.  */
export type HoverView = HoverSummary & {
    x: number;
    area: PlotArea;
    dots: HoverDot[];
    tooltipPosition: StyleInfo;
};

/** Tooltip verwijderen bij het bewegen van de muis of pijltjes. */
type TooltipHold = { by: 'nothing' } | { by: 'keyboard'; index: number } | { by: 'touch'; index: number };

/** De controller haalt data, het plotly-element en de kleur per reeks
 *  uit de grafiek. */
export type InteractiveChart = {
    readModel(): ChartModel | null;
    readPlotElement(): HTMLElement;
    readSeriesColor(seriesIndex: number): string;
};

/** `curveNumber` is de index van de reeks en Plotly geeft dit mee bij
 *  `plotly_hover`. */
// 'curve' is de oude naam die Plotly gebruikte voor een 'trace'.
// Het hoverevent bij plotly is nooit geupdatete naar 'trace'.
type PlotlyHoverEvent = { points?: { curveNumber: number; pointNumber: number }[] };
/** Plotly plaats `.on()` op het element waarin het tekent; `bindToPlot` */
type PlotlyEventElement = HTMLElement & { on(event: string, handler: (event: PlotlyHoverEvent) => void): void };

/** Een Lit-ReactiveController die events registeert, de tooltip berekent
 *  (waarden,
 *  dots en plaats) in `hover`.
 * (https://lit.dev/docs/composition/controllers/). */
export class ChartInteractionController implements ReactiveController {
    /** Tooltip */
    hover: HoverView | null = null;
    announcement = '';

    #host: ReactiveControllerHost & HTMLElement;
    #chart: InteractiveChart;
    #hold: TooltipHold = { by: 'nothing' };
    #tapStart: { x: number; y: number } | null = null;
    /** Bepaalt waar de tooltip staat zodat hij niet op en neer springt.
     * Wordt gebruikt in `layout/hover-positions.ts:75`.
     * @default 'top' */
    #tooltipHalf: 'top' | 'bottom' = 'top';
    /** Voorkomt dat `Plotly.react` de listeners bijhoudt. */
    #isBoundToPlot = false;

    constructor(host: ReactiveControllerHost & HTMLElement, chart: InteractiveChart) {
        this.#host = host;
        this.#chart = chart;
        this.#host.addController(this);
    }

    hostConnected(): void {
        document.addEventListener('pointerdown', this.#onDocumentPointerDown);
    }

    hostDisconnected(): void {
        document.removeEventListener('pointerdown', this.#onDocumentPointerDown);
        this.#isBoundToPlot = false;
    }

    /** Nieuwe data: niets aangewezen, niets voorgelezen. */
    reset(): void {
        this.#hold = { by: 'nothing' };
        this.announcement = '';
        this.#showHover(null);
    }

    startNewDrawing(tooltipHalf: 'top' | 'bottom'): void {
        this.#tooltipHalf = tooltipHalf;
        if (this.#hold.by === 'touch') this.#hold = { by: 'nothing' };
        this.#showHover(null);
    }

    bindToPlot(): void {
        if (this.#isBoundToPlot) return;
        this.#isBoundToPlot = true;
        const plotElement = this.#chart.readPlotElement() as PlotlyEventElement;
        plotElement.on('plotly_hover', (event) => this.#onPlotlyHover(event));
        plotElement.on('plotly_unhover', () => this.#onPlotlyUnhover());
    }

    // --- muis tooltip
    #onPlotlyHover(event: PlotlyHoverEvent): void {
        // Na een tik bootst de browser muisevents na; die mogen de vastgezette tooltip niet verplaatsen.
        if (this.#hold.by === 'touch') return;
        const model = this.#chart.readModel();
        const point = event.points?.[0];
        if (!model || !point) return;
        const position = model.series[point.curveNumber]?.x[point.pointNumber];
        if (position === undefined) return;
        this.#showHover(this.#buildHoverView(model, position));
    }

    #onPlotlyUnhover(): void {
        if (this.#hold.by === 'nothing') this.#showHover(null);
    }

    // --- toetsenbord tooltip
    onKeydown = (event: KeyboardEvent): void => {
        const model = this.#chart.readModel();
        if (!model) return;
        if (event.key === 'Escape') {
            this.#release();
            return;
        }
        const positions = collectPositions(model);
        const index = this.#findNextIndex(event.key, positions.length);
        if (index === undefined) return;
        event.preventDefault(); // anders scrollt de pagina mee
        this.#hold = { by: 'keyboard', index };
        this.#showHover(this.#buildHoverView(model, positions[index]));
        this.announcement = describePosition(model, positions[index], countDecimalsInData(model));
    };

    onBlur = (): void => {
        if (this.#hold.by === 'keyboard') this.#release();
    };

    #findNextIndex(key: string, count: number): number | undefined {
        const isFirstStep = this.#hold.by !== 'keyboard';
        const current = this.#hold.by === 'keyboard' ? this.#hold.index : 0;
        switch (key) {
            case 'ArrowRight':
                return isFirstStep ? 0 : Math.min(current + 1, count - 1);
            case 'ArrowLeft':
                return isFirstStep ? 0 : Math.max(current - 1, 0);
            case 'Home':
                return 0;
            case 'End':
                return count - 1;
            default:
                return undefined;
        }
    }

    // --- touch tooltip
    onPointerDown = (event: PointerEvent): void => {
        if (event.pointerType === 'touch') {
            this.#tapStart = { x: event.clientX, y: event.clientY };
        } else {
            this.#tapStart = null;
        }
    };

    onPointerUp = (event: PointerEvent): void => {
        const start = this.#tapStart;
        this.#tapStart = null;
        if (event.pointerType !== 'touch' || !start) return;
        const isSwipe = Math.hypot(event.clientX - start.x, event.clientY - start.y) > TAP_DISTANCE;
        if (isSwipe) return;
        const model = this.#chart.readModel();
        const pixels = readPlotPixels(this.#chart.readPlotElement());
        if (!model || !pixels) return;
        const positions = collectPositions(model);
        const index = this.#findTappedIndex(model, positions, pixels, event.clientX);
        const isSameAsPinned = this.#hold.by === 'touch' && this.#hold.index === index;
        if (index === -1 || isSameAsPinned) {
            this.#release();
            return;
        }
        this.#hold = { by: 'touch', index };
        this.#showHover(this.#buildHoverView(model, positions[index]));
    };

    #findTappedIndex(model: ChartModel, positions: Position[], pixels: PlotPixels, clientX: number): number {
        const plotLeft = this.#chart.readPlotElement().getBoundingClientRect().left;
        const pixelXs = positions.map((position) => pixels.toX(toPlotlyPosition(model, position)));
        return findNearestPositionIndex(pixelXs, clientX - plotLeft);
    }

    #onDocumentPointerDown = (event: PointerEvent): void => {
        const isOutsideChart = !event.composedPath().includes(this.#host);
        if (isOutsideChart && this.#hold.by === 'touch') this.#release();
    };

    // --- tooltip release
    #release(): void {
        if (this.#hold.by === 'nothing') return;
        this.#hold = { by: 'nothing' };
        this.announcement = '';
        this.#showHover(null);
    }

    /** De grafiek tekent de nieuwe tooltip. */
    #showHover(hover: HoverView | null): void {
        this.hover = hover;
        this.#host.requestUpdate();
    }

    /** Zet de positie van de muis om naar alles wat de grafiek voor de
     *  tooltip rendert: waarden per reeks, x-pixel van de verticale lijn,
     *  dots en plaats van de tooltip.
     * @returns aan `#showHover` */
    #buildHoverView(model: ChartModel, position: Position): HoverView | null {
        const plotElement = this.#chart.readPlotElement();
        const pixels = readPlotPixels(plotElement);
        if (!pixels) return null;
        const summary = buildHoverSummary(model, position, countDecimalsInData(model));
        const x = pixels.toX(toPlotlyPosition(model, position));
        const dots = this.#buildDots(summary, pixels);
        const { area } = pixels;
        const plotSize = { width: plotElement.clientWidth, height: plotElement.clientHeight };
        return { ...summary, x, area, dots, tooltipPosition: this.#buildTooltipPosition(x, area, plotSize) };
    }

    /** De tooltip wordt getekend naast de verticale lijn en aan de kant met de
     *  meeste plaats, en in de helft van de inner chart met de minste
     *  punten via `findTooltipHalf` */
    #buildTooltipPosition(x: number, area: PlotArea, plotSize: { width: number; height: number }): StyleInfo {
        const position: StyleInfo = {};
        const isLeftOfX = x > area.left + area.width / 2;

        if (isLeftOfX) {
            position.right = `${plotSize.width - x + TOOLTIP_GAP}px`;
        } else {
            position.left = `${x + TOOLTIP_GAP}px`;
        }

        if (this.#tooltipHalf === 'bottom') {
            const innerChartBottom = area.top + area.height;
            position.bottom = `${plotSize.height - innerChartBottom + TOOLTIP_INSET}px`;
        } else {
            position.top = `${area.top + TOOLTIP_INSET}px`;
        }

        return position;
    }

    #buildDots(summary: HoverSummary, pixels: PlotPixels): HoverDot[] {
        const dots: HoverDot[] = [];
        for (const row of summary.rows) {
            if (row.value === null) continue;
            dots.push({
                y: pixels.toY(row.value),
                color: this.#chart.readSeriesColor(row.seriesIndex),
            });
        }
        return dots;
    }
}
