import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { tasks } from '@/drizzle/schema/task';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
export const TaskSelectSchema = createSelectSchema(tasks);

export const TaskFormSchema = createInsertSchema(tasks, {
  id: (s) => s,
  userId: (s) => s,
}).pick({
  listId: true,
  completedAt: true,
  name: true,
  description: true,
  dueDate: true,
  duration: true,
  priority: true
});

export type Task = z.infer<typeof TaskSelectSchema>;

export type TaskPayload = z.infer<typeof TaskFormSchema & {labelIds:string[]}>;

export type PaginatedPage = PaginatedResponse<Task>;