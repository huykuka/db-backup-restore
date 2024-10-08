import { GenericHTTPService } from '../../../core/services/http-client.services';

import { useZuStandStore } from '../../../core/hooks/useZustandStore';
import { toast } from 'sonner';
import apiClient from '../../../core/services/api-client.services';
import { StatusHistoryState } from './status-history';

export const statusHistoryInitialState: StatusHistoryState = {
  statuses: [],
  page: 1,
  size: 10,
  loading: false,
  filter: {
    fromDate: null,
    toDate: null,
    type: null,
    status: null,
  },
  sort: {
    key: 'created_at',
    order: 'desc',
  },
};

export const useStatusHistory = useZuStandStore(statusHistoryInitialState);

class StatusHistoryService extends GenericHTTPService {
  public async getStatusHistories() {
    const state = this.getState();
    const params = {
      'page[size]': state?.size,
      'page[number]': state?.page,
      'filter[fromDate]': state?.filter.fromDate,
      'filter[toDate]': state?.filter.toDate,
      'filter[type]': state?.filter.type,
      'filter[status]': state?.filter.status,
      'sort[key]': state?.sort.key,
      'sort[order]': state?.sort.order,
    };
    try {
      this.setState('loading', true);
      const response = await super.get('/histories', {
        params,
      });
      this.setState('statuses', response?.data?.statuses || []);
      this.setState('total', response?.data?.total || 1);
    } finally {
      // Hide the loader after 200ms
      setTimeout(() => {
        this.setState('loading', false);
      }, 400);
    }
  }

  public async downloadBackup(id: string) {
    try {
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
  }

  public resetPaging() {
    this.setState('page', 1);
  }

  public setState(key: keyof StatusHistoryState, value: any) {
    useStatusHistory.getState().setState(key, value);
  }

  public getState(): StatusHistoryState {
    try {
      return useStatusHistory.getState().state;
    } catch (error) {
      throw error;
    }
  }
}

const statusHistoryService = new StatusHistoryService();
export default statusHistoryService;
