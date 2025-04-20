'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { LabelPayload } from '../../config/label.type';
  import { LabelForm } from '../molecules/label-form';
  import { labelKeys } from '../../config/label.key';
  import { useLabel, useLabelMutations } from '../../hooks/use-label';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { label } = useLabel(slug);
    const { updateLabel, isUpdating } = useLabelMutations();
  
    const handleSubmit = async (data: LabelPayload) => {
      await updateLabel({ slug, data });
      onComplete?.();
    };
  
    if (!label) {
      return null;
    }
  
    return (
      <EntityForm<LabelPayload>
        title="Label"
        initialData={label}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={LabelForm}
        queryKey={labelKeys.all}
        mode="edit"
      />
    );
  }