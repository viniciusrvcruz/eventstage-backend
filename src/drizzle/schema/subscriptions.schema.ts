import { pgTable, uuid, varchar, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { events } from './events.schema'

export const subscriptions = pgTable(
    'subscriptions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        email: varchar('email', { length: 256 }).notNull(),
        eventId: uuid('event_id').references(() => events.id, {onDelete: 'cascade'}).notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow()
    },
    (table) => [
      uniqueIndex("email_event_unique").on(table.email, table.eventId)
    ]
)