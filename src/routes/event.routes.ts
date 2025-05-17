import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { eventPayloadSchema, eventSchema, eventsPaginationSchema, eventWithSubscription } from '@/schemas/event.schema'
import { createEventHandler, deleteEventHandler, getEventHandler, getEventsHandler, getEventSubscriptionHandler, updateEventHandler } from '@/controllers/event.controller'
import { subscriptionSchema } from '@/schemas/event.subscription.schema'

export const eventPrivateRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '',
    {
      schema: {
        summary: 'Get events',
        operationId: 'getEvents',
        tags: ['events'],
        querystring: eventsPaginationSchema,
        response: {
          200: z.object({
            events: z.array(eventWithSubscription),
            total: z.number(),
          })
        },
      },
    },
    getEventsHandler
  )

  app.post(
    '',
    {
      schema: {
        summary: 'Create event',
        operationId: 'createEvent',
        tags: ['events'],
        body: eventPayloadSchema,
        response: {
          201: z.object({
            event: eventSchema
          }),
        },
      },
    },
    createEventHandler
  )

  app.put(
    '/:eventId',
    {
      schema: {
        summary: 'Update event',
        operationId: 'updateEvent',
        tags: ['events'],
        body: eventPayloadSchema,
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: z.object({
            event: eventSchema
          }),
        },
      },
    },
    updateEventHandler
  )

  app.delete(
    '/:eventId',
    {
      schema: {
        summary: 'Delete event',
        operationId: 'deleteEvent',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: z.null(),
        },
      },
    },
    deleteEventHandler
  )

  app.get(
    '/:eventId/subscription',
    {
      schema: {
        summary: 'Get event subscription',
        operationId: 'getEventSubscription',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: z.object({
            subscription: subscriptionSchema.nullable()
          }),
        },
      },
    },
    getEventSubscriptionHandler
  )
}

export const eventPublicRoutes: FastifyPluginAsyncZod = async app => {
  app.get(
    '/:eventId',
    {
      schema: {
        summary: 'Get event',
        operationId: 'getEvent',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          200: z.object({
            event: eventSchema
          }),
        },
      },
    },
    getEventHandler
  )
}