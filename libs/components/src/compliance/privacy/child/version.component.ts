import { html } from 'lit-html';

export const privacyVersionSection = (version: string, date: string) => html`
    <div class="vl-content-block">
        <div class="vl-grid">
            <div class="vl-column vl-column--10">
                <vl-title type="h1" no-space-bottom>Privacy</vl-title>
            </div>
            <div class="vl-column vl-column--10">
                <vl-paragraph introduction>
                    <span>Versie</span>
                    <span id="introduction-version">${version}</span> -
                    <span id="introduction-date">${date}</span>
                </vl-paragraph>
            </div>
            <div class="vl-column vl-column--12 vl-column--m-12">
                <vl-typography>
                    <hr />
                </vl-typography>
            </div>
        </div>
    </div>
`;
