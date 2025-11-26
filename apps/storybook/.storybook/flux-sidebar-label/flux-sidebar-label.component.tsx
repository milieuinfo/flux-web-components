import React, { useEffect, useRef } from 'react';
import { fluxAllMetaData } from '../flux-meta-data/flux-meta-data.data';
import { FluxMetaDataComponent } from '../flux-meta-data/flux-meta-data.model';
import { API_HashEntry } from 'storybook/internal/types';

export const FluxSidebarLabel = ({ storyData }: { storyData: API_HashEntry }) => {
    const { name = '', id = '' } = storyData;
    const inputRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current;
        const fluxMetaDataComponent = fluxAllMetaData()[id] as FluxMetaDataComponent;
        const componentEvolution = fluxMetaDataComponent?.evolution;
        if (componentEvolution && componentEvolution.vStatus)
            input.parentElement.setAttribute('data-version', componentEvolution.vStatus);
    }, []);

    return <div ref={inputRef}>{name}</div>;
};
