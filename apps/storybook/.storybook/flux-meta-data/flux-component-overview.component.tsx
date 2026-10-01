import React, { useRef, useState } from 'react';
import { DVCondition, DVStatus, dvIdeas, FluxMetaDataComponent } from './flux-meta-data.model';
import {
    buildBaseCondition,
    buildCSSCondition,
    buildDocumentationCondition,
    buildDVCondition,
    buildGenerationCondition,
    buildJiraMetaCondition,
    buildTestsCondition,
    buildWCAGCondition,
} from './builder/flux-condition.builder';
import {
    componentsAtomMetaData,
    componentsBlockMetaData,
    componentsComplianceMetaData,
    componentsFormMetaData,
    dvComponentsWithoutFlux,
    mapActionsMetaData,
    mapComponentsMetaData,
    stylesMetaData,
} from './flux-meta-data.data';

const sections = [
    { title: 'Styles', metaData: stylesMetaData() },
    { title: 'Atom - components', metaData: componentsAtomMetaData() },
    { title: 'Block - components', metaData: componentsBlockMetaData() },
    { title: 'Compliance - components', metaData: componentsComplianceMetaData() },
    { title: 'Form - components', metaData: componentsFormMetaData() },
    { title: 'Map - actions', metaData: mapActionsMetaData() },
    { title: 'Map - components', metaData: mapComponentsMetaData() },
];

const componentsOf = (metaData: object) =>
    (Object.entries(metaData) as [string, FluxMetaDataComponent][]).filter(([key, item]) => !!item.name);

type Component = [string, FluxMetaDataComponent];

type DVMapping = { dv: DVCondition; components: FluxMetaDataComponent[] };

// per DV component de Flux componenten die erbij horen
const dvMappings = new Map<string, DVMapping>();
sections.forEach(({ metaData }) =>
    componentsOf(metaData).forEach(([key, item]) =>
        dvIdeas(item.condition?.dv).forEach((dv) => {
            const mapping = dvMappings.get(dv.idea) ?? { dv, components: [] };
            mapping.components.push(item);
            dvMappings.set(dv.idea, mapping);
        }),
    ),
);

// 1-op-1: het Flux component hoort bij 1 DV component en dat DV component bij geen ander Flux component;
// enkel dan staat de DV Status in het overzicht, anders is niet duidelijk welk DV component bedoeld is
const oneToOneDV = (item: FluxMetaDataComponent) => {
    const ideas = dvIdeas(item.condition?.dv);
    return ideas.length === 1 && dvMappings.get(ideas[0].idea).components.length === 1 ? ideas[0] : undefined;
};

const hasDVStatus = ([key, item]: Component) => !!oneToOneDV(item);

// 'klaar' is hoe het overzicht de DV status 'Gepubliceerd' toont
const isDVKlaar = (dv: DVCondition) => dv?.status === DVStatus.gepubliceerd;

const countOf = (filter: (component: Component) => boolean) =>
    sections.reduce((count, { metaData }) => count + componentsOf(metaData).filter(filter).length, 0);

// een naam is herkenbaar als de ene in de andere zit, zonder hoofdletters en leestekens: 'Radio' in 'radio-group', 'alert' in 'Message / alert'
const isRecognizableName = (dvName: string, fluxName: string) => {
    const dv = dvName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const flux = fluxName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return dv.includes(flux) || flux.includes(dv);
};

// onderaan staan de koppelingen die niet 1-op-1 zijn, en de 1-op-1 koppelingen waarvan de naam bij DV niet herkenbaar is
// in de Flux naam (bv. 'Divider' en 'layout - separator'); alfabetisch op de naam bij DV
const unclearDVMappings = [...dvMappings.values()]
    .filter(({ dv, components }) => !oneToOneDV(components[0]) || !isRecognizableName(dv.name, components[0].name))
    .sort((a, b) => a.dv.name.localeCompare(b.dv.name, 'nl'));

const sortedDVComponentsWithoutFlux = [...dvComponentsWithoutFlux()].sort((a, b) => a.name.localeCompare(b.name, 'nl'));

// breedte van elke kolom in procent van de tabel, zoals de browser ze voor de getoonde componenten berekent
const measureColumnWidths = (table: HTMLTableElement) => {
    const tableWidth = table.getBoundingClientRect().width;
    const cells = table.querySelector('.flux-component-overview__row--first')?.children ?? [];
    return [...cells].map((cell) => (cell.getBoundingClientRect().width / tableWidth) * 100 + '%');
};

export const FluxComponentOverview = () => {
    const [onlyDVStatus, setOnlyDVStatus] = useState(false);
    const [onlyDVKlaar, setOnlyDVKlaar] = useState(false);
    // de kolombreedtes van de volledige lijst blijven vast zolang er gefilterd wordt, anders verspringen de kolommen;
    // gemeten bij het aanzetten van de eerste filter en niet bij het laden, want dan zijn de badges nog niet binnen
    const [columnWidths, setColumnWidths] = useState<string[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);

    const changeFilter = (setFilter: (checked: boolean) => void, checked: boolean, otherFilter: boolean) => {
        if (!checked && !otherFilter) {
            setColumnWidths([]);
        } else if (!columnWidths.length) {
            setColumnWidths(measureColumnWidths(tableRef.current));
        }
        setFilter(checked);
    };

    return (
        <>
            <div className="flux-component-overview__filters">
                <label className="flux-component-overview__filter">
                    <input
                        type="checkbox"
                        checked={onlyDVStatus}
                        onChange={(event) => changeFilter(setOnlyDVStatus, event.target.checked, onlyDVKlaar)}
                    />
                    enkel componenten met een DV Status ({countOf(hasDVStatus)})
                </label>
                <label className="flux-component-overview__filter">
                    <input
                        type="checkbox"
                        checked={onlyDVKlaar}
                        onChange={(event) => changeFilter(setOnlyDVKlaar, event.target.checked, onlyDVStatus)}
                    />
                    {`enkel DV componenten die 'klaar' zijn (${countOf(([key, item]) => isDVKlaar(oneToOneDV(item)))})`}
                </label>
            </div>
            {/* 1 tabel met een tbody per sectie: zo is elke kolom in alle secties even breed */}
            <table ref={tableRef} style={{ width: 100 + '%' }} className="flux-component-overview__table">
                {columnWidths.length > 0 && (
                    <colgroup>
                        {columnWidths.map((width, index) => (
                            <col key={index} style={{ width }} />
                        ))}
                    </colgroup>
                )}
                {sections.map(({ title, metaData }) => {
                    // de filters werken samen; een sectie zonder overblijvende componenten verdwijnt volledig
                    const components = componentsOf(metaData).filter(
                        (component) =>
                            (!onlyDVStatus || hasDVStatus(component)) &&
                            (!onlyDVKlaar || isDVKlaar(oneToOneDV(component[1]))),
                    );
                    return components.length ? (
                        <tbody key={title}>
                            <tr className="flux-component-overview__section">
                                <td colSpan={7}>
                                    <h2>{title}</h2>
                                </td>
                            </tr>
                            {buildTableHeaders()}
                            {components.map(([key, item]) => buildTableRow(key, item))}
                        </tbody>
                    ) : null;
                })}
            </table>
            {/* de blokken met DV componenten blijven staan als er gefilterd wordt; enkel de filter op 'klaar' geldt ook daar */}
            {buildDVMappings(onlyDVKlaar)}
            {buildDVComponentsWithoutFlux(onlyDVKlaar)}
        </>
    );
};

const buildDVMappings = (onlyDVKlaar: boolean) => (
    <>
        <h2 className="flux-component-overview__dv-title">Koppeling met Digitaal Vlaanderen</h2>
        <p>
            Voor deze componenten blijkt uit de naam niet eenduidig om welk DV component het gaat: de naam verschilt,
            een DV component hoort bij meerdere Flux componenten, of een Flux component bij meerdere DV componenten.
            Enkel bij een 1-op-1 koppeling staat de DV Status ook in het overzicht hierboven.
        </p>
        <table
            style={{ width: 100 + '%' }}
            className="flux-component-overview__table flux-component-overview__dv-table"
        >
            <thead>
                <tr>
                    <th>Component bij DV</th>
                    <th>Component(en) bij Flux</th>
                    <th>DV Status</th>
                </tr>
            </thead>
            <tbody>
                {unclearDVMappings
                    .filter(({ dv }) => !onlyDVKlaar || isDVKlaar(dv))
                    .map(({ dv, components }) => (
                        <tr key={dv.idea}>
                            <td>{dv.name}</td>
                            <td>
                                {components.map((component, index) => (
                                    <React.Fragment key={component.name}>
                                        {index > 0 && ', '}
                                        {buildStorybookName(component.name, component.docs)}
                                    </React.Fragment>
                                ))}
                            </td>
                            <td style={conditionCellStyle}>{buildDVCondition(dv, false)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </>
);

const buildDVComponentsWithoutFlux = (onlyDVKlaar: boolean) => (
    <>
        <h2 className="flux-component-overview__dv-title">DV componenten zonder tegenhanger bij Flux</h2>
        <p>Voor deze DV componenten heeft Flux (nog) geen component.</p>
        <table
            style={{ width: 100 + '%' }}
            className="flux-component-overview__table flux-component-overview__dv-table"
        >
            <thead>
                <tr>
                    <th>Component bij DV</th>
                    <th>DV Status</th>
                </tr>
            </thead>
            <tbody>
                {sortedDVComponentsWithoutFlux
                    .filter((dv) => !onlyDVKlaar || isDVKlaar(dv))
                    .map((dv) => (
                        <tr key={dv.idea}>
                            <td>{dv.name}</td>
                            <td style={conditionCellStyle}>{buildDVCondition(dv, false)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </>
);

// per component 2 lijnen: DV Status staat onder Documentatie en WCAG onder META, de rest van de tweede lijn blijft leeg
const buildTableHeaders = () => (
    <>
        <tr className="flux-component-overview__header">
            <th rowSpan={2} className="flux-component-overview__name"></th>
            <th>Base</th>
            <th>Generatie</th>
            <th>CSS</th>
            <th>Testen</th>
            <th>Documentatie</th>
            <th>META</th>
        </tr>
        <tr className="flux-component-overview__header flux-component-overview__header--second">
            <td colSpan={4}></td>
            <th>DV Status</th>
            <th>WCAG</th>
        </tr>
    </>
);

const conditionCellStyle = { position: 'relative', top: '4px', textAlign: 'center', verticalAlign: 'middle' } as const;

const buildTableRow = (componentId: string, componentMetaData: FluxMetaDataComponent) => {
    return (
        <React.Fragment key={componentId}>
            <tr className="flux-component-overview__row--first">
                <td
                    rowSpan={2}
                    className="flux-component-overview__name"
                    style={{ fontWeight: 'bold', verticalAlign: 'middle' }}
                >
                    {buildStorybookName(componentMetaData?.name, componentMetaData?.docs)}
                </td>
                <td style={conditionCellStyle}>{buildBaseCondition(componentMetaData?.condition?.base, false)}</td>
                <td style={conditionCellStyle}>
                    {buildGenerationCondition(componentMetaData?.condition?.generation, false)}
                </td>
                <td style={conditionCellStyle}>{buildCSSCondition(componentMetaData?.condition?.css, false)}</td>
                <td style={conditionCellStyle}>{buildTestsCondition(componentMetaData?.condition?.tests, false)}</td>
                <td style={conditionCellStyle}>
                    {buildDocumentationCondition(componentMetaData?.condition?.documentation, false)}
                </td>
                <td style={conditionCellStyle}>
                    {buildJiraMetaCondition(componentMetaData?.condition?.jiraMeta, false)}
                </td>
            </tr>
            <tr className="flux-component-overview__row--second">
                <td colSpan={4}></td>
                <td style={conditionCellStyle}>{buildDVCondition(oneToOneDV(componentMetaData), false)}</td>
                <td style={conditionCellStyle}>{buildWCAGCondition(componentMetaData?.condition?.wcag, false)}</td>
            </tr>
        </React.Fragment>
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
    return `/?path=/docs/${docsRef}`;
};
