import { db } from "@/drizzle/client";
import { subscriptions } from "@/drizzle/schema/subscriptions.schema";
import { redis } from "@/redis/client";
import { inArray } from "drizzle-orm";

export async function getSubscriptionsRanking(eventId: string) {
  const ranking = await redis.zrevrange(`referral:ranking:${eventId}`, 0, 2, 'WITHSCORES')

  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers.map(subscriber => {
    return {
      id: subscriber.id,
      name: subscriber.name,
      score: subscriberIdAndScore[subscriber.id]
    }
  })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { rankingWithScore }
}