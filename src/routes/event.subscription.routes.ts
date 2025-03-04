import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { accessInviteLinkSchema, createSubscriptionToEventBodySchema, eventParamsSchema } from '@/schemas/event.subscription.schema'
import { accessInviteLinkHandler, createSubscriptionToEventHandler, getSubscriptionInviteClicksHandler, getSubscriptionInvitesCountHandler, getSubscriptionRankingPositionHandler, getSubscriptionsRankingHandler } from '@/controllers/event.subscription.controller'
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
        params: eventParamsSchema,
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

export const eventSubscriptionPrivateRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking/clicks',
    {
      schema: {
        summary: 'Get subscription invite clicks count',
        operationId: 'getSubscriptionInviteClicks',
        tags: ['subscriptions'],
        params: eventParamsSchema,
        response: {
          200: z.object({
            count: z.number()
          }),
        },
      },
    },
    getSubscriptionInviteClicksHandler
  )

  app.get(
    '/ranking/count',
    {
      schema: {
        summary: 'Get subscriber invites count',
        operationId: 'getSubscriptionInvitesCount',
        tags: ['subscriptions'],
        params: eventParamsSchema,
        response: {
          200: z.object({
            count: z.number()
          }),
        },
      },
    },
    getSubscriptionInvitesCountHandler
  )

  app.get(
    '/ranking/position',
    {
      schema: {
        summary: 'Get subscriber ranking position',
        tags: ['subscriptions'],
        operationId: 'getSubscriptionRankingPosition',
        params: eventParamsSchema,
        response: {
          200: z.object({
            position: z.number().nullable()
          }),
        },
      },
    },
    getSubscriptionRankingPositionHandler
  )

  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get subscriptions ranking',
        operationId: 'getSubscriptionsRanking',
        tags: ['subscriptions'],
        params: eventParamsSchema,
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                score: z.number()
              })
            )
          }),
        },
      },
    },
    getSubscriptionsRankingHandler
  )
}
