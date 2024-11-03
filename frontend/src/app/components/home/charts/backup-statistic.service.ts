import { Backup } from '../../../models/backup.model';
import { useZuStandStore } from '../../../core/hooks/useZustandStore';
import { GenericHTTPService } from '../../../core/services/http-client.service';
import { apiClient } from '../../../core/services/api-client.service';
import { Status } from '../../../models/status.model';

export interface StatisticState {
  backup?: Backup;
  count?: number;
  totalJob: number;
  passRecords: number;
  failedRecord?: number;
}

export const statisticInitialState: StatisticState = {
  count: 0,
  passRecords: 0,
  totalJob: 0,
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useBackUpStatistic = useZuStandStore(statisticInitialState);

class BackUpStatisticService extends GenericHTTPService {
  public async getBackUpStatistic() {
    await Promise.all([this.getBackUpJobStatus(), this.getLastBackUpRecord()]);
  }

  public setState(key: keyof StatisticState, value: any) {
    useBackUpStatistic.getState().setState(key, value);
  }

  public getState(): StatisticState {
    return useBackUpStatistic.getState().state;
  }

  private async getLastBackUpRecord() {
    const params = {
      'page[size]': 1,
      'page[number]': 1,
      'sort[key]': 'created_at',
      'sort[order]': 'desc',
    };
    const response = await apiClient.get('/backup/list', {
      params,
    });
    this.setState('backup', response.data.data.backups[0] as Backup);
    this.setState('count', response.data.data.total);
  }

  private async getBackUpJobStatus() {
    const params = {
      'filter[type]': 'backup',
    };
    const response = await super.get('/histories', {
      params,
    });
    const jobs = response.data.statuses as Status[];
    const passJobs = jobs.filter((job) => job.status === 'success');
    const total = response.data.total;
    console.log(passJobs.length);
    console.log(total);
    this.setState('passRecords', passJobs.length);
    this.setState('failedRecord', total - passJobs.length);
    this.setState('totalJob', total);
  }
}

export const backupStatisticService = new BackUpStatisticService();
