import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { CustomError } from "@/exceptions/CustomError.exception";
import { EventPayloadSchema, EventSchema } from "@/schemas/event.schema";
import { and, eq } from "drizzle-orm";

export async function udpateEvent(event: EventPayloadSchema, eventId: string, userId: string): Promise<EventSchema> {

	const updatedEvent = await db.update(events)
		.set(event)
		.where(
			and(
				eq(events.id, eventId),
				eq(events.createdBy, userId)
			)
		)
		.returning();

	if(updatedEvent.length === 0) {
		throw new CustomError('event_not_found', 404)
	}

	return updatedEvent[0]
}