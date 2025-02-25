import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { registerSchema } from '../schemas/auth.schema'
import { registerHandler } from '../controllers/auth.controller'

export const authRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/register',
    {
      schema: {
        summary: 'Register',
        operationId: 'register',
        tags: ['auth'],
        body: registerSchema,
        response: {
          201: z.object({
            userId: z.string()
          }),
        },
      },
    },
    registerHandler
  )

  // app.post(
  //   '/login',
  //   {
  //     schema: {
  //       summary: 'Login',
  //       operationId: 'login',
  //       tags: ['auth'],
  //       // body: registerSchema,
  //       response: {
  //         200: z.object({
  //           token: z.string()
  //         }),
  //       },
  //     },
  //   },
  //   login
  // )
}