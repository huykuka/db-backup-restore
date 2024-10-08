import * as React from 'react';
import { useRef } from 'react';
import { DatePicker, DatePickerRef } from '../../../core/date-picker';
import statusHistoryService, {
  statusHistoryInitialState,
} from '../status-history.service';
import { Button } from '@frontend/shared/components/ui/button';
import { Dropdown } from '../../../core/dropdown';

export function Filter() {
  const { setState, getState } = statusHistoryService;

  const datePickerRef = useRef<DatePickerRef>(null);
  const dropdownRef = useRef<{ reset: () => void }>(null);

  const handleDateChange = (date: { from: string; to: string }) => {
    setState('filter', {
      ...getState().filter,
      fromDate: date.from,
      toDate: date.to,
    });
    handleFilterChange();
  };

  const handleTypeChange = (type: string | null) => {
    setState('filter', {
      ...getState().filter,
      type,
    });
    handleFilterChange();
  };

  const handleStatusChange = (status: string | null) => {
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
    <div className="flex flex-row items-center gap-2">
      <Dropdown
        ref={dropdownRef}
        options={[
          { label: 'Backup', value: 'backup' },
          { label: 'Restore', value: 'restore' },
        ]}
        label="Action"
        placeholder="Choose an action"
        onValueChange={handleTypeChange}
      />

      <Dropdown
        ref={dropdownRef}
        options={[
          { label: 'Success', value: 'success' },
          { label: 'Failed', value: 'failed' },
        ]}
        label={'Status'}
        placeholder="Choose a status"
        onValueChange={handleStatusChange}
      />

      <DatePicker ref={datePickerRef} onDateChange={handleDateChange} />

      {JSON.stringify(getState().filter) !==
        JSON.stringify(statusHistoryInitialState.filter) && (
        <Button onClick={onReset}>Reset</Button>
      )}
    </div>
  );
}
