import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create a check-in", async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "Typescreipt",
                latitude: -19.9954908,
                longitude: -43.8768724,
            }
        })

        const response = await supertest(app.server).post(`/gyms/${gym.id}/check-ins`).set("Authorization", `Bearer ${token}`).send({
            latitude: -19.9954908,
            longitude: -43.8768724,
        })

        expect(response.statusCode).toEqual(201)
    })
})