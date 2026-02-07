import { CSSVariable } from "./css-variable-extractor";

export class CSSUpdater {
    public static MESSAGE = 'update-variable'

    public static update(cssVar: CSSVariable) {
        document.documentElement.style.setProperty(cssVar[0], cssVar[1]);
    }
}
