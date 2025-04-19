import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Task, TaskPayload } from '../config/task.type';

const taskSearch = createSearchParams();
export class TaskServiceImpl extends BaseServiceImpl<Task, TaskPayload> {
  protected endpoints = API_ENDPOINTS.tasks;
  protected serializeParams(filter: Filter): string {
    return taskSearch.serialize(filter);
  }
}
export const taskService = new TaskServiceImpl();