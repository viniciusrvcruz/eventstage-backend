import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { eventPrivateRoutes } from '@/routes/event.routes'

export const privateRoutes: FastifyPluginAsyncZod = async app => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  app.register(eventPrivateRoutes, {prefix: '/events'})
}