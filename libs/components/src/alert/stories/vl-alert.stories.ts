import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-alert.component';
import { ALERT_ICON, ALERT_TYPE } from '../vl-alert.model';
import { alertArgs, alertArgTypes } from './vl-alert.stories-arg';
import alertDoc from './vl-alert.stories-doc.mdx';

export default {
    id: 'components-alert',
    title: 'Components/alert',
    tags: ['autodocs'],
    args: alertArgs,
    argTypes: alertArgTypes,
    parameters: {
        docs: {
            page: alertDoc,
        },
    },
} as Meta<typeof alertArgs>;

const AlertTemplate = story(
    alertArgs,
    ({ closable, icon, title, size, type, naked, message, defaultSlot, actionsSlot, titleSlot, alertClosed }) => html`
        <vl-alert
            ?data-vl-closable=${closable}
            ?data-vl-naked=${naked}
            data-vl-icon=${icon}
            data-vl-title=${title}
            data-vl-size=${size}
            data-vl-type=${type}
            data-vl-message=${message}
            @vl-alert-closed="${alertClosed}"
            data-cy="alert"
        >
            ${unsafeHTML(titleSlot)}${unsafeHTML(defaultSlot)}${unsafeHTML(actionsSlot)}
        </vl-alert>
    `
);

export const AlertDefault = AlertTemplate.bind({});
AlertDefault.storyName = 'vl-alert - default';
AlertDefault.args = {
    defaultSlot:
        '<span>Als u vaststelt dat er foute informatie over u in het bestand van de Centrale voor Kredieten aan Particulieren staat, dan kunt u een rechtzetting aanvragen.</span>',
};

export const AlertError = AlertTemplate.bind({});
AlertError.storyName = 'vl-alert - error';
AlertError.args = {
    title: 'Opgelet!',
    type: ALERT_TYPE.ERROR,
    icon: ALERT_ICON.WARNING,
    defaultSlot: '<span>U heeft geen rechten om deze actie uit te voeren.</span>',
};

export const AlertInfo = AlertTemplate.bind({});
AlertInfo.storyName = 'vl-alert - info';
AlertInfo.args = {
    title: 'Info',
    type: ALERT_TYPE.INFO,
    icon: ALERT_ICON.INFO_CIRCLE,
    defaultSlot:
        '<span>Als u vaststelt dat er foute informatie over u in het bestand van de Centrale voor Kredieten aan Particulieren staat, dan kunt u een rechtzetting aanvragen.</span>',
};

export const AlertSuccess = AlertTemplate.bind({});
AlertSuccess.storyName = 'vl-alert - success';
AlertSuccess.args = {
    title: 'Gelukt!',
    type: ALERT_TYPE.SUCCESS,
    icon: ALERT_ICON.CHECK,
    defaultSlot: '<span>We hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.</span>',
};

export const AlertWarning = AlertTemplate.bind({});
AlertWarning.storyName = 'vl-alert - warning';
AlertWarning.args = {
    title: 'Technische storing',
    type: ALERT_TYPE.WARNING,
    icon: ALERT_ICON.WARNING,
    defaultSlot: '<span>Door een technische storing is dit loket tijdelijk niet beschikbaar.</span>',
};

export const AlertWithButton = AlertTemplate.bind({});
AlertWithButton.storyName = 'vl-alert - with button';
AlertWithButton.args = {
    actionsSlot: '<button slot="actions" is="vl-button">button text</button>',
    defaultSlot:
        '<span>Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.</span>',
};

export const AlertWithTitleSlot = AlertTemplate.bind({});
AlertWithTitleSlot.storyName = 'vl-alert - with title slot';
AlertWithTitleSlot.args = {
    titleSlot: '<span slot="title">Titel</span>',
    defaultSlot:
        '<span>Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.</span>',
};

export const AlertCloseable = AlertTemplate.bind({});
AlertCloseable.storyName = 'vl-alert - closeable';
AlertCloseable.argTypes = {};
AlertCloseable.args = {
    closable: true,
    defaultSlot:
        '<span>Phasellus congue ipsum ut felis auctor, eget maximus justo dapibus. Nam sit amet pulvinar odio. Maecenas rhoncus quam eget neque porttitor, et faucibus nisl elementum.</span>',
};

export const AlertNakedError = AlertTemplate.bind({});
AlertNakedError.storyName = 'vl-alert - naked error';
AlertNakedError.args = {
    title: 'Opgelet!',
    type: ALERT_TYPE.ERROR,
    icon: ALERT_ICON.WARNING,
    naked: true,
    message: 'U heeft geen rechten om deze actie uit te voeren.',
};

export const AlertNakedWarning = AlertTemplate.bind({});
AlertNakedWarning.storyName = 'vl-alert - naked warning';
AlertNakedWarning.args = {
    title: 'Opgelet!',
    type: ALERT_TYPE.WARNING,
    icon: ALERT_ICON.WARNING,
    naked: true,
    message: 'U heeft geen rechten om deze actie uit te voeren.',
};

export const AlertNakedSuccess = AlertTemplate.bind({});
AlertNakedSuccess.storyName = 'vl-alert - naked success';
AlertNakedSuccess.args = {
    title: 'Opgelet!',
    type: ALERT_TYPE.SUCCESS,
    icon: ALERT_ICON.CHECK,
    naked: true,
    message: 'U heeft geen rechten om deze actie uit te voeren.',
};
