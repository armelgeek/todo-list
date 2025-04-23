'use client';

import * as React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Flag, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export type StatusOption<T = string> = { 
  value: T; 
  color: string; 
  label: string;
  icon?: React.ReactNode;
};

export function StatusItem<T>({
  option,
  onSelect,
}: {
  option: StatusOption<T>;
  onSelect: (value: T) => void;
}) {
  return (
    <Button
      onClick={() => onSelect(option.value)}
      variant="ghost"
      className="w-full justify-start px-2 h-8"
    >
      {option.icon || (
        <Flag className="w-4 h-4 mr-2" style={{ color: option.color }} />
      )}
      {option.label}
    </Button>
  );
}

type ControlledStatusSelectorProps<T extends FieldValues, V = string> = UseControllerProps<T> & {
  label?: string;
  options: StatusOption<V>[];
  small?: boolean;
  defaultIcon?: React.ReactNode;
};

export function ControlledStatusSelector<T extends FieldValues, V = string>({
  name,
  control,
  defaultValue,
  label,
  options,
  small = false,
  defaultIcon = <Flag className="w-4 h-4" />,
}: ControlledStatusSelectorProps<T, V>) {
  const { field, fieldState } = useController<T>({
    control,
    name,
    defaultValue,
  });

  const [open, setOpen] = React.useState(false);
  
  const selectedOption = React.useMemo(() => {
    return options.find(o => o.value === field.value);
  }, [field.value, options]);

  const onSelect = (value: V) => {
    setOpen(false);
    field.onChange(value);
  };

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    field.onChange(null);
  };

  const icon = selectedOption?.icon || (
    <Flag 
      className="w-4 h-4" 
      style={{ color: selectedOption?.color }} 
    />
  );

  return (
    <FormItem className="flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger
            aria-expanded={open}
            className={cn(
              buttonVariants({ variant: 'outline' }), 
              'w-fit gap-2',
              fieldState.error?.message && "border-destructive"
            )}
          >
            {field.value ? icon : defaultIcon}
            {field.value && (
              <span className="flex-gap">
                {selectedOption?.label || field.value}
                <X 
                  className="w-4 h-4 ml-2" 
                  onClick={onRemove} 
                />
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-1">
            {options.map((option) => (
              <StatusItem
                key={String(option.value)}
                option={option}
                onSelect={onSelect}
              />
            ))}
            <Button
              onClick={() => field.onChange(null)}
              variant="ghost"
              className="w-full justify-start px-2 h-8"
            >
              {defaultIcon}
              <span className="ml-2">None</span>
            </Button>
          </PopoverContent>
        </Popover>
      </FormControl>
      {fieldState.error?.message && (
        <p className="text-xs my-1 text-red-500">{fieldState.error?.message}</p>
      )}
    </FormItem>
  );
}