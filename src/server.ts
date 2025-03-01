import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { publicRoutes } from './routes/public.routes'
import { CustomError } from '@/exceptions/CustomError.exception'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { privateRoutes } from '@/routes/private.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof CustomError) {
    reply.status(error.statusCode).send({ error: error.message });
  } else {
    reply.send(error);
  }
})

app.register(fastifyJwt, {
  secret: env.SECRET_KEY
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.register(publicRoutes, {prefix: '/api'})
app.register(privateRoutes, {prefix: '/api'})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
