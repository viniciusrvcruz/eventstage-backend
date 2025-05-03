import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { eventPayloadSchema, eventSchema, eventsPaginationSchema } from '@/schemas/event.schema'
import { createEventHandler, deleteEventHandler, getEventHandler, getEventsHandler, updateEventHandler } from '@/controllers/event.controller'

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
            events: z.array(eventSchema),
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
          eventId: z.string()
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

  app.get(
    '/:eventId',
    {
      schema: {
        summary: 'Get event',
        operationId: 'getEvent',
        tags: ['events'],
        params: z.object({
          eventId: z.string()
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

  app.delete(
    '/:eventId',
    {
      schema: {
        summary: 'Delete event',
        operationId: 'deleteEvent',
        tags: ['events'],
        params: z.object({
          eventId: z.string()
        }),
        response: {
          200: z.null(),
        },
      },
    },
    deleteEventHandler
  )
}