import { EventPayloadSchema } from "@/schemas/event.schema";
import { createEvent } from "@/services/event/create-event.service";
import { deleteEvent } from "@/services/event/delete-event.service";
import { getEvent } from "@/services/event/get-event.service";
import { getEvents } from "@/services/event/get-events.service";
import { udpateEvent } from "@/services/event/update-event.service";
import { FastifyRequest } from "fastify";

export async function getEventsHandler(request: FastifyRequest) {
  const events = await getEvents(request.user.id)

  return { events }
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
  const userId = request.user.id

  const event = await getEvent(eventId, userId)

  return { event }
}

export async function deleteEventHandler(request: FastifyRequest<{ Params: {eventId: string}}>) {
  const eventId = request.params.eventId
  const userId = request.user.id

  await deleteEvent(eventId, userId)
}