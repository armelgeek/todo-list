import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { lists } from '@/drizzle/schema/list';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const ListSelectSchema = createSelectSchema(lists);

export const ListFormSchema = createInsertSchema(lists, {
  id: (s) => s,
  userId: (s) => s,
}).pick({
  id: true,
  userId: true,
  name: true,
  slug: true,
  order: true
});

export type List = z.infer<typeof ListSelectSchema>;

export type ListPayload = z.infer<typeof ListFormSchema>;

export type PaginatedPage = PaginatedResponse<List>;