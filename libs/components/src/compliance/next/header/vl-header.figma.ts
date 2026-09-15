// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=139-1806
// source=libs/components/src/compliance/next/header/vl-header.component.ts
// component=VlHeader
// unmapped: size, variant
import figma from 'figma';

// vl-header-next laadt de global header (v2) van Digitaal Vlaanderen; het oude vl-header laadt de
// v1-widget. De Figma-versie is het huidige global-header-ontwerp, dus next.
// De Figma-assen `size` (L/S) en `variant` (Vlaanderen / Departement Omgeving) zijn configuratie van
// de widget zelf (via de `identifier`) en de schermbreedte; er is geen code-attribuut voor.
// De geneste login-instance en de tekstlaag "School- & studietoel" (naam van de site) komen ook uit
// de widget en worden niet gemapt.
// `identifier` is verplicht in code maar zit niet in Figma; het blijft leeg. `skip-to-content-id`
// (id van de eerste heading van de pagina-inhoud, WCAG 2.4.1) is aanbevolen en blijft ook leeg.
export default {
    example: figma.code`<vl-header-next identifier="" skip-to-content-id=""></vl-header-next>`,
    id: 'vl-header-next',
    metadata: { nestable: false },
};
