import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { List, ListPayload } from '../config/list.type';

const listSearch = createSearchParams();
export class ListServiceImpl extends BaseServiceImpl<List, ListPayload> {
  protected endpoints = API_ENDPOINTS.lists;
  protected serializeParams(filter: Filter): string {
    return listSearch.serialize(filter);
  }
}
export const listService = new ListServiceImpl();