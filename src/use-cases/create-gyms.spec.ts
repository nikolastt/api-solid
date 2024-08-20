import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Gym Use Case", () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it("should be able to create gym", async () => {


        const { gym } = await sut.execute({
            title: "JavaScript Gym",
            description: null,
            phone: null,
            latitude: -19.9954908,
            longitude: -43.8768724,
        })


        expect(gym.id).toEqual(expect.any(String))
    })

})