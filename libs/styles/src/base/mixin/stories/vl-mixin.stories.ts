import { formattedSourceCode } from '@resources/utils-storybook';
import { html } from 'lit-html';
import { vlWaveAnimationMixin } from '../vl-animations.css';
import { vlFocusOutlineMixin } from '../vl-outlines.css';
import vlMixinStoriesDoc from './vl-mixin.stories-doc.mdx';
import { Meta } from '@storybook/web-components-vite';

export default {
    id: 'styles-base-mixin',
    title: 'Styles/Base (intern)/mixin',
    tags: ['autodocs'],
    parameters: {
        docs: {
            page: vlMixinStoriesDoc,
        },
    },
} as Meta;

export const WaveAnimationMixinDefault = ({}) => html`
    <style>
        .sb-wave-animation-blue {
            animation: sb-wave-animation-blue infinite 1s linear;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        ${vlWaveAnimationMixin('sb-wave-animation-blue', 'lightblue')}
    </style>
    <div class="sb-wave-animation-blue"></div>
`;
WaveAnimationMixinDefault.storyName = 'vl-mixin - vlWaveAnimationMixin';
WaveAnimationMixinDefault.parameters = formattedSourceCode;

export const FocusOutlineMixinDefault = ({}) => html` <style>
        .sb-focus-outline {
            ${vlFocusOutlineMixin()}
            width: 200px;
            padding: 10px;
            text-align: center;
        }
    </style>
    <div class="sb-focus-outline">outline bij focus</div>`;
FocusOutlineMixinDefault.storyName = 'vl-mixin - vlFocusOutlineMixin';
FocusOutlineMixinDefault.parameters = formattedSourceCode;
