import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const privateRoutes: FastifyPluginAsyncZod = async app => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
}