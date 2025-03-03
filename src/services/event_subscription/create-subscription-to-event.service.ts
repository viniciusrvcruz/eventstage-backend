import { and, eq } from "drizzle-orm"

import { db } from "@/drizzle/client"
import { redis } from "@/redis/client"
import { subscriptions } from "@/drizzle/schema/subscriptions.schema"

interface CreateSubscriptionToEventParams {
  name: string
  email: string
  eventId: string
  referrerId?: string | null
}

export async function createSubscriptionToEvent({
  name,
  email,
  eventId,
  referrerId
}: CreateSubscriptionToEventParams) {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(and(
      eq(subscriptions.eventId, eventId),
      eq(subscriptions.email, email),
    ))

  if (subscribers.length > 0) {
    return { subscriptionId: subscribers[0].id }
  }

  const result = await db.insert(subscriptions).values({
    name,
    email,
    eventId
  }).returning()

  if (referrerId) {
    await redis.zincrby(`referral:ranking:${eventId}`, 1, referrerId)
  }

  const subscriber = result[0]

  return {
    subscriptionId: subscriber.id
  }
}