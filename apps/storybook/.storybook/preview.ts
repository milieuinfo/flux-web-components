import { filterOutClasses, filterOutDataCy, formatHTML } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { GlobalStyles } from '@domg-wc/styles';
import { VlAlert } from '@domg-wc/components';
import { VlIconComponent } from '@domg-wc/components';
import './styles.css';
import 'reflect-metadata';
import { VluxAlert } from './vlux-alert/vlux-alert.component';
import VluxDocument from './vlux-document/vlux-document.template.mdx';
import { VluxMetaData } from './vlux-meta-data/vlux-meta-data.component';

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
        components: { VluxAlert, VluxMetaData },
        transformSource: (input: string, { id }: { id: string }) => {
            if (id.startsWith('elements-')) {
                return formatHTML(filterOutDataCy(filterOutClasses(input)));
            }
        },
        page: VluxDocument,
    },
};

// zonder deze import missen initieel de iconen, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
// een gevolg is ook dat de vlElementsStyle's op de document.adoptedStyleSheets gezet worden
registerWebComponents([VlIconComponent, VlAlert]);

// zonder deze register() missen initieel de global-styles, ze verschijnen dan wel maar pas na 30 seconden - onduidelijk waarom
GlobalStyles.getInstance().register();
