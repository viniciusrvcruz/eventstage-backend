import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterSchema } from "../schemas/auth.schema";
import { register } from "../services/register.service";

export async function registerHandler(request: FastifyRequest<{ Body: RegisterSchema}>, reply: FastifyReply) {
  const { name, email, password } = request.body

  const userId = await register({name, email, password})

  return reply.code(201).send({ userId });
}