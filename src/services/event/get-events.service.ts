import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { EventWithSubscription } from "@/schemas/event.schema";
import { UserSchema } from "@/schemas/user.schema";
import { withPagination } from "@/utils/with-pagination.utils";
import { ilike, sql, desc, eq, and, exists } from "drizzle-orm";

interface GetEventsParams {
  search?: string;
  page?: number;
  pageSize?: number;
  myEvents?: boolean;
  mySubscriptions?: boolean;
  user: UserSchema;
}

interface GetEventsResult {
  events: EventWithSubscription[];
  total: number;
}

export async function getEvents({
  search,
  page = 1,
  pageSize = 30,
  myEvents = false,
  mySubscriptions = false,
  user,
}: GetEventsParams): Promise<GetEventsResult> {
  const whereConditions = [];

  if (search) {
    whereConditions.push(ilike(events.title, `%${search}%`));
  }

  if (myEvents) {
    whereConditions.push(eq(events.createdBy, user.id));
  }

  if (mySubscriptions) {
    whereConditions.push(
      exists(
        db
          .select()
          .from(subscriptions)
          .where(
            and(
              eq(subscriptions.eventId, events.id),
              eq(subscriptions.email, user.email)
            )
          )
      )
    );
  }

  const whereFilter = whereConditions.length > 0 ? and(...whereConditions) : undefined;

  const baseQuery = db
    .select({
      event: events,
      subscription: subscriptions,
    })
    .from(events)
    .leftJoin(
      subscriptions,
      and(
        eq(subscriptions.eventId, events.id),
        eq(subscriptions.email, user.email)
      )
    )
    .where(whereFilter);

  const countQuery = db
    .select({ count: sql<number>`count(*)`.as("count") })
    .from(events)
    .where(whereFilter);

  const [{ count }] = await countQuery;

  const paginatedEventsRaw = await withPagination(
    baseQuery.$dynamic(),
    [desc(events.createdAt), desc(events.id)],
    page,
    pageSize
  );

  const paginatedEvents = paginatedEventsRaw.map(row => ({
    ...row.event,
    subscription: row.subscription
  }))

  return {
    events: paginatedEvents,
    total: Number(count),
  };
}