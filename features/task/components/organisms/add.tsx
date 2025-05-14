"use client";
import { TaskForm } from '../molecules/task-form';
import { useTaskMutations } from '../../hooks/use-task';
import { taskKeys } from '../../config/task.key';
import { TaskPayload } from '../../config/task.type';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useLayoutStore } from '@/shared/store/layout-store';
import { add } from 'date-fns';
import { useLabelMutations } from '@/features/label/hooks/use-label';
interface TaskAddProps {
  close: () => void;
  preview?: boolean;
}

export function Add({
  preview = false,
  close,
}: TaskAddProps) {
  const { closeTaskOverlay } = useLayoutStore();
  const path = usePathname();
  const { createTask, isCreating } = useTaskMutations();
  const { createLabel} = useLabelMutations();

  const handleSubmit = async (data: TaskPayload) => {
    if (preview) {
      toast.success('Task created!');
      return;
    }
    const realDate = data?.dueDate
      ? add(new Date(data.dueDate), { days: 1 })
      : data.dueDate;

    console.log('due data', realDate);
    await createTask({ ...data, dueDate: new Date(realDate) });
    /**if (data.labelIds?.length) {
      const labelPromises = data.labelIds.map((labelId) =>
        TaskService.addLabel({ taskId: createdTask.id, labelId }),
      );

     

      await Promise.all(labelPromises);
    } */
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (close) {
      close();
    }
    closeTaskOverlay();
  };
  const onCancel = () => {
    if (close) {
      close();
    }
    closeTaskOverlay();
  };
  return (
    <EntityForm<TaskPayload>
      title="Task"
      initialData={{
        name: '',
        description: '',
        dueDate: (path === '/today') ? new Date() : new Date(),
        priority: 'LOW',
        listId: '',
        labelIds: []
      }}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isSubmitting={isCreating}
      Form={TaskForm}
      queryKey={taskKeys.all}
      mode="add"
    />
  );
}