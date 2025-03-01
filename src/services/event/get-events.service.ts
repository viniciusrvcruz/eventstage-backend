import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { EventSchema } from "@/schemas/event.schema";
import { eq } from "drizzle-orm";

export async function getEvents(userId: string): Promise<EventSchema[]> {
  return db.query.events.findMany({
    where: eq(events.createdBy, userId)
  })
}