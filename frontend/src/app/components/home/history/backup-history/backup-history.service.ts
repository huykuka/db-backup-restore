import { GenericHTTPService } from '../../../../core/services/http-client.service';

import { apiClient, ToastService } from '@core/services';
import { useZuStandStore } from '../../../../core/hooks/useZustandStore';
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

// eslint-disable-next-line react-hooks/rules-of-hooks
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
    await this.post('/backup');
    this.resetPaging();
    ToastService.success('Backup created successfully');
    await this.getBackup();
  }

  public async deleteBackup(id: string) {
    await this.delete(`/backup/${id}`);
    ToastService.success('Backup deleted successfully');
    this.resetPaging();
    await this.getBackup();
  }

  public async downloadBackup(id: string) {
    try {
      ToastService.loading('Downloading backup file...');
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
      ToastService.error('Cannot download backup file');
    } finally {
      ToastService.dismiss();
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
    return useBackupHistory.getState().state;
  }
}

const backupHistoryService = new BackupHistoryService();
export default backupHistoryService;
