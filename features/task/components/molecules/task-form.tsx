import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLists } from '@/features/list/hooks/use-list';


import { Task, TaskPayload } from '../../config/task.type';
import { TaskFormSchema } from '../../config/task.schema';

interface TaskFormProps {
  initialData: Partial<Task> | null;
  onSubmit: (input: TaskPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const TaskForm = ({ initialData = null, onSubmit, onSuccess }: TaskFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<TaskPayload>({
    schema: TaskFormSchema,
    initialValues: initialData || {
      name: '',
      listId: ''
    },
    onSubmit,
    onSuccess
  });

  // Fetch lists data for relationship dropdown
  const { data: listsData } = useLists({ page: 1, pageSize: 100 });
      
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledTextInput
            name="name"
            label="Name"
            placeholder="Task Name"
            control={form.control}
          />

          <FormField
            control={form.control}
            name="listId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>ListId</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Lists" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listsData?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
      
          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Update Task'
            ) : (
              'Create Task'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}