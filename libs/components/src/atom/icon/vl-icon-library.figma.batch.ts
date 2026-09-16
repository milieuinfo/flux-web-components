// Batch template voor de iconen uit de "[VL] Icons (team D)"-library, de bron waar de instance
// swaps van vl-icon, vl-button en vl-link naar wijzen.
//
// Dit bestand rendert niet één component maar alle iconen: vl-icon-icons-team-d.figma.batch.json
// somt per icoon de Figma node op, en elke entry komt hier binnen als `figma.batch`.
//
// `name` op een handle in de Code Connect runtime levert de laagnaam uit de componentdefinitie, niet
// die van het geswapte icoon. De icoonnaam is dus niet af te leiden in de templates van vl-icon,
// vl-button, vl-link en vl-popover-action. Die lezen allemaal `metadata.props.icon` van het geneste
// icoon, en dat is wat dit template levert.
//
// LET OP: de extensie `.figma.batch.ts` is verplicht. De CLI weigert een batch template met een
// andere naam, en pikt dit bestand niet op als gewoon template.
import figma from 'figma';

const icon = figma.batch.icon;

export default {
    example: figma.code`<vl-icon icon="${icon}"></vl-icon>`,
    id: 'vl-icon-' + icon,
    metadata: { nestable: true, props: { icon } },
};
