import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { accessInviteLinkSchema, createSubscriptionToEventBodySchema, createSubscriptionToEventParamsSchema } from '@/schemas/event.subscription.schema'
import { accessInviteLinkHandler, createSubscriptionToEventHandler } from '@/controllers/event.subscription.controller'
import { checkEventExists } from '@/hooks/check-event-exists.hook'


export const eventSubscriptionPublicRoutes: FastifyPluginAsyncZod = async app => {
  app.addHook('onRequest', checkEventExists)

  app.post(
    '',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscriptions'],
        operationId: 'createSubscriptionToEvent',
        params: createSubscriptionToEventParamsSchema,
        body: createSubscriptionToEventBodySchema,
        response: {
          201: z.object({
            subscriptionId: z.string()
          }),
        },
      },
    },
    createSubscriptionToEventHandler
  )

  app.get(
    '/:subscriptionId/invite',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        operationId: 'accessInviteLink',
        tags: ['subscriptions'],
        params: accessInviteLinkSchema,
        response: {
          302: z.null()
        },
      },
    },
    accessInviteLinkHandler
  )
}
