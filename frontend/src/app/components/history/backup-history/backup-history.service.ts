import {GenericHTTPService} from "../../../core/services/http-client.services";

import {useZuStandStore} from "../../../core/hooks/useZustandStore";
import {BackUpHistoryState} from "./backup-history";

const initialState:BackUpHistoryState = {
    backups :[],
    page : 1,
    size : 10,
    loading: false,
    filter: {
        fromDate: null,
        toDate: null
    }
}

export const useBackupHistory = useZuStandStore(initialState);


class BackupHistoryService extends GenericHTTPService {
    public async getBackup<T>(): Promise<T> {
        const state = this.getState();
        const params = {
            'page[size]': state?.size,
            'page[number]': state?.page,
            'filter[fromDate]': state?.filter.fromDate,
            'filter[toDate]': state?.filter.toDate,
        };
        const response = await super.get<T>('/backup/list', {  params });
        return response.data;
    }

    public async deleteBackup(id: string) {
        await this.delete(`/backup/${id}`);
    }

    public async restoreBackup(id: string) {
        await this.post(`/restore/${id}`);
    }

    private getState() {
        try {
            return useBackupHistory.getState().state;
        }
        catch (error) {
            console.log(error)
        }
    }
}

const backupHistoryService = new BackupHistoryService();
export default backupHistoryService;