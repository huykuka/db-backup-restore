import { Button } from '@frontend/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@frontend/shared/components/ui/table';
import { ArchiveRestoreIcon, DeleteIcon, DownloadIcon } from 'lucide-react';
import LoadingOverlay from '../../core/loader';
import backupHistoryService from './backup-history.service';

interface BackupDataTableProps {
  onDeleteBackup: (id: string) => void;
  onRestoreBackup: (id: string) => void;
  onDownloadBackup: (id: string) => void;
}

export function BackUpDataTable({
  onDeleteBackup,
  onRestoreBackup,
  onDownloadBackup,
}: BackupDataTableProps) {
  const { getState } = backupHistoryService;
  return (
    <div className="relative">
      {getState().loading && <LoadingOverlay />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Create Date</TableHead>
            <TableHead>Filename</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getState().backups.map((backup, index) => (
            <TableRow key={backup.filename}>
              <TableCell>
                {new Date(backup.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>{backup.filename}</TableCell>
              <TableCell className="flex space-x-2 text-right justify-end">
                <Button
                  variant={'secondary'}
                  onClick={() => onDownloadBackup(backup.id)}
                >
                  <DownloadIcon className="mr-2" />
                  <span className="hidden md:inline">Download</span>
                </Button>
                <Button
                  variant={'ghost'}
                  onClick={() => onRestoreBackup(backup.id)}
                >
                  <ArchiveRestoreIcon className="mr-2" />
                  <span className="hidden md:inline">Restore</span>
                </Button>
                <Button
                  variant={'destructive'}
                  onClick={() => onDeleteBackup(backup.id)}
                >
                  <DeleteIcon className="mr-2" />
                  <span className="hidden md:inline">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
