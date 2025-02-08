import { html } from 'lit-html';
import {
    vlMediaScreenExtraSmall,
    vlMediaScreenMedium,
    vlMediaScreenSmall,
} from '../../../base/var/vl-media-screen.css';
import vlGridStoriesDoc from './vl-grid.stories-doc.mdx';

export default {
    id: 'styles-next-layout-afnemers-grid',
    title: 'Styles-next/Layout (afnemers)/grid',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlGridStoriesDoc,
        },
    },
};

export const GridResponsive = ({}) => html`
    <style>
        .vl-grid-next {
            --vl-column-min-height: 8vmax;
            padding: 1vmax;

            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                --vl-column-min-height: 5vmax;
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                --vl-column-min-height: 4vmax;
            }

            @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
                --vl-column-min-height: 3vmax;
            }

            .vl-column-next {
                min-height: var(--vl-column-min-height);
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }

            .sb-header {
                background-color: lightblue;
            }

            .sb-footer {
                background-color: lightblue;
            }

            .sb-main {
                grid-row: span 3;

                .vl-column-next {
                    background-color: lightseagreen;
                }
            }

            .sb-main__sub {
                .vl-column-next {
                    background-color: mediumspringgreen;
                }
            }
        }
    </style>
    <div class="vl-grid-next">
        <div
            class="vl-column-next sb-header vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-9"
        ></div>
        <div
            class="vl-column-next sb-header vl-column-next--11 vl-column-next--m-9 vl-column-next--s-6 vl-column-next--xs-3"
        ></div>
        <div class="sb-main vl-column-next vl-column-next--8 vl-grid-next vl-column-next--m-12">
            <div class="vl-column-next vl-column-next--5"></div>
            <div class="vl-column-next vl-column-next--7"></div>
            <div class="vl-column-next vl-column-next--5"></div>
            <div class="vl-column-next vl-column-next--7"></div>
            <div class="sb-main__sub vl-column-next vl-column-next--9 vl-grid-next">
                <div class="vl-column-next vl-column-next--4"></div>
                <div class="vl-column-next vl-column-next--4"></div>
                <div class="vl-column-next vl-column-next--4"></div>
                <div class="vl-column-next vl-column-next--8"></div>
                <div class="vl-column-next vl-column-next--4"></div>
            </div>
            <div class="vl-column-next vl-column-next--3"></div>
        </div>
        <div class="vl-column-next vl-column-next--4 vl-column-next--m-12"></div>
        <div class="vl-column-next vl-column-next--2 vl-column-next--m-6 vl-column-next--xs-12"></div>
        <div class="vl-column-next vl-column-next--2 vl-column-next--m-6 vl-column-next--xs-12"></div>
        <div
            class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--1 vl-column-next--m-3 vl-column-next--s-6 vl-column-next--xs-12"
        ></div>
        <div class="vl-column-next sb-footer vl-column-next--4"></div>
        <div class="vl-column-next sb-footer vl-column-next--2"></div>
        <div class="vl-column-next sb-footer vl-column-next--1"></div>
        <div class="vl-column-next sb-footer vl-column-next--2"></div>
        <div class="vl-column-next sb-footer vl-column-next--1"></div>
        <div class="vl-column-next sb-footer vl-column-next--2"></div>
    </div>
`;
GridResponsive.storyName = 'vl-grid - responsive';

export const GridOffset = ({}) => html`
    <style>
        .vl-grid-next {
            --vl-column-min-height: 8vmax;
            padding: 1vmax;

            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                --vl-column-min-height: 5vmax;
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                --vl-column-min-height: 4vmax;
            }

            @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
                --vl-column-min-height: 3vmax;
            }
        }

        .vl-grid-next.vl-grid-offset {
            --vl-column-min-height: 20px;
            grid-template-rows: 20px;

            .vl-column-next {
                min-height: var(--vl-column-min-height);
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        }
    </style>
    <div class="vl-grid-next vl-grid-offset">
        <div
            class="vl-column-next vl-column-next--1 vl-column-next--offset-12 vl-column-next--m-4 vl-column-next--m-offset-9"
        ></div>
        <div
            class="vl-column-next vl-column-next--2 vl-column-next--offset-11 vl-column-next--m-4 vl-column-next--m-offset-9"
        ></div>
        <div
            class="vl-column-next vl-column-next--3 vl-column-next--offset-10 vl-column-next--m-4 vl-column-next--m-offset-9"
        ></div>
        <div class="vl-column-next vl-column-next--4 vl-column-next--offset-9"></div>
        <div
            class="vl-column-next vl-column-next--5 vl-column-next--offset-8 vl-column-next--m-8 vl-column-next--m-offset-5"
        ></div>
        <div
            class="vl-column-next vl-column-next--6 vl-column-next--offset-7 vl-column-next--m-8 vl-column-next--m-offset-5"
        ></div>
        <div
            class="vl-column-next vl-column-next--7 vl-column-next--offset-6 vl-column-next--m-8 vl-column-next--m-offset-5"
        ></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-5"></div>
        <div
            class="vl-column-next vl-column-next--9 vl-column-next--offset-4 vl-column-next--m-offset-1 vl-column-next--m-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--10 vl-column-next--offset-3 vl-column-next--m-offset-1 vl-column-next--m-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--11 vl-column-next--offset-2 vl-column-next--m-offset-1 vl-column-next--m-12"
        ></div>
        <div class="vl-column-next vl-column-next--12 vl-column-next--offset-1"></div>
    </div>
`;
GridOffset.storyName = 'vl-grid - offset';

export const GridJustifyAlign = ({}) => html`
    <style>
        .vl-grid-next {
            --vl-column-min-height: 1vmax;
            grid-template-rows: 30px 30px 30px 30px 60px 60px 60px 30px;

            .vl-column-next {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        }
    </style>
    <div class="vl-grid-next">
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-start">
            &nbsp;justify-self-start&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-center">
            &nbsp;justify-self-center&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-end">
            &nbsp;justify-self-end&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--offset-5 vl-column-next--justify-self-stretch">
            &nbsp;justify-self-stretch&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-start">
            &nbsp;align-items-start&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--6"></div>
        <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-center">
            &nbsp;align-items-center&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--6"></div>
        <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-end">&nbsp;align-items-end&nbsp;</div>
        <div class="vl-column-next vl-column-next--6"></div>
        <div class="vl-column-next vl-column-next--6 vl-column-next--align-self-stretch">
            &nbsp;align-items-stretch&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--6"></div>
    </div>
`;
GridJustifyAlign.storyName = 'vl-grid - justify / align';
