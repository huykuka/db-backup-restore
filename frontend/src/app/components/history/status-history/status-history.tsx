import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { StatusDataTable } from './status-data-table';

import { Toolbox } from './toolbox/toolbox';
import { Status } from '../../../models/status.model';
import { Paging } from '../../core/paging';
import statusHistoryService, {
  useStatusHistory,
} from './status-history.service';
import { useEffect } from 'react';
import backupHistoryService from '../backup-history/backup-history.service';

export interface StatusHistoryState {
  statuses: Status[];
  page: number;
  size: number;
  total?: number | null;
  loading: boolean;
  filter: {
    fromDate: string | null;
    toDate: string | null;
    type: string | null;
    status: string | null;
  };
  sort: {
    key: string;
    order: 'asc' | 'desc';
  };
}

export function StatusHistory() {
  useStatusHistory();

  const { getState, setState } = statusHistoryService;

  useEffect(() => {
    statusHistoryService.getStatusHistories();
  }, []); //only run once

  const handlePageSizeChange = async (size: number) => {
    setState('size', size);
    statusHistoryService.resetPaging();
    statusHistoryService.getStatusHistories();
  };

  const handlePageChange = (page: number) => {
    setState('page', page);
    statusHistoryService.getStatusHistories();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-5">
          <Toolbox />
          <StatusDataTable />
          <Paging
            currentPage={getState().page || 1}
            totalItems={getState().total || 0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={getState().size || 1}
          ></Paging>
        </div>
      </CardContent>
    </Card>
  );
}
