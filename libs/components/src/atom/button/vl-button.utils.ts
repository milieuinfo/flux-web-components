// De enige plaats die zegt wanneer een knop niets doet: voor de klik en aria-disabled van de knop zelf, en voor
// Enter in een form control waarvan de knop de default button is.
export const isButtonBlocked = (disabled: boolean, loading: boolean): boolean => disabled || loading;
