import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { labels } from '@/drizzle/schema/label';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const LabelSelectSchema = createSelectSchema(labels);

export const LabelFormSchema = createInsertSchema(labels, {
  id: (s) => s,
  userId: (s) => s,
}).pick({
  id: true,
  userId: true,
});

export type Label = z.infer<typeof LabelSelectSchema>;

export type LabelPayload = z.infer<typeof LabelFormSchema>;

export type PaginatedPage = PaginatedResponse<Label>;