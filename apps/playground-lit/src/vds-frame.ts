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
};

const params = new URLSearchParams(window.location.search);
const demo = params.get('demo') ?? 'button';
const iconName = (params.get('name') ?? '').replace(/[^a-z0-9-]/gi, '');
const root = document.getElementById('demo-root');
if (root) {
    if (demo === 'icon' && iconName) {
        root.innerHTML = `<vl-icon icon="${iconName}" size="large"></vl-icon>`;
    } else {
        root.innerHTML = DEMOS[demo] ?? `<p>Onbekende demo: ${demo}</p>`;
    }
}
