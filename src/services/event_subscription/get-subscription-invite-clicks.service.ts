import { db } from "@/drizzle/client";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { redis } from "@/redis/client"
import { and, eq } from "drizzle-orm";

interface GetSubscriptionInviteParams {
  eventId: string
  userEmail: string
}

export async function getSubscriptionInviteClicks({
  eventId,
  userEmail
}: GetSubscriptionInviteParams) {

  const subscription = await db.query.subscriptions.findFirst({
    where: and(
      eq(subscriptions.email, userEmail),
      eq(subscriptions.eventId, eventId)
    ),
  });

  if (subscription === undefined) {
    return { count: 0 }
  }

  const count = await redis.hget(`referral:access-count:${eventId}`, subscription.id)

  return { count: count ? Number.parseInt(count) : 0 }
}