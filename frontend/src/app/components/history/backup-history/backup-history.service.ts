import { GenericHTTPService } from '../../../core/services/http-client.services';

import { useZuStandStore } from '../../../core/hooks/useZustandStore';
import { BackUpHistoryState } from './backup-history';
import { toast } from 'sonner';

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
      this.setState('loading', true);
      const response = await super.get('/backup/list', {
        params,
      });
      this.setState('backups', response?.data?.backups || []);
      this.setState('total', response?.data?.total || 1);
    } finally {
      // Hide the loader after 200ms
      setTimeout(() => this.setState('loading', false), 400);
    }
  }

  public async createBackup() {
    try {
      await this.post('/backup');
      toast.success('Backup created successfully');
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
    this.setState('backups', []);
  }

  public setState(key: keyof BackUpHistoryState, value: any) {
    useBackupHistory.getState().setState(key, value);
  }

  public getState(): BackUpHistoryState {
    try {
      return useBackupHistory.getState().state;
    } catch (error) {
      throw error;
    }
  }
}

const backupHistoryService = new BackupHistoryService();
export default backupHistoryService;
