import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlSideNavigationComponent } from './vl-side-navigation.component';
import { VlTitleComponent } from '../../../atom/title';

registerWebComponents([VlSideNavigationComponent, VlTitleComponent]);

// Global results storage for report generation
const benchmarkResults: Record<string, Record<string, number>> = {};

// Generate test content with varying complexity
// Each section creates ~10 DOM nodes (section, title, 3x p with text nodes)
const generateContent = (headingCount: number) => {
    const sections = [];
    for (let i = 0; i < headingCount; i++) {
        sections.push(html`
            <section style="min-height: 100px;">
                <vl-title type="h2" id="heading-${i}">Heading ${i}</vl-title>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </section>
        `);
    }
    return html`<div id="benchmark-content">${sections}</div>`;
};

describe('vl-side-navigation-next - Performance Benchmarks', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
    });

    const scenarios = [
        { name: 'Small', count: 10, nodes: 100 },
        { name: 'Medium', count: 50, nodes: 500 },
        { name: 'Large', count: 100, nodes: 1000 },
        { name: 'XLarge', count: 500, nodes: 5000 },
        { name: 'XXLarge', count: 1000, nodes: 10000 },
    ];

    scenarios.forEach(({ name, count, nodes }) => {
        describe(`${name} (${count} headings, ~${nodes} nodes)`, () => {
            it('should benchmark with full shadow DOM scan', () => {
                const startTime = performance.now();

                cy.mount(html`
                    <div class="vl-grid">
                        <vl-side-navigation-next
                            class="vl-column vl-column--4"
                            heading-root-selector="#benchmark-content"
                        ></vl-side-navigation-next>
                        <div class="vl-column vl-column--8">${generateContent(count)}</div>
                    </div>
                `);

                cy.get('vl-side-navigation-next')
                    .should('exist')
                    .then(() => {
                        const endTime = performance.now();
                        const duration = endTime - startTime;
                        cy.log(`Full scan (${count} headings, ~${nodes} nodes): ${duration.toFixed(2)}ms`);

                        // Store result for report
                        const scenarioKey = `${name} (${count} headings, ~${nodes} nodes)`;
                        if (!benchmarkResults[scenarioKey]) benchmarkResults[scenarioKey] = {};
                        benchmarkResults[scenarioKey]['Full Scan'] = duration;

                        // Assert reasonable performance (5ms per heading max + 50ms overhead)
                        expect(duration).to.be.lessThan(count * 5 + 50);
                    });
            });

            it('should benchmark with max-depth=0', () => {
                const startTime = performance.now();

                cy.mount(html`
                    <div class="vl-grid">
                        <vl-side-navigation-next
                            class="vl-column vl-column--4"
                            max-depth="0"
                            heading-root-selector="#benchmark-content"
                        ></vl-side-navigation-next>
                        <div class="vl-column vl-column--8">${generateContent(count)}</div>
                    </div>
                `);

                cy.get('vl-side-navigation-next')
                    .should('exist')
                    .then(() => {
                        const endTime = performance.now();
                        const duration = endTime - startTime;
                        cy.log(`Max depth 0 (${count} headings, ~${nodes} nodes): ${duration.toFixed(2)}ms`);

                        // Store result for report
                        const scenarioKey = `${name} (${count} headings, ~${nodes} nodes)`;
                        if (!benchmarkResults[scenarioKey]) benchmarkResults[scenarioKey] = {};
                        benchmarkResults[scenarioKey]['Max Depth 0'] = duration;

                        // Light DOM only: will be fast (2ms per heading max + 50ms overhead)
                        expect(duration).to.be.lessThan(count * 2 + 50);
                    });
            });

            it('should benchmark with max-depth=1', () => {
                const startTime = performance.now();

                cy.mount(html`
                    <div class="vl-grid">
                        <vl-side-navigation-next
                            class="vl-column vl-column--4"
                            max-depth="1"
                            heading-root-selector="#benchmark-content"
                        ></vl-side-navigation-next>
                        <div class="vl-column vl-column--8">${generateContent(count)}</div>
                    </div>
                `);

                cy.get('vl-side-navigation-next')
                    .should('exist')
                    .then(() => {
                        const endTime = performance.now();
                        const duration = endTime - startTime;
                        cy.log(`Max depth 1 (${count} headings, ~${nodes} nodes): ${duration.toFixed(2)}ms`);

                        // Store result for report
                        const scenarioKey = `${name} (${count} headings, ~${nodes} nodes)`;
                        if (!benchmarkResults[scenarioKey]) benchmarkResults[scenarioKey] = {};
                        benchmarkResults[scenarioKey]['Max Depth 1'] = duration;

                        // Should be between max-depth=0 and full scan (3ms per heading max + 50ms overhead)
                        expect(duration).to.be.lessThan(count * 3 + 50);
                    });
            });
        });
    });

    it('should compare all methods side-by-side (100 headings)', () => {
        const headingCount = 100;
        const content = generateContent(headingCount);
        const results: Record<string, number> = {};

        // Test 1: Full scan
        cy.mount(
            html`
                <div class="vl-grid">
                    <vl-side-navigation-next
                        class="vl-column vl-column--4"
                        heading-root-selector="#benchmark-content"
                    ></vl-side-navigation-next>
                    <div class="vl-column vl-column--8">${content}</div>
                </div>
            `
        ).then(() => {
            cy.wait(100);
            cy.window().then((win) => {
                const start = win.performance.now();
                cy.get('vl-side-navigation-next')
                    .then((el) => {
                        (el[0] as any).refreshTableOfContents();
                    })
                    .wait(50)
                    .then(() => {
                        const end = win.performance.now();
                        results['Full Scan'] = end - start;
                        cy.log(`Full Scan: ${results['Full Scan'].toFixed(2)}ms`);
                    });
            });
        });

        // Test 2: Max depth 0
        cy.mount(
            html`
                <div class="vl-grid">
                    <vl-side-navigation-next
                        class="vl-column vl-column--4"
                        max-depth="0"
                        heading-root-selector="#benchmark-content"
                    ></vl-side-navigation-next>
                    <div class="vl-column vl-column--8">${content}</div>
                </div>
            `
        ).then(() => {
            cy.wait(100);
            cy.window().then((win) => {
                const start = win.performance.now();
                cy.get('vl-side-navigation-next')
                    .then((el) => {
                        (el[0] as any).refreshTableOfContents();
                    })
                    .wait(50)
                    .then(() => {
                        const end = win.performance.now();
                        results['Max Depth 0'] = end - start;
                        cy.log(`Max Depth 0: ${results['Max Depth 0'].toFixed(2)}ms`);

                        // Log comparison
                        cy.log('=== Performance Comparison ===');
                        Object.entries(results).forEach(([method, duration]) => {
                            cy.log(`${method}: ${duration.toFixed(2)}ms`);
                        });

                        // Calculate speedup
                        if (results['Full Scan'] && results['Max Depth 0']) {
                            const speedup = results['Full Scan'] / results['Max Depth 0'];
                            cy.log(`Max Depth 0 is ${speedup.toFixed(1)}x faster than Full Scan`);
                        }
                    });
            });
        });
    });

    it('should measure repeated scans (caching test)', () => {
        const headingCount = 100;
        const iterations = 5;
        const timings: number[] = [];

        cy.mount(html`
            <div class="vl-grid">
                <vl-side-navigation-next
                    class="vl-column vl-column--4"
                    heading-root-selector="#benchmark-content"
                ></vl-side-navigation-next>
                <div class="vl-column vl-column--8">${generateContent(headingCount)}</div>
            </div>
        `);

        cy.get('vl-side-navigation-next').should('exist').wait(200);

        // Perform multiple scans sequentially
        cy.window().then((win) => {
            cy.get('vl-side-navigation-next').then((el) => {
                for (let i = 0; i < iterations; i++) {
                    const start = win.performance.now();
                    (el[0] as any).refreshTableOfContents();
                    const end = win.performance.now();
                    timings.push(end - start);
                }

                const avg = timings.reduce((a, b) => a + b, 0) / timings.length;
                const min = Math.min(...timings);
                const max = Math.max(...timings);
                const variance = max - min;
                const stdDev = Math.sqrt(timings.reduce((sum, t) => sum + Math.pow(t - avg, 2), 0) / timings.length);

                cy.log('=== Repeated Scan Results ===');
                cy.log(`Iterations: ${iterations}`);
                cy.log(`Average: ${avg.toFixed(2)}ms`);
                cy.log(`Min: ${min.toFixed(2)}ms`);
                cy.log(`Max: ${max.toFixed(2)}ms`);
                cy.log(`Variance (max-min): ${variance.toFixed(2)}ms`);
                cy.log(`Std Deviation: ${stdDev.toFixed(2)}ms`);
                cy.log(`All timings: ${timings.map((t) => t.toFixed(2)).join(', ')}ms`);

                // More lenient assertion - variance should be reasonable but not perfect
                // High variance indicates no caching or browser optimization variability
                expect(variance).to.be.lessThan(avg * 3); // Variance should be < 3x average (very lenient)

                // Log interpretation
                if (variance > avg) {
                    cy.log('⚠️ High variance detected - scans are not cached or have inconsistent performance');
                } else {
                    cy.log('✅ Low variance - scans are consistent');
                }
            });
        });
    });

    // Generate comprehensive report after all tests
    after(() => {
        cy.log('\n' + '='.repeat(80));
        cy.log('PERFORMANCE BENCHMARK REPORT');
        cy.log('='.repeat(80) + '\n');

        // Print results table
        cy.log('Results by Scenario:');
        cy.log('-'.repeat(80));

        Object.entries(benchmarkResults).forEach(([scenario, methods]) => {
            cy.log(`\n${scenario}:`);
            Object.entries(methods).forEach(([method, duration]) => {
                cy.log(`  ${method.padEnd(20)}: ${duration.toFixed(2).padStart(8)}ms`);
            });

            // Calculate speedups
            if (methods['Full Scan'] && methods['Light DOM Only']) {
                const speedup = methods['Full Scan'] / methods['Light DOM Only'];
                cy.log(`  ${'Speedup (Light DOM)'.padEnd(20)}: ${speedup.toFixed(2).padStart(8)}x`);
            }
        });

        // Print summary statistics
        cy.log('\n' + '-'.repeat(80));
        cy.log('Summary Statistics:');
        cy.log('-'.repeat(80) + '\n');

        const methods = ['Full Scan', 'Light DOM Only', 'Max Depth 0', 'Max Depth 1'];
        methods.forEach((method) => {
            const durations = Object.values(benchmarkResults)
                .map((scenario) => scenario[method])
                .filter((d) => d !== undefined);

            if (durations.length > 0) {
                const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
                const min = Math.min(...durations);
                const max = Math.max(...durations);

                cy.log(`${method}:`);
                cy.log(`  Average: ${avg.toFixed(2)}ms`);
                cy.log(`  Min: ${min.toFixed(2)}ms`);
                cy.log(`  Max: ${max.toFixed(2)}ms\n`);
            }
        });

        cy.log('='.repeat(80));

        // Also log to console for easier viewing
        cy.window().then((win) => {
            win.console.log('\n' + '='.repeat(80));
            win.console.log('PERFORMANCE BENCHMARK REPORT');
            win.console.log('='.repeat(80) + '\n');
            win.console.log('Results by Scenario:');
            win.console.log('-'.repeat(80));

            Object.entries(benchmarkResults).forEach(([scenario, methods]) => {
                win.console.log(`\n${scenario}:`);
                Object.entries(methods).forEach(([method, duration]) => {
                    win.console.log(`  ${method.padEnd(20)}: ${duration.toFixed(2).padStart(8)}ms`);
                });

                if (methods['Full Scan'] && methods['Light DOM Only']) {
                    const speedup = methods['Full Scan'] / methods['Light DOM Only'];
                    win.console.log(`  ${'Speedup (Light DOM)'.padEnd(20)}: ${speedup.toFixed(2).padStart(8)}x`);
                }
            });

            win.console.log('\n' + '-'.repeat(80));
            win.console.log('Summary Statistics:');
            win.console.log('-'.repeat(80) + '\n');

            methods.forEach((method) => {
                const durations = Object.values(benchmarkResults)
                    .map((scenario) => scenario[method])
                    .filter((d) => d !== undefined);

                if (durations.length > 0) {
                    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
                    const min = Math.min(...durations);
                    const max = Math.max(...durations);

                    win.console.log(`${method}:`);
                    win.console.log(`  Average: ${avg.toFixed(2)}ms`);
                    win.console.log(`  Min: ${min.toFixed(2)}ms`);
                    win.console.log(`  Max: ${max.toFixed(2)}ms\n`);
                }
            });

            win.console.log('='.repeat(80));
        });
    });
});
