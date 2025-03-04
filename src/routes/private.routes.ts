import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { eventPrivateRoutes } from '@/routes/event.routes'
import { eventSubscriptionPrivateRoutes } from '@/routes/event.subscription.routes'

export const privateRoutes: FastifyPluginAsyncZod = async app => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  app.register(eventPrivateRoutes, {prefix: '/events'})
  app.register(eventSubscriptionPrivateRoutes, {prefix: '/events/:eventId/subscriptions'})
}