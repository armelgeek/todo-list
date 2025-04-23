import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLabels } from '@/features/label/hooks/use-label';
import { useLists } from '@/features/list/hooks/use-list';
import { ControlledDatePicker } from '@/shared/components/molecules/form/ControlledDatePicker';
import { ControlledStatusSelector } from '@/shared/components/molecules/form/ControlledStatusSelector';
import { ControlledListPicker } from '@/shared/components/molecules/form/ControllerListPicker';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { TaskFormSchema } from '../../config/task.schema';
import { Task, TaskPayload } from '../../config/task.type';
import { ControlledTextareaInput } from '@/shared/components/molecules/form/ControlledTextareaInput';
import { ControlledMentionInput } from '@/shared/components/molecules/form/ControlledMentionInput';

interface TaskFormProps {
  initialData: Partial<Task> | null;
  onSubmit: (input: TaskPayload) => Promise<void>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const TaskForm = ({ initialData = null, onSubmit, onSuccess, onCancel }: TaskFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<TaskPayload>({
    schema: TaskFormSchema,
    initialValues: initialData || {
      name: '',
      listId: '',
    },
    onSubmit,
    onSuccess,
  });

  const { data: listsData } = useLists({ page: 1, pageSize: 100 });
  const { data: labelsData } = useLabels({
    page: 1,
    pageSize: 100,
  });

  const priorityOptions: { value: string; color: string; label: string }[] = [
    { value: 'HIGH', color: '#EF4444', label: 'High' },
    { value: 'MEDIUM', color: '#EAB308', label: 'Medium' },
    { value: 'LOW', color: '#0EA5E9', label: 'Low' },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-4">

          <ControlledMentionInput
            name="name"
            namePath="name"
            listIdPath="listId"
            labelIdsPath="labelIds"
            control={form.control}
            label="Task"
            lists={listsData}
            labels={labelsData}
          />
          <ControlledTextareaInput
            name="description"
            label="Description"
            placeholder="Task Description"
            control={form.control}
          />

          <div className="flex-gap max-w-full flex-wrap p-3 pt-0">
            <ControlledDatePicker
              name="dueDate"
              label="Due Date"
              control={form.control}
              small={true}
            />

            <ControlledStatusSelector
              name="priority"
              control={form.control}
              label="Priorité"
              options={priorityOptions}
              small={true}
            />
          </div>
          <div className="flex-between p-3">
            <ControlledListPicker
              name="listId"
              control={form.control}
              label="Select List"
              lists={listsData}
            />
            <div className="flex-gap">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : initialData ? (
                  'Save changes'
                ) : (
                  'Create Task'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
