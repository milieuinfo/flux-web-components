import {
    BaseCondition,
    CSSCondition,
    DocumentationCondition,
    GenerationCondition,
    TestCondition,
    WCAGCondition,
} from '../flux-meta-data.model';
import React from 'react';

const colorGreen = '228b22';
const colorOrange = 'dd5500';
const colorRed = 'c80815';
const colorBlue = '4621a5';
const colorPurple = 'c31a7f';
const colorGrey = '767676';

// basis: 'htmlElement' | 'litElement' | 'cssResult';
export const buildBaseCondition = (base: BaseCondition, withLabel: boolean) => {
    const greenSet = new Set<BaseCondition>(['LitElement', 'CSSResult', 'MapAction']);
    if (base === BaseCondition.nvt) {
        return buildImgTag('Base', base, colorGrey, withLabel);
    } else if (base === BaseCondition.htmlElement) {
        return buildImgTag('Base', base, colorOrange, withLabel);
    } else if (greenSet.has(base)) {
        return buildImgTag('Base', base, colorGreen, withLabel);
    } else {
        return buildImgTag('Base', 'TBD', colorRed, withLabel);
    }
};

// generation: 'legacy' | 'v1' | 'v2' | 'v3-next';
export const buildGenerationCondition = (generation: GenerationCondition, withLabel: boolean) => {
    if (generation) {
        const greenSet = new Set<GenerationCondition>(['v1', 'v2', 'v3-next']);
        const generationColor = greenSet.has(generation) ? colorGreen : colorRed;
        return buildImgTag('Generatie', generation, generationColor, withLabel);
    } else {
        return buildImgTag('Generatie', 'TBD', colorRed, withLabel);
    }
};

// css: 'govflanders' | 'Flux' | 'n.v.t';
export const buildCSSCondition = (css: CSSCondition, withLabel: boolean) => {
    if (css === CSSCondition.nvt) {
        return buildImgTag('CSS', css, colorGrey, withLabel);
    } else if (css) {
        const cssSet = new Set<CSSCondition>(['Flux']);
        const generationColor = cssSet.has(css) ? colorGreen : colorRed;
        return buildImgTag('CSS', css, generationColor, withLabel);
    } else {
        return buildImgTag('CSS', 'TBD', colorRed, withLabel);
    }
};

// tests: 'Jest' | 'Cypress Component' | 'Cypress Storybook'; // meerdere mogelijk
export const buildTestsCondition = (tests: TestCondition[], withLabel: boolean) => {
    if (tests) {
        let testsColor = colorRed;
        let testsLogo = 'cypress';
        if (tests.length === 0) {
            return buildImgTag('Testen', 'geen', testsColor, withLabel);
        }
        if (tests.length > 0) {
            if (tests.includes('Component') && !tests.includes('Storybook')) {
                testsColor = colorOrange;
            } else if (tests.includes('Storybook') && !tests.includes('Component')) {
                testsColor = colorOrange;
            } else {
                testsColor = colorGreen;
                if (tests.length === 1 && tests.includes('Jest')) {
                    testsLogo = 'jest';
                }
            }
        }
        return buildImgTag('Testen', tests.join(' / '), testsColor, withLabel, testsLogo);
    } else {
        return buildImgTag('Testen', 'TBD', colorRed, withLabel);
    }
};

// storybookDoc: 'auto' | 'minimaal' | 'basis' | 'uitmuntend';
export const buildDocumentationCondition = (documentation: DocumentationCondition, withLabel: boolean) => {
    if (documentation === DocumentationCondition.nvt) {
        return buildImgTag('Documentatie', documentation, colorGrey, withLabel, 'storybook');
    } else if (documentation) {
        const orangeSet = new Set<DocumentationCondition>(['minimaal', 'template']);
        const greenSet = new Set<DocumentationCondition>(['basis', 'uitgebreid']);
        const storyBookDocColor = greenSet.has(documentation)
            ? colorGreen
            : orangeSet.has(documentation)
            ? colorOrange
            : colorRed;
        return buildImgTag('Documentatie', documentation, storyBookDocColor, withLabel, 'storybook');
    } else {
        return buildImgTag('Documentatie', 'TBD', colorRed, withLabel);
    }
};

// wcag: 'n.v.t.' | 'reviewed' | 'TODO' | 'FLUX-726'; ontbrekend of onbekend toont 'TBD'
export const buildWCAGCondition = (wcag: WCAGCondition, withLabel: boolean) => {
    if (wcag === 'n.v.t.') {
        return buildImgTag('WCAG', 'n.v.t.', colorGrey, withLabel);
    } else if (wcag === 'reviewed') {
        return buildImgTag('WCAG', 'reviewed', colorGreen, withLabel);
    } else if (wcag === 'TODO') {
        return buildImgTag('WCAG', 'TODO', colorBlue, withLabel);
    } else if (wcag?.startsWith('FLUX-')) {
        return buildImgTag('WCAG', wcag, colorOrange, withLabel);
    } else {
        return buildImgTag('WCAG', 'TBD', colorRed, withLabel);
    }
};

// jiraMeta: string; // link naar de Jira Meta pagina
export const buildJiraMetaCondition = (jiraMeta: string, withLabel: boolean) => {
    if (jiraMeta) {
        if (jiraMeta.startsWith('FLUX-')) {
            const href = 'https://jira.omgeving.vlaanderen.be/jira/browse/' + jiraMeta;
            return (
                <a href={href} target="_blank" className="flux-condition--no-focus">
                    {buildImgTag('Meta', jiraMeta, colorPurple, withLabel, 'jira')}
                </a>
            );
        } else {
            return <>{buildImgTag('Meta', jiraMeta, colorGrey, withLabel, 'jira')}</>;
        }
    } else {
        return buildImgTag('Meta', 'TBD', colorRed, withLabel);
    }
};

const buildImgTag = (label: string, value: string, color: string, withLabel: boolean, logo?: string) => {
    const alt = label + ': ' + value;
    const src = 'https://img.shields.io/badge/' + buildScrSnippet(label, value, color, withLabel, logo);
    return <img alt={alt} src={src} />;
};

const buildScrSnippet = (label: string, value: string, color: string, withLabel?: boolean, logo?: string) => {
    // shields.io leest een enkele '-' als scheiding tussen label en waarde: elke '-' in de waarde moet verdubbeld
    let scrSnippet = `${encodeURIComponent(value.replace(/-/g, '--'))}%20-%20%23${color}?style=flat`;
    if (withLabel) {
        scrSnippet = `${label}%20-%20` + scrSnippet + '&labelColor=%23363636';
        if (logo) {
            scrSnippet += `&logo=${logo}`;
        }
    }
    return scrSnippet;
};
