import {z} from "zod"

export const fipeCarsSchema = z.object({
    id: z.string(),
    name: z.string().nonempty(),
    brand: z.string().nonempty(),
    year: z.string().nonempty(),
    fuel: z.string().nonempty(),
    value: z.number()
})

export type fipeCarsData = z.infer<typeof fipeCarsSchema>