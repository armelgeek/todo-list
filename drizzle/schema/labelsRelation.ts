import { relations } from "drizzle-orm";
import { labels } from "./label";
import { users } from "./auth";
import { taskLabels } from "./taskLabel";

export const labelsRelations = relations(labels, ({ one, many }) => ({
    user: one(users, {
      fields: [labels.userId],
      references: [users.id],
    }),
    tasks: many(taskLabels),
  }));