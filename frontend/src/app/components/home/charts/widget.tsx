import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { Progress } from '@frontend/shared/components/ui/progress';
import { AlertCircle, CheckCircle, Database } from 'lucide-react';
import { useEffect } from 'react';

import {
  backupStatisticService,
  useBackUpStatistic,
} from './backup-statistic.service';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@frontend/shared/components/ui/tooltip';

export default function Widget() {
  useBackUpStatistic();
  const { getState } = backupStatisticService;
  const totalJobs = getState().totalJob;
  const passRecords = getState().passRecords;

  // Calculate backup health as a number, default to 0 when totalJobs is 0
  const backupHealth =
    totalJobs > 0 ? ((passRecords / totalJobs) * 100).toFixed(2) : '0';

  // Convert backupHealth to a number for progress and health checks
  const backupHealthNumber = parseFloat(backupHealth);
  const isHealthy = backupHealthNumber > 70;

  useEffect(() => {
    // Fetch the initial data
    backupStatisticService.getBackUpStatistic();

    // Set up a cron job to refresh the data periodically (e.g., every 5 minutes)
    const intervalId = setInterval(() => {
      backupStatisticService.getBackUpStatistic();
    }, 1000); // 5 minutes in milliseconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="w-fit h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Database Backups</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold whitespace-nowrap">
          {getState().count} Backups Available
        </div>
        <p className="text-xs text-muted-foreground">
          Last backup:{' '}
          {new Date(getState().backup?.createdAt || '').toLocaleString()}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Backup Health</p>
                  <span className="text-sm font-bold">
                    {backupHealthNumber.toFixed(2)}%{' '}
                    {/* Ensure this is a number with 2 decimal places */}
                  </span>
                </div>
                <Progress value={backupHealthNumber} className="mt-2" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Ratio between success and fail
                <br /> jobs on backup action
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="mt-4 flex items-center">
          {isHealthy ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
          )}
          <span className="text-sm">
            {isHealthy ? 'Backups are healthy' : 'Attention needed'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
