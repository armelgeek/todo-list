'use client';
  
  import { useListMutations } from '../../hooks/use-list';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { listKeys } from '../../config/list.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteList } = useListMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="List"
        deleteService={async (id: string) => await deleteList(id)}
        queryKey={listKeys.all}
        onActionComplete={onComplete}
      />
    );
  }