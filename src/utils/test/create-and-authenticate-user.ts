import { FastifyInstance } from "fastify"
import supertest from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance): Promise<{ token: string }> {

    await supertest(app.server).post("/users").send({
        name: "Nikolas Bitencourt",
        email: "nikolasbitencourtt@gmail.com",
        password: "123456"
    })

    const authResponse = await supertest(app.server).post("/sessions").send({
        email: "nikolasbitencourtt@gmail.com",
        password: "123456"
    })

    const { token } = authResponse.body

    return {
        token
    }
}