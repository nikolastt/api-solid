import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(req: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInsBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { gymId } = createCheckInParamsSchema.parse(req.params)
    const { latitude, longitude } = createCheckInsBodySchema.parse(req.body)

    const createCheckInsUseCase = makeCheckInUseCase()

    await createCheckInsUseCase.execute({
        gymId,
        userId: req.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(201).send()
}
