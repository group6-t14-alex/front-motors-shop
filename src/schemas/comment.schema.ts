import { z } from "zod";

export const commentSchemaRequest = z.object({
    comment: z.string().nonempty("Comentário é obrigatório"),
    created_at: z.date(),
    carId: z.string(),
});

export const commentSchemaReturn = commentSchemaRequest.extend({
    id: z.string(),
}).omit({
    carId: true,
});

export type CommentData = z.infer<typeof commentSchemaRequest>;
export type CommentDataReturn = z.infer<typeof commentSchemaReturn>;