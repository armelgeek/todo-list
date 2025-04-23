'use client';
import * as React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Icons } from '@/components/ui/icons';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/shared/lib/utils';
import { Check, ChevronDown } from 'lucide-react';

type ControlledListPickerProps<T extends FieldValues> = UseControllerProps<T> & {
  lists: T[];
  label?: string;
};

export function ControlledListPicker<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  lists
}: ControlledListPickerProps<T>) {
  const { field, fieldState } = useController<T>({
    control,
    name,
    defaultValue,
  });

  const [open, setOpen] = React.useState(false);
  
  const selectedListName = React.useMemo(() => {
    const listId = field.value;
    return lists.find(list => list.id === listId)?.name || 'Inbox';
  }, [field.value, lists]);

  const onSelect = (list?: T) => {
    if (list) {
      field.onChange(list.id);
      setOpen(false);
    } else {
      field.onChange(null);
      setOpen(false);
    }
  };

  return (
    <FormItem className="flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen} modal>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-fit justify-between",
                fieldState.error?.message && "border-destructive"
              )}
            >
              {selectedListName}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px] p-0">
            <Command>
              <CommandGroup>
                <CommandItem value="inbox" onSelect={() => onSelect()}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      !field.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  Inbox
                </CommandItem>
                {lists.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => onSelect(item)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        field.value === item.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </FormControl>
      {fieldState.error?.message && (
        <p className="text-xs my-1 text-red-500">{fieldState.error?.message}</p>
      )}
    </FormItem>
  );
}