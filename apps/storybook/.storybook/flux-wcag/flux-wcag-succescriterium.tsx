import React from 'react';

type FluxWcagSuccesscriteriumProps = {
    title: string;
    text: any;
    level: string;
    refDescription: string;
    refQuick: string;
};

export const FluxWcagSuccesscriterium = ({
    title,
    text,
    level,
    refDescription,
    refQuick,
}: FluxWcagSuccesscriteriumProps) => (
    <div style={{ marginTop: '2em' }}>
        <h3 style={{ textDecoration: 'underline' }}>{title}</h3>
        <p style={{ fontSize: '16px', marginBottom: '1.5em' }}>{text}</p>
        <div style={{ color: 'black' }}>
            <strong>Referenties:</strong>
        </div>
        <ul style={{ marginTop: '4px' }}>
            <li>
                <a target="_blank" href={refDescription}>
                    {level} - WCAG - Nederlandse Beschrijving
                </a>
            </li>
            <li>
                <a target="_blank" href={refQuick}>
                    {level} - WCAG - Quick Reference
                </a>
            </li>
        </ul>
    </div>
);

export const FluxWcagExamplesTitle = () => (
    <div style={{ color: 'black', marginTop: '1.5em', marginBottom: '-0.5em' }}>
        <strong>Voorbeelden:</strong>
    </div>
);

export const FluxWcagExample = ({ exampleNumber, title, link, children }) => (
    <div style={{ marginBottom: '3em' }}>
        <div style={{ fontSize: '14px', marginTop: '1em', marginBottom: '-1.5em' }}>
            vb. {exampleNumber}: <a target="_blank" href={link}>{title}</a>
        </div>
        <div style={{ fontSize: '14px', marginBottom: '-2em' }}>{children}</div>
    </div>
);
