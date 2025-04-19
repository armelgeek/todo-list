import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { tasks } from "./task";
import { users } from "./auth";

export const subtasks = pgTable('subtasks', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    taskId: uuid('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    order: integer('order').notNull(),
    name: text('name').notNull(),
    slug: varchar('slug', { length: 50 }).notNull().unique(),
    isComplete: boolean('is_complete').default(false).notNull(),
  });
  