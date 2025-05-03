import { SQL } from 'drizzle-orm';
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';

type OrderByInput = PgColumn | SQL | SQL.Aliased | (PgColumn | SQL | SQL.Aliased)[];

export function withPagination<T extends PgSelect>(
  query: T,
  orderBy: OrderByInput,
  page = 1,
  pageSize = 30,
) {

  const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];

  return query
    .orderBy(...orderByArray)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}