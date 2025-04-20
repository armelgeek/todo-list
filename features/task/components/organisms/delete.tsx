'use client';
  
  import { useTaskMutations } from '../../hooks/use-task';
  import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
  import { taskKeys } from '../../config/task.key';
  
  interface DeleteProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Delete({ slug, onComplete }: DeleteProps) {
    const { deleteTask } = useTaskMutations();
  
    return (
      <EntityDelete
        entityId={slug}
        entityName="Task"
        deleteService={async (id: string) => await deleteTask(id)}
        queryKey={taskKeys.all}
        onActionComplete={onComplete}
      />
    );
  }