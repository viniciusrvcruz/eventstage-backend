import { db } from "@/drizzle/client";
import { users } from "@/drizzle/schema/users.schema";
import { CustomError } from "@/exceptions/CustomError.exception";
import { LoginSchema } from "@/schemas/auth.schema";
import { vefifyPassword } from "@/utils/hash.utils";
import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";

export async function login({email, password}: LoginSchema, app: FastifyInstance) {

    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if(user === undefined) {
        throw new CustomError('invalid_credentials', 401)
    }

    const isPasswordCorrect = await vefifyPassword(password, user.password)

    if(!isPasswordCorrect) {
        throw new CustomError('invalid_credentials', 401)
    }

    const token = app.jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    },
    {
        expiresIn: '7d'
    })
    
    return { token }
}