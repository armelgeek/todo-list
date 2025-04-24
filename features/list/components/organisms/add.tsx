import { ListForm } from '../molecules/list-form';
  import { useListMutations } from '../../hooks/use-list';
  import { listKeys } from '../../config/list.key';
  import { ListPayload } from '../../config/list.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createList, isCreating } = useListMutations();
  
    const handleSubmit = async (data: ListPayload) => {
      await createList(data);
    };
  
    return (
      <EntityForm<ListPayload>
        title="List"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={ListForm}
        queryKey={listKeys.all}
        mode="add"
      />
    );
  }