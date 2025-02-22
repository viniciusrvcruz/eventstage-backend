import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-counts'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        summary: 'Get subscriber ranking position',
        tags: ['referral'],
        operationId: 'getSubscriberRankingPosition',
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable()
          }),
        },
      },
    },
    async request => {
      const { subscriberId } = request.params

      const { position } = await getSubscriberRankingPosition({ subscriberId })

      return { position }
    }
  )
}