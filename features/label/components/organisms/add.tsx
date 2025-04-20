import { LabelForm } from '../molecules/label-form';
  import { useLabelMutations } from '../../hooks/use-label';
  import { labelKeys } from '../../config/label.key';
  import { LabelPayload } from '../../config/label.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createLabel, isCreating } = useLabelMutations();
  
    const handleSubmit = async (data: LabelPayload) => {
      await createLabel(data);
    };
  
    return (
      <EntityForm<LabelPayload>
        title="Label"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={LabelForm}
        queryKey={labelKeys.all}
        mode="add"
      />
    );
  }