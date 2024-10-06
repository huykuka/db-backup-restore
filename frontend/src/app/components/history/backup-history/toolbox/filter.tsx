import * as React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { cn } from '@frontend/shared/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@frontend/shared/components/ui/popover';
import { Button } from '@frontend/shared/components/ui/button';
import { Calendar } from '@frontend/shared/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import backupHistoryService, {
  useBackupHistory,
} from '../backup-history.service';

export function Filter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const { setState } = useBackupHistory();

  const onSetDate: SelectRangeEventHandler = (date) => {
    setDate(date);
    if (date && date.from && date.to) {
      setState('filter', {
        fromDate: format(date.from, 'yyyy-MM-dd'),
        toDate: format(date.to, 'yyyy-MM-dd'),
      });
      backupHistoryService.resetPaging();
      backupHistoryService.getBackup();
    }
  };

  const onReset = () => {
    setDate({
      from: new Date(),
      to: new Date(),
    });
    setState('filter', {
      fromDate: null,
      toDate: null,
    });
    backupHistoryService.resetPaging();
    backupHistoryService.getBackup();
  };

  return (
    <div className="flex gap-2">
      <div className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-auto justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-foreground" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={onSetDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
}
