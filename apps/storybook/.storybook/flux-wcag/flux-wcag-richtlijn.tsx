import React from 'react';

type FluxWcagRichtlijnProps = {
    level: string;
    title: string;
    refDescription: string;
    refQuick: string;
    text: string;
};

export const FluxWcagRichtlijn = ({ level, title, refDescription, refQuick, text }: FluxWcagRichtlijnProps) => (
    <div>
        <h1>{level} {title}</h1>
        <p style={{ fontSize: '18px', marginBottom: '1.5em' }}>{text}</p>
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
