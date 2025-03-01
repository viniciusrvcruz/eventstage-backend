import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { CustomError } from "@/exceptions/CustomError.exception";
import { EventSchema } from "@/schemas/event.schema";
import { and, eq } from "drizzle-orm";

export async function getEvent(eventId: string, userId: string): Promise<EventSchema> {
  const event = await db.query.events.findFirst({
    where: and(
      eq(events.id, eventId),
      eq(events.createdBy, userId)
    )
  })

  if (event === undefined) {
    throw new CustomError('Event not found', 404)
  }

  return event
}