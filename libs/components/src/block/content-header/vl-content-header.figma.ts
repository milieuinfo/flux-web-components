// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=3005-47
// source=libs/components/src/block/content-header/vl-content-header.component.ts
// component=VlContentHeaderComponent
// unmapped: size
import figma from 'figma';
import { escapeHtml } from '../../../../../resources/code-connect/escape-html';

const instance = figma.selectedInstance;

// Bewust niet gemapt:
// - `size` (L/S): de code kent enkel de grote variant (vaste klasse vl-content-header--large). Bij size=S ontbreekt in
//   Figma de titel, maar de code vereist altijd de drie slot-elementen (image, context-link, title-link).
// De TEXT-properties `context` en `title` komen in code als tekst van de <a>-elementen in de slots `context-link` en
// `title-link`. De href's en de afbeelding (`image`-slot) zijn niet uit Figma af te leiden en staan als placeholder.
// Een bestand met een oudere versie van de library kan properties missen; `getString` geeft dan een foutobject terug.
const context = 'context' in instance.properties ? escapeHtml(instance.getString('context')) : '';
const title = 'title' in instance.properties ? escapeHtml(instance.getString('title')) : '';

export default {
    example: figma.code`<vl-content-header>
    <img slot="image" src="" alt="" />
    <a slot="context-link" href="#">${context}</a>
    <a slot="title-link" href="#">${title}</a>
</vl-content-header>`,
    id: 'vl-content-header',
    metadata: { nestable: false },
};
