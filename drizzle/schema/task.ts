import { sql } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from "./auth";
import { lists } from "./list";
export const taskPriorityEnum = pgEnum('task_priority', ['LOW', 'MEDIUM', 'HIGH']);

export const tasks = pgTable('tasks', {
     id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    listId: uuid('list_id').references(() => lists.id),
    completedAt: timestamp('completed_at'),
    order: integer('order').notNull(),
    name: text('name').notNull(),
    slug: varchar('slug', { length: 50 }).notNull().unique(),
    description: text('description'),
    dueDate: timestamp('due_date'),
    duration: integer('duration'),
    priority: taskPriorityEnum('priority'),
    isComplete: boolean('is_complete').default(false).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  });
  