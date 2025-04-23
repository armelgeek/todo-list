'use client';

import React from 'react';
import { MentionsInput as ReactMentionInput, Mention } from 'react-mentions';
import { FieldValues, Path, useController, UseControllerProps } from 'react-hook-form';
import {
  extractName,
  extractLabelIds,
  extractListId,
  formatMentionInput,
} from '@/shared/lib/mention-processor';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { List } from '@/features/list/config/list.type';
import { Label } from '@/features/label/config/label.type';
import { cn } from '@/shared/lib/utils';

interface ControlledMentionInputProps<T extends FieldValues> extends UseControllerProps<T> {
  name: Path<T>;
  namePath: Path<T>;
  listIdPath: Path<T>;
  labelIdsPath: Path<T>;
  lists: List[];
  labels: Label[];
  label?: string;
  placeholder?: string;
  small?: boolean;
  preview?: boolean;
}

export function ControlledMentionInput<T extends FieldValues>({
  name,
  namePath,
  listIdPath,
  labelIdsPath,
  control,
  label,
  lists,
  labels,
  placeholder,
  small = false,
  preview = false,
  ...props
}: ControlledMentionInputProps<T>) {
  const { field } = useController({
    name,
    control,
  });

  // Get the current values from the form
  const nameController = useController({ name: namePath, control });
  const listIdController = useController({ name: listIdPath, control });
  const labelIdsController = useController({ name: labelIdsPath, control });

  const taskName = nameController.field.value;
  const listId = listIdController.field.value;
  const labelIds = labelIdsController.field.value;

  const [input, setInput] = React.useState(
    formatMentionInput({ 
      name: taskName, 
      listId, 
      labelIds, 
      lists, 
      labels 
    })
  );

  React.useEffect(() => {
    setInput(formatMentionInput({ 
      name: taskName, 
      listId, 
      labelIds, 
      lists, 
      labels 
    }));
  }, [taskName, listId, labelIds, lists, labels]);
  const formattedLists = listId
    ? []
    : lists.map((list) => ({
        id: list.id,
        display: list.name,
      }));

  const formattedLabels = labels
    .filter((label) => !labelIds?.includes(label.id))
    .map((label) => ({
      id: label.id,
      display: label.name,
    }));

  const onChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value;
    setInput(newValue);
    field.onChange(newValue);
    
    // Update the form values based on the input
    nameController.field.onChange(extractName(newValue));
    listIdController.field.onChange(extractListId(newValue));
    labelIdsController.field.onChange(extractLabelIds(newValue));
  };

  return (
    <FormItem className="flex flex-col gap-1">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <ReactMentionInput
          value={input}
          onChange={(e) => onChange(e)}
          className={cn('w-full font-semibold', small ? 'text-sm' : 'text-lg')}
          placeholder={placeholder || (preview ? 'Experiment with @ or # mentions...' : 'Task Name')}
          spellCheck={false}
          autoComplete="off"
          onBlur={field.onBlur}
          {...props}
        >
          <Mention
            markup="@[__display__](at:__id__)"
            trigger="@"
            data={formattedLists}
            className="bg-emerald-200 dark:bg-emerald-700"
          />
          <Mention
            markup="@[__display__](hash:__id__)"
            trigger="#"
            data={formattedLabels}
            className="bg-sky-200 dark:bg-sky-700"
          />
          <Mention
            markup="@[__display__](cmd:__id__)"
            trigger="/"
            data={formattedLists}
            className="bg-sky-200 dark:bg-sky-700"
          />
        </ReactMentionInput>
      </FormControl>
      {nameController.fieldState.error?.message && (
        <p className="text-xs my-1 text-red-500">{nameController.fieldState.error?.message}</p>
      )}
    </FormItem>
  );
}