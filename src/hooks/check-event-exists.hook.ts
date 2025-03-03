import { db } from "@/drizzle/client";
import { events } from "@/drizzle/schema/events.schema";
import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

export async function checkEventExists(
    request: FastifyRequest<{Params: {eventId: string}}>,
    reply: FastifyReply
) {
    const event = await db.query.events.findFirst({
        where: eq(events.id, request.params.eventId),
    });

    if (event === undefined) {
        return reply.status(404).send({ message: 'Event not found' });
    }
}