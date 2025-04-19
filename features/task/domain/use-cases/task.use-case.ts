import 'server-only';
import { eq, sql } from 'drizzle-orm';
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

export const taskUseCase = new UseCase<Task, TaskPayload, unknown>({
  name: 'Task',
  schema: TaskFormSchema,
  operations: {
    async create(data: TaskPayload) {
      const slug = slugify(data.name, { lower: true });
      const existingTask = await db.query.tasks.findFirst({
        where: eq(tasks.slug, slug),
      });
      
      if (existingTask) {
        throw new Error('Task with this name already exists');
      }
      const [task] = await db
        .insert(tasks)
        .values({ ...data, slug })
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
    }
  }
});
