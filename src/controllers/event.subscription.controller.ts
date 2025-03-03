import { AccessInviteLinkSchema, CreateSubscriptionToEventBodySchema, CreateSubscriptionToEventParamsSchema } from "@/schemas/event.subscription.schema";
import { accessInviteLink } from "@/services/event_subscription/access-invite-link.service";
import { createSubscriptionToEvent } from "@/services/event_subscription/create-subscription-to-event.service";
import { FastifyReply, FastifyRequest } from "fastify";


export async function createSubscriptionToEventHandler(
  request: FastifyRequest<{
    Params: CreateSubscriptionToEventParamsSchema,
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