import { z } from "zod";

export const subscriptionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(256),
  email: z.string().email().max(256),
  eventId: z.string().uuid(),
  createdAt: z.date(),
})

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>

export const eventParamsSchema = z.object({
  eventId: z.string().uuid()
})

export type EventParamsSchema = z.infer<typeof eventParamsSchema>;

export const createSubscriptionToEventBodySchema = z.object({
  name: z.string().trim().min(1).max(256),
  email: z.string().email(),
  referrer: z.string().uuid().nullish()
})

export type CreateSubscriptionToEventBodySchema = z.infer<typeof createSubscriptionToEventBodySchema>;

export const accessInviteLinkSchema = z.object({
  eventId: z.string().uuid(),
  subscriptionId: z.string().uuid(),
})

export type AccessInviteLinkSchema = z.infer<typeof accessInviteLinkSchema>;