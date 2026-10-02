import { vlPageFluxStyles } from './vl-page.flux-css';

describe('jest - structures - vl-page-flux-css', () => {
    it('heeft een regel voor elk layout-attribuut van vl-page', () => {
        expect(vlPageFluxStyles.cssText).toContain(':host([v-center])');
        expect(vlPageFluxStyles.cssText).toContain(':host([v-stretch])');
    });
});
