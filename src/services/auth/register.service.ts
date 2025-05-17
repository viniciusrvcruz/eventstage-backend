import { db } from "../../drizzle/client";
import { RegisterSchema } from "../../schemas/auth.schema";
import { users } from "../../drizzle/schema/users.schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../../utils/hash.utils";
import { CustomError } from "@/exceptions/CustomError.exception";

export async function register({name, email, password}: RegisterSchema): Promise<string> {

    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if(user !== undefined) {
        throw new CustomError('user_already_exists_with_this_email', 422)
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.insert(users).values({ 
        name,
        email,
        password: hashedPassword
    })
    .returning({ userId: users.id })

    return result[0].userId
}