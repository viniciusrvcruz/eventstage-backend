import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authRoutes } from './auth.routes'

export const publicRoutes: FastifyPluginAsyncZod = async app => {
  app.register(authRoutes)
}
