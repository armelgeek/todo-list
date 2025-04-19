import 'server-only';
import { and, desc, eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { subtasks } from '@/drizzle/schema/subtask';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Subtask, SubtaskPayload } from '../../config/subtask.type';
import { SubtaskFormSchema } from '../../config/subtask.schema';

export const subtaskUseCase = new UseCase<Subtask, SubtaskPayload, unknown>({
  name: 'Subtask',
  schema: SubtaskFormSchema,
  operations: {
    async create(data: SubtaskPayload) {
      const slug = slugify(data.name, { lower: true });
      const existingSubtask = await db.query.subtasks.findFirst({
        where: eq(subtasks.slug, slug),
      });

      const result = await db
        .select({ order: subtasks.order })
        .from(subtasks)
        .where(
          and(eq(subtasks.userId, data.userId),
            eq(subtasks.taskId, data.taskId))
        )
        .orderBy(desc(subtasks.order))
        .limit(1);

      const newOrder = result[0]?.order ?? 1;

      if (existingSubtask) {
        throw new Error('Subtask with this name already exists');
      }
      const [subtask] = await db
        .insert(subtasks)
        .values({ ...data, slug, order: newOrder })
        .returning();

      return subtask;
    },

    async getById(slug: string) {
      const subtask = await db.query.subtasks.findFirst({
        where: eq(subtasks.slug, slug)
      });
      return subtask ?? null;
    },

    async update(slug: string, data: SubtaskPayload) {
      await db
        .update(subtasks)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(subtasks.slug, slug));

      return { message: 'Subtask updated successfully' };
    },

    async delete(slug: string) {
      await db
        .delete(subtasks)
        .where(eq(subtasks.slug, slug));

      return { message: 'Subtask deleted successfully' };
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
        .from(subtasks)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: subtasks.id,
          name: subtasks.name,
          slug: subtasks.slug,
          createdAt: subtasks.createdAt,
          updatedAt: subtasks.updatedAt,
        })
        .from(subtasks)
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
