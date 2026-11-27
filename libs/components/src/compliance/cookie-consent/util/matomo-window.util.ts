type MatomoWindow = Window & { _paq?: unknown[][] };

// Bewust geen `declare global` voor `_paq`: dat type komt via de publieke types bij elke toepassing terecht en botst
// daar met een eigen declaratie van `window._paq`.
export const matomoWindow = (): MatomoWindow => window;
