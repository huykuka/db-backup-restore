import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@frontend/shared/components/ui/table';
import { Button } from '@frontend/shared/components/ui/button';
import { ArchiveRestoreIcon, DeleteIcon, DownloadIcon } from 'lucide-react';
import backupHistoryService from './backup-history.service';
import LoadingOverlay from '../../core/loader';

interface BackupDataTableProps {
  onDeleteBackup: (id: string) => void;
  onRestoreBackup: (id: string) => void;
}

export function BackUpDataTable({
  onDeleteBackup,
  onRestoreBackup,
}: BackupDataTableProps) {
  const { getState } = backupHistoryService;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Create Date</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getState().loading && <LoadingOverlay />}
        {getState().backups.map((backup, index) => (
          <TableRow key={backup.filename}>
            <TableCell>{new Date(backup.createdAt).toLocaleString()}</TableCell>
            <TableCell>{backup.filename}</TableCell>
            <TableCell className="flex space-x-2 text-right justify-end">
              <Button variant={'secondary'}>
                <DownloadIcon className="mr-2" />
                Download
              </Button>
              <Button
                variant={'ghost'}
                onClick={() => onRestoreBackup(backup.id)}
              >
                <ArchiveRestoreIcon className="mr-2" />
                Restore
              </Button>
              <Button
                variant={'destructive'}
                onClick={() => onDeleteBackup(backup.id)}
              >
                <DeleteIcon className="mr-2" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
