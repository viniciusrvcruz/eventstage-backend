import { EventPayloadSchema, EventsPaginationSchema } from "@/schemas/event.schema";
import { createEvent } from "@/services/event/create-event.service";
import { deleteEvent } from "@/services/event/delete-event.service";
import { getEventSubscription } from "@/services/event/get-event-subscription.service";
import { getEvent } from "@/services/event/get-event.service";
import { getEvents } from "@/services/event/get-events.service";
import { udpateEvent } from "@/services/event/update-event.service";
import { FastifyRequest } from "fastify";

export async function getEventsHandler(request: FastifyRequest) {
  const { search, page, pageSize, myEvents, mySubscriptions } = request.query as EventsPaginationSchema

  const user = request.user

  const response = await getEvents({ search, page, pageSize, user, myEvents, mySubscriptions })

  return response
}

export async function createEventHandler(request: FastifyRequest<{Body: EventPayloadSchema}>) {
  const event = request.body
  const userId = request.user.id

  const newEvent = await createEvent(event, userId)

  return { event: newEvent }
}

export async function updateEventHandler(
  request: FastifyRequest<{Body: EventPayloadSchema,
  Params: {eventId: string}}>
) {
  const event = request.body
  const eventId = request.params.eventId
  const userId = request.user.id

  const updatedEvent = await udpateEvent(event, eventId, userId)

  return { event: updatedEvent }
}

export async function getEventHandler(request: FastifyRequest<{ Params: {eventId: string}}>) {
  const eventId = request.params.eventId

  const event = await getEvent(eventId)

  return { event }
}

export async function deleteEventHandler(request: FastifyRequest<{ Params: {eventId: string}}>) {
  const eventId = request.params.eventId
  const userId = request.user.id

  await deleteEvent(eventId, userId)
}

export async function getEventSubscriptionHandler(request: FastifyRequest<{ Params: {eventId: string}}>) {
  const eventId = request.params.eventId
  const userEmail = request.user.email

  const subscription = await getEventSubscription(eventId, userEmail)

  return { subscription }
}