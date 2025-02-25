import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password: varchar('password', { length: 60 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})