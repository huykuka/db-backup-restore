import { Button, buttonVariants } from '@frontend/shared/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import backupHistoryService from '../backup-history.service';

export function Operation() {
  const handleCreateBackup = async () => {
    await backupHistoryService.createBackup();
  };

  return (
    <div className="flex flex-wrap items-center space-x-2">
      <Button onClick={handleCreateBackup}>
        <Plus className="mr-2" />
        Create Backup
      </Button>
    </div>
  );
}
