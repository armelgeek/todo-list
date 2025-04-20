import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Label, LabelPayload } from '../../config/label.type';
import { LabelFormSchema } from '../../config/label.schema';

interface LabelFormProps {
  initialData: Partial<Label> | null;
  onSubmit: (input: LabelPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const LabelForm = ({ initialData = null, onSubmit, onSuccess }: LabelFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<LabelPayload>({
    schema: LabelFormSchema,
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
            name="color"
            label="Color"
            type='color'
            placeholder="Label Color"
            control={form.control}
          />
           <ControlledTextInput
            name="name"
            label="Name"
            placeholder="Label Name"
            control={form.control}
          />

          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Update Label'
            ) : (
              'Create Label'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}