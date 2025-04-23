'use client';

import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { TaskPayload } from '../../config/task.type';
import { TaskForm } from '../molecules/task-form';
import { taskKeys } from '../../config/task.key';
import { useTask, useTaskMutations } from '../../hooks/use-task';
import { usePathname } from 'next/navigation';
import { useLayoutStore } from '@/shared/store/layout-store';

interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const { closeTaskOverlay } = useLayoutStore();
  const path = usePathname();

  const { task } = useTask(slug);
  const { updateTask, isUpdating } = useTaskMutations();
  /**const { data: labelsData } = useLabels({
    page: 1,
    pageSize: 100,
  });**/

  const handleSubmit = async (data: TaskPayload) => {
    await updateTask({ slug, data });

    /**const labelsToAdd = labelsData.filter(
      (label) =>
        data.labelIds?.includes(label.id) &&
        !task.labels?.some((tLabel) => tLabel.id === label.id),
    );
    const labelsToRemove =
      task.labels?.filter(
        (tLabel) => !data.labelIds?.includes(tLabel.id),
      ) || [];

    const addLabelPromises = labelsToAdd.map((label) =>
      TaskService.addLabel({ taskId: task.id, labelId: label.id }),
    );

    const removeLabelPromises = labelsToRemove.map((label) =>
      TaskService.removeLabel({ taskId: task.id, labelId: label.id }),
    );

    await Promise.all([...addLabelPromises, ...removeLabelPromises]);**/


    onComplete?.();
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