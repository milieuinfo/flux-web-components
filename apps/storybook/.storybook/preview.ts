import { GlobalStyles, registerWebComponents } from '@domg-wc/common';
import { VlAlert } from '@domg-wc/components/block';
import { VlIconComponent } from '@domg-wc/components/atom';
import './styles.css';
import 'reflect-metadata';
import { filterOutClasses, filterOutDataCy, formatHTML } from '@resources/utils-storybook';
import { FluxAlert } from './flux-alert/flux-alert.component';
import FluxDocument from './flux-document/flux-document.template.mdx';
import { FluxMetaData } from './flux-meta-data/flux-meta-data.component';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        expanded: true,
        sort: 'alpha',
    },
    docs: {
        components: { FluxAlert: FluxAlert, FluxMetaData: FluxMetaData },
        transformSource: (input: string, { id }: { id: string }) => {
            if (id.startsWith('elements-')) {
                return formatHTML(filterOutDataCy(filterOutClasses(input)));
            }
        },
        page: FluxDocument,
    },
};

// zonder deze import missen initieel de iconen, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
// een gevolg is ook dat de vlElementsStyle's op de document.adoptedStyleSheets gezet worden
registerWebComponents([VlIconComponent, VlAlert]);

// zonder deze register() missen initieel de global-styles, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
GlobalStyles.getInstance().register();
