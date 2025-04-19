import { relations } from "drizzle-orm";
import { users } from "./auth";
import { lists } from "./list";
import { tasks } from "./task";

export const listsRelations = relations(lists, ({ one, many }) => ({
    user: one(users, {
      fields: [lists.userId],
      references: [users.id],
    }),
    tasks: many(tasks),
  }));
  