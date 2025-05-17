import { db } from "@/drizzle/client";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { SubscriptionSchema } from "@/schemas/event.subscription.schema";
import { and, eq } from "drizzle-orm";

export async function getEventSubscription(eventId: string, userEmail: string): Promise<SubscriptionSchema|null> {
  const event = await db.query.subscriptions.findFirst({
    where: and(
        eq(subscriptions.eventId, eventId),
        eq(subscriptions.email, userEmail),
    )
  })

  return event ?? null
}