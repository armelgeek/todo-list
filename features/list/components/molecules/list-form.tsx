import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { List, ListPayload } from '../../config/list.type';
import { ListFormSchema } from '../../config/list.schema';

interface ListFormProps {
  initialData: Partial<List> | null;
  onSubmit: (input: ListPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const ListForm = ({ initialData = null, onSubmit, onSuccess }: ListFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<ListPayload>({
    schema: ListFormSchema,
    initialValues: initialData || {
      name: ''
    },
    onSubmit,
    onSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledTextInput
            name="name"
            label="Name"
            placeholder="List Name"
            control={form.control}
          />

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Save changes'
            ) : (
              'Create List'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}