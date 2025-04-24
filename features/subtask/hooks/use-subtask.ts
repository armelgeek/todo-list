import { subtaskService } from '../domain/subtask.service';
import { Subtask, SubtaskPayload } from '../config/subtask.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const SUBTASK_KEYS = {
  all: ['subtasks'] as const,
  lists: () => [...SUBTASK_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...SUBTASK_KEYS.lists(), { filters }] as const,
  details: () => [...SUBTASK_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...SUBTASK_KEYS.details(), slug] as const,
};

export const useSubtasks = (filters: Filter) => {
  return useList<Subtask>(
    SUBTASK_KEYS,
    subtaskService,
    filters
  );
};

export const useSubtask = (slug: string) => {
  const { data, isLoading } = useDetail<Subtask>(
    SUBTASK_KEYS,
    subtaskService,
    slug
  );

  return {
    subtask: data,
    isLoading,
  };
};

export const useSubtaskMutations = () => {

  const mutations = useMutations<Subtask, SubtaskPayload>({
    service: subtaskService,
    queryKeys: SUBTASK_KEYS,
    successMessages: {
      create: 'Subtask created successfully',
      update: 'Subtask updated successfully',
      delete: 'Subtask deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createSubtask: mutations.create,
    updateSubtask: mutations.update,
    deleteSubtask: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
