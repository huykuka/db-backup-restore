import * as React from 'react';
import { useRef } from 'react';
import { DatePicker, DatePickerRef } from '../../../core/date-picker';
import statusHistoryService, {
  statusHistoryInitialState,
} from '../status-history.service';
import { Button } from '@frontend/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@frontend/shared/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';

export function Filter() {
  const { setState, getState } = statusHistoryService;

  const datePickerRef = useRef<DatePickerRef>(null);

  const handleDateChange = (date: { from: string; to: string }) => {
    setState('filter', {
      ...getState().filter,
      fromDate: date.from,
      toDate: date.to,
    });
    handleFilterChange();
  };

  const handleTypeChange = (type: string) => {
    setState('filter', {
      ...getState().filter,
      type,
    });
    handleFilterChange();
  };

  const handleStatusChange = (status: string) => {
    setState('filter', {
      ...getState().filter,
      status,
    });
    handleFilterChange();
  };

  const onReset = () => {
    setState('filter', {
      fromDate: statusHistoryInitialState.filter.fromDate,
      toDate: statusHistoryInitialState.filter.toDate,
      type: statusHistoryInitialState.filter.type,
      status: statusHistoryInitialState.filter.status,
    });
    handleFilterChange();
    if (datePickerRef.current) {
      datePickerRef.current.resetDate();
    }
  };

  const handleFilterChange = () => {
    statusHistoryService.resetPaging();
    statusHistoryService.getStatusHistories();
  };

  return (
    <div className="flex flex-row gap-2">
      <DatePicker ref={datePickerRef} onDateChange={handleDateChange} />

      <Select onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Action</SelectLabel>
            <SelectItem value="backup">Backup</SelectItem>
            <SelectItem value="restore">Restore</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="pass">Pass</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {JSON.stringify(getState().filter) !==
        JSON.stringify(statusHistoryInitialState.filter) && (
        <Button onClick={onReset}>Reset</Button>
      )}
    </div>
  );
}
