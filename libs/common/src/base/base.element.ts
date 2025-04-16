import '@ungap/custom-elements';

declare const vl: any;

export const BaseElementOfType = (SuperClass: typeof HTMLElement): any => {
    return class BaseElement extends SuperClass {
        protected allowCustomCSS = true;
        private _shadow: any;

        /**
         * VlElement constructor die een shadow DOM voorziet op basis van de HTML {Literal} parameter.
         *
         * @param {Literal} html - HTML literal die de DOM representeert
         * @return {void}
         */
        constructor(html: any = null) {
            super();
            if (html) {
                this.shadow(html);
            }
        }

        /**
         * Geeft de prefix die gebruikt kan worden voor attributen.
         *
         * @return {String} attribuut prefix
         */
        static get attributePrefix(): string {
            return 'data-vl-';
        }

        static get observedAttributes(): string[][] {
            const spacer = [`${BaseElement.attributePrefix}spacer-none`];
            const observedAttributes = [spacer].concat(this._observedAttributes.concat(this._observedPrefixAttributes));
            const observedClassAttributes = this._observedClassAttributes.concat(this._observedPrefixClassAttributes);
            const observedChildClassAttributes = this._observedChildClassAttributes.concat(
                this._observedPrefixChildClassAttributes
            );
            return observedAttributes.concat(observedClassAttributes).concat(observedChildClassAttributes);
        }

        /**
         * Een lijst van attributen die geobserveerd zullen worden. Bij een wijziging van de attribuut waarde zal een
         * functie (`_attribuutChangedCallback`) functie aangeroepen worden met de oude en nieuwe waarde als parameters.
         * Indien de attribuut `-` bevat in de naam zal dit verwijderd worden gevolgd door een hoofdletter bij het
         * aanroepen van de functie (`_attribuutNaamChangedCallback`).
         *
         * @protected
         * @return {Array} array van attributen waar naar geluisterd moet worden
         */
        static get _observedAttributes(): string[] {
            return [];
        }

        /**
         * Een lijst van attributen die geobserveerd zullen worden. Bij een wijziging van de attribuut waarde zal een
         * class toegevoegd worden aan het root element. De naam van de class is gebaseerd op de element prefix
         * (`_classPrefix`) en de naam van het attribuut.
         *
         * @protected
         * @return {Array} array van attributen waar naar geluisterd moet worden
         */
        static get _observedClassAttributes(): string[] {
            return [];
        }

        /**
         * Een lijst van attributen die geobserveerd zullen worden. Bij een wijziging van de attribuut waarde zal een
         * class toegevoegd worden aan het eerste shadow DOM element. De naam van de class is gebaseerd op de element
         * prefix (`_classPrefix`) en de naam van het attribuut.
         *
         * @protected
         * @return {Array} array van attributen waar naar geluisterd moet worden
         */
        static get _observedChildClassAttributes(): string[] {
            return [];
        }

        static get _observedPrefixAttributes(): string[] {
            return this._observedAttributes.map((attribute) => BaseElement.attributePrefix + attribute);
        }

        static get _observedPrefixClassAttributes(): string[] {
            return this._observedClassAttributes.map((attribute) => BaseElement.attributePrefix + attribute);
        }

        static get _observedPrefixChildClassAttributes(): string[] {
            return this._observedChildClassAttributes.map((attribute) => BaseElement.attributePrefix + attribute);
        }

        connectedCallback(): void {
            this.addCustomCSS();
        }

        attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
            const classRef = Object.getPrototypeOf(this).constructor;

            if (attr.startsWith(BaseElement.attributePrefix)) {
                attr = attr.replace(BaseElement.attributePrefix, '');
            }

            classRef._observedClassAttributes
                .concat(classRef._observedPrefixClassAttributes)
                .filter((attribute: string) => attribute == attr || attribute == BaseElement.attributePrefix + attr)
                .forEach((attribute: string) => {
                    this.__changeAttribute(this, oldValue, newValue, attribute);
                });

            classRef._observedChildClassAttributes
                .concat(classRef._observedPrefixChildClassAttributes)
                .filter((attribute: string) => attribute == attr || attribute == BaseElement.attributePrefix + attr)
                .forEach((attribute: string) => {
                    this.__changeAttribute(this._element, oldValue, newValue, attribute);
                });

            const getDeprecatedCallbackFunction = (attribute: string) =>
                (this as any)[`_${attribute.split('-').join('_')}ChangedCallback`];

            const getCallbackFunction = (attribute: string) => {
                const splittedAttribute = attribute.split('-');
                const changeFirstLetterToUpperCase = (item: string) =>
                    `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
                return (this as any)[
                    `_${splittedAttribute.shift()}${splittedAttribute
                        .map(changeFirstLetterToUpperCase)
                        .join('')}ChangedCallback`
                ];
            };

            const callback =
                getCallbackFunction(attr) ||
                getDeprecatedCallbackFunction(attr) ||
                getCallbackFunction(`${BaseElement.attributePrefix}${attr}`) ||
                getDeprecatedCallbackFunction(`${BaseElement.attributePrefix}${attr}`);
            if (callback) {
                callback.call(this, oldValue, newValue);
            }
        }

        /**
         * Geeft de waarde van het naam attribuut terug.
         *
         * @return {string}
         */
        get name(): string | null {
            return this.getAttribute('name');
        }

        /**
         * Bepaal het name attribuut van het element en achterliggend input element.
         *
         * @param {string} value
         */
        set name(value: string | null) {
            if (value === null) {
                this.removeAttribute(`${BaseElement.attributePrefix}name`);
            } else {
                this.setAttribute(`${BaseElement.attributePrefix}name`, value);
            }
        }

        /**
         * Geeft het form element terug.
         *
         * @return {HTMLFormElement}
         */
        get form() {
            return this.closest('form');
        }

        /**
         * De class prefix bepaalt de prefix van het class attribuut dat automatisch toegevoegd wordt op basis van
         * attributen.
         *
         * @protected
         * @return {void}
         */
        get _classPrefix() {
            console.error('class prefix is undefined');
            return null;
        }

        /**
         * DOM element getter.
         *
         * @protected
         * @return {Element}
         */
        get _element(): any {
            return this._shadow ? this._shadow.lastElementChild : this;
        }

        /**
         * Geeft de waarde van het attribuut rekening houdende met het feit dat de attribuut prefix
         * {@link #attributePrefix} gebruikt wordt.
         *
         * @param {String} attribute
         * @return {String}
         */
        getAttribute(attribute: string): string | null {
            return super.hasAttribute(BaseElement.attributePrefix + attribute)
                ? super.getAttribute(BaseElement.attributePrefix + attribute)
                : super.getAttribute(attribute);
        }

        /**
         * Geeft de internationalisatie vertaling terug.
         *
         * @param {String} key
         * @return {String}
         */
        getTranslation(key: string): string {
            return vl?.i18n?.i18n[key];
        }

        /**
         * Geeft terug of het attribuut bestaat rekening houdende met het feit dat de attribuut prefix
         * {@link #attributePrefix} gebruikt wordt.
         *
         * @param {String} attribute
         * @return {Boolean}
         */
        hasAttribute(attribute: string): boolean {
            return this.getAttribute(attribute) != undefined;
        }

        /**
         * Definieer shadow DOM.
         *
         * @protected
         * @param {Literal} html - HTML literal
         * @return {void}
         */
        shadow(html: any) {
            this._shadow = this.attachShadow({ mode: 'open' });
            this._shadow.innerHTML = html;
        }

        /**
         * Genereert een {HTMLTemplateElement} template met de HTML Literal.
         *
         * @protected
         * @param {String} html - HTML literal
         * @return {HTMLTemplateElement}
         */
        _template(html: any): any {
            const template = document.createElement('template');
            template.innerHTML = html;
            return template.content;
        }

        /**
         * Het class attribuut op basis van de oude waarde zal vervangen worden door het class attribuut op basis van de
         * nieuwe waarde.
         *
         * @protected
         * @param {Element} element - HTML element
         * @param {Object} oldValue - oude waarde
         * @param {Object} newValue - nieuwe waarde
         * @param {String} classPrefix - class prefix
         * @return {void}
         */
        _changeClass(element: any, oldValue: string, newValue: string, classPrefix: string) {
            if (element.classList.contains((classPrefix || this._classPrefix) + oldValue)) {
                element.classList.remove((classPrefix || this._classPrefix) + oldValue);
            }

            if (newValue != undefined) {
                element.classList.add((classPrefix || this._classPrefix) + newValue);
            }
        }

        /**
         * Zal op basis van de attribuut waarde de class verwijderen of toevoegen.
         *
         * @protected
         * @param {Element} element - HTML element
         * @param {Object} value - attribuut waarde
         * @param {String} clazz - class waarde
         * @return {void}
         */
        _toggleClass(element: any, value: string, clazz: string) {
            if (value != undefined || !!value) {
                element.classList.add(clazz);
            } else {
                element.classList.remove(clazz);
            }
        }

        _spacerNoneChangedCallback(oldValue: string, newValue: string) {
            this._toggleClass(this._element, newValue, 'vl-u-spacer--none');
        }

        /**
         * Wijzig de (standaard) tekst van een vertaling.
         *
         * @param {String} key
         * @param {String} value
         */
        _changeTranslation(key: string, value: string) {
            vl.i18n.i18n[key] = value;
        }

        __changeAttribute(
            element: any,
            oldValue: string,
            newValue: string,
            attribute: string,
            classPrefix: string | null = null
        ) {
            if (oldValue != newValue) {
                if (this.getAttribute(attribute) != undefined) {
                    element.classList.add((classPrefix || this._classPrefix) + attribute);
                } else {
                    element.classList.remove((classPrefix || this._classPrefix) + attribute);
                }
            }
        }

        private addCustomCSS(): void {
            const customCSS = this.getAttribute('custom-css');

            if (customCSS && !this.allowCustomCSS) {
                console.warn('Custom CSS is niet toegelaten voor dit component.');
                return;
            }

            if (customCSS && !this._shadow) {
                console.warn('Dit component heeft geen shadow DOM om custom CSS aan toe te voegen.');
                return;
            }

            if (customCSS && this._shadow) {
                const customStyleSheet = new CSSStyleSheet();

                customStyleSheet.replaceSync(customCSS);
                this._shadow.adoptedStyleSheets = [...this._shadow.adoptedStyleSheets, customStyleSheet];
            }
        }
    };
};
