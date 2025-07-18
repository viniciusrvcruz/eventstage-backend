import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { LoginSchema, loginSchema, registerSchema } from '@/schemas/auth.schema'
import { loginHandler, registerHandler } from '@/controllers/auth.controller'
import { FastifyRequest } from 'fastify'
import { userSchema } from '@/schemas/user.schema'

export const authPublicRoutes: FastifyPluginAsyncZod = async app => {
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

  app.post(
    '/login',
    {
      schema: {
        summary: 'Login',
        operationId: 'login',
        tags: ['auth'],
        body: loginSchema,
        response: {
          200: z.object({
            token: z.string()
          }),
        },
      },
    },
    (request: FastifyRequest<{
        Body: LoginSchema;
    }>, reply) => loginHandler(request, reply, app)
  )
}

export const authPrivateRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '/get-auth-user',
    {
      schema: {
        summary: 'Login',
        operationId: 'login',
        tags: ['auth'],
        response: {
          200: z.object({
            user: userSchema
          })
        },
      },
    },
    (request: FastifyRequest, reply) => {
      return reply.code(200).send({ user: request.user});
    }
  )
}