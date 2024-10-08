import * as React from 'react';
import { useRef } from 'react';
import { Button } from '@frontend/shared/components/ui/button';
import backupHistoryService, { initialState } from '../backup-history.service';
import { DatePicker, DatePickerRef } from '../../../core/date-picker';

export function Filter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { setState, getState } = backupHistoryService;

  const datePickerRef = useRef<DatePickerRef>(null);

  const handleDateChange = (date: { from: string; to: string }) => {
    setState('filter', {
      fromDate: date.from,
      toDate: date.to,
    });
    handleFilterChange();
  };

  const onReset = () => {
    setState('filter', {
      fromDate: initialState.filter.fromDate,
      toDate: initialState.filter.toDate,
    });
    handleFilterChange();
    if (datePickerRef.current) {
      datePickerRef.current.resetDate();
    }
  };

  const handleFilterChange = () => {
    backupHistoryService.resetPaging();
    backupHistoryService.getBackup();
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <DatePicker ref={datePickerRef} onDateChange={handleDateChange} />

      {JSON.stringify(getState().filter) !==
        JSON.stringify(initialState.filter) && (
        <Button onClick={onReset}>Reset</Button>
      )}
    </div>
  );
}
