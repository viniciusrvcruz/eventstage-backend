import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authPublicRoutes } from '@/routes/auth.routes'
import { eventSubscriptionPublicRoutes } from './event.subscription.routes'

export const publicRoutes: FastifyPluginAsyncZod = async app => {
  app.register(authPublicRoutes)
  app.register(eventSubscriptionPublicRoutes, {prefix: '/events/:eventId/subscriptions'})
}
