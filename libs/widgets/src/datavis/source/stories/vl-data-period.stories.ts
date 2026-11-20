import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import type { VlPeriodChangeEventDetail } from '../../events/period-change.event';
import { VlDataFigure } from '../../figure/vl-data-figure.component';
import { VlDataPeriod } from '../vl-data-period.component';
import { VlDataSource } from '../vl-data-source.component';
import { ELF_SRC, elfHandlers } from './elf-story-data';
import { dataPeriodArgs, dataPeriodArgTypes } from './vl-data-period.stories-arg';
import dataPeriodDoc from './vl-data-period.stories-doc.mdx';

registerWebComponents([VlDataSource, VlDataPeriod, VlDataFigure, VlChartLine]);

export default {
    id: 'data-visualisation-data-period',
    title: 'Widgets - Datavis/source/data-period',
    tags: ['autodocs'],
    args: dataPeriodArgs,
    argTypes: dataPeriodArgTypes,
    parameters: {
        msw: { handlers: elfHandlers },
        docs: {
            page: dataPeriodDoc,
        },
    },
} as Meta<typeof dataPeriodArgs>;

export const DataPeriodDefault = story(
    dataPeriodArgs,
    ({ customCSS, onPeriodChange }) => html`
        <vl-data-source format="sample-data" src=${ELF_SRC} period="24h">
            <vl-data-figure headline="Magnetische veldsterkte">
                <vl-data-period
                    custom-css=${customCSS}
                    @vl-period-change=${(event: CustomEvent<VlPeriodChangeEventDetail>) => onPeriodChange(event.detail)}
                ></vl-data-period>
                <vl-chart-line></vl-chart-line>
            </vl-data-figure>
        </vl-data-source>
    `,
);
DataPeriodDefault.storyName = 'vl-data-period - default';
