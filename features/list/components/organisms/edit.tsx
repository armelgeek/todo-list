'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { ListPayload } from '../../config/list.type';
  import { ListForm } from '../molecules/list-form';
  import { listKeys } from '../../config/list.key';
  import { useList, useListMutations } from '../../hooks/use-list';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { list } = useList(slug);
    const { updateList, isUpdating } = useListMutations();
  
    const handleSubmit = async (data: ListPayload) => {
      await updateList({ slug, data });
      onComplete?.();
    };
  
    if (!list) {
      return null;
    }
  
    return (
      <EntityForm<ListPayload>
        title="List"
        initialData={list}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={ListForm}
        queryKey={listKeys.all}
        mode="edit"
      />
    );
  }