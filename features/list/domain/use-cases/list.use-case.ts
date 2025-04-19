import 'server-only';
import { eq, max, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { lists } from '@/drizzle/schema/list';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { List, ListPayload } from '../../config/list.type';
import { ListFormSchema } from '../../config/list.schema';

export const listUseCase = new UseCase<List, ListPayload, unknown>({
  name: 'List',
  schema: ListFormSchema,
  operations: {
    async create(data: ListPayload & {userId: string}) {
      const slug = slugify(data.name, { lower: true });
      const existingList = await db.query.lists.findFirst({
        where: eq(lists.slug, slug),
      });
      
      if (existingList) {
        throw new Error('List with this name already exists');
      }
      const result = await db
      .select({ maxOrder: max(lists.order) })
      .from(lists)
      .where(eq(lists.userId,data.userId));
      const nextOrder = (result[0]?.maxOrder ?? 0) + 1;
    
      const [list] = await db
        .insert(lists)
        .values({ ...data, slug,  order: nextOrder })
        .returning();
        
      return list;
    },
    
    async getById(slug: string) {
      const list = await db.query.lists.findFirst({
        where: eq(lists.slug, slug)
      });
      return list ?? null;
    },
    
    async update(slug: string, data: ListPayload) {
      await db
        .update(lists)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(lists.slug, slug));
      
      return { message: 'List updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(lists)
        .where(eq(lists.slug, slug));
      
      return { message: 'List deleted successfully' };
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
        .from(lists)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: lists.id,
          name: lists.name,
          slug: lists.slug,
          order: lists.order,
          createdAt: lists.createdAt,
          updatedAt: lists.updatedAt,
        })
        .from(lists)
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
