import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe("Nearby Gym (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to list nearby gyms", async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await supertest(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "JavaScript Gym",
            description: "Some description",
            phone: "1199999999",
            latitude: -19.9954908,
            longitude: -43.8768724,
        })

        await supertest(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Typescript Gym",
            description: "Some description",
            phone: "1199999999",
            latitude: -19.9251218,
            longitude: -43.938276
        })

        const response = await supertest(app.server)
            .get("/gyms/nearby")
            .query({
                latitude: -19.9954908,
                longitude: -43.8768724,
            })
            .set("Authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([expect.objectContaining({
            title: "JavaScript Gym"
        })])
    })
})