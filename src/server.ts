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
      title: 'Eventstage API',
      version: '0.0.1',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof CustomError) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  if(env.NODE_ENV === 'production') {
    reply.status(500).send({ error: 'Internal Server Error' });
  } else {
    reply.send(error);
  }
})

app.register(fastifyJwt, {
  secret: env.SECRET_KEY
})

app.register(publicRoutes, {prefix: '/api'})
app.register(privateRoutes, {prefix: '/api'})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
