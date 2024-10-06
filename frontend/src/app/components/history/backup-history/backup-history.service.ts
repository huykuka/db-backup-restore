import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useBackupHistory } from './backup-history';
import {GenericHTTPService} from "../../../core/services/http-client.services";
import {toast} from "sonner";

class BackupHistoryService extends GenericHTTPService {
    public async getBackup<T>(): Promise<AxiosResponse<T>> {
        const state = this.getState();
        const params = {
            'page[size]': state?.size,
            'page[number]': state?.page,
            'filter[fromDate]': state?.filter.fromDate,
            'filter[toDate]': state?.filter.toDate,
        };
        return super.get<T>('/backup/list', {  params });
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