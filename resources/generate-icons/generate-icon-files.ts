// ! Dit script genereert de vl-icon-mapping.css.ts en vl-all-icons.component.ts bestanden.
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

const generateAllIconsComponent = (glyphs) => {
    const allIconsLitComponent = `
        // ! dit bestand werd gegenereerd door het script: generate-icon-files.ts

        import { CSSResult, LitElement, css, html } from 'lit';
        import { registerWebComponents, webComponent } from '@domg-wc/common';
        import { vlIconStyles } from '@domg-wc/styles';
        import { VlIconComponent } from '@domg-wc/components/atom';

        @webComponent('vl-all-icons')
        export class VlAllIconsComponent extends LitElement {
            static {
                registerWebComponents([VlIconComponent]);
            }

            static override get styles(): CSSResult[] {
                return [vlIconStyles,
                    css${'`'}
                        .container {
                            display: flex;
                            flex-wrap: wrap;
                        }

                        .icon {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            width: 12rem;
                            margin-bottom: 3rem;
                            text-align: center;
                            font-size: 2.4rem;
                            cursor: copy;
                        }

                        .name {
                            font-size: 1.4rem;
                            display: block;
                            margin-top: 1rem;
                        }
                    ${'`'}
                ];
            }

            override render() {
                const allIcons = [${glyphs.map(({ glyph_name }) => `'${glyph_name}'`)}];

                return html${'`'}
                    <div class="container">
                        ${
                            `$` +
                            `{allIcons.map((icon) => html${'`'}
                                <div class="icon" @click=${'$'}{() => this.handleClickIcon(icon)}>
                                    <vl-icon icon=${'$'}{icon}></vl-icon>
                                    <span class="name">${'$'}{icon}</span>
                                </div>
                        ${'`'})}`
                        }
                    </div>
                ${'`'};
            }

            private handleClickIcon(icon: string) {
                navigator.clipboard.writeText(icon);
            }
        }

        declare global {
            interface HTMLElementTagNameMap {
                'vl-all-icons': VlAllIconsComponent;
            }
        }
    `;

    return allIconsLitComponent;
};

const writeFile = (location, content) => {
    fs.writeFile(location, content, (err) => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });
};

const processIcons = async () => {
    const svgIconString = await getSvgIconString();
    const glyphs = parseSvgGlyphs(svgIconString);
    const iconMapping = generateIconMapping(glyphs);
    const allIconsComponent = generateAllIconsComponent(glyphs);

    writeFile('../../libs/styles/src/base/icon/vl-icon-mapping.css.ts', iconMapping);
    writeFile('../../libs/components/src/block/icon/vl-all-icons.component.ts', allIconsComponent);
};

processIcons();

console.log('iconen gegenereerd - TODO verbeteren');
