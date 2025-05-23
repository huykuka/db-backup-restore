import { useZuStandStore } from '../../../../core/hooks/useZustandStore';
import { apiClient, ToastService } from '../../../../core/services';
import { GenericHTTPService } from '../../../../core/services/http-client.service';
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

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useStatusHistory = useZuStandStore(statusHistoryInitialState);

class StatusHistoryService extends GenericHTTPService {
  public async getStatusHistories() {
    const params = { ...this.getParams() };
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

  public async downloadLog() {
    const controller = new AbortController(); // Create an AbortController instance
    ToastService.loading('Downloading log file...', {
      action: {
        label: 'Cancel',
        onClick: () => {
          controller.abort(); // Abort the download when the button is clicked
          ToastService.info('Download cancelled'); // Show a cancellation message
        },
      },
    });

    try {
      const params = { ...this.getParams() };
      const response: any = await apiClient.get('histories/download', {
        params,
        responseType: 'blob',
        signal: controller.signal, // Pass the signal to the request options
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data]);
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        .split('filename=')[1]
        .split(';')[0]
        .replace(/"/g, '');

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Catch the specific abort error
        console.log('Download aborted:', error);
      } else {
        console.error('Download failed:', error);
      }
    } finally {
      ToastService.dismiss(); // Dismiss the ToastService
    }
  }

  public resetPaging() {
    this.setState('page', 1);
  }

  public setState(key: keyof StatusHistoryState, value: any) {
    useStatusHistory.getState().setState(key, value);
  }

  public resetState() {
    useStatusHistory.getState().reset();
  }

  public getState(): StatusHistoryState {
    return useStatusHistory.getState().state;
  }

  private getParams() {
    const state = this.getState();
    return {
      'page[size]': state?.size,
      'page[number]': state?.page,
      'filter[fromDate]': state?.filter.fromDate,
      'filter[toDate]': state?.filter.toDate,
      'filter[type]': state?.filter.type,
      'filter[status]': state?.filter.status,
      'sort[key]': state?.sort.key,
      'sort[order]': state?.sort.order,
    };
  }
}

export const statusHistoryService = new StatusHistoryService();
