import { story } from '@resources/utils-storybook';
import { FluxConfig } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlProzaMessage } from '../vl-proza-message.component';
import { vlProza } from '../vl-proza.directive';
import { prozaDirectiveMockData, prozaMessageMockDomainData } from './vl-proza-message.stories-msw';
import prozaDirectiveDoc from './vl-proza-directive.stories-doc.mdx';

// Preferences zijn al geïnitialiseerd door geïmporteerde componenten, dus rechtstreeks updaten.
FluxConfig['preferences'] = { ...FluxConfig.getPreferences(), prozaDomain: 'mockdomain' };

const prozaDirectiveArgs = {};

export default {
    id: 'components-block-proza-message-proza-directive',
    title: 'Components - Block/proza-message/proza-directive',
    tags: ['autodocs'],
    args: prozaDirectiveArgs,
    argTypes: {},
    parameters: {
        docs: {
            page: prozaDirectiveDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
        msw: {
            handlers: [...prozaMessageMockDomainData, ...prozaDirectiveMockData],
        },
    },
} as Meta<typeof prozaDirectiveArgs>;

export const ProzaDirectiveDefault = story(prozaDirectiveArgs, () => {
    VlProzaMessage.clearCache();

    return html`
        <div class="vl-grid vl-stacked-small">
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Alert met proza titel (via attribuut):</vl-title>
                <vl-alert
                    icon="warning"
                    title=${vlProza('alert.titel')}
                    type="warning"
                    closable
                ></vl-alert>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Alert met proza titel en bericht:</vl-title>
                <vl-alert
                    icon="info-circle"
                    title=${vlProza('alert.bericht')}
                    type="info"
                ></vl-alert>
            </div>
        </div>
    `;
});
ProzaDirectiveDefault.storyName = 'vlProza - default';
ProzaDirectiveDefault.parameters = {
    docs: {
        source: {
            code: `FluxConfig.setPreferences({ prozaDomain: 'mockdomain' });

html\`
    <vl-alert
        icon="warning"
        title=\${vlProza('alert.titel')}
        type="warning"
        closable
    ></vl-alert>

    <vl-alert
        icon="info-circle"
        title=\${vlProza('alert.bericht')}
        type="info"
    ></vl-alert>
\``,
        },
    },
};

export const ProzaDirectiveMetParameters = story(prozaDirectiveArgs, () => {
    VlProzaMessage.clearCache();

    return html`
        <div class="vl-grid vl-stacked-small">
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Alert met parameters:</vl-title>
                <vl-alert
                    icon="user"
                    title=${vlProza('welkom.titel', { parameters: { naam: 'Jan' } })}
                    type="success"
                ></vl-alert>
            </div>
        </div>
    `;
});
ProzaDirectiveMetParameters.storyName = 'vlProza - met parameters';
ProzaDirectiveMetParameters.parameters = {
    docs: {
        source: {
            code: `html\`
    <vl-alert
        icon="user"
        title=\${vlProza('welkom.titel', { parameters: { naam: 'Jan' } })}
        type="success"
    ></vl-alert>
\``,
        },
    },
};

export const ProzaDirectiveDomainOverride = story(prozaDirectiveArgs, () => {
    VlProzaMessage.clearCache();

    return html`
        <div class="vl-grid vl-stacked-small">
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Alert met default domein:</vl-title>
                <vl-alert
                    icon="warning"
                    title=${vlProza('alert.titel')}
                    type="warning"
                ></vl-alert>
            </div>
            <div class="vl-column vl-column--12">
                <vl-title type="h6">Alert met ander domein (override):</vl-title>
                <vl-alert
                    icon="info-circle"
                    title=${vlProza('alert.titel', { domain: 'otherdomain' })}
                    type="info"
                ></vl-alert>
            </div>
        </div>
    `;
});
ProzaDirectiveDomainOverride.storyName = 'vlProza - domain override';
ProzaDirectiveDomainOverride.parameters = {
    docs: {
        source: {
            code: `html\`
    <!-- Met default domein -->
    <vl-alert
        icon="warning"
        title=\${vlProza('alert.titel')}
        type="warning"
    ></vl-alert>

    <!-- Met ander domein (override) -->
    <vl-alert
        icon="info-circle"
        title=\${vlProza('alert.titel', { domain: 'otherdomain' })}
        type="info"
    ></vl-alert>
\``,
        },
    },
};
