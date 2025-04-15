import { Markdown } from '@storybook/blocks';
import React from 'react';
import { VluxMetaDataModel } from './vlux-meta-data.model';
import vluxMetaData from './vlux-meta-data.json';

export const VluxMetaData = ({ id }) => {
    const vluxMetaDataModel = vluxMetaData[id] as VluxMetaDataModel;
    return vluxMetaDataModel ? (
        <vl-alert
            data-vl-icon="warning"
            data-vl-title={buildTitle(vluxMetaDataModel)}
            data-vl-type={buildType(vluxMetaDataModel)}
            data-vl-size="small"
        >
            <Markdown options={{ forceInline: true }} style={{ fontSize: '14px' }}>
                {buildText(vluxMetaDataModel)}
            </Markdown>
        </vl-alert>
    ) : null;
};

const buildType = (vluxMetaDataModel: VluxMetaDataModel): string => {
    switch (vluxMetaDataModel?.vStatus) {
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

const buildTitle = (vluxMetaDataModel: VluxMetaDataModel): string => {
    switch (vluxMetaDataModel?.vStatus) {
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

const buildText = (vluxMetaDataModel: VluxMetaDataModel): string => {
    switch (vluxMetaDataModel?.vStatus) {
        case 'replaced':
            return `De **${vluxMetaDataModel.legacyText}** is een legacy-component die vervangen is door
                    ${vluxMetaDataModel.nextText}.`;
        case 'v1-replace':
            return `De **${vluxMetaDataModel.legacyText}** is een legacy-component die vervangen wordt door
                    ${vluxMetaDataModel.nextText}, zie ${vluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v1-remove':
            return `De **${vluxMetaDataModel.legacyText}** is een legacy-component die geschrapt wordt in v2,
                    zie ${vluxMetaDataModel.planningInfo} voor meer informatie.`;
        case 'v1-todo':
            return `De **${vluxMetaDataModel.legacyText}** is een legacy-component die vervangen gaat worden door
                    een next-component, zie ${vluxMetaDataModel.planningInfo} voor de release waarin dat gepland is.`;
        case 'v2-impact':
            return `${vluxMetaDataModel.legacyText}
                    Zie ${vluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v2':
            return `De **${vluxMetaDataModel.nextText}** is een next-component die ${vluxMetaDataModel.legacyText}
                    vervangt, zie ${vluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v2-style-base':
            return `De **${vluxMetaDataModel.nextText}** is een intern onderdeel van de next-style opzet; deze
                    documentatie is bedoeld voor bijdragers / beheerders!<br/>
                    Enkel wat onder 'Layout (afnemers)' staat is bedoeld voor afnemers.`;
        case 'v2-style-layout':
            return `De **${vluxMetaDataModel.nextText}** is een next-style die ${vluxMetaDataModel.legacyText}
                    vervangt, zie ${vluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v2-style-new':
            return `De **${vluxMetaDataModel.nextText}** is een nieuwe next-style, zie ${vluxMetaDataModel.planningInfo}
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
