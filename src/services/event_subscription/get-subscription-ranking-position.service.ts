import { db } from "@/drizzle/client";
import { and, eq } from "drizzle-orm";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { redis } from "@/redis/client";

interface GetSubscriptionRankingPositionParams {
  eventId: string
  userEmail: string
}

export async function getSubscriptionRankingPosition({
  eventId,
  userEmail
}: GetSubscriptionRankingPositionParams) {

  const subscription = await db.query.subscriptions.findFirst({
    where: and(
      eq(subscriptions.email, userEmail),
      eq(subscriptions.eventId, eventId)
    ),
  });

  if (subscription === undefined) {
    return { position: null }
  }

  const rank = await redis.zrevrank(`referral:ranking:${eventId}`, subscription.id)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}