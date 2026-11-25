/** De witruimte rond de inner chart uitgedrukt in pixels. */
export type ChartMargin = { top: number; right: number; bottom: number; left: number };

export const chartDefaults = {
    margin: { top: 12, right: 16, bottom: 40, left: 56 } as ChartMargin,
    /** Afstand tussen de positie/x-as en de labels. */
    positionTickLabelStandoff: 8,
    /** Afstand tussen de getallen van de waarde/y-as en de grafiek. */
    valueTickLabelStandoff: 8,
    /** Decimaalteken en duizendtal zoals in het Nederlands: 1.250,5. */
    separators: ',.',
    /** Afstand tussen de ticklabels en de titel van de positie/x-as. */
    positionTitleStandoff: 8,
    tickLength: 4,
    zeroLineWidth: 1.5,
};
