import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../env'
import { subscriptions } from './schema/subscriptions.schema'
import { users } from './schema/users.schema'
import { events } from './schema/events.schema'

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
    schema: {
        users,
        events,
        subscriptions,
    }
})