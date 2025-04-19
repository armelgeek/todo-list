import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { Label, LabelPayload } from '../config/label.type';

const labelSearch = createSearchParams();
export class LabelServiceImpl extends BaseServiceImpl<Label, LabelPayload> {
  protected endpoints = API_ENDPOINTS.labels;
  protected serializeParams(filter: Filter): string {
    return labelSearch.serialize(filter);
  }
}
export const labelService = new LabelServiceImpl();