import { Button, buttonVariants } from '@frontend/shared/components/ui/button';
import { DownloadIcon, EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import { statusHistoryService } from '../../status-history.service';

export const DownLoadLogButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadLog = async () => {
    setIsDownloading(true);

    try {
      await statusHistoryService.downloadLog();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        disabled={isDownloading}
        className={buttonVariants({ variant: 'secondary' })}
        onClick={handleDownloadLog}
      >
        {isDownloading ? (
          <>
            <EllipsisIcon className="mr-2 animate-pulse" />
            Downloading
          </>
        ) : (
          <>
            <DownloadIcon className="mr-2" />
            Download log
          </>
        )}
      </Button>
    </div>
  );
};
