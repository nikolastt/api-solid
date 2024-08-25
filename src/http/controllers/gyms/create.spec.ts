import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create a gym", async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await supertest(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "JavaScript Gym",
            description: "Some description",
            phone: "1199999999",
            latitude: -19.9954908,
            longitude: -43.8768724,
        })

        expect(response.statusCode).toEqual(201)
    })
})