import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { tasks } from "./task";
import { labels } from "./label";

export const taskLabels = pgTable('task_labels', {
    taskId: uuid('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
    labelId: uuid('label_id').notNull().references(() => labels.id, { onDelete: 'cascade' }),
  }, (table) => {
    return {
      pk: primaryKey({ columns: [table.taskId, table.labelId] }),
    };
  });
  