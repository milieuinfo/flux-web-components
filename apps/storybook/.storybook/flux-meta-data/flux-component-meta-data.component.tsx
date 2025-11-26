import React from 'react';
import { FluxComponentCondition } from './flux-component-condition.component';
import { FluxComponentEvolution } from './flux-component-evolution.component';

export const FluxComponentMetaData = ({ id }) => {
    return (
        <div aria-hidden="true">
            <FluxComponentCondition id={id} />
            <FluxComponentEvolution id={id} />
        </div>
    );
};
