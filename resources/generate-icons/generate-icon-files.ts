// ! Dit script genereert de vl-icon-style-mapping.css.ts en vl-icon-list.component.ts bestanden.
// ! Voer dit bestand uit met volgend commando: tsx generate-icon-files.ts

import * as fs from 'fs-extra';
import { iconFontLocation } from '../../libs/styles/src/base/font/vl-font.css';

const getSvgIconString = async () => {
    const response = await fetch(`${iconFontLocation}.svg`);
    const svgString = await response.text();

    return svgString;
};

const parseSvgGlyphs = (svgString) => {
    const glyphRegex = /<glyph[^>]*glyph-name="([^"]+)"[^>]*unicode="([^"]+)"[^>]*d="([^"]+)"[^>]*\/>/g;
    const glyphs = [];
    let glyphMatch;

    while ((glyphMatch = glyphRegex.exec(svgString)) !== null) {
        const glyphData = {
            glyph_name: glyphMatch[1],
            unicode: glyphMatch[2],
        };
        glyphs.push(glyphData);
    }

    return glyphs;
};

const generateIconMapping = (glyphs) => {
    const iconMapping = glyphs.reduce((mapping, { glyph_name, unicode }) => {
        const parsedUnicode = unicode.slice(unicode.indexOf('x') + 1).replace(';', '');
        const cssString = `
            .vl-icon--${glyph_name}::before {
                content: '\\\\${parsedUnicode}';
            }
        `;
        mapping += cssString;
        return mapping;
    }, '');

    return `
        // ! dit bestand werd gegenereerd door het script: generate-icon-files.ts

        import { css, CSSResult } from 'lit';

        export const vlIconMapping: CSSResult = css${'`'}
            ${iconMapping}
        ${'`'};
    `;
};

const generateIconList = (glyphs) => `
        // ! dit bestand werd gegenereerd door het script: generate-icon-files.ts

        export const vlIconList = [${glyphs.map(({ glyph_name }) => `'${glyph_name}'`)}] as const;

        export type VlIcon = '' | typeof vlIconList[number];
    `;

const writeFile = (location, content) =>
    fs.writeFile(location, content, (err) => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });

const processIcons = async () => {
    const svgIconString = await getSvgIconString();
    const glyphs = parseSvgGlyphs(svgIconString);
    const iconMapping = generateIconMapping(glyphs);
    const iconList = generateIconList(glyphs);

    writeFile('../../libs/components/src/atom/icon-style/vl-icon-style-mapping.css.ts', iconMapping);
    writeFile('../../libs/components/src/atom/icon/vl-icon-list.ts', iconList);
};

processIcons();

console.log('iconen gegenereerd');
