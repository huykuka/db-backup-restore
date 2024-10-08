import * as React from 'react';
import { cn } from '@frontend/shared/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@frontend/shared/components/ui/popover';
import { Button } from '@frontend/shared/components/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Calendar } from '@frontend/shared/components/ui/calendar';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

interface DatePickerProps {
  onDateChange: (date: { from: string; to: string }) => void;
}

export interface DatePickerRef {
  resetDate: () => void;
}

export const DatePicker = React.forwardRef(
  ({ onDateChange }: DatePickerProps, ref) => {
    const initialDate = {
      from: new Date(),
      to: new Date(),
    };

    const [date, setDate] = React.useState<DateRange | undefined>(initialDate);

    const onSetDate: SelectRangeEventHandler = (date) => {
      setDate(date);
      if (date && date.from && date.to) {
        onDateChange({
          from: format(date.from, 'yyyy-MM-dd'),
          to: format(date.to, 'yyyy-MM-dd'),
        });
      }
    };

    React.useImperativeHandle(ref, () => ({
      resetDate: () => {
        setDate(initialDate);
      },
    }));

    return (
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
            selected={{
              from: date?.from,
              to: date?.to,
            }}
            onSelect={onSetDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
