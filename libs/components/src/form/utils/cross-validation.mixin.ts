import { type FormValue, type Validator } from '@open-wc/form-control';
import { FormControl } from '../form-control/form-control';

export type ValidatorWithDeps = Validator & { dependencySelectors?: string[] };

type Constructor<T = object> = new (...args: any[]) => T;

export const CrossValidationMixin = <T extends Constructor<FormControl>>(superClass: T) => {
    abstract class CrossValidationElement extends superClass {
        private cachedDependencySelectors?: string[];

        private lastFormValue: FormValue = null;

        private dependencyForm: HTMLFormElement | null = null;

        formAssociatedCallback(form: HTMLFormElement | null): void {
            super.formAssociatedCallback(form);

            if (this.dependencyForm === form) {
                return;
            }

            this.dependencyForm?.removeEventListener('vl-change', this.onDependencyChange);
            this.dependencyForm = form;

            if (form && this.dependencySelectors.length > 0) {
                form.addEventListener('vl-change', this.onDependencyChange);
            }
        }

        disconnectedCallback(): void {
            super.disconnectedCallback();

            this.dependencyForm?.removeEventListener('vl-change', this.onDependencyChange);
            this.dependencyForm = null;
        }

        setValue(value: FormValue): void {
            this.lastFormValue = value;
            super.setValue(value);
        }

        protected get retainsValidationState(): boolean {
            return super.retainsValidationState || this.dependencySelectors.length > 0;
        }

        private get dependencySelectors(): string[] {
            if (this.cachedDependencySelectors === undefined) {
                const validators = ((this.constructor as typeof FormControl).formControlValidators ??
                    []) as ValidatorWithDeps[];
                this.cachedDependencySelectors = validators.flatMap((validator) => validator.dependencySelectors ?? []);
            }

            return this.cachedDependencySelectors;
        }

        private onDependencyChange = (event: Event): void => {
            const target = event.target as Element | null;
            if (!target) {
                return;
            }

            if (this.dependencySelectors.some((selector) => target.matches(selector))) {
                this.setValue(this.lastFormValue);
                this.revalidate();
            }
        };
    }

    return CrossValidationElement as unknown as Constructor<FormControl> & T;
};
