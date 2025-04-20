'use client';
  
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  import { TaskPayload } from '../../config/task.type';
  import { TaskForm } from '../molecules/task-form';
  import { taskKeys } from '../../config/task.key';
  import { useTask, useTaskMutations } from '../../hooks/use-task';
  
  interface EditProps {
    slug: string;
    onComplete?: () => void;
  }
  
  export function Edit({ slug, onComplete }: EditProps) {
    const { task } = useTask(slug);
    const { updateTask, isUpdating } = useTaskMutations();
  
    const handleSubmit = async (data: TaskPayload) => {
      await updateTask({ slug, data });
      onComplete?.();
    };
  
    if (!task) {
      return null;
    }
  
    return (
      <EntityForm<TaskPayload>
        title="Task"
        initialData={task}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        Form={TaskForm}
        queryKey={taskKeys.all}
        mode="edit"
      />
    );
  }