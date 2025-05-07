import { Markdown } from '@storybook/blocks';
import React from 'react';
import { FluxMetaDataModel } from './flux-meta-data.model';
import fluxMetaData from './flux-meta-data.json';

export const FluxMetaData = ({ id }) => {
    const fluxMetaDataModel = fluxMetaData[id] as FluxMetaDataModel;
    return fluxMetaDataModel ? (
        <vl-alert icon="warning" title={buildTitle(fluxMetaDataModel)} type={buildType(fluxMetaDataModel)} size="small">
            <Markdown options={{ forceInline: true }} style={{ fontSize: '14px' }}>
                {buildText(fluxMetaDataModel)}
            </Markdown>
        </vl-alert>
    ) : null;
};

const buildType = (fluxMetaDataModel: FluxMetaDataModel): string => {
    switch (fluxMetaDataModel?.vStatus) {
        case 'replaced':
        case 'v1-replace':
        case 'v1-remove':
            return 'error';
        case 'v1-todo':
        case 'v2-impact':
            return 'warning';
        case 'v2':
        case 'v2-style-base':
        case 'v2-style-layout':
        case 'v2-style-new':
            return 'success';
        default:
            return 'info';
    }
};

const buildTitle = (fluxMetaDataModel: FluxMetaDataModel): string => {
    switch (fluxMetaDataModel?.vStatus) {
        case 'replaced':
        case 'v1-replace':
        case 'v1-remove':
        case 'v1-todo':
            return 'legacy-component';
        case 'v2-impact':
            return 'v2 impact';
        case 'v2':
            return 'next-component';
        case 'v2-style-layout':
        case 'v2-style-new':
            return 'next-style-layout';
        case 'v2-style-base':
            return 'next-style-base';
        default:
            return '';
    }
};

const buildText = (fluxMetaDataModel: FluxMetaDataModel): string => {
    switch (fluxMetaDataModel?.vStatus) {
        case 'replaced':
            return `De **${fluxMetaDataModel.legacyText}** is een legacy-component die vervangen is door
                    ${fluxMetaDataModel.nextText}.`;
        case 'v1-replace':
            return `De **${fluxMetaDataModel.legacyText}** is een legacy-component die vervangen wordt door
                    ${fluxMetaDataModel.nextText}, zie ${fluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v1-remove':
            return `De **${fluxMetaDataModel.legacyText}** is een legacy-component die geschrapt wordt in v2,
                    zie ${fluxMetaDataModel.planningInfo} voor meer informatie.`;
        case 'v1-todo':
            return `De **${fluxMetaDataModel.legacyText}** is een legacy-component die vervangen gaat worden door
                    een next-component, zie ${fluxMetaDataModel.planningInfo} voor de release waarin dat gepland is.`;
        case 'v2-impact':
            return `${fluxMetaDataModel.legacyText}
                    Zie ${fluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v2':
            return `De **${fluxMetaDataModel.nextText}** is een next-component die ${fluxMetaDataModel.legacyText}
                    vervangt, zie ${fluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v2-style-base':
            return `De **${fluxMetaDataModel.nextText}** is een intern onderdeel van de next-style opzet; deze
                    documentatie is bedoeld voor bijdragers / beheerders!<br/>
                    Enkel wat onder 'Layout (afnemers)' staat is bedoeld voor afnemers.`;
        case 'v2-style-layout':
            return `De **${fluxMetaDataModel.nextText}** is een next-style die ${fluxMetaDataModel.legacyText}
                    vervangt, zie ${fluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v2-style-new':
            return `De **${fluxMetaDataModel.nextText}** is een nieuwe next-style, zie ${fluxMetaDataModel.planningInfo}
                    voor bijkomende informatie.`;
        default:
            return '';
    }
};

declare global {
    // eslint-disable-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'vl-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
