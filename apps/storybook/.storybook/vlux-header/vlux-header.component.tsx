import { useOf } from '@storybook/blocks';
import React from 'react';
import { VluxMetaData } from '../vlux-meta-data/vlux-meta-data.component';

export const VluxHeader = ({ of }) => {
    const storyData = useOf(of || 'story', ['story']);
    return (
        <div>
            <h1>{formatTitle(storyData?.story?.title)}</h1>
            <VluxMetaData id={storyData?.story?.componentId} />
        </div>
    );
};

const formatTitle = (title: string): string => {
    let endPart = title.split('/').pop() ?? '';
    const isNext = title.includes('');
    endPart = endPart
        .split('-')
        .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
        .join(' ');
    return isNext ? endPart + ' - next' : endPart;
};
