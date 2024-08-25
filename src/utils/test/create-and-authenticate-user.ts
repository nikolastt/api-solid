import { prisma } from "@/lib/prisma"
import { FastifyInstance } from "fastify"
import supertest from "supertest"
import { hash } from "bcryptjs"

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false): Promise<{ token: string }> {

    await prisma.user.create({
        data: {
            name: "Nikolas Bitencourt",
            email: "nikolasbitencourtt@gmail.com",
            password_hash: await hash("123456", 6),
            role: isAdmin ? "ADMIN" : "MEMBER"
        }
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