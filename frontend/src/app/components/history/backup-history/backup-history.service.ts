import { GenericHTTPService } from '../../../core/services/http-client.services';

import { useZuStandStore } from '../../../core/hooks/useZustandStore';
import { BackUpHistoryState } from './backup-history';
import { Backup } from '../../../models';

export const initialState: BackUpHistoryState = {
  backups: [],
  page: 1,
  size: 10,
  loading: false,
  filter: {
    fromDate: null,
    toDate: null,
  },
};

export const useBackupHistory = useZuStandStore(initialState);

class BackupHistoryService extends GenericHTTPService {
  public async getBackup() {
    const state = this.getState();
    const params = {
      'page[size]': state?.size,
      'page[number]': state?.page,
      'filter[fromDate]': state?.filter.fromDate,
      'filter[toDate]': state?.filter.toDate,
    };
    try {
      useBackupHistory.getState().setState('loading', true);
      const response = await super.get<{ backups: Backup[] }>('/backup/list', {
        params,
      });
      useBackupHistory.getState().setState('backups', response?.backups || []);
    } finally {
      useBackupHistory.getState().setState('loading', false);
    }
  }

  public async createBackup() {
    try {
      await this.post('/backup');
      await this.getBackup();
    } catch (error) {
      throw error;
    }
  }

  public async deleteBackup(id: string) {
    try {
      await this.delete(`/backup/${id}`);
      await this.getBackup();
    } catch (error) {
      throw error;
    }
  }

  public async restoreBackup(id: string) {
    await this.post(`/restore/${id}`);
  }

  private getState() {
    try {
      return useBackupHistory.getState().state;
    } catch (error) {
      throw error;
    }
  }
}

const backupHistoryService = new BackupHistoryService();
export default backupHistoryService;
