import React from 'react';
import { FluxWcagRichtlijn } from './flux-wcag-richtlijn';

type FluxWcagPrincipeProps = {
    level: string;
    title: string;
    refDescription: string;
    refQuick: string;
    text: string;
};

export const FluxWcagPrincipe = ({ level, title, refDescription, refQuick, text }: FluxWcagPrincipeProps) => (
    <>
        <>{FluxWcagRichtlijn({ level, title, refDescription, refQuick, text })}</>
        <h2 style={{ marginTop: '1.5em', marginBottom: '1em' }}>Richtlijnen met hun succescriteria</h2>
    </>
);
