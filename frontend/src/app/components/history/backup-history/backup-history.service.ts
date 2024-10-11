import { GenericHTTPService } from '../../../core/services/http-client.services';

import { useZuStandStore } from '../../../core/hooks/useZustandStore';
import { BackUpHistoryState } from './backup-history';
import { toast } from 'sonner';
import apiClient from '../../../core/services/api-client.services';

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
      setTimeout(() => {
        this.setState('loading', false);
      }, 400);
    }
  }

  public async createBackup() {
    try {
      await this.post('/backup');
      this.resetPaging();
      toast.success('Backup created successfully');
      await this.getBackup();
    } catch (error) {
      throw error;
    }
  }

  public async deleteBackup(id: string) {
    try {
      await this.delete(`/backup/${id}`);
      toast.success('Backup deleted successfully');
      this.resetPaging();
      await this.getBackup();
    } catch (error) {
      throw error;
    }
  }

  public async downloadBackup(id: string) {
    try {
      toast.loading('Downloading backup file...');
      const response = await apiClient.get(`/backup/download/${id}`, {
        responseType: 'blob',
      });
      const href = URL.createObjectURL(response.data);
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/"/g, '')
        : `backup_${id}.zip`;

      // Create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', filename); // or any other extension
      document.body.appendChild(link);
      link.click();

      // Clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      toast.error('Cannot download backup file');
    }
    finally {
      toast.dismiss();
    }
  }

  public async restoreBackup(id: string) {
    await this.post(`/restore/${id}`);
  }

  public resetPaging() {
    this.setState('page', 1);
  }

  public setState(key: keyof BackUpHistoryState, value: any) {
    useBackupHistory.getState().setState(key, value);
  }

  public resetState() {
    useBackupHistory.getState().reset();
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
