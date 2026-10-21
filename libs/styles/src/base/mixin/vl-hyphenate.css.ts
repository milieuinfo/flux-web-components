import { css } from 'lit';

/*
 * Afbreken met een koppelteken, enkel voor lange woorden. 'hyphenate-limit-chars: 12 5 5' laat een woord pas afbreken
 * vanaf 12 letters, met minstens 5 letters vóór en na het koppelteken. Zo blijven gewone woorden als "aanvragen" of
 * "meldingen" heel en schuiven ze naar de volgende regel, terwijl lange samenstellingen als
 * "toegankelijkheidsverklaring" nog afbreken. Safari ondersteunt 'hyphenate-limit-chars' (nog) niet en past daar zijn
 * eigen grenzen toe.
 */
export const vlHyphenateMixin = () => css`
    hyphens: auto;
    hyphenate-limit-chars: 12 5 5;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    hyphenate-limit-zone: 8%;
`;
