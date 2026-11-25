import type { ChartSpec } from './chart-spec';

/** Bepaalt alle element die op de PNG (download) komen te staan. */
export interface PngFurniture {
    title: string;
    unit: string;
    /** Referentielijnen buiten het bereik van de waarde-as als notitie boven
     *  de grafiek. */
    referenceNotes: string[];
    sourceLabel: string;
    sources: { title: string; owner?: string; metadataId?: string }[];
    openDataLabel: string;
}

export interface PlotImage {
    url: string;
    width: number;
    height: number;
}

/** De PNG wordt 2 maal zo groot geëxporteerd als op het scherm. */
export const PNG_SCALE = 2;

// Maten afgeleid van de Flux-tokens.
const SPACING = 20; // --vl-spacing--normal
const TITLE_SIZE = 22; // Flux-h3 op een klein scherm
const TITLE_WEIGHT = 500;
const TITLE_LINE_HEIGHT = 28;
const TEXT_SIZE = 14; // --vl-font-size--small
const TEXT_LINE_HEIGHT = 20;
const SOURCE_LINE_HEIGHT = 18;
const SOURCE_GAP = 6; // gap tussen twee bronnen
const LABEL_GAP = 4; // tussen "Bron:"-title en de bronnen
const METADATA_ID_LABEL = 'Metadata-ID:';
const ICON_GAP = 6;
// Leeuw van `vl-icon icon="vlaanderen"`.
const LION_GLYPH = '';
const ICON_FONT = 'vlaanderen-icon';

/** Maakt de PNG klaar voor download en rendert alle data visualisatie
 *  elementen buiten `Plotly.toImage` naar de PNG. */
export async function buildPngWithFurniture(plot: PlotImage, furniture: PngFurniture, spec: ChartSpec): Promise<Blob> {
    const titleFont = `${TITLE_WEIGHT} ${TITLE_SIZE}px ${spec.fontFamily}`;
    const textFont = `${TEXT_SIZE}px ${spec.fontFamily}`;
    // 'fulfilled': laadt Flanders Art in. `rejected`: laadt system font in.
    await Promise.allSettled([document.fonts.load(titleFont), document.fonts.load(`${TEXT_SIZE}px ${ICON_FONT}`)]);

    const width = plot.width + 2 * SPACING;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D wordt niet ondersteund.');

    context.font = titleFont;
    const titleLines = furniture.title ? splitTextIntoLines(context, furniture.title, plot.width) : [];
    const titleHeight = titleLines.length > 0 ? titleLines.length * TITLE_LINE_HEIGHT + SPACING : 0;
    const unitHeight = furniture.unit ? TEXT_LINE_HEIGHT + SPACING / 2 : 0;
    const notesHeight = furniture.referenceNotes.length * TEXT_LINE_HEIGHT;
    context.font = textFont;
    const sourceBlock = MeasureSourceBlock(context, furniture, width);
    const height =
        SPACING + titleHeight + unitHeight + notesHeight + plot.height + SPACING + sourceBlock.height + SPACING;

    canvas.width = width * PNG_SCALE;
    canvas.height = height * PNG_SCALE;
    context.scale(PNG_SCALE, PNG_SCALE);
    context.fillStyle = spec.backgroundColor;
    context.fillRect(0, 0, width, height);
    context.textBaseline = 'top';

    let y = SPACING;
    context.font = titleFont;
    context.fillStyle = spec.textColor;
    for (const line of titleLines) {
        context.fillText(line, SPACING, y);
        y += TITLE_LINE_HEIGHT;
    }
    if (titleLines.length > 0) y += SPACING;

    context.font = textFont;
    context.fillStyle = spec.axisColor;
    if (furniture.unit) {
        context.fillText(furniture.unit, SPACING, y);
        y += TEXT_LINE_HEIGHT + SPACING / 2;
    }

    context.fillStyle = spec.referenceColor;
    for (const note of furniture.referenceNotes) {
        context.fillText(note, SPACING, y);
        y += TEXT_LINE_HEIGHT;
    }
    context.fillStyle = spec.axisColor;

    context.drawImage(await loadImage(plot.url), SPACING, y, plot.width, plot.height);
    y += plot.height + SPACING;

    context.fillText(furniture.sourceLabel, SPACING, y);
    for (const line of sourceBlock.lines) {
        context.fillStyle = line.isSubtle ? spec.axisColor : spec.textColor;
        context.fillText(line.text, sourceBlock.x, y + line.y);
    }
    context.fillStyle = spec.axisColor;
    if (furniture.openDataLabel) drawOpenDataMark(context, furniture.openDataLabel, width - SPACING, y, textFont);

    return new Promise((resolve, reject) =>
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG maken mislukt.'))), 'image/png'),
    );
}

/** Meet het block waarin de bronnen komen te staan en verstuurt de hoogte
 *  naar `buildPngWithFurniture om het canvas aan te maken. */
function MeasureSourceBlock(
    context: CanvasRenderingContext2D,
    furniture: PngFurniture,
    width: number,
): { x: number; height: number; lines: { text: string; y: number; isSubtle: boolean }[] } {
    const x = SPACING + context.measureText(furniture.sourceLabel).width + LABEL_GAP;
    const markWidth = furniture.openDataLabel
        ? context.measureText(furniture.openDataLabel).width + TEXT_SIZE + ICON_GAP + SPACING
        : 0;
    const maxWidth = width - SPACING - markWidth - x;
    const lines: { text: string; y: number; isSubtle: boolean }[] = [];
    let y = 0;
    furniture.sources.forEach((source, index) => {
        if (index > 0) y += SOURCE_GAP;
        for (const text of splitTextIntoLines(context, source.title, maxWidth)) {
            lines.push({ text, y, isSubtle: false });
            y += SOURCE_LINE_HEIGHT;
        }
        const details = [source.owner, source.metadataId && `${METADATA_ID_LABEL} ${source.metadataId}`];
        for (const text of details.filter((detail): detail is string => Boolean(detail))) {
            lines.push({ text, y, isSubtle: true });
            y += SOURCE_LINE_HEIGHT;
        }
    });
    return { x, height: Math.max(y, TEXT_LINE_HEIGHT), lines };
}

/** Leeuw icoon + label, rechts uitgelijnd onder de grafiek. */
function drawOpenDataMark(
    context: CanvasRenderingContext2D,
    label: string,
    right: number,
    y: number,
    textFont: string,
): void {
    context.font = textFont;
    const labelWidth = context.measureText(label).width;
    context.fillText(label, right - labelWidth, y);

    context.font = `${TEXT_SIZE}px ${ICON_FONT}`;
    const glyphWidth = context.measureText(LION_GLYPH).width;
    context.fillText(LION_GLYPH, right - labelWidth - ICON_GAP - glyphWidth, y);
}

function splitTextIntoLines(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    let line = '';
    for (const word of text.split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word;
        if (line && context.measureText(candidate).width > maxWidth) {
            lines.push(line);
            line = word;
        } else {
            line = candidate;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function loadImage(url: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = url;
    return image.decode().then(() => image);
}
