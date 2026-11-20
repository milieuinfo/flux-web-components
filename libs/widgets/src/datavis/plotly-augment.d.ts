// @types/plotly.js loopt achter op plotly.js 4; hier vullen we de opties aan die we gebruiken en die er nog niet in staan.
import 'plotly.js';

declare module 'plotly.js' {
    interface LayoutAxis {
        /** Afstand in px tussen de as en zijn labels (plotly.js ≥ 2.29). */
        ticklabelstandoff?: number;
    }
}
