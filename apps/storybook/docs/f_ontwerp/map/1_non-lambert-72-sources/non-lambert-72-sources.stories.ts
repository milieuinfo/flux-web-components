import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlMapNonLambert72Sources } from '@domg-wc/integration/map/non-lambert-72-source';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import mapNonLambert72doc from './non-lambert-72-sources.stories-doc.mdx';

registerWebComponents([VlMapNonLambert72Sources]);

export default {
    title: 'Ontwerp/Map/Niet-Lambert-72-lagen',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: mapNonLambert72doc,
        },
    },
} as Meta;

export const Demo = () => html`<vl-map-non-lambert-72-sources></vl-map-non-lambert-72-sources>`;
