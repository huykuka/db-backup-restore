import { BarChartComponent } from '../core/charts/bar-chart';
import { PieChartComponent } from '../core/charts/pie-chart';
import { Separator } from '@frontend/shared/components/ui/separator';
import Widget from './charts/widget';
import { HistoryComponent } from './history/history';
import Settings from './settings/settings';
import { ChartConfig } from '@frontend/shared/components/ui/chart';
import {
  backupStatisticService,
  useBackUpStatistic,
} from './charts/backup-statistic.service';

const Home = () => {
  useBackUpStatistic();

  const { getState } = backupStatisticService;

  const chartData = [
    {
      browser: 'pass',
      visitors: getState().passRecords,
      fill: 'var(--color-chrome)',
    },
    {
      browser: 'failed',
      visitors: getState().failedRecord,
      fill: 'var(--color-safari)',
    },
  ];

  const chartConfig = {
    chrome: {
      label: 'Chrome',
      color: 'hsl(var(--chart-1))',
    },
    safari: {
      label: 'Safari',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col md:flex-row gap-4 h-fit">
          <Widget />
          <PieChartComponent
            data={chartData}
            config={chartConfig}
            title="Back Up Statistic"
            description="Pass Failed Ratio"
          />
        </div>
      </div>

      <Separator></Separator>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <div className="md:col-span-1">
          <Settings />
        </div>

        <div className="block md:hidden">
          <Separator />
        </div>

        <div className="md:col-span-2">
          <HistoryComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
