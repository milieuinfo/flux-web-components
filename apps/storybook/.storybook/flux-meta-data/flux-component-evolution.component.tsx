import { Markdown } from '@storybook/addon-docs/blocks';
import React from 'react';
import { fluxAllMetaData } from './flux-meta-data.data';
import { ComponentEvolution, FluxMetaDataComponent } from './flux-meta-data.model';

export const FluxComponentEvolution = ({ id }) => {
    const fluxMetaDataComponent = fluxAllMetaData()[id] as FluxMetaDataComponent;
    const componentEvolution = fluxMetaDataComponent?.evolution;
    return componentEvolution ? (
        <vl-alert
            icon="warning"
            title={buildTitle(componentEvolution)}
            type={buildType(componentEvolution)}
            size="small"
        >
            <Markdown options={{ forceInline: true }} style={{ fontSize: '14px' }}>
                {buildText(componentEvolution)}
            </Markdown>
        </vl-alert>
    ) : null;
};

const buildType = (componentEvolution: ComponentEvolution): string => {
    switch (componentEvolution?.vStatus) {
        case 'v2':
        case 'v2-style-base':
        case 'v2-style-atom':
            return 'warning';
        case 'v2-replace':
            return 'error';
        case 'v3-next':
            return 'success';
        default:
            return 'info';
    }
};

const buildTitle = (componentEvolution: ComponentEvolution): string => {
    switch (componentEvolution?.vStatus) {
        case 'v2':
            return 'v2 component';
        case 'v2-style-base':
        case 'v2-style-atom':
            return 'Styling voor intern gebruik';
        case 'v2-replace':
            return 'Legacy Component';
        case 'v3-next':
            return 'Next Component';
        default:
            return '';
    }
};

const buildText = (componentEvolution: ComponentEvolution): string => {
    switch (componentEvolution?.vStatus) {
        case 'v2':
        case 'v2-style-atom':
        case 'v2-style-base':
            return 'Deze documentatie is bedoeld voor bijdragers / beheerders!';
        case 'v2-replace':
            return `De **${componentEvolution.legacyText}** is een legacy-component die vervangen wordt door
                    ${componentEvolution.nextText}, zie ${componentEvolution.planningInfo} voor bijkomende informatie.`;
        case 'v3-next':
            return `De **${componentEvolution.nextText}** is een next-component die ${componentEvolution.legacyText}
                    vervangt, zie ${componentEvolution.planningInfo} voor bijkomende informatie.`;
        default:
            return '';
    }
};
