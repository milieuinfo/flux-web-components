import { createContext } from '@lit/context';
import '../context-root'; // Zonder contextRoot blijft bv `vl-data-table`
// leeg als die vóór `vl-data-figure` geregistreerd wrodt.
import type { VlChart } from '../chart/vl-chart.component';
import type { DataState } from '../models/chart.model';

export type FigureState = {
    dataState: DataState;
    visual: VlChart | null;
    headline: string;
    element: HTMLElement; // De grafiek zelf om ze schermvullend te maken
    // (zie vl-data-fullscreen.component.ts:45).
    isFullscreen: boolean;
};

export const figureContext = createContext<FigureState>(Symbol('vl-data-figure'));
