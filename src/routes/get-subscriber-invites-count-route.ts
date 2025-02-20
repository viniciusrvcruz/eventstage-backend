import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-counts'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:subscriberId/ranking/count',
    {
      schema: {
        summary: 'Get subscriber invites count',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number()
          }),
        },
      },
    },
    async (request) => {
      const { subscriberId } = request.params

      const { count } = await getSubscriberInvitesCount({ subscriberId })

      return { count }
    }
  )
}