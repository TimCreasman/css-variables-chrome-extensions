import config from './config.json'

export type Config = typeof config;

export class Settings {
    private static async getFromStorage(key: keyof Config): Promise<any> {
        const result = await chrome.storage.local.get([key]);
        if (!result[key]) {
            await chrome.storage.local.set({ key: config[key] });
            return config[key];
        } else {
            return result[key];
        }
    }

    static async setToStorage(key: keyof Config, value: string | number) {
        await chrome.storage.local.set({
            [key]: value
        });
    }

    static async getConfig<K extends keyof Config, V extends Config[K]>(): Promise<Config> {
        const configFromStorage = structuredClone(config);
        for (const key of Object.keys(config)) {
            const k = key as K;
            const val = await this.getFromStorage(k) as V;
            configFromStorage[k] = val;
        }

        return configFromStorage;
    }
}
