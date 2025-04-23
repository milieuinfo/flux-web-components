export const stepsNextHtml = (importType, packageName) => `
    <div id="consumer-components">
        <vl-title type="h2">Steps Next - ${importType} - ${packageName}</vl-title>
        <vl-steps>
            <vl-step type="success">
                <span slot="icon">1</span>
                <span slot="title">Stap 1: eerste actie</span>
                <span slot="subtitle">Dit is de eerste subtitel.</span>
                <span slot="content">Dit is de eerste stap content.</span>
            </vl-step>
            <vl-step type="warning">
                <span slot="icon">2</span>
                <span slot="title">Stap 2: tweede actie</span>
                <span slot="subtitle">Dit is de tweede subtitel.</span>
                <span slot="content">Dit is de tweede stap content.</span>
            </vl-step>
            <vl-step type="error">
                <span slot="icon">3</span>
                <span slot="title">Stap 3: derde actie</span>
                <span slot="subtitle">Dit is de derde subtitel.</span>
                <span slot="content">Dit is de derde stap content.</span>
            </vl-step>
        </vl-steps>
    </div>
`;
