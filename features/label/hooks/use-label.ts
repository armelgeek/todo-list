import { labelService } from '../domain/label.service';
import { Label, LabelPayload } from '../config/label.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const LABEL_KEYS = {
  all: ['labels'] as const,
  lists: () => [...LABEL_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...LABEL_KEYS.lists(), { filters }] as const,
  details: () => [...LABEL_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...LABEL_KEYS.details(), slug] as const,
};

export const useLabels = (filters: Filter) => {
  return useList<Label>(
    LABEL_KEYS,
    labelService,
    filters
  );
};

export const useLabel = (slug: string) => {
  const { data, isLoading } = useDetail<Label>(
    LABEL_KEYS,
    labelService,
    slug
  );

  return {
    label: data,
    isLoading,
  };
};

export const useLabelMutations = () => {

  const mutations = useMutations<Label, LabelPayload>({
    service: labelService,
    queryKeys: LABEL_KEYS,
    successMessages: {
      create: 'Label created successfully',
      update: 'Label updated successfully',
      delete: 'Label deleted successfully'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createLabel: mutations.create,
    updateLabel: mutations.update,
    deleteLabel: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
