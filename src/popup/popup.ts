import { CSSUpdater } from "content/css-updater";
import { CSSVariable, CSSVariableExtractor } from "content/css-variable-extractor";

const getActiveTabId = async (): Promise<number> => {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    return tabs[0].id ?? 0;
}

const cssVariables = async (): Promise<CSSVariable[]> => {
    const tabId = await getActiveTabId();
    // Fetch css variables from content script in active tab
    return await chrome.tabs.sendMessage(tabId, CSSVariableExtractor.MESSAGE) as CSSVariable[];
}

const generateInputs = (cssVariables: CSSVariable[]): string => {
    return cssVariables.reduce((str, [prop, val]) =>
        `${str}<div class="css-prop"><input id=${prop} type="color" value="${val}"> <label for="${prop}">${prop}</label></div>`, "");
}

const addEventListeners = (cssVariables: CSSVariable[]): void => {
    cssVariables.map(([prop, val]) => {
        const input = document.querySelector(`#${prop}`) as HTMLInputElement;
        if (input) {
            input.addEventListener('change', async (e) => {
                const input = e.target as HTMLInputElement;
                const tabId = await getActiveTabId();
                await chrome.tabs.sendMessage(tabId, { message: CSSUpdater.MESSAGE, content: [prop, input.value] })
            })
        }
    })
}

const container = document.querySelector('.css-variables-container');

(async () => {
    if (container) {
        const variables = await cssVariables();
        container.innerHTML = generateInputs(variables);
        addEventListeners(variables);
    }
})();

