import React, { useEffect, useRef } from 'react';
import { fluxAllMetaData } from '../flux-meta-data/flux-meta-data.data';
import { FluxMetaDataComponent } from '../flux-meta-data/flux-meta-data.model';
import { API_HashEntry } from 'storybook/internal/types';

export const FluxSidebarLabel = ({ storyData }: { storyData: API_HashEntry }) => {
    const { name = '', id = '', type = '' } = storyData;
    const inputRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current;
        // een component in een map (bv. dashboard/dashboard) heeft een ander id dan zijn stories; zoek dan op dat van de stories
        const storiesId = type === 'component' ? storyData.children?.[0]?.split('--')[0] : undefined;
        const fluxMetaDataComponent = (fluxAllMetaData()[id] ?? fluxAllMetaData()[storiesId]) as FluxMetaDataComponent;
        const componentEvolution = fluxMetaDataComponent?.evolution;
        if (componentEvolution && componentEvolution.vStatus) {
            input.parentElement.setAttribute('data-version', componentEvolution.vStatus);
        } else if (type === 'group' && name === 'next') {
            input.parentElement.setAttribute('data-version', 'next-folder');
        }
    }, []);

    return <div ref={inputRef}>{name}</div>;
};
