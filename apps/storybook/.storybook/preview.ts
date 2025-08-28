import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import type { Decorator, Preview } from '@storybook/web-components';
import { VlAlert } from '@domg-wc/components/block';
import { VlIconComponent } from '@domg-wc/components/atom';
import './styles.css';
import 'reflect-metadata';
import { filterOutClasses, filterOutDataCy, formatHTML } from '@resources/utils-storybook';
import { addons } from 'storybook/internal/preview-api';
import { FluxAlert } from './flux-alert/flux-alert.component';
import FluxDocument from './flux-document/flux-document.template.mdx';
import { FluxMetaData } from './flux-meta-data/flux-meta-data.component';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { FluxCanvasIframe } from './flux-canvas-iframe/flux-canvas-iframe';
import { STORY_CHANGED } from 'storybook/internal/core-events';

// Start MSW in Storybook. Laat on-handled requests doorgaan (geen errors in non-mock stories).
initialize({ onUnhandledRequest: 'bypass' });

export const parameters = {
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        expanded: true,
        sort: 'alpha',
    },
    docs: {
        components: { FluxAlert, FluxMetaData, FluxCanvasIframe },
        transformSource: (input: string, { id }: { id: string }) => {
            if (id.startsWith('elements-')) {
                return formatHTML(filterOutDataCy(filterOutClasses(input)));
            }
        },
        page: FluxDocument,
    },
};

// Elementen die toegevoegd worden aan de body blijven daar soms ook staan wanneer je navigeert naar een andere pagina.
// Met deze cleanup decorator worden die verwijderd indien ze bestaan.
const cleanupDecorator: Decorator = (Story) => {
    addons.getChannel().on(STORY_CHANGED, () => {
        document
            .querySelectorAll(
                `
                    body > #header__container,
                    body > #header__container__skeleton,
                    body > #footer__container
                `
            )
            .forEach((el) => el.remove());
    });
    return Story();
};

const preview: Preview = {
    loaders: [mswLoader],
    decorators: [cleanupDecorator],
};

export default preview;

// zonder deze import missen initieel de iconen, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
// een gevolg is ook dat de vlElementsStyle's op de document.adoptedStyleSheets gezet worden
registerWebComponents([VlIconComponent, VlAlert]);

// zonder deze register() missen initieel de global-styles, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
GlobalStyles.getInstance().register();
