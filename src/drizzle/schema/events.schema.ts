import { pgTable, uuid, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'
import { users } from './users.schema'

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 256 }).notNull(),
    subtitle: varchar('subtitle', { length: 256 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    date: timestamp('date').notNull(),
    url: varchar('url', { length: 2048 }).notNull(),
    is_live: boolean('is_live').notNull().default(false),
    createdBy: uuid('created_by').references(() => users.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})