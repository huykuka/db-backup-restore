import { Toolbox } from './toolbox/toolbox';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { BackUpDataTable } from './backup-data-table';
import { Backup } from '../../../models';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import backupHistoryService, {
  useBackupHistory,
} from './backup-history.service';
import { useFetch } from '../../../core/hooks/useFetch';
import { Paging } from '../../core/paging';

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
  //reset the state
  useEffect(() => {
    backupHistoryService.getBackup();
  }, []); //only run once

  const handleDeleteBackup = async (id: string) => {
    await backupHistoryService.deleteBackup(id);
  };

  const handlePageSizeChange = async (size: number) => {
    useBackupHistory.getState().setState('size', size);
    backupHistoryService.resetPaging();
    backupHistoryService.getBackup();
  };

  const handlePageChange = (newPage: number) => {
    useBackupHistory.getState().setState('page', newPage);
    backupHistoryService.getBackup();
  };
  const handleRestoreBackup = async (id: string) => {
    try {
      await backupHistoryService.restoreBackup(id);
      toast.success('Backup Restored');
    } catch (error) {
      toast.error('Failed to restore backup');
    }
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
          />
          <Paging
            currentPage={useBackupHistory.getState().state.page || 1}
            totalItems={useBackupHistory.getState().state.total || 0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={useBackupHistory.getState().state.size || 1}
          ></Paging>
        </div>
      </CardContent>
    </Card>
  );
}
