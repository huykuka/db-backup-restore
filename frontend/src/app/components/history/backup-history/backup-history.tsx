import { Toolbox } from './toolbox/toolbox';
import { BackupTablePaging } from './backup-table-paging';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { BackUpDataTable } from './backup-data-table';
import { Backup } from '../../../models';
import { useEffect } from 'react';
import { toast } from 'sonner';
import backupHistoryService, {
  initialState,
  useBackupHistory,
} from './backup-history.service';
import { useFetch } from '../../../core/hooks/useFetch';

export interface BackUpHistoryState {
  backups: Backup[];
  page: number;
  size: number;
  loading: boolean;
  filter: {
    fromDate: string | null;
    toDate: string | null;
  };
}

export function BackupHistory() {
  const { data, loading, error } = useFetch<{ backups: Backup[] }>(
    '/backup/list'
  );
  const { setState } = useBackupHistory();
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
          <BackupTablePaging />
        </div>
      </CardContent>
    </Card>
  );
}
