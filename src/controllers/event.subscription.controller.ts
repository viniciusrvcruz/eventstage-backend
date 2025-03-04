import { AccessInviteLinkSchema, CreateSubscriptionToEventBodySchema, EventParamsSchema } from "@/schemas/event.subscription.schema";
import { accessInviteLink } from "@/services/event_subscription/access-invite-link.service";
import { createSubscriptionToEvent } from "@/services/event_subscription/create-subscription-to-event.service";
import { getSubscriptionInviteClicks } from "@/services/event_subscription/get-subscription-invite-clicks.service";
import { getSubscriptionInvitesCount } from "@/services/event_subscription/get-subscription-invites-count.service";
import { getSubscriptionRankingPosition } from "@/services/event_subscription/get-subscription-ranking-position.service";
import { getSubscriptionsRanking } from "@/services/event_subscription/get-subscriptions-ranking.service";
import { FastifyReply, FastifyRequest } from "fastify";


export async function createSubscriptionToEventHandler(
  request: FastifyRequest<{
    Params: EventParamsSchema,
    Body: CreateSubscriptionToEventBodySchema
  }>,
  reply: FastifyReply
) {
  const eventId = request.params.eventId
  const { name, email, referrer } = request.body

  const { subscriptionId } = await createSubscriptionToEvent({
    name,
    email,
    eventId,
    referrerId: referrer || null
  })

  return reply.code(201).send({ subscriptionId });
}

export async function accessInviteLinkHandler(
  request: FastifyRequest<{
    Params: AccessInviteLinkSchema,
  }>,
  reply: FastifyReply
) {
  const { eventId, subscriptionId } = request.params

  const { redirectUrl } = await accessInviteLink({ subscriptionId, eventId })

  return reply.redirect(redirectUrl.toString(), 302)
}

export async function getSubscriptionInviteClicksHandler(
  request: FastifyRequest<{
    Params: EventParamsSchema,
  }>,
) {
  const userEmail = request.user.email
  const { eventId } = request.params

  const { count } = await getSubscriptionInviteClicks({ eventId, userEmail })

  return { count }
}

export async function getSubscriptionInvitesCountHandler(
  request: FastifyRequest<{
    Params: EventParamsSchema,
  }>,
) {
  const userEmail = request.user.email
  const { eventId } = request.params

  const { count } = await getSubscriptionInvitesCount({ eventId, userEmail })

  return { count }
}

export async function getSubscriptionRankingPositionHandler(
  request: FastifyRequest<{
    Params: EventParamsSchema,
  }>,
) {
  const userEmail = request.user.email
  const { eventId } = request.params

  const { position } = await getSubscriptionRankingPosition({ eventId, userEmail })

  return { position }
}

export async function getSubscriptionsRankingHandler(
  request: FastifyRequest<{
    Params: EventParamsSchema,
  }>,
) {
  const { eventId } = request.params
  
  const { rankingWithScore } = await getSubscriptionsRanking(eventId)
  
  return { ranking: rankingWithScore}
}