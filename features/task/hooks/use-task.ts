import { taskService } from '../domain/task.service';
import { Task, TaskPayload } from '../config/task.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const TASK_KEYS = {
  all: ['tasks'] as const,
  lists: () => [...TASK_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...TASK_KEYS.lists(), { filters }] as const,
  details: () => [...TASK_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...TASK_KEYS.details(), slug] as const,
};

export const useTasks = (filters: Filter) => {
  return useList<Task>(
    TASK_KEYS,
    taskService,
    filters
  );
};

export const useTask = (slug: string) => {
  const { data, isLoading } = useDetail<Task>(
    TASK_KEYS,
    taskService,
    slug
  );

  return {
    task: data,
    isLoading,
  };
};

export const useTaskMutations = () => {

  const mutations = useMutations<Task, TaskPayload>({
    service: taskService,
    queryKeys: TASK_KEYS,
    successMessages: {
      create: 'Task created successfully',
      update: 'Task updated successfully',
      delete: 'Task deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createTask: mutations.create,
    updateTask: mutations.update,
    deleteTask: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
