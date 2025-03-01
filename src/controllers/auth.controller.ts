import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import { register } from "@/services/auth/register.service";
import { login } from "@/services/auth/login.service";

export async function registerHandler(request: FastifyRequest<{ Body: RegisterSchema}>, reply: FastifyReply) {
  const { name, email, password } = request.body

  const userId = await register({name, email, password})

  return reply.code(201).send({ userId });
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginSchema}>, reply: FastifyReply, app: FastifyInstance) {
  const { email, password } = request.body

  const { token } = await login({email, password}, app)

  return reply.code(200).send({ token });
}