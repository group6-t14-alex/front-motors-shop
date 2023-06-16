import { z } from "zod";

export const carSchemaRequest = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    year: z.number(),
    priceFipe: z.number(),
    km:z.number(),
    price: z.number(),
    model: z.string().nonempty(),
    brand: z.string().nonempty(),
    fuel: z.string(),
    imageUrl:z.string(),
    color:z.string(),
    isActive: z.boolean()
})

export const carSchemaReturn = carSchemaRequest.extend({
    id: z.string(),
})

export type CarRequest = z.infer<typeof carSchemaRequest>
export type CarDataReturn = z.infer<typeof carSchemaReturn>;