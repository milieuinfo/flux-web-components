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
        case 'v2':
        case 'v2-style-atom':
        case 'v2-style-base':
        case 'v2-style-layout':
            return 'info';
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
