import colors from './vl-chart.palette.tokens.json';

/** Categorisch palet binnen dezelfde kleurfamilie. */
export type PaletteColor = {
    line: string; // Lijnen en markers, ≥ 3:1 op wit.
    label: string; // Tekst, bv. het directe label, ≥ 4,5:1 op wit.
};

/** Familie → graad → kleur. */
const ladders: Record<string, Record<string, { $value: string }>> = colors.color;

/** De kleurfamilies waarvan de datakleur geen 4,5:1 op wit haalt worden
 *  hier aangepast */
const LABEL_GRADES: Record<string, string> = { schelde: '600', iris: '600', azalea: '600' };

/** Zet een verwijzing uit `vl-chart.palette.tokens.json`, bv.
 *  `{color.schelde.500}`, om naar lijn- en tekstkleur. */
function buildPaletteColor(reference: string): PaletteColor {
    const [, family, grade] = reference.slice(1, -1).split('.');
    const labelGrade = LABEL_GRADES[family] ?? grade;
    return { line: ladders[family][grade].$value, label: ladders[family][labelGrade].$value };
}

/** De slots uit `vl-chart.palette.tokens.json` in volgorde. */
export const categoricalPalette: readonly PaletteColor[] = Object.entries(colors.data)
    .filter(([name]) => name.startsWith('slot-'))
    .map(([, token]) => buildPaletteColor(token.$value));
