// declare global {
namespace Cypress {
    interface Chainable<Subject> {
        getDataCy(selector: string, options?: any): Chainable<any>;

        createStubForEvent(selector: string, event: string): Chainable<Subject>;

        visitWithA11y(url: string): void;

        shouldHaveComputedStyle({
                                    style,
                                    value,
                                    not,
                                    pseudo
                                }: {
            style: string;
            value: string;
            pseudo?: string;
            not?: boolean;
        }): Chainable<Subject>;

        runTestFor<T>(selector: string, test: (component: T) => void): Chainable<Subject>;

        runTestFor2<T, U>(
            selector1: string,
            selector2: string,
            test: (component1: T, component2: U) => void
        ): Chainable<Subject>;

        runTestFor3<T, U, V>(
            selector1: string,
            selector2: string,
            selector3: string,
            test: (component1: T, component2: U, component3: V) => void
        ): Chainable<Subject>;

        runTestFor4<T, U, V, W>(
            selector1: string,
            selector2: string,
            selector3: string,
            selector4: string,
            test: (component1: T, component2: U, component3: V, component4: W) => void
        ): Chainable<Subject>;

        runTest<T = HTMLElement>(test: (component: T) => void): Chainable<Subject>;

        waitUntil<ReturnType = any>(
            checkFunction: (subject: Subject | undefined) => ReturnType | Chainable<ReturnType> | Promise<ReturnType>,
            options?: WaitUntilOptions<Subject>
        ): Chainable<ReturnType>;
    }
}
// }
