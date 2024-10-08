import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@frontend/shared/components/ui/select';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button } from '@frontend/shared/components/ui/button';
import { X } from 'lucide-react';

interface DropdownProps {
  options: { label: string; value: string }[];
  placeholder: string;
  label: string;
  onValueChange: (value: string | null) => void;
}

export const Dropdown = forwardRef<{ reset: () => void }, DropdownProps>(
  ({ options, placeholder, onValueChange, label }, ref) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (value: string) => {
      setSelectedValue(value);
      onValueChange(value);
    };

    const handleReset = () => {
      setSelectedValue(null);
      onValueChange(null);
    };

    useImperativeHandle(ref, () => ({
      reset: handleReset,
    }));

    return (
      <div className="relative w-[200px]">
        <div className="relative">
          <Select
            onValueChange={handleChange}
            value={selectedValue || ''}
            onOpenChange={(open) => setIsFocused(open)}
          >
            <SelectTrigger
              id="dropdown"
              className="w-full h-11 py-2 border rounded-md bg-background"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <SelectValue placeholder=" " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{placeholder}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <label
            htmlFor="dropdown"
            className={`absolute left-3 px-1 transition-all duration-200 pointer-events-none
              ${
                isFocused || selectedValue
                  ? '-top-2 text-xs text-primary z-10'
                  : 'top-3 text-sm text-muted-foreground'
              }
            `}
          >
            <span className="bg-background px-1">{label}</span>
          </label>
          {selectedValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-8 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear selection</span>
            </Button>
          )}
        </div>
      </div>
    );
  }
);
