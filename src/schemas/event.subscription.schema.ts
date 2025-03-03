import { z } from "zod";

export const createSubscriptionToEventParamsSchema = z.object({
  eventId: z.string()
})

export type CreateSubscriptionToEventParamsSchema = z.infer<typeof createSubscriptionToEventParamsSchema>;

export const createSubscriptionToEventBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  referrer: z.string().uuid().nullish()
})

export type CreateSubscriptionToEventBodySchema = z.infer<typeof createSubscriptionToEventBodySchema>;

export const accessInviteLinkSchema = z.object({
  eventId: z.string().uuid(),
  subscriptionId: z.string().uuid(),
})

export type AccessInviteLinkSchema = z.infer<typeof accessInviteLinkSchema>;