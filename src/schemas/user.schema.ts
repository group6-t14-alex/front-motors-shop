import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int("Id é obrigatório"),
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().nonempty("Email é obrigatório"),
  cpf: z.string().nonempty("CPF é obrigatório"),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  description: z.string().optional(),
  cep: z.string().nonempty("CEP é obrigatório").max(8, "Tamanho Máximo 8"),
  number: z.string().nonempty("Número é obrigatório"),
  complement: z.string().optional(),
  type_user: z.string().optional(),
  password: z.string().nonempty("Senha é obrigatório"),
  confirmPassword: z.string().nonempty("Confirmação de Senha é obrigatório"),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export const userSchemaRequest = userSchema.omit({
  id: true,
})

export type UserRequest = z.infer<typeof userSchemaRequest>;

export type UserData = z.infer<typeof userSchema>;
