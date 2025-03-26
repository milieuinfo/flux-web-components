import { html } from 'lit-html';

export const privacyVersionSection = (version: string, date: string) => html`
    <div class="vl-content-block-next">
        <div class="vl-grid-next">
            <div class="vl-column-next vl-column-next--10">
                <vl-title-next type="h1" no-space-bottom>Privacy</vl-title-next>
            </div>
            <div class="vl-column-next vl-column-next--10">
                <vl-paragraph-next introduction>
                    <span>Versie</span>
                    <span id="introduction-version">${version}</span> -
                    <span id="introduction-date">${date}</span>
                </vl-paragraph-next>
            </div>
            <div class="vl-column-next vl-column-next--12 vl-column-next--m-12">
                <vl-typography>
                    <hr />
                </vl-typography>
            </div>
        </div>
    </div>
`;
