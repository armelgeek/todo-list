import { relations } from "drizzle-orm";
import { users } from "./auth";
import { subtasks } from "./subtask";
import { tasks } from "./task";

export const subtasksRelations = relations(subtasks, ({ one }) => ({
    task: one(tasks, {
      fields: [subtasks.taskId],
      references: [tasks.id],
    }),
    user: one(users, {
      fields: [subtasks.userId],
      references: [users.id],
    }),
  }));
  