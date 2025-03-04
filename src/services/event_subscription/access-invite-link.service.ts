import { db } from "@/drizzle/client";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { env } from "@/env";
import { redis } from "@/redis/client"
import { eq } from "drizzle-orm";


interface AccessInviteLinkParams {
  eventId: string
  subscriptionId: string
}

export async function accessInviteLink({
  eventId,
  subscriptionId
}: AccessInviteLinkParams) {
  const redirectUrl = new URL(env.WEB_URL)

  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.id, subscriptionId),
  });

  if (subscription !== undefined) {
    redirectUrl.searchParams.set('referrer', subscriptionId)

    await redis.hincrby(`referral:access-count:${eventId}`, subscriptionId, 1)
  }

  return {
    redirectUrl
  }
}