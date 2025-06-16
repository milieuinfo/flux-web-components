import { CATEGORIES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import * as fs from 'fs-extra';
import { FluxMetaDataModel } from '../../apps/storybook/.storybook/flux-meta-data/flux-meta-data.model';
import {
    WTConfig,
    WTConfigArray,
    WTElement,
    WTElementArray,
    WTElementAttribute,
    WTElementEvent,
    WTElementProperty,
    WTElementSlot,
} from './web-types.model';
import { buildWTConfigComponentsAtom } from './wt-config-build/components-atom.wt-config';
import { buildWTConfigComponentsBlock } from './wt-config-build/components-block.wt-config';
import { buildWTConfigComponentsCompliance } from './wt-config-build/components-compliance.wt-config';
import { buildWTConfigComponentsForm } from './wt-config-build/components-form.wt-config';
import { buildWTConfigMap } from './wt-config-build/map.wt-config';
import fluxMetaData from '../../apps/storybook/.storybook/flux-meta-data/flux-meta-data.json';

const templateFileLocation: string = './wt-template/web-types.template';

const docUrl = `https://milieuinfo.github.io/flux-builds/release-v2/$VERSION/storybook/?path=$STORYBOOK-PATH`;

const readTemplateFile = () => fs.readFileSync(templateFileLocation).toString();

const buildDocUrl = (version: string, storyBookPath: string) =>
    docUrl.replace('$VERSION', version).replace('$STORYBOOK-PATH', storyBookPath);

const buildPrefix = (fluxMetaDataModel: FluxMetaDataModel): string => {
    switch (fluxMetaDataModel?.vStatus) {
        case 'replaced':
        case 'v1-replace':
        case 'v1-remove':
            return '<span style="color: rgb(240,0,0)">[legacy-component]</span><br/>';
        case 'v1-todo':
            return '<span style="color: rgb(200,140,0)">[legacy-component]</span><br/>';
        case 'v2':
            return '<span style="color: rgb(25,140,25)">[next-component]</span><br/>';
        default:
            return '';
    }
};

const extractDocFileDescription = (component: string, docFile: string): string => {
    console.log(component + ' - process docFile');
    const lines: string[] = docFile.split(/\n/);
    let firstHashLinePassed = false;
    let fluxMetaDataPassed = false;
    let description = '';
    let prefix = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!firstHashLinePassed && line.startsWith('#')) {
            // de eerste lijn met een # bevat een titel, deze maakt geen deel uit van de omschrijving
            firstHashLinePassed = true;
            continue;
        }
        if (!fluxMetaDataPassed && line.includes('FluxMetaData')) {
            // de <FluxMetaData /> maakt geen deel uit van de omschrijving
            fluxMetaDataPassed = true;
            // de id bepalen
            const componentId = line.split('"')[1];
            prefix = buildPrefix(fluxMetaData[componentId]);
            continue;
        }
        if (firstHashLinePassed && fluxMetaDataPassed) {
            // bij de tweede lijn met een # stopt de omschrijving
            if (line.startsWith('#')) {
                // de witruimte voor- en achteraan verwijderen
                description = prefix + description.trim();
                // de omschrijving is volledig
                break;
            }
            // als we hier zitten de omschrijving uitbreiden
            description += lines[i] + '\n';
        }
    }
    return description;
};

const buildWTElementAttribute = (key: string, argTypes: ArgTypes): WTElementAttribute => {
    const wtElementAttribute: WTElementAttribute = {
        name: argTypes[key].name,
        description: argTypes[key].description,
    };
    if (argTypes[key]?.table?.defaultValue) {
        // de schema validatie faalt als bvb. de boolean waarde false of true als default wordt gezet
        wtElementAttribute.default = String(argTypes[key]?.table?.defaultValue.summary);
    }
    return wtElementAttribute;
};

const buildWTElementSlot = (key: string, argTypes: ArgTypes): WTElementSlot => {
    const wtElementSlot: WTElementSlot = {
        name: argTypes[key].name,
        description: argTypes[key].description,
    };
    if (argTypes[key]?.table?.defaultValue) {
        // de schema validatie faalt als bvb. de boolean waarde false of true als default wordt gezet
        wtElementSlot.default = String(argTypes[key]?.table?.defaultValue.summary);
    }
    return wtElementSlot;
};

