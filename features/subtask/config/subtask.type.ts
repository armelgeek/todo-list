import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { subtasks } from '@/drizzle/schema/subtask';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const SubtaskSelectSchema = createSelectSchema(subtasks);

export const SubtaskFormSchema = createInsertSchema(subtasks, {
  id: (s) => s,
  taskId: (s) => s,
}).pick({
  id: true,
  taskId: true,
  userId: true,
  name: true,
  order: true,
  isComplete: true
});

export type Subtask = z.infer<typeof SubtaskSelectSchema>;

export type SubtaskPayload = z.infer<typeof SubtaskFormSchema>;

export type PaginatedPage = PaginatedResponse<Subtask>;