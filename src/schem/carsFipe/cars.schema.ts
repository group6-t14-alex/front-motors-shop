import {z} from "zod"

export const fipeCarsSchema = z.object({
    id: z.string(),
    name: z.string(),
    brand: z.string(),
    year: z.string(),
    fuel: z.string(),
    value: z.string()
})

export type fipeCarsData = z.infer<typeof fipeCarsSchema>