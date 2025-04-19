import { relations } from "drizzle-orm";
import { accounts, users } from "./auth";
import { tasks } from "./task";
import { lists } from "./list";
import { labels } from "./label";
import { subtasks } from "./subtask";

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    tasks: many(tasks),
    lists: many(lists),
    labels: many(labels),
    subtasks: many(subtasks),
  }));