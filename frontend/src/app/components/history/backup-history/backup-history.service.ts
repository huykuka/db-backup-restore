import { GenericHTTPService } from '../../../core/services/http-client.services';

import { useZuStandStore } from '../../../core/hooks/useZustandStore';
import { BackUpHistoryState } from './backup-history';

export const initialState: BackUpHistoryState = {
  backups: [],
  page: 1,
  size: 10,
  loading: false,
  filter: {
    fromDate: null,
    toDate: null,
  },
  sort: {
    key: 'created_at',
    order: 'desc',
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
      'sort[key]': state?.sort.key,
      'sort[order]': state?.sort.order,
    };
    try {
      useBackupHistory.getState().setState('loading', true);
      const response = await super.get('/backup/list', {
        params,
      });
      useBackupHistory
        .getState()
        .setState('backups', response?.data?.backups || []);
      useBackupHistory.getState().setState('total', response?.data?.total);
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

  public resetPaging() {
    useBackupHistory.getState().setState('page', 1);
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
