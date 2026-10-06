import { defineAll } from '@govflanders/vl-ui-design-system-web-components';
import '@govflanders/vl-ui-design-system-web-components/css';
import '@govflanders/vl-ui-design-system-web-components/assets/fonts/iconfont/vlaanderen-icon.css';
import '@govflanders/vl-ui-design-system-web-components/themes/light.css';

defineAll();

const DEMOS: Record<string, string> = {
    button: '<vl-button variant="primary">Primair</vl-button><vl-button variant="secondary">Secundair</vl-button>',
    input: '<vl-input label="Naam" placeholder="VDS"></vl-input>',
    link: '<vl-link href="https://www.vlaanderen.be">VDS link</vl-link>',
    datepicker: '<vl-datepicker label="Datum"></vl-datepicker>',
    checkbox: '<vl-checkbox label="Ik ga akkoord" checked></vl-checkbox>',
    select:
        '<vl-select label="Provincie">' +
        '<option value="antwerpen">Antwerpen</option>' +
        '<option value="limburg">Limburg</option>' +
        '<option value="oost-vlaanderen">Oost-Vlaanderen</option>' +
        '</vl-select>',
    'radio-group':
        '<vl-radio-group label="Contactvoorkeur">' +
        '<vl-radio value="email" label="E-mail"></vl-radio>' +
        '<vl-radio value="post" label="Post"></vl-radio>' +
        '</vl-radio-group>',
    textarea: '<vl-textarea label="Bericht" placeholder="VDS"></vl-textarea>',
    fieldset:
        '<vl-fieldset label="Voorkeuren">' +
        '<vl-checkbox label="Sport" checked></vl-checkbox>' +
        '<vl-checkbox label="Cultuur"></vl-checkbox>' +
        '</vl-fieldset>',
    tags:
        '<vl-informative-tag>Standaard</vl-informative-tag>' +
        '<vl-informative-tag status="success">Geslaagd</vl-informative-tag>' +
        '<vl-informative-tag status="warning">Opgelet</vl-informative-tag>' +
        '<vl-informative-tag status="error">Fout</vl-informative-tag>' +
        '<vl-removable-tag>Verwijderbaar</vl-removable-tag>' +
        '<vl-selectable-tag selected>Selecteerbaar</vl-selectable-tag>' +
        '<vl-clickable-tag>Klikbaar</vl-clickable-tag>',
    collapsible:
        '<vl-collapsible level="h3">' +
        '<span slot="trigger">Meer informatie</span>' +
        '<div slot="content">Verborgen inhoud die openklapt.</div>' +
        '</vl-collapsible>',
    divider:
        '<div style="display: grid; gap: 12px; width: 100%;">' +
        '<vl-divider></vl-divider>' +
        '<vl-divider appearance="wave"></vl-divider>' +
        '<vl-divider appearance="tilt"></vl-divider>' +
        '</div>',
    'section-message':
        '<div style="display: grid; gap: 8px; width: 100%;">' +
        '<vl-section-message status="info"><span slot="title">Info</span><span slot="body">Een informatieve melding.</span></vl-section-message>' +
        '<vl-section-message status="danger" closable><span slot="title">Fout</span><span slot="body">Er ging iets mis.</span></vl-section-message>' +
        '</div>',
    'banner-message':
        '<div style="width: 100%;">' +
        '<vl-banner-message status="warning" closable><span slot="title">Gepland onderhoud zaterdag van 8u tot 12u.</span></vl-banner-message>' +
        '</div>',
    'inline-message':
        '<div style="display: grid; gap: 8px; width: 100%;">' +
        '<vl-inline-message status="success"><span slot="body">Je gegevens zijn bewaard.</span></vl-inline-message>' +
        '<vl-inline-message status="danger"><span slot="body">Dit veld is verplicht.</span></vl-inline-message>' +
        '</div>',
    avatar:
        '<vl-avatar initials="KD"></vl-avatar>' +
        '<vl-avatar initials="AB" status="success"></vl-avatar>' +
        '<vl-avatar icon="user" size="s"></vl-avatar>',
    grid:
        '<vl-grid columns="3" gap="s" style="width: 100%;">' +
        '<vl-grid-item style="background: #eef6ff; padding: 8px;">1</vl-grid-item>' +
        '<vl-grid-item style="background: #eef6ff; padding: 8px;">2</vl-grid-item>' +
        '<vl-grid-item style="background: #eef6ff; padding: 8px;">3</vl-grid-item>' +
        '<vl-grid-item column-span="2" style="background: #eef6ff; padding: 8px;">4 (span 2)</vl-grid-item>' +
        '</vl-grid>',
    tabs:
        '<vl-tabs active-tab="trein" style="width: 100%;">' +
        '<vl-tab id="trein">Trein</vl-tab>' +
        '<vl-tab id="metro">Metro, tram en bus</vl-tab>' +
        '<vl-tabpanel tab-id="trein">Inhoud over de trein.</vl-tabpanel>' +
        '<vl-tabpanel tab-id="metro">Inhoud over metro, tram en bus.</vl-tabpanel>' +
        '</vl-tabs>',
    markdown:
        '<vl-markdown style="width: 100%;" content="## Titel&#10;&#10;Tekst met **vet**, een [link](https://www.vlaanderen.be) en een lijst:&#10;&#10;- een&#10;- twee"></vl-markdown>',
    'input-group':
        '<vl-input-group label="Locatie" style="width: 100%;">' +
        '<vl-input placeholder="Zoek een adres"></vl-input>' +
        '<vl-button slot="after" variant="secondary">Zoeken</vl-button>' +
        '</vl-input-group>',
    table:
        '<vl-table zebra style="width: 100%;">' +
        '<table><caption>Inwoners per gemeente</caption><thead><tr><th scope="col">Naam</th><th scope="col">Gemeente</th></tr></thead>' +
        '<tbody><tr><td>Anna</td><td>Gent</td></tr><tr><td>Bram</td><td>Leuven</td></tr><tr><td>Cleo</td><td>Brugge</td></tr></tbody></table>' +
        '</vl-table>',
};

const params = new URLSearchParams(window.location.search);
const demo = params.get('demo') ?? 'button';
const iconName = (params.get('name') ?? '').replace(/[^a-z0-9-]/gi, '');
const root = document.getElementById('demo-root');
if (root) {
    if (demo === 'icon' && iconName) {
        root.innerHTML = `<vl-icon icon="${iconName}" size="l"></vl-icon>`;
    } else {
        root.innerHTML = DEMOS[demo] ?? `<p>Onbekende demo: ${demo}</p>`;
    }
}
