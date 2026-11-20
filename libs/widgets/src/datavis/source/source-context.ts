import { createContext } from '@lit/context';
import '../context-root';
import type { DataState } from '../models/chart.model';
import type { Period } from './period';

/** Wat `vl-data-source` deelt met alle visuals en controls erin. Een visual zonder eigen data tekent deze
 *  toestand; een control (bv. `vl-data-period`) toont en wijzigt de periode. Nest met `figureContext`: de bron
 *  deelt de data, de figuur wat bij één figuur hoort. */
export type SourceState = {
    dataState: DataState;
    period: Period;
};

export const sourceContext = createContext<SourceState>(Symbol('vl-data-source'));
