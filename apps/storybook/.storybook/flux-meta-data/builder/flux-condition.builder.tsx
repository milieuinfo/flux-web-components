import {
    BaseCondition,
    CSSCondition,
    DocumentationCondition,
    DVCondition,
    DVStatus,
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
        return buildMinWidthImgTag('Documentatie', documentation, colorGrey, withLabel, 'storybook');
    } else if (documentation) {
        const orangeSet = new Set<DocumentationCondition>(['minimaal', 'template']);
        const greenSet = new Set<DocumentationCondition>(['basis', 'uitgebreid']);
        const storyBookDocColor = greenSet.has(documentation)
            ? colorGreen
            : orangeSet.has(documentation)
            ? colorOrange
            : colorRed;
        return buildMinWidthImgTag('Documentatie', documentation, storyBookDocColor, withLabel, 'storybook');
    } else {
        return buildMinWidthImgTag('Documentatie', 'TBD', colorRed, withLabel);
    }
};

// wcag: 'n.v.t.' | 'reviewed' | 'TODO' | 'FLUX-726'; ontbrekend of onbekend toont 'TBD'
export const buildWCAGCondition = (wcag: WCAGCondition, withLabel: boolean) => {
    if (wcag === 'n.v.t.') {
        return buildMinWidthImgTag('WCAG', 'n.v.t.', colorGrey, withLabel);
    } else if (wcag === 'reviewed') {
        return buildMinWidthImgTag('WCAG', 'reviewed', colorGreen, withLabel);
    } else if (wcag === 'TODO') {
        return buildMinWidthImgTag('WCAG', 'TODO', colorBlue, withLabel);
    } else if (wcag?.startsWith('FLUX-')) {
        return buildMinWidthImgTag('WCAG', wcag, colorOrange, withLabel);
    } else {
        return buildMinWidthImgTag('WCAG', 'TBD', colorRed, withLabel);
    }
};

// jiraMeta: string; // link naar de Jira Meta pagina
export const buildJiraMetaCondition = (jiraMeta: string, withLabel: boolean) => {
    if (jiraMeta) {
        if (jiraMeta.startsWith('FLUX-')) {
            const href = 'https://jira.omgeving.vlaanderen.be/jira/browse/' + jiraMeta;
            return (
                <a href={href} target="_blank" className="flux-condition--no-focus">
                    {buildMinWidthImgTag('Meta', jiraMeta, colorPurple, withLabel, 'jira')}
                </a>
            );
        } else {
            return buildMinWidthImgTag('Meta', jiraMeta, colorGrey, withLabel, 'jira');
        }
    } else {
        return buildMinWidthImgTag('Meta', 'TBD', colorRed, withLabel);
    }
};

// dv: { idea: 'DS-135', name: 'Button', status: 'Gepubliceerd' }, getoond in kleine letters en 'Gepubliceerd' als '✓ klaar'; zonder 1-op-1 koppeling met een DV component blijft de cel leeg
export const buildDVCondition = (dv: DVCondition, withLabel: boolean) => {
    if (dv?.idea) {
        const greenSet = new Set<DVStatus>(['Gepubliceerd']);
        const blueSet = new Set<DVStatus>(['Klaar voor delivery', 'Productie']);
        const orangeSet = new Set<DVStatus>(['Discovery', 'Ontwerpen', 'Spec']);
        const dvColor = greenSet.has(dv.status)
            ? colorGreen
            : blueSet.has(dv.status)
            ? colorBlue
            : orangeSet.has(dv.status)
            ? colorOrange
            : colorGrey;
        const dvValue = dv.status === 'Gepubliceerd' ? '✓ klaar' : dv.status?.toLowerCase() || 'TBD';
        const href = 'https://vlaamseoverheid.atlassian.net/browse/' + dv.idea;
        // de naam bij DV als tooltip, want die verschilt soms van de Flux naam
        const title = dv.name + ' (' + dv.idea + ')';
        return (
            <a href={href} target="_blank" title={title} className="flux-condition--no-focus">
                {buildMinWidthImgTag('DV', dvValue, dvColor, withLabel, 'jira')}
            </a>
        );
    } else {
        return null;
    }
};

// shields.io maakt een badge zo breed als zijn tekst: deze wrapper in dezelfde kleur geeft hem in het overzicht een minimumbreedte (zie styles.css)
const buildMinWidthImgTag = (label: string, value: string, color: string, withLabel: boolean, logo?: string) => (
    <span className="flux-condition__badge" style={{ backgroundColor: '#' + color }}>
        {buildImgTag(label, value, color, withLabel, logo)}
    </span>
);

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
