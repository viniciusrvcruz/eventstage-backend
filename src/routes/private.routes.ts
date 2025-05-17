import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { eventPrivateRoutes } from '@/routes/event.routes'
import { eventSubscriptionPrivateRoutes } from '@/routes/event.subscription.routes'
import { authPrivateRoutes } from './auth.routes'
import { CustomError } from '@/exceptions/CustomError.exception'

export const privateRoutes: FastifyPluginAsyncZod = async app => {
  app.addHook("onRequest", async (request) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      throw new CustomError('unauthorized', 401)
    }
  })

  app.register(authPrivateRoutes)
  app.register(eventPrivateRoutes, {prefix: '/events'})
  app.register(eventSubscriptionPrivateRoutes, {prefix: '/events/:eventId/subscriptions'})
}