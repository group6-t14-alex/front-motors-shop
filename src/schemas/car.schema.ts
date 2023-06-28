import { z } from "zod";

export const carSchemaRequest = z.object({
    description: z.string(),
    year: z.string(),
    priceFipe: z.number(),
    km:z.string(),
    price: z.string(),
    model: z.string().nonempty(),
    brand: z.string().nonempty(),
    fuel: z.string(),
    imageUrl:z.string(),
    color:z.string(),
    isActive: z.boolean().default(true)
})

export const carSchemaReturn = carSchemaRequest.extend({
    id: z.string(),
})


export const carEditSchemaReturn = carSchemaReturn.optional();

export type CarRequest = z.infer<typeof carSchemaRequest>
export type CarDataReturn = z.infer<typeof carSchemaReturn>;
export type CarRequestEdit = z.infer<typeof carEditSchemaReturn>;
export type CarDataEditReturn = z.infer<typeof carEditSchemaReturn>;