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
  initialState,
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
  const { data, loading, error } = useFetch<{ backups: Backup[] }>(
    '/backup/list'
  );
  const { setState } = useBackupHistory();
  const [currentPage, setCurrentPage] = useState(1);
  //reset the state
  useEffect(() => {
    useBackupHistory.setState({
      ...useBackupHistory.getState(),
      ...initialState,
    });
  }, []); //only run once

  useEffect(() => {
    setState('loading', loading);
    setState('backups', data?.backups || []);
  }, [data, setState]); // Add data and setState to the dependency array

  const handleDeleteBackup = async (id: string) => {
    await backupHistoryService.deleteBackup(id);
  };

  const handlePageSizeChange = async (size: number) => {
    useBackupHistory.getState().setState('size', size);
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
