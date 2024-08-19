import { describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"

describe("Authenticate Use Case", () => {

    it("should be able to authenticate", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        const { user } = await sut.execute({
            email: "johndoe@example.com",
            password: "123456"
        })



        expect(user.id).toEqual(expect.any(String))
    })
})