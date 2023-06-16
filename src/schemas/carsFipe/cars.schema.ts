import {z} from "zod"

export const fipeCarsSchema = z.object({
    id: z.string(),
    name: z.string(),
    brand: z.string(),
    year: z.number(),
    fuel: z.string(),
    value: z.number()
})

export type fipeCarsData = z.infer<typeof fipeCarsSchema>