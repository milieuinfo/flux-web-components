// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=139-5539
// source=libs/components/src/compliance/next/footer/vl-footer.component.ts
// component=VlFooter
// unmapped: variant, size, collapsed
import figma from 'figma';

// vl-footer-next laadt de global footer (v2) van Digitaal Vlaanderen; het oude vl-footer laadt de
// v1-widget met dezelfde attributen. De Figma-versie is het huidige global-footer-ontwerp, dus next.
// De Figma-assen `variant` (Vlaanderen / Departement Omgeving), `size` (L/M/S), `collapsed` en de
// boolean `taalkeuze` zijn configuratie van de widget zelf (via de `identifier`) en de schermbreedte;
// er is geen code-attribuut voor, dus ze worden niet gemapt.
// `identifier` is verplicht in code maar zit niet in Figma; het blijft leeg. `development` bestaat enkel in code.
export default {
    example: figma.code`<vl-footer-next identifier=""></vl-footer-next>`,
    id: 'vl-footer-next',
    metadata: { nestable: false },
};
