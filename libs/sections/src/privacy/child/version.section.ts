import { html } from 'lit-html';

export const privacyVersionSection = (version: string, date: string) => html`
    <div is="vl-layout">
        <div is="vl-grid" data-vl-is-stacked>
            <div is="vl-column" data-vl-size="10">
                <h1 is="vl-h1" data-vl-no-space-bottom>Privacy</h1>
            </div>
            <div is="vl-column" data-vl-size="10">
                <p is="vl-introduction">
                    <span>Versie</span>
                    <span id="introduction-version">${version}</span> -
                    <span id="introduction-date">${date}</span>
                </p>
            </div>
            <div is="vl-column" data-vl-size="12" data-vl-medium-size="12">
                <vl-typography>
                    <hr />
                </vl-typography>
            </div>
        </div>
    </div>
`;
