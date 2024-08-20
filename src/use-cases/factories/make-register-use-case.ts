import { makeAuthenticateUseCase } from "./make-authenticate-use-case"


export function makeRegisterUseCase() {
    const registerUseCase = makeAuthenticateUseCase()

    return registerUseCase
}