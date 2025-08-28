import { useOf } from '@storybook/addon-docs/blocks';
import React from 'react';
import { FluxMetaData } from '../flux-meta-data/flux-meta-data.component';

export const FluxHeader = ({ of }) => {
    const storyData = useOf(of || 'story', ['story']);
    return (
        <div>
            <h1>{formatTitle(storyData?.story?.title)}</h1>
            <FluxMetaData id={storyData?.story?.componentId} />
        </div>
    );
};

const formatTitle = (title: string): string => {
    let endPart = title.split('/').pop() ?? '';
    const isNext = title.includes('-next');
    endPart = endPart
        .split('-')
        .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
        .join(' ');
    return isNext ? endPart + ' - next' : endPart;
};
