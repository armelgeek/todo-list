import { relations } from "drizzle-orm";
import { taskLabels } from "./taskLabel";
import { tasks } from "./task";
import { labels } from "./label";

export const taskLabelsRelations = relations(taskLabels, ({ one }) => ({
    task: one(tasks, {
      fields: [taskLabels.taskId],
      references: [tasks.id],
    }),
    label: one(labels, {
      fields: [taskLabels.labelId],
      references: [labels.id],
    }),
  }));