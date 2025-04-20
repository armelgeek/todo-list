'use client';
  
  import { useLabelMutations } from '../../hooks/use-label';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { labelKeys } from '../../config/label.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteLabel } = useLabelMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Label"
        deleteService={async (id: string) => await deleteLabel(id)}
        queryKey={labelKeys.all}
        onActionComplete={onComplete}
      />
    );
  }