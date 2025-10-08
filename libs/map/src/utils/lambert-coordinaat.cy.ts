import LambertCoordinaat from './lambert-coordinaat';

describe('cypress-component - map - lambert-coördinaat', () => {
    const expectLambertCoordinaat = (lambertCoordinaat, expectedX, expectedY) => {
        expect(lambertCoordinaat).not.to.be.undefined;
        expect(lambertCoordinaat.x).to.be.equal(expectedX);
        expect(lambertCoordinaat.y).to.be.equal(expectedY);
        expect(lambertCoordinaat.toString()).to.be.equal(`${expectedX}, ${expectedY}`);
    };

    it('een Lambert-coördinaat o.b.v. een vrije tekst, geeft "undefined"', () => {
        expect(LambertCoordinaat.of('test')).to.be.undefined;
        expect(LambertCoordinaat.of('Gent')).to.be.undefined;
    });

    it('een Lambert-coördinaat o.b.v. "null", geeft "undefined"', () => {
        expect(LambertCoordinaat.of(null)).to.be.undefined;
    });

    it('een Lambert-coördinaat o.b.v. "undefined", geeft "undefined"', () => {
        expect(LambertCoordinaat.of(undefined)).to.be.undefined;
    });

    it('een Lambert-coördinaat o.b.v. een lege string, geeft "undefined"', () => {
        expect(LambertCoordinaat.of('')).to.be.undefined;
    });

    it('een Lambert-coördinaat o.b.v. een spatie, geeft "undefined"', () => {
        expect(LambertCoordinaat.of(' ')).to.be.undefined;
    });

    it('een Lambert-coördinaat o.b.v. een geldige coördinaat, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27, 192387.25');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een geldige coördinaat met gehele getallen, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('123456, 34523');
        expectLambertCoordinaat(lambertCoordinaat, 123456, 34523);
    });

    it('een Lambert-coördinaat o.b.v. een geldige coördinaat met haakjes en gescheiden door een puntkomma, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('(123456.78; 345232.04)');
        expectLambertCoordinaat(lambertCoordinaat, 123456.78, 345232.04);
    });

    it('een Lambert-coördinaat o.b.v. een x-coördinaat zonder decimaal getal, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719, 192387.25');
        expectLambertCoordinaat(lambertCoordinaat, 104719, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een x en y-coördinaat zonder decimaal getal, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719, 192387');
        expectLambertCoordinaat(lambertCoordinaat, 104719, 192387);
    });

    it('een Lambert-coördinaat o.b.v. een y-coördinaat zonder decimaal getal, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27, 192387');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met gehele getallen, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104, 19');
        expectLambertCoordinaat(lambertCoordinaat, 104, 19);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat gescheiden door een punt komma, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27; 192387.25');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat gescheiden door een komma, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27, 192387.25');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met haakjes, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('(104719.27; 192387.25)');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met enkel een starthaakje, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('(104719.27; 192387.25');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met enkel een eindhaakje, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27; 192387.25)');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met spaties ervoor, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('     104719.27; 192387.25)');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat zonder spatie na het scheidingsteken, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('     104719.27;192387.25)');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met meerdere spaties na het scheidingsteken, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27;     192387.25)');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met 3 cijfers na de komma, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.271, 192387.252');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat o.b.v. een coördinaat met 5 cijfers na de komma, geeft een LambertCoordinaat', () => {
        const lambertCoordinaat = LambertCoordinaat.of('104719.27123, 192387.25456');
        expectLambertCoordinaat(lambertCoordinaat, 104719.27, 192387.25);
    });

    it('een Lambert-coördinaat, is een geldige LambertCoordinaat', () => {
        const value = LambertCoordinaat.of('104719.27, 192387.25');
        expect(LambertCoordinaat.isLambertCoordinaat(value)).to.be.true;
    });

    it('"null", is geen geldige LambertCoordinaat', () => {
        expect(LambertCoordinaat.isLambertCoordinaat(null)).to.be.false;
    });

    it('"undefined", is geen geldige LambertCoordinaat', () => {
        expect(LambertCoordinaat.isLambertCoordinaat(undefined)).to.be.false;
    });

    it('een lege string, is geen geldige LambertCoordinaat', () => {
        expect(LambertCoordinaat.isLambertCoordinaat('')).to.be.false;
    });
});
