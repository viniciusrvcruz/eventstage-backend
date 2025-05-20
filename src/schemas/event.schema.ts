import { z } from "zod";
import { paginationSchema } from "./pagination.schema";
import { coerceStringToBoolean } from "@/utils/coerce-string-to-boolean.utils";
import { subscriptionSchema } from "./event.subscription.schema";

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(3),
  subtitle: z.string().trim().min(2),
  description: z.string().trim().min(2),
  date: z.coerce.date(),
  url: z.string().trim().url().max(2048),
  is_live: z.boolean(),
  createdBy: z.string(),
  createdAt: z.coerce.date()
});

export type EventSchema = z.infer<typeof eventSchema>;

export const eventPayloadSchema = eventSchema.omit({
  id: true,
  createdBy: true,
  createdAt: true
});

export type EventPayloadSchema = z.infer<typeof eventPayloadSchema>;

export const eventsPaginationSchema = paginationSchema.merge(
  z.object({
    search: z.string().optional(),
    myEvents: coerceStringToBoolean().optional(),
    mySubscriptions: coerceStringToBoolean().optional(),
  })
);

export type EventsPaginationSchema = z.infer<typeof eventsPaginationSchema>;

export const eventWithSubscription = eventSchema.merge(
  z.object({
    subscription: subscriptionSchema.nullable()
  })
)

export type EventWithSubscription = z.infer<typeof eventWithSubscription>;