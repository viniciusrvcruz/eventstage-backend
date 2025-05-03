type UserPayload = {
  id: string
  email: string
  name: string
  iat: number
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
  }
}