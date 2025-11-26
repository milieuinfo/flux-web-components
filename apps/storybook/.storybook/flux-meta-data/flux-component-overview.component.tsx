import React from 'react';
import { FluxMetaDataComponent } from './flux-meta-data.model';
import {
    buildBaseCondition,
    buildCSSCondition,
    buildDocumentationCondition,
    buildGenerationCondition,
    buildJiraMetaCondition,
    buildTestsCondition,
    buildWCAGLevelCondition,
} from './builder/flux-condition.builder';
import {
    componentsAtomMetaData,
    componentsBlockMetaData,
    componentsComplianceMetaData,
    componentsFormMetaData,
    mapActionsMetaData,
    mapComponentsMetaData,
    stylesMetaData,
} from './flux-meta-data.data';

export const FluxComponentOverview = ({ id }) => {
    return (
        <>
            <h2>Styles</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(stylesMetaData())}</tbody>
            </table>
            <br />
            <h2>Atom - components</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(componentsAtomMetaData())}</tbody>
            </table>
            <br />
            <h2>Block - components</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(componentsBlockMetaData())}</tbody>
            </table>
            <br />
            <h2>Compliance - components</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(componentsComplianceMetaData())}</tbody>
            </table>
            <br />
            <h2>Form - components</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(componentsFormMetaData())}</tbody>
            </table>
            <br />
            <h2>Map - actions</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(mapActionsMetaData())}</tbody>
            </table>
            <h2>Map - components</h2>
            <table style={{ width: 100 + '%' }} className="flux-component-overview__table">
                <thead>{buildTableHeaders()}</thead>
                <tbody>{buildTableBody(mapComponentsMetaData())}</tbody>
            </table>
        </>
    );
};

const buildTableHeaders = () => (
    <tr>
        <th></th>
        <th>Base</th>
        <th>Generatie</th>
        <th>CSS</th>
        <th>Testen</th>
        <th>Documentatie</th>
        <th>WCAG</th>
        <th>META</th>
    </tr>
);

const buildTableBody = (fluxMetaData) =>
    (Object.entries(fluxMetaData) as [string, FluxMetaDataComponent][])
        .filter(([key, item]) => !!item.name)
        .map(([key, item]) => buildTableRow(key as string, item as FluxMetaDataComponent));

const buildTableRow = (componentId: string, componentMetaData: FluxMetaDataComponent) => {
    return (
        <tr key={componentId}>
            <td style={{ fontWeight: 'bold', verticalAlign: 'middle' }}>
                {buildStorybookName(componentMetaData?.name, componentMetaData?.docs)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildBaseCondition(componentMetaData?.condition?.base, false)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildGenerationCondition(componentMetaData?.condition?.generation, false)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildCSSCondition(componentMetaData?.condition?.css, false)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildTestsCondition(componentMetaData?.condition?.tests, false)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildDocumentationCondition(componentMetaData?.condition?.documentation, false)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildWCAGLevelCondition(componentMetaData?.condition?.wcagLevel, false)}
            </td>
            <td style={{ position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                {buildJiraMetaCondition(componentMetaData?.condition?.jiraMeta, false)}
            </td>
        </tr>
    );
};

const buildStorybookName = (name: string, docs: string) => {
    if (docs) {
        return (
            <a href={buildStorybookLink(docs)} className="flux-condition--no-focus">
                {name}
            </a>
        );
    } else {
        return name;
    }
};

const buildStorybookLink = (docsRef: string) => {
    return `..?path=/docs/${docsRef}`;
};
