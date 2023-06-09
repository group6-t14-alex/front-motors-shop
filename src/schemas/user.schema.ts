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
});

export const userSchemaRequestUpdate = userSchemaRequest.deepPartial();

export const loginSchema = userSchema.omit({
  id: true,
  name: true,
  cpf: true,
  phone: true,
  date_of_birth: true,
  description: true,
  cep: true,
  number: true,
  complement: true,
  type_user: true,
  confirmPassword: true,
  state: true,
  city: true,
  address: true,
});

export const sendingEmailSchema = loginSchema.omit({
  password: true
})

export const recoveryPasswordSchema = userSchema.omit({
  id: true,
  name: true,
  cpf: true,
  phone: true,
  date_of_birth: true,
  description: true,
  cep: true,
  number: true,
  complement: true,
  type_user: true, 
  state: true,
  city: true,
  address: true,
  email: true
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "As senhas precisam corresponderem",
  path: ["confirm"]
});

export type UserRequest = z.infer<typeof userSchemaRequest>;

export type UserData = z.infer<typeof userSchema>;

export type LoginData = z.infer<typeof loginSchema>;


export type userSchemaRequestUpdateData = z.infer<
  typeof userSchemaRequestUpdate
>;

export type SendingEmailData = z.infer<typeof sendingEmailSchema>;

export type RecoveryPasswordData = z.infer<typeof recoveryPasswordSchema>;
