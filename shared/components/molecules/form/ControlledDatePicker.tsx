'use client';

import * as React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { format } from 'date-fns';
import { addDays } from 'date-fns';

import { Button, buttonVariants } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/experimental-calendar';
import { CalendarCheck2, CircleSlash, Sunset, Armchair, Calendar1, X } from 'lucide-react';
import { useMounted } from '@/shared/hooks/use-mounted';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/shared/lib/utils';

type ControlledDatePickerProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  small?: boolean;
};

export function ControlledDatePicker<T extends FieldValues>({
  name,
  label,
  control,
  defaultValue,
  small = false,
}: ControlledDatePickerProps<T>) {
  const { field } = useController<T>({
    control,
    name,
    defaultValue,
  });

  const isMounted = useMounted();
  const [open, setOpen] = React.useState(false);

  const dateValue = field.value && typeof field.value === 'string' ? new Date(field.value) : field.value;
  if (!isMounted) return null;

  const dateOptions = [
    { value: '0', label: 'Today', icon: CalendarCheck2 },
    { value: '1', label: 'Tomorrow', icon: Sunset },
    { value: '7', label: 'In a week', icon: Armchair },
  ];

  const onSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      field.onChange(selectedDate);
      setOpen(false);
    }
  };

  const onRemove = () => {
    field.onChange(null);
    setOpen(false);
  };

  return (
    <FormItem className="flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full gap-2')}
          >
            <Calendar1 className="h-4 w-4" />
            {field.value ? (
              <span className="flex-gap">
                {format(dateValue, 'dd-MM-yyyy')}
                <X className="h-4 w-4 ml-2" onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }} />
              </span>
            ) : (
              !small && <span>Schedule</span>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[220px]">
            <div className="py-2">
              {dateOptions.map((option) => (
                <Button
                  key={option.value}
                  className="w-full justify-start text-xs px-3 h-6 rounded-none"
                  variant="ghost"
                  onClick={() =>
                    onSelect(addDays(new Date(), parseInt(option.value, 10)))
                  }
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  {option.label}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {format(
                      addDays(new Date(), parseInt(option.value, 10)),
                      'EEEE',
                    )}
                  </span>
                </Button>
              ))}
              <Button
                className="w-full justify-start text-xs px-3 h-6 rounded-none"
                variant="ghost"
                onClick={onRemove}
              >
                <CircleSlash className="h-4 w-4 mr-2" />
                No Date
              </Button>
            </div>
            <Separator />
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={onSelect}
              initialFocus
              className="p-1"
            />
          </PopoverContent>
        </Popover>
      </FormControl>
    </FormItem>
  );
}