import { Toolbox } from './toolbox/toolbox';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';

import { toastService } from '@core/services';
import { useEffect } from 'react';
import { Backup } from '../../../../models';
import { Paging } from '../../../core/paging';
import { BackUpDataTable } from './backup-data-table';
import backupHistoryService, {
  useBackupHistory,
} from './backup-history.service';

export interface BackUpHistoryState {
  backups: Backup[];
  page: number;
  size: number;
  total?: number | null;
  loading: boolean;
  filter: {
    fromDate: string | null;
    toDate: string | null;
  };
  sort: {
    key: string;
    order: 'asc' | 'desc';
  };
}

export function BackupHistory() {
  useBackupHistory();

  const { getState, setState } = backupHistoryService;
  useEffect(() => {
    backupHistoryService.getBackup();
    return () => {
      backupHistoryService.resetState();
    };
  }, []); //only run once

  const handleDeleteBackup = async (id: string) => {
    await backupHistoryService.deleteBackup(id);
  };

  const handlePageSizeChange = async (size: number) => {
    setState('size', size);
    backupHistoryService.resetPaging();
    backupHistoryService.getBackup();
  };

  const handlePageChange = (page: number) => {
    setState('page', page);
    backupHistoryService.getBackup();
  };

  const handleRestoreBackup = async (id: string) => {
    await backupHistoryService
      .restoreBackup(id)
      .then(() => toastService.success('Backup Restored'));
  };

  const handleDownloadBackup = async (id: string) => {
    await backupHistoryService.downloadBackup(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Back Up History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-5">
          <Toolbox />
          <BackUpDataTable
            onDeleteBackup={handleDeleteBackup}
            onRestoreBackup={handleRestoreBackup}
            onDownloadBackup={handleDownloadBackup}
          />
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
