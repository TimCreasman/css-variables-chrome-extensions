export type CSSVariable = [`--${string}`, `#${string}` | `rgb${string}`]

export class CSSVariableExtractor {

    public static MESSAGE = 'extract-variables'

    /**
     * Fetches all color related properties from this domain's stylesheets.
     **/
    public static extract = () => {
        const domainStyleSheets = [...document.styleSheets]
            .filter(this.isSameDomain);

        return domainStyleSheets
            .reduce<CSSVariable[]>((arr, sheet: CSSStyleSheet) => arr.concat(
                [...sheet.cssRules]
                    .filter(this.isStyleRule)
                    .map((rule) => rule as CSSStyleRule)
                    .reduce<string[][]>((arr, rule: CSSStyleRule) => {
                        const props = [...rule.style].map((propName) => [
                            propName.trim(),
                            rule.style.getPropertyValue(propName).trim()
                        ])
                            .filter(([propName, value]) => propName.indexOf('--') === 0 && this.isValueColor(value));
                        return [...arr, ...props];
                    }, []) as unknown as CSSVariable
            ), []);
    };

    private static isValueColor = (ruleValue: string): boolean => ruleValue.indexOf('#') === 0 || ruleValue.indexOf('rgb') === 0

    private static isStyleRule = (rule: CSSRule): boolean => ['CSSStyleRule'].includes(rule.constructor.name)

    private static isSameDomain = (styleSheet: CSSStyleSheet) => {
        if (!styleSheet.href) {
            return true;
        }

        return styleSheet.href.indexOf(window.location.origin) === 0;
    }
}
