import { z } from "zod";
import { paginationSchema } from "./pagination.schema";
import { coerceStringToBoolean } from "@/utils/coerce-string-to-boolean.utils";

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().min(2),
  description: z.string().min(2),
  date: z.coerce.date(),
  url: z.string().url().max(2048),
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