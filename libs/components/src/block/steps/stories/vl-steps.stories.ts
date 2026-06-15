import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlSideNavigationLayoutComponent } from '../../next/side-navigation';
import '../vl-steps.component';
import { stepsArgs, stepsArgTypes } from './vl-steps.stories-arg';
import stepsDoc from './vl-steps.stories-doc.mdx';

registerWebComponents([VlSideNavigationLayoutComponent]);

export default {
    id: 'components-block-steps-steps',
    title: 'Components - Block/steps/steps',
    tags: ['autodocs'],
    args: stepsArgs,
    argTypes: stepsArgTypes,
    parameters: {
        docs: {
            page: stepsDoc,
        },
    },
} as Meta<typeof stepsArgs>;

export const StepsDefault = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `,
);
StepsDefault.storyName = 'vl-steps - default';

export const StepsIcons = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step icon-aria-label="Zoeken">
                <vl-icon slot="icon" icon="search"></vl-icon>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step icon-aria-label="Kalender">
                <vl-icon slot="icon" icon="calendar"></vl-icon>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step icon-aria-label="Klok">
                <vl-icon slot="icon" icon="clock"></vl-icon>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `,
);
StepsIcons.storyName = 'vl-steps - icons';

export const StepsLine = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `,
);
StepsLine.storyName = 'vl-steps - line';
StepsLine.args = {
    line: true,
};

export const StepsTimeline = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step timeline-aria-label="1 maart, 12 uur tot 14 uur">
                <span slot="icon">1</span>
                <span slot="sub-icon">maa</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="title-annotation">12u00 - 14u00</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
                <vl-duration-step slot="duration">Lunch: 1 uur</vl-duration-step>
                <vl-duration-step slot="duration">Vrije tijd: 1 uur</vl-duration-step>
                <vl-duration-step slot="duration">Vrije tijd: 1 uur</vl-duration-step>
                <vl-duration-step slot="duration">Vrije tijd: 1 uur</vl-duration-step>
                <vl-duration-step slot="duration">Vrije tijd: 1 uur</vl-duration-step>
            </vl-step>
            <vl-step timeline-aria-label="1 maart, 15 uur tot 17 uur">
                <span slot="icon">1</span>
                <span slot="sub-icon">maa</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="title-annotation">15u00 - 17u00</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
                <vl-duration-step slot="duration">Vrije tijd: 2 uur</vl-duration-step>
            </vl-step>
            <vl-step timeline-aria-label="1 maart, 19 uur tot 21 uur">
                <span slot="icon">1</span>
                <span slot="sub-icon">maa</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="title-annotation">19u00 - 21u00</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `,
);
StepsTimeline.storyName = 'vl-steps - timeline';
StepsTimeline.args = {
    timeline: true,
};

export const StepsSimpleTimeline = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    `,
);
StepsSimpleTimeline.storyName = 'vl-steps - simple timeline';
StepsSimpleTimeline.args = {
    simpleTimeline: true,
};

export const StepsToggleable = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <vl-step toggleable default-open>
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Klik om de content te openen/sluiten.</span>
                <span slot="content">
                    <p>Dit is de eerste stap content. Deze stap is toggleable.</p>
                    <ul>
                        <li>Item A</li>
                        <li>Item B</li>
                        <li>Item C</li>
                    </ul>
                </span>
            </vl-step>
            <vl-step toggleable>
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Klik om de content te openen/sluiten.</span>
                <span slot="content">
                    <p>Dit is de tweede stap content. Deze stap is ook toggleable.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </span>
            </vl-step>
            <vl-step toggleable>
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Klik om de content te openen/sluiten.</span>
                <span slot="content">
                    <p>Dit is de derde stap content. Deze stap is ook toggleable.</p>
                </span>
            </vl-step>
        </vl-steps>
    `,
);
StepsToggleable.storyName = 'vl-steps - toggleable';

export const StepsAllStates = story(
    stepsArgs,
    ({ line, timeline, simpleTimeline, lastStepNoLine }) => html`
        <vl-steps
            ?line=${line}
            ?timeline=${timeline}
            ?simple-timeline=${simpleTimeline}
            ?last-step-no-line=${lastStepNoLine}
        >
            <!-- default -->
            <vl-step>
                <span slot="icon">1</span>
                <span slot="title">Default stap</span>
                <span slot="subtitle">Standaard weergave.</span>
                <span slot="content">Dit is een standaard stap zonder extra staat.</span>
            </vl-step>
            <!-- highlighted -->
            <vl-step type="highlighted">
                <span slot="icon">2</span>
                <span slot="title">Highlighted stap</span>
                <span slot="subtitle">Deze stap is gemarkeerd.</span>
                <span slot="content">Deze stap valt op door de highlighted staat.</span>
            </vl-step>
            <!-- disabled -->
            <vl-step type="disabled">
                <span slot="icon">3</span>
                <span slot="title">Disabled stap</span>
                <span slot="subtitle">Deze stap is uitgeschakeld.</span>
                <span slot="content">Deze stap kan niet worden geopend of gebruikt.</span>
            </vl-step>
            <!-- success -->
            <vl-step type="success">
                <span slot="icon">4</span>
                <span slot="title">Success stap</span>
                <span slot="subtitle">Deze stap is succesvol afgerond.</span>
                <span slot="content">Deze stap is met succes voltooid.</span>
            </vl-step>
            <!-- warning -->
            <vl-step type="warning">
                <span slot="icon">5</span>
                <span slot="title">Warning stap</span>
                <span slot="subtitle">Let op: deze stap vereist aandacht.</span>
                <span slot="content">Er is een waarschuwing voor deze stap.</span>
            </vl-step>
            <!-- error -->
            <vl-step type="error">
                <span slot="icon">6</span>
                <span slot="title">Error stap</span>
                <span slot="subtitle">Er is een fout opgetreden.</span>
                <span slot="content">Deze stap kon niet worden voltooid.</span>
            </vl-step>
        </vl-steps>
    `,
);
StepsAllStates.storyName = 'vl-steps - all states';

export const StepsSideNavigation = story(
    stepsArgs,
    () => html`
        <section class="vl-section" id="steps-side-navigation-example">
            <vl-side-navigation-layout-next>
                <div slot="content">
                    <vl-steps>
                        <vl-step>
                            <span slot="icon">1</span>
                            <span slot="title">
                                <div>Stap 1: eerste actie</div>
                            </span>
                            <span slot="content">
                                <div>
                                    <vl-title type="h2" id="vl-steps-vl-step-1">Stap 1: eerste actie</vl-title>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                </div>
                            </span>
                        </vl-step>
                        <vl-step>
                            <span slot="icon">2</span>
                            <span slot="title">
                                <div>Stap 2: tweede actie</div>
                            </span>
                            <span slot="content">
                                <div>
                                    <vl-title type="h2" id="vl-steps-vl-step-2">Stap 2: tweede actie</vl-title>
                                    <vl-title type="h3" underline id="vl-steps-vl-step-2-abstract">Abstract</vl-title>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <vl-title type="h4" id="vl-steps-vl-step-2-volledig">Volledig</vl-title>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                </div>
                            </span>
                        </vl-step>
                        <vl-step>
                            <span slot="icon">3</span>
                            <span slot="title">
                                <div>Stap 3: derde actie</div>
                            </span>
                            <span slot="content">
                                <div>
                                    <vl-title type="h2" id="vl-steps-vl-step-3">Stap 3: derde actie</vl-title>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada
                                        nunc vel risus commodo viverra maecenas accumsan lacus. Pretium lectus quam id
                                        leo in vitae. Dictum at tempor commodo ullamcorper a lacus. Facilisis gravida
                                        neque convallis a cras. Ut porttitor leo a diam sollicitudin tempor. Augue ut
                                        lectus arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas
                                        maecenas pharetra convallis posuere morbi leo. Proin gravida hendrerit lectus a.
                                        Sit amet mattis vulputate enim nulla aliquet porttitor. Eu consequat ac felis
                                        donec. Elit pellentesque habitant morbi tristique senectus et netus et.
                                        Tristique et egestas quis ipsum suspendisse ultrices gravida. Tortor consequat
                                        id porta nibh venenatis cras.
                                    </p>
                                </div>
                            </span>
                        </vl-step>
                    </vl-steps>
                </div>
            </vl-side-navigation-layout-next>
        </section>
    `,
);
StepsSideNavigation.storyName = 'vl-steps - side navigation';
