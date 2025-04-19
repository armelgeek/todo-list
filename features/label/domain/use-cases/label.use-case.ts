import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { labels } from '@/drizzle/schema/label';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Label, LabelPayload } from '../../config/label.type';
import { LabelFormSchema } from '../../config/label.schema';

export const labelUseCase = new UseCase<Label, LabelPayload, unknown>({
  name: 'Label',
  schema: LabelFormSchema,
  operations: {
    async create(data: LabelPayload) {
      const slug = slugify(data.name, { lower: true });
      const existingLabel = await db.query.labels.findFirst({
        where: eq(labels.slug, slug),
      });
      
      if (existingLabel) {
        throw new Error('Label with this name already exists');
      }
      const [label] = await db
        .insert(labels)
        .values({ ...data, slug })
        .returning();
        
      return label;
    },
    
    async getById(slug: string) {
      const label = await db.query.labels.findFirst({
        where: eq(labels.slug, slug)
      });
      return label ?? null;
    },
    
    async update(slug: string, data: LabelPayload) {
      await db
        .update(labels)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(labels.slug, slug));
      
      return { message: 'Label updated successfully' };
    },
    
    async delete(slug: string) {
      await db
        .delete(labels)
        .where(eq(labels.slug, slug));
      
      return { message: 'Label deleted successfully' };
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
        .from(labels)
        .where(conditions);

      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);

      const data = await db
        .select({
          id: labels.id,
          name: labels.name,
          slug: labels.slug,
          color: labels.color,
          createdAt: labels.createdAt,
          updatedAt: labels.updatedAt,
        })
        .from(labels)
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
