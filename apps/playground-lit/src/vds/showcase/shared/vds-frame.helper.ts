import { html, TemplateResult } from 'lit';

export const vdsFrame = (demo: string, height: number, width: string = '100%'): TemplateResult =>
    html`<iframe
        src="/vds-frame.html?demo=${demo}"
        style="border: 0; width: ${width}; height: ${height}px;"
        title="rauw VDS ${demo}, geïsoleerd in een eigen document (16px-root, eigen font, default vl-prefix)"
    ></iframe>`;

// Selecteer de patches die op een bepaald voorbeeld van toepassing zijn. 'fluxLook'
