import { CSSUpdater } from "./css-updater";
import { CSSVariable, CSSVariableExtractor } from "./css-variable-extractor";

const handleMessages = (message: string | { message: string, content: CSSVariable }, sender: chrome.runtime.MessageSender, sendResponse: (resp: any) => void) => {
    let normalizedMessage = typeof message === 'string' ? message : message.message;

    switch (normalizedMessage) {
        case CSSVariableExtractor.MESSAGE:
            const resp = CSSVariableExtractor.extract.bind(CSSVariableExtractor)();
            sendResponse(resp);
            return true;
        case CSSUpdater.MESSAGE:
            if (typeof message !== 'string') {
                CSSUpdater.update(message.content);
                return true;
            }
        default:
            console.error('Unrecognized message recieved: ', message);
            return false;
    }
}

chrome.runtime.onMessage.addListener(handleMessages);

