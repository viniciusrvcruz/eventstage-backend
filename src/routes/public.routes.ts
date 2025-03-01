import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authPublicRoutes } from '@/routes/auth.routes'

export const publicRoutes: FastifyPluginAsyncZod = async app => {
  app.register(authPublicRoutes)
}
