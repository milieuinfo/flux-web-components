import React from 'react';
import { Markdown } from '@storybook/blocks';

export const VluxAlert = ({
    children,
    title = 'Opgelet',
    icon = 'warning',
    type = 'error',
    size = 'small',
    naked = false,
    message = '',
}) => {
    return (
        <vl-alert
            data-vl-icon={icon}
            data-vl-title={title}
            data-vl-type={type}
            data-vl-size={size}
            data-vl-naked={naked ? '' : undefined}
            data-vl-message={message}
        >
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
