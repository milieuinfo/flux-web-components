import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlFormLabelComponent } from '@domg-wc/form/next/form-label';
import { VlInputFieldComponent } from '@domg-wc/form/next/input-field';
import { registerWebComponents } from 'libs/common/utilities/src/util/utils';
import { html } from 'lit-html';
import {
    vlMediaScreenExtraSmall,
    vlMediaScreenMedium,
    vlMediaScreenSmall,
} from '../../../base/var/vl-media-screen.css';
import vlGridStoriesDoc from './vl-grid.stories-doc.mdx';

registerWebComponents([VlFormLabelComponent, VlInputFieldComponent, VlButtonComponent]);

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

export const GridResponsive = () => html`
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

export const GridColumnStart = () => html`
    <style>
        #story--styles-next-layout-afnemers-grid--grid-column-start-inner {
            .vl-grid-next {
                --vl-column-min-height: 20px;
                grid-template-rows: 20px;
                padding: 1vmax;
            }
        }
        .vl-grid-next {
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

            .vl-column-next {
                min-height: var(--vl-column-min-height);
                background-color: mediumspringgreen;
                border: lightseagreen 2px solid;
            }
        }
    </style>
    <div class="vl-grid-next">
        <div
            class="vl-column-next vl-column-next--1 vl-column-next--start-12 vl-column-next--m-4 vl-column-next--m-start-9"
        ></div>
        <div
            class="vl-column-next vl-column-next--2 vl-column-next--start-11 vl-column-next--m-4 vl-column-next--m-start-9"
        ></div>
        <div
            class="vl-column-next vl-column-next--3 vl-column-next--start-10 vl-column-next--m-4 vl-column-next--m-start-9"
        ></div>
        <div class="vl-column-next vl-column-next--4 vl-column-next--start-9"></div>
        <div
            class="vl-column-next vl-column-next--5 vl-column-next--start-8 vl-column-next--m-8 vl-column-next--m-start-5"
        ></div>
        <div
            class="vl-column-next vl-column-next--6 vl-column-next--start-7 vl-column-next--m-8 vl-column-next--m-start-5"
        ></div>
        <div
            class="vl-column-next vl-column-next--7 vl-column-next--start-6 vl-column-next--m-8 vl-column-next--m-start-5"
        ></div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--start-5"></div>
        <div
            class="vl-column-next vl-column-next--9 vl-column-next--start-4 vl-column-next--m-start-1 vl-column-next--m-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--10 vl-column-next--start-3 vl-column-next--m-start-1 vl-column-next--m-12"
        ></div>
        <div
            class="vl-column-next vl-column-next--11 vl-column-next--start-2 vl-column-next--m-start-1 vl-column-next--m-12"
        ></div>
        <div class="vl-column-next vl-column-next--12 vl-column-next--start-1"></div>
    </div>
`;
GridColumnStart.storyName = 'vl-grid - column start';

export const GridJustifyAlign = () => html`
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
        <div class="vl-column-next vl-column-next--8 vl-column-next--start-5 vl-column-next--justify-self-start">
            &nbsp;justify-self-start&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--start-5 vl-column-next--justify-self-center">
            &nbsp;justify-self-center&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--start-5 vl-column-next--justify-self-end">
            &nbsp;justify-self-end&nbsp;
        </div>
        <div class="vl-column-next vl-column-next--8 vl-column-next--start-5 vl-column-next--justify-self-stretch">
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

export const GridWithForm = () => html`
    <style>
        form .vl-grid-next .vl-column-next {
            background-color: initial;
            border: initial;
        }
    </style>
    <form>
        <div class="vl-grid-next">
            <div class="vl-column-next vl-column-next--2">
                <vl-form-label-next for="email" label="Email"></vl-form-label-next>
            </div>
            <div class="vl-column-next vl-column-next--10">
                <vl-input-field-next
                    id="email"
                    name="email"
                    block
                    placeholder="Bijv. naam@voorbeeld.be"
                ></vl-input-field-next>
            </div>
            <div class="vl-column-next vl-column-next--2">
                <vl-form-label-next for="name" label="Voornaam"></vl-form-label-next>
            </div>
            <div class="vl-column-next vl-column-next--10">
                <vl-input-field-next id="name" name="name" block placeholder="John"></vl-input-field-next>
            </div>
            <div class="vl-column-next vl-column-next--2">
                <vl-form-label-next for="surname" label="Naam"></vl-form-label-next>
            </div>
            <div class="vl-column-next vl-column-next--10">
                <vl-input-field-next id="surname" name="surname" block placeholder="Doe"></vl-input-field-next>
            </div>
            <div class="vl-column-next vl-column-next--10 vl-column-next--start-3">
                <vl-button-next type="submit">Inschrijven</vl-button-next>
            </div>
        </div>
    </form>
`;
GridWithForm.storyName = 'vl-grid - in form';
