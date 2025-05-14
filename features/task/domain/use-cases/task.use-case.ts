import 'server-only';
import { eq, isNull, max, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { tasks } from '@/drizzle/schema/task';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Task, TaskPayload } from '../../config/task.type';
import { TaskFormSchema } from '../../config/task.schema';
import { labels, subtasks, taskLabels } from '@/drizzle/schema';
type CustomOperations = {
  createTaskLabel?: (taskId: string, labelId: string) => Promise<{ message: string }>
};
export const taskUseCase = new UseCase<Task, TaskPayload, unknown,CustomOperations> ({
  name: 'Task',
  schema: TaskFormSchema,
  operations: {
    async create(data: TaskPayload) {
      const slug = slugify(data.name, { lower: true });
      const existingTask = await db.query.tasks.findFirst({
        where: eq(tasks.slug, slug),
      });
      let lastTaskOrder;

      if (data.listId) {
        const result = await db
          .select({ maxOrder: max(tasks.order) })
          .from(tasks)
          .where(eq(tasks.listId, data.listId));

        lastTaskOrder = result[0]?.maxOrder;
      } else {
        const result = await db
          .select({ maxOrder: max(tasks.order) })
          .from(tasks)
          .where(isNull(tasks.listId));

        lastTaskOrder = result[0]?.maxOrder;
      }

      const newOrder = lastTaskOrder ? lastTaskOrder + 1 : 1;
      if (existingTask) {
        throw new Error('Task with this name already exists');
      }
      const [task] = await db
        .insert(tasks)
        .values({ ...data, slug, order: newOrder , dueDate: new Date(data.dueDate!)})
        .returning();

      return task;
    },

    async getById(slug: string) {
      const task = await db.query.tasks.findFirst({
        where: eq(tasks.slug, slug)
      });
      return task ?? null;
    },

    async update(slug: string, data: TaskPayload) {
      await db
        .update(tasks)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(tasks.slug, slug));

      return { message: 'Task updated successfully' };
    },

    async delete(slug: string) {
      const task = await db.query.tasks.findFirst({
        where: eq(tasks.slug, slug)
      });
      if (!task) return;
      const subtasksToDelete = await db
        .select()
        .from(subtasks)
        .where(eq(subtasks.taskId, task.id));

      if (subtasksToDelete.length > 0) {
        await db
          .delete(subtasks)
          .where(eq(subtasks.taskId, task.id));
      }

      await db
        .delete(tasks)
        .where(eq(tasks.slug, slug));

      return { message: 'Task deleted successfully' };
    },

    async list(filter: Filter) {
      const searchColumns = ['name'];
      const sortColumns = ['name'];

      const whereClause = {
        search: filter.search
      };
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(tasks)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: tasks.id,
          name: tasks.name,
          slug: tasks.slug,
          listId: tasks.listId,
          description: tasks.description,
          isComplete: tasks.isComplete,
          dueDate: tasks.dueDate,
          priority: tasks.priority,
          createdAt: tasks.createdAt,
          updatedAt: tasks.updatedAt,
        })
        .from(tasks)
        .where(conditions)
        .orderBy(sort)
        .limit(itemsPerPage)
        .offset(offset);

      return {
        data,
        meta: {
          pagination,
        },
      };
    },
    async createTaskLabel(taskId: string, labelId: string) {
      const existingTask = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id, taskId))
        .then(res => res[0]);

      const existingLabel = await db
        .select()
        .from(labels)
        .where(eq(labels.id, labelId))
        .then(res => res[0]);

      if (!existingTask || !existingLabel) {
        return {
          message: 'Task or Label not found'
        }
      }
      await db.insert(taskLabels).values({
        taskId: taskId,
        labelId: labelId,
      });
      return { message: 'Task Label create successfully' };
    }
  },
});
