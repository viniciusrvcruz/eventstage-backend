import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { CustomError } from "@/exceptions/CustomError.exception";
import { EventSchema } from "@/schemas/event.schema";
import { eq } from "drizzle-orm";

export async function getEvent(eventId: string): Promise<EventSchema> {
  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId)
  })

  if (event === undefined) {
    throw new CustomError('event_not_found', 404)
  }

  return event
}