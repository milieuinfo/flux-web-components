const STYLE_ATTRIBUTE_CSP = "style-src-attr 'none'";

const enforceStyleAttributeCsp = () => {
    if (document.querySelector(`meta[content="${STYLE_ATTRIBUTE_CSP}"]`)) return;

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = STYLE_ATTRIBUTE_CSP;
    document.head.append(meta);
};

const describeViolation = (event: SecurityPolicyViolationEvent) => {
    const [source] = event.composedPath();
    const sourceName = source instanceof Element ? `<${source.localName} class="${source.className}">` : 'document';
    return `${event.effectiveDirective} - ${sourceName}`;
};

/**
 * Verbiedt style-attributen via een CSP en verzamelt de schendingen tot `stop()` opgeroepen wordt.
 * Een CSP uit een meta-tag blijft gelden tot het document herlaadt: gebruik dit dus enkel in een aparte spec.
 */
export const watchStyleAttributeCspViolations = () => {
    const violations: string[] = [];
    const sentinel = document.createElement('span');
    let resolveViolations: (violations: string[]) => void;

    const onViolation = (event: SecurityPolicyViolationEvent) => {
        if (event.composedPath()[0] !== sentinel) {
            violations.push(describeViolation(event));
            return;
        }
        document.removeEventListener('securitypolicyviolation', onViolation);
        sentinel.remove();
        resolveViolations(violations);
    };

    enforceStyleAttributeCsp();
    document.addEventListener('securitypolicyviolation', onViolation);

    return {
        // De browser meldt schendingen asynchroon en in volgorde. De schending van de sentinel komt dus als laatste
        // binnen, en bewijst meteen dat de CSP effectief actief is.
        stop: () =>
            new Promise<string[]>((resolve) => {
                resolveViolations = resolve;
                document.body.append(sentinel);
                sentinel.setAttribute('style', 'color: red');
            }),
    };
};
