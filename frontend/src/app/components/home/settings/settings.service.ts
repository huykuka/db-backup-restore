import { useZuStandStore } from "@core/hooks";
import { apiClient, GenericHTTPService, ToastService } from "@core/services";
import { Setting } from "@models/settings.model";

export interface SettingsState {
    settings: Setting[];
    loading?: boolean;
}


export const settingsInitialState: SettingsState = {
    settings: [],
    loading: false,
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useSettings = useZuStandStore(settingsInitialState);

class SettingService extends GenericHTTPService {

    public async getSettings() {
        const params = { ...this.getParams() };
        try {
            this.setState('loading', true);
            const response = await super.get('/settings', {
                params,
            });
            this.setState('settings', response?.data?.settings || []);
        } finally {
            // Hide the loader after 200ms
            setTimeout(() => {
                this.setState('loading', false);
            }, 400);
        }
    }

    public async updateDBSettings(settings: any) {
        try {
            await super.post('settings/update/db-settings', settings)
                .then(() => ToastService.success('Settings updated successfully'));
        }
        catch (err: any) {
            throw err;
        }

    }

    public setState(key: keyof SettingsState, value: any) {
        useSettings.getState().setState(key, value);
    }

    public resetState() {
        useSettings.getState().reset();
    }

    public getState(): SettingsState {
        return useSettings.getState().state;
    }

    private getParams() {
        const state = this.getState();
        return {
        };
    }
}

const settingService = new SettingService();
export default settingService;
