import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { EventPayloadSchema, EventSchema } from "@/schemas/event.schema";

export async function createEvent(event: EventPayloadSchema, userId: string): Promise<EventSchema> {

  const newEvent = await db.insert(events).values({
    ...event,
    createdBy: userId
  })
    .returning();

  return newEvent[0]
}