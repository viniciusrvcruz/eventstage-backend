import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { and, eq } from "drizzle-orm";

export async function deleteEvent(eventId: string, userId: string): Promise<{deletedId: string}[]> {

  return db.delete(events).where(and(
    eq(events.id, eventId),
    eq(events.createdBy, userId)
  ))
  .returning({ deletedId: events.id });
}