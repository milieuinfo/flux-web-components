import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlFormLabelComponent, VlInputFieldComponent } from '@domg-wc/components/form';
import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit-html';
import {
    vlMediaScreenExtraSmall,
    vlMediaScreenMedium,
    vlMediaScreenSmall,
} from '../../../base/var/vl-media-screen.css';
import vlGridStoriesDoc from './vl-grid.stories-doc.mdx';
import { gridStoriesResponsiveCss } from './vl-grid.stories.css';

registerWebComponents([VlFormLabelComponent, VlInputFieldComponent, VlButtonComponent]);

export default {
    id: 'styles-layout-afnemers-grid',
    title: 'Styles/Layout (afnemers)/grid',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlGridStoriesDoc,
        },
    },
};

export const GridResponsive = () => html`
    <style>
        .vl-grid.grid-responsive-story {
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

            .vl-column {
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

                .vl-column {
                    background-color: lightseagreen;
                }
            }

            .sb-main__sub {
                .vl-column {
                    background-color: mediumspringgreen;
                }
            }

            ${gridStoriesResponsiveCss}
        }
    </style>
    <div class="vl-grid grid-responsive-story">
        <div class="vl-column sb-header vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-9"></div>
        <div class="vl-column sb-header vl-column--11 vl-column--m-9 vl-column--s-6 vl-column--xs-3"></div>
        <div class="sb-main vl-column vl-column--8 vl-grid vl-column--m-12">
            <div class="vl-column vl-column--5"></div>
            <div class="vl-column vl-column--7"></div>
            <div class="vl-column vl-column--5"></div>
            <div class="vl-column vl-column--7"></div>
            <div class="sb-main__sub vl-column vl-column--9 vl-grid">
                <div class="vl-column vl-column--4"></div>
                <div class="vl-column vl-column--4"></div>
                <div class="vl-column vl-column--4"></div>
                <div class="vl-column vl-column--8"></div>
                <div class="vl-column vl-column--4"></div>
            </div>
            <div class="vl-column vl-column--3"></div>
        </div>
        <div class="vl-column vl-column--4 vl-column--m-12"></div>
        <div class="vl-column vl-column--2 vl-column--m-6 vl-column--xs-12"></div>
        <div class="vl-column vl-column--2 vl-column--m-6 vl-column--xs-12"></div>
        <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12"></div>
        <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12"></div>
        <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12"></div>
        <div class="vl-column vl-column--1 vl-column--m-3 vl-column--s-6 vl-column--xs-12"></div>
        <div class="vl-column sb-footer vl-column--4"></div>
        <div class="vl-column sb-footer vl-column--2"></div>
        <div class="vl-column sb-footer vl-column--1"></div>
        <div class="vl-column sb-footer vl-column--2"></div>
        <div class="vl-column sb-footer vl-column--1"></div>
        <div class="vl-column sb-footer vl-column--2"></div>
    </div>
`;
GridResponsive.storyName = 'vl-grid - responsive';

export const GridColumnStart = () => html`
    <style>
        #story--styles-layout-afnemers-grid--grid-column-start-inner {
            .vl-grid {
                --vl-column-min-height: 20px;
                grid-template-rows: 20px;
                padding: 1vmax;
            }
        }
        .vl-grid {
            --vl-column-min-height: 20px;
            grid-template-rows: 20px;
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

            .vl-column {
                min-height: var(--vl-column-min-height);
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        }
    </style>
    <div class="vl-grid">
        <div class="vl-column vl-column--1 vl-column--start-12 vl-column--m-4 vl-column--m-start-9"></div>
        <div class="vl-column vl-column--2 vl-column--start-11 vl-column--m-4 vl-column--m-start-9"></div>
        <div class="vl-column vl-column--3 vl-column--start-10 vl-column--m-4 vl-column--m-start-9"></div>
        <div class="vl-column vl-column--4 vl-column--start-9"></div>
        <div class="vl-column vl-column--5 vl-column--start-8 vl-column--m-8 vl-column--m-start-5"></div>
        <div class="vl-column vl-column--6 vl-column--start-7 vl-column--m-8 vl-column--m-start-5"></div>
        <div class="vl-column vl-column--7 vl-column--start-6 vl-column--m-8 vl-column--m-start-5"></div>
        <div class="vl-column vl-column--8 vl-column--start-5"></div>
        <div class="vl-column vl-column--9 vl-column--start-4 vl-column--m-start-1 vl-column--m-12"></div>
        <div class="vl-column vl-column--10 vl-column--start-3 vl-column--m-start-1 vl-column--m-12"></div>
        <div class="vl-column vl-column--11 vl-column--start-2 vl-column--m-start-1 vl-column--m-12"></div>
        <div class="vl-column vl-column--12 vl-column--start-1"></div>
    </div>
`;
GridColumnStart.storyName = 'vl-grid - column start';

export const GridJustifyAlign = () => html`
    <style>
        .vl-grid {
            --vl-column-min-height: 1vmax;
            grid-template-rows: 30px 30px 30px 30px 60px 60px 60px 30px;

            .vl-column {
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        }
    </style>
    <div class="vl-grid">
        <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-start">
            &nbsp;justify-self-start&nbsp;
        </div>
        <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-center">
            &nbsp;justify-self-center&nbsp;
        </div>
        <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-end">
            &nbsp;justify-self-end&nbsp;
        </div>
        <div class="vl-column vl-column--8 vl-column--start-5 vl-column--justify-self-stretch">
            &nbsp;justify-self-stretch&nbsp;
        </div>
        <div class="vl-column vl-column--6 vl-column--align-self-start">&nbsp;align-items-start&nbsp;</div>
        <div class="vl-column vl-column--6"></div>
        <div class="vl-column vl-column--6 vl-column--align-self-center">&nbsp;align-items-center&nbsp;</div>
        <div class="vl-column vl-column--6"></div>
        <div class="vl-column vl-column--6 vl-column--align-self-end">&nbsp;align-items-end&nbsp;</div>
        <div class="vl-column vl-column--6"></div>
        <div class="vl-column vl-column--6 vl-column--align-self-stretch">&nbsp;align-items-stretch&nbsp;</div>
        <div class="vl-column vl-column--6"></div>
    </div>
`;
GridJustifyAlign.storyName = 'vl-grid - justify / align';

export const GridWithForm = () => html`
    <style>
        form .vl-grid .vl-column {
            background-color: initial;
            border: initial;
        }
    </style>
    <form>
        <div class="vl-grid">
            <div class="vl-column vl-column--2">
                <vl-form-label for="email" label="Email"></vl-form-label>
            </div>
            <div class="vl-column vl-column--10">
                <vl-input-field id="email" name="email" block placeholder="Bijv. naam@voorbeeld.be"></vl-input-field>
            </div>
            <div class="vl-column vl-column--2">
                <vl-form-label for="name" label="Voornaam"></vl-form-label>
            </div>
            <div class="vl-column vl-column--10">
                <vl-input-field id="name" name="name" block placeholder="John"></vl-input-field>
            </div>
            <div class="vl-column vl-column--2">
                <vl-form-label for="surname" label="Naam"></vl-form-label>
            </div>
            <div class="vl-column vl-column--10">
                <vl-input-field id="surname" name="surname" block placeholder="Doe"></vl-input-field>
            </div>
            <div class="vl-column vl-column--10 vl-column--start-3">
                <vl-button type="submit">Inschrijven</vl-button>
            </div>
        </div>
    </form>
`;
GridWithForm.storyName = 'vl-grid - in form';
