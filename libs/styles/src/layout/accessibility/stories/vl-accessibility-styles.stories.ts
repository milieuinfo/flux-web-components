import { html } from 'lit';
import page from './vl-accessibility-styles.stories-doc.mdx';

export default {
    id: 'styles-layout-accessibility',
    title: 'Styles/Layout (afnemers)/accessibility',
    tags: ['autodocs'],
    parameters: {
        docs: { page },
    },
};

export const VisuallyHiddenDefault = () => html`
    <div>Deze content is zichtbaar voor de gebruiker.
        Maar deze content ...<span class="vl-visually-hidden">... is enkel toegankelijk voor screenreaders.</span>
    </div>
`;
VisuallyHiddenDefault.storyName = 'vl-visually-hidden - default';

export const SkipLinkDefault = () => html`
    <a href="#main-content" class="vl-skip-link">Ga meteen naar de inhoud</a>
    <header>
        <vl-title type="h1">[Applicatie titel]</vl-title>
        <nav>[Applicatie navigatie]</nav>
    </header>
    <hr class="vl-separator-slash" />
    <main>
        <vl-title type="h2" id="main-content">[Applicatie inhoud]</vl-title>
        <vl-typography>
            <p>Je kan de <strong>skip-link</strong> op twee manieren activeren:</p>
            <ul>
                <li>
                    <strong>Start een screenreader</strong>, bv VoiceOver (command+F5), en navigeer naar het begin van
                    de pagina.
                </li>
                <li>
                    <strong>Gebruik Tab</strong> om naar het begin van de pagina te navigeren. Zodra de skip-link focus
                    krijgt zal hij verschijnen.
                </li>
            </ul>
            <p>Klikken op de skip-link brengt je meteen naar de inhoud. De header wordt niet voorgelezen.</p>
        </vl-typography>
    </main>
`;
SkipLinkDefault.storyName = 'vl-skip-link - default';

