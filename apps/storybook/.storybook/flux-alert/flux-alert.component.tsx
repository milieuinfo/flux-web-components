import React from 'react';
import { Markdown } from '@storybook/blocks';

export const FluxAlert = ({
    children,
    title = 'Opgelet',
    icon = 'warning',
    type = 'error',
    size = 'small',
    naked = false,
    message = '',
}) => {
    return (
        <vl-alert icon={icon} title={title} type={type} size={size} naked={naked ? '' : undefined} message={message}>
            <Markdown options={{ forceInline: true }} style={{ fontSize: '14px' }}>
                {children}
            </Markdown>
        </vl-alert>
    );
};

declare global {
    // eslint-disable-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'vl-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
