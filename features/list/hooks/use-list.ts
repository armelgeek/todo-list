import { listService } from '../domain/list.service';
import { List, ListPayload } from '../config/list.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const LIST_KEYS = {
  all: ['lists'] as const,
  lists: () => [...LIST_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...LIST_KEYS.lists(), { filters }] as const,
  details: () => [...LIST_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...LIST_KEYS.details(), slug] as const,
};

export const useLists = (filters: Filter) => {
  return useList<List>(
    LIST_KEYS,
    listService,
    filters
  );
};

export const useList = (slug: string) => {
  const { data, isLoading } = useDetail<List>(
    LIST_KEYS,
    listService,
    slug
  );

  return {
    list: data,
    isLoading,
  };
};

export const useListMutations = () => {

  const mutations = useMutations<List, ListPayload>({
    service: listService,
    queryKeys: LIST_KEYS,
    successMessages: {
      create: 'List created successfully',
      update: 'List updated successfully',
      delete: 'List deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createList: mutations.create,
    updateList: mutations.update,
    deleteList: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
