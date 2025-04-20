import { TaskForm } from '../molecules/task-form';
  import { useTaskMutations } from '../../hooks/use-task';
  import { taskKeys } from '../../config/task.key';
  import { TaskPayload } from '../../config/task.type';
  import { EntityForm } from '@/shared/components/molecules/form/add-entity';
  
  export function Add() {
    const { createTask, isCreating } = useTaskMutations();
  
    const handleSubmit = async (data: TaskPayload) => {
      await createTask(data);
    };
  
    return (
      <EntityForm<TaskPayload>
        title="Task"
        initialData={null}
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        Form={TaskForm}
        queryKey={taskKeys.all}
        mode="add"
      />
    );
  }