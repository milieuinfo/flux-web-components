import React from 'react';
import { useOf } from '@storybook/addon-docs/blocks';

type Props = {
    height?: number;
};

// Dit component is toegevoegd omwille van de vl-header en vl-footer.
// Bij deze componenten worden er elementen toegevoegd aan de body, met als gevolg dat het standaard
// `<Canvas of={...} />` component niets lijkt te renderen, terwijl de header- en footer-elementen aan de
// Storybook html toegevoegd worden en dus buiten het kader van canvas treden. Deze iframe is daar een work-around voor.
// Deze iframe laadt steeds de default story.

export const FluxCanvasIframe = ({ height }: Props) => {
    const story = useOf('story');
    if (!story || story.type !== 'story') return null;

    const src = `/iframe.html?id=${story.story.id}&viewMode=story`;

    return (
        <iframe
            sandbox="allow-scripts allow-same-origin"
            src={src}
            width="100%"
            height={height || 200}
            style={{
                border: '1px solid hsla(203, 50%, 30%, 0.15)',
                background: '#FFFFFF',
                borderRadius: '4px',
                boxShadow: 'rgba(0, 0, 0, 0.10) 0 1px 3px 0',
                padding: '10px',
            }}
        />
    );
};
