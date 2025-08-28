import { Markdown } from '@storybook/addon-docs/blocks';
import React from 'react';
import fluxMetaData from './flux-meta-data.json';
import { FluxMetaDataModel } from './flux-meta-data.model';

export const FluxMetaData = ({ id }) => {
    const fluxMetaDataModel = fluxMetaData[id] as FluxMetaDataModel;
    // @ts-ignore
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
        case 'v2':
        case 'v2-style-atom':
        case 'v2-style-base':
        case 'v2-style-layout':
            return 'info';
        case 'v2-replace':
            return 'error';
        case 'v3-next':
            return 'success';
        default:
            return 'info';
    }
};

const buildTitle = (fluxMetaDataModel: FluxMetaDataModel): string => {
    switch (fluxMetaDataModel?.vStatus) {
        case 'v2':
            return 'v2 component';
        case 'v2-style-atom':
            return 'v2 atom style';
        case 'v2-style-base':
            return 'v2 base style';
        case 'v2-style-layout':
            return 'v2 layout style';
        case 'v2-replace':
            return 'Legacy component';
        case 'v3-next':
            return '"Next"-component';
        default:
            return '';
    }
};

const buildText = (fluxMetaDataModel: FluxMetaDataModel): string => {
    switch (fluxMetaDataModel?.vStatus) {
        case 'v2':
        case 'v2-style-layout':
            return '';
        case 'v2-style-atom':
        case 'v2-style-base':
            return 'Dit is interne styling van de v2 opzet; deze documentatie is bedoeld voor bijdragers / beheerders!';
        case 'v2-replace':
            return `De **${fluxMetaDataModel.legacyText}** is een legacy-component die vervangen wordt door
                    ${fluxMetaDataModel.nextText}, zie ${fluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
        case 'v3-next':
            return `De **${fluxMetaDataModel.nextText}** is een next-component die ${fluxMetaDataModel.legacyText}
                    vervangt, zie ${fluxMetaDataModel.planningInfo} voor bijkomende informatie.`;
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
