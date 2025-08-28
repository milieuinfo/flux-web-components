import { addons } from 'storybook/manager-api';
import voTheme from './voTheme';
import { FluxSidebarLabel } from './flux-sidebar-label/flux-sidebar-label.component';
import React from 'react';

addons.setConfig({
    theme: voTheme,
    enableShortcuts: false,
    sidebar: {
        renderLabel: (storyData) => <FluxSidebarLabel storyData={storyData} />,
    }
});