const buildWTElementProperty = (key: string, argTypes: ArgTypes): WTElementProperty => {
    const wtElementProperty: WTElementProperty = {
        name: argTypes[key].name,
        description: argTypes[key].description,
    };
    if (argTypes[key]?.table?.type) {
        wtElementProperty.type = argTypes[key]?.table?.type?.summary;
    }
    if (argTypes[key]?.table?.defaultValue) {
        // de schema validatie faalt als bvb. de boolean waarde false of true als default wordt gezet
        wtElementProperty.default = String(argTypes[key]?.table?.defaultValue.summary);
    }
    return wtElementProperty;
};

const buildWTElementEvent = (key: string, argTypes: ArgTypes): WTElementEvent => {
    const wtElementEvent: WTElementEvent = {
        name: argTypes[key].name,
        description: argTypes[key].description,
    };
    if (argTypes[key]?.table?.type) {
        wtElementEvent.type = argTypes[key]?.table?.type?.summary;
    }
    return wtElementEvent;
};

const minimalWTElement = (wtComponent: WTConfig): WTElement => {
    let wtElement: WTElement = {
        name: wtComponent.componentName,
    };
    if (wtComponent?.storiesDocFile) {
        const componentDescription = extractDocFileDescription(
            wtComponent.componentName,
            fs.readFileSync(wtComponent.storiesDocFile).toString()
        );
        if (componentDescription) {
            wtElement.description = componentDescription;
        }
    }
    const docUrl = buildDocUrl('DOMG-WC-VERSION', wtComponent.storybookPath);
    if (docUrl) {
        wtElement['doc-url'] = docUrl;
    }
    return wtElement;
};

const buildWTElement = (wtComponent: WTConfig): WTElement => {
    console.log(wtComponent.componentName + ' - build web-types');
    let wtElement = minimalWTElement(wtComponent);
    if (wtComponent?.argTypes) {
        // add the attributes
        const argTypes = wtComponent.argTypes;
        const wtElementAttributeArray = Object.keys(argTypes)
            .filter((key) => argTypes[key].table?.category === CATEGORIES.ATTRIBUTES)
            .map((key) => buildWTElementAttribute(key, argTypes));
        if (wtElementAttributeArray) {
            wtElement.attributes = wtElementAttributeArray;
        }
        // add the slots
        const wtElementSlotArray = Object.keys(argTypes)
            .filter((key) => argTypes[key].table?.category === CATEGORIES.SLOTS)
            .map((key) => buildWTElementSlot(key, argTypes));
        if (wtElementSlotArray && wtElementSlotArray.length > 0) {
            wtElement.slots = wtElementSlotArray;
        }
        // add the properties
        const wtElementPropertyArray = Object.keys(argTypes)
            .filter((key) => argTypes[key].table?.category === CATEGORIES.PROPERTIES)
            .map((key) => buildWTElementProperty(key, argTypes));
        if (wtElementPropertyArray && wtElementPropertyArray.length > 0) {
            wtElement.js = { ...wtElement.js, properties: wtElementPropertyArray };
        }
        // add the events
        const wtElementEventArray = Object.keys(argTypes)
            .filter((key) => argTypes[key].table?.category === CATEGORIES.EVENTS)
            .map((key) => buildWTElementEvent(key, argTypes));
        if (wtElementEventArray && wtElementEventArray.length > 0) {
            wtElement.js = { ...wtElement.js, events: wtElementEventArray };
        }
    }
    return wtElement;
};

const generateWebTypesFile = (artifact: string, wtComponentList: WTConfigArray, targetFolder: string) => {
    console.log('--------------------------------------------------');
    console.log(artifact + ' - building web-types file');
    console.log('--------------------------------------------------');
    const wtElementList: WTElementArray = wtComponentList.map((wtComponent) => buildWTElement(wtComponent));
    let templateFile = readTemplateFile();
    const fileName = targetFolder + '/' + artifact + '.web-types.json';
    fs.createFileSync(fileName);
    templateFile = templateFile.replace('$ELEMENTS', JSON.stringify(wtElementList, null, 4));
    templateFile = JSON.stringify(JSON.parse(templateFile), null, 4);
    fs.writeFileSync(fileName, templateFile);
    console.log('--------------------------------------------------\n');
};

generateWebTypesFile('atom', buildWTConfigComponentsAtom, '../../libs/components/src/atom');
generateWebTypesFile('block', buildWTConfigComponentsBlock, '../../libs/components/src/block');
generateWebTypesFile('compliance', buildWTConfigComponentsCompliance, '../../libs/components/src/compliance');
generateWebTypesFile('form', buildWTConfigComponentsForm, '../../libs/components/src/form');
generateWebTypesFile('map', buildWTConfigMap, '../../libs/map');
