// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=592-316
// source=libs/components/src/block/proza-message/vl-proza-message.component.ts
// component=VlProzaMessage
import figma from 'figma';

// De Figma-component heeft geen properties en bevat enkel een vl-typography-instance als
// placeholder-inhoud. In code haalt vl-proza-message het bericht zelf op (via domain + code) en
// rendert het in een eigen vl-typography; de Figma-tekst wordt dus niet overgenomen.
// `domain` en `code` zijn verplichte attributen zonder Figma-equivalent en worden leeg uitgeschreven.
// Niet gemapt (geen Figma-equivalent): parameters, base-url en block.
export default {
    example: figma.code`<vl-proza-message domain="" code=""></vl-proza-message>`,
    id: 'vl-proza-message',
    metadata: { nestable: true },
};
