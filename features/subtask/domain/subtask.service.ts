import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Subtask, SubtaskPayload } from '../config/subtask.type';

const subtaskSearch = createSearchParams();
export class SubtaskServiceImpl extends BaseServiceImpl<Subtask, SubtaskPayload> {
  protected endpoints = API_ENDPOINTS.subtasks;
  protected serializeParams(filter: Filter): string {
    return subtaskSearch.serialize(filter);
  }
}
export const subtaskService = new SubtaskServiceImpl();