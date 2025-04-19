import { sql } from "drizzle-orm";
import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const lists = pgTable('lists', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    slug: varchar('slug', { length: 50 }).notNull().unique(),
    order: integer('order').notNull(),
  });