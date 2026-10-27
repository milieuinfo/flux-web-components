import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import type { Decorator, Preview } from '@storybook/web-components';
import { VlAlert } from '@domg-wc/components/block';
import { VlIconComponent } from '@domg-wc/components/atom';
import './styles.css';
import 'reflect-metadata';
import { addons } from 'storybook/internal/preview-api';
import { FluxAlert } from './flux-alert/flux-alert.component';
import FluxDocument from './flux-document/flux-document.template.mdx';
import { FluxComponentEvolution } from './flux-meta-data/flux-component-evolution.component';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { FluxCanvasIframe } from './flux-canvas-iframe/flux-canvas-iframe';
import { STORY_CHANGED } from 'storybook/internal/core-events';
import { FluxComponentCondition } from './flux-meta-data/flux-component-condition.component';
import { FluxComponentMetaData } from './flux-meta-data/flux-component-meta-data.component';
import { FluxComponentOverview } from './flux-meta-data/flux-component-overview.component';

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
        components: { FluxAlert, FluxComponentOverview, FluxComponentMetaData, FluxComponentEvolution, FluxComponentCondition, FluxCanvasIframe },
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
                    body > #header__skeleton,
                    body > #footer__container
                `
            )
            .forEach((el) => el.remove());
    });
    return Story();
};

// De ArgTypes-tabel op een docs-pagina volgt de volgorde van het argTypes-object. Sinds Storybook 10 start inferArgTypes
// niet meer met alle args: args met een eigen `type` slaat het eerst over, waardoor ze achteraan belanden en bv. de
// verplichte attributen van een kaartlaag niet meer bovenaan staan. Daarom zetten we hier de volgorde van de args terug,
// met daarachter de argTypes zonder arg. Een sleutel verwijderen en opnieuw toevoegen zet hem achteraan in het object.
// Enkel de volgorde wijzigt: de lege return voegt geen args toe. Te verwijderen zodra Storybook de volgorde zelf behoudt.
const keepArgOrder = ({
    initialArgs,
    argTypes,
}: {
    initialArgs: Record<string, unknown>;
    argTypes: Record<string, unknown>;
}) => {
    const moveToEnd = (key: string) => {
        const argType = argTypes[key];
        delete argTypes[key];
        argTypes[key] = argType;
    };
    Object.keys(initialArgs)
        .filter((key) => key in argTypes)
        .forEach(moveToEnd);
    Object.keys(argTypes)
        .filter((key) => !(key in initialArgs))
        .forEach(moveToEnd);
    return {};
};

const preview: Preview = {
    argsEnhancers: [keepArgOrder],
    loaders: [mswLoader],
    decorators: [cleanupDecorator],
};

export default preview;

// zonder deze import missen initieel de iconen, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
// een gevolg is ook dat de vlElementsStyle's op de document.adoptedStyleSheets gezet worden
registerWebComponents([VlIconComponent, VlAlert]);

// zonder deze register() missen initieel de global-styles, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
GlobalStyles.getInstance().register();
