import { API_HashEntry } from '@storybook/types';
import React, { useEffect, useRef } from 'react';
import fluxMetaData from '../flux-meta-data/flux-meta-data.json';
import { FluxMetaDataModel } from '../flux-meta-data/flux-meta-data.model';

export const FluxSidebarLabel = ({ storyData }: { storyData: API_HashEntry }) => {
    const { name = '', id = '' } = storyData;
    const inputRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current;
        const componentMetaData = fluxMetaData[id] as FluxMetaDataModel;
        if (componentMetaData && componentMetaData.vStatus)
            input.parentElement.setAttribute('data-version', componentMetaData.vStatus);
    }, []);

    return <div ref={inputRef}>{name}</div>;
};
