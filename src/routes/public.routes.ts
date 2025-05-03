import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authPublicRoutes } from '@/routes/auth.routes'
import { eventSubscriptionPublicRoutes } from './event.subscription.routes'

export const publicRoutes: FastifyPluginAsyncZod = async app => {
  // Override security to ensure public routes are not authenticated
  app.addHook("onRoute", (routeOptions) => {
    if (!routeOptions.schema) {
      routeOptions.schema = {}
    }

    routeOptions.schema.security = []
  })

  app.register(authPublicRoutes)
  app.register(eventSubscriptionPublicRoutes, {prefix: '/events/:eventId/subscriptions'})
}
