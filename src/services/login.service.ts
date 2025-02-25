import { db } from "../drizzle/client";
import { RegisterSchema } from "../schemas/auth.schema";
import { users } from "../drizzle/schema/users.schema";
import { eq } from "drizzle-orm";
import { CustomError } from "../exceptions/CustomError.exception";

export function login() {


    return {
        token: 'teste'
    }
}