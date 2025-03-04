import { db } from "@/drizzle/client";
import { and, eq } from "drizzle-orm";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { redis } from "@/redis/client";

interface GetSubscriptionInvitesParams {
  eventId: string
  userEmail: string
}

export async function getSubscriptionInvitesCount({
  eventId,
  userEmail
}: GetSubscriptionInvitesParams) {

  const subscription = await db.query.subscriptions.findFirst({
    where: and(
      eq(subscriptions.email, userEmail),
      eq(subscriptions.eventId, eventId)
    ),
  });

  if (subscription === undefined) {
    return { count: 0 }
  }

  const count = await redis.zscore(`referral:ranking:${eventId}`, subscription.id)

  return { count: count ? Number.parseInt(count) : 0 }
}