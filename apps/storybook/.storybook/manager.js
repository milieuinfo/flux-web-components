import { addons } from '@storybook/addons';
import theme from './voTheme';
import React from 'react';
import { FluxSidebarLabel } from './flux-sidebar-label/flux-sidebar-label.component';

addons.setConfig({
    theme,
    enableShortcuts: false,
    sidebar: {
        renderLabel: (storyData) => <FluxSidebarLabel storyData={storyData} />,
    },
});
