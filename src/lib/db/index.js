import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// eslint-disable-next-line no-undef
const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

