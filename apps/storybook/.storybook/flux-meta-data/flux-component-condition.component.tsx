import React from 'react';
import { fluxAllMetaData } from './flux-meta-data.data';
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

export const FluxComponentCondition = ({ id }) => {
    const fluxMetaDataComponent = fluxAllMetaData()[id] as FluxMetaDataComponent;
    const componentCondition = fluxMetaDataComponent?.condition;
    return (
        <div className="flux-component-condition--margin-bottom">
            {buildBaseCondition(componentCondition?.base, true)}
            &nbsp;
            {buildGenerationCondition(componentCondition?.generation, true)}
            &nbsp;
            {buildCSSCondition(componentCondition?.css, true)}
            &nbsp;
            {buildTestsCondition(componentCondition?.tests, true)}
            &nbsp;
            {buildDocumentationCondition(componentCondition?.documentation, true)}
            &nbsp;
            {buildWCAGLevelCondition(componentCondition?.wcagLevel, true)}
            &nbsp;
            {buildJiraMetaCondition(componentCondition?.jiraMeta, true)}
        </div>
    );
};
