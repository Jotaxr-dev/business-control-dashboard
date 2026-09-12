import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "nome deve ter pelo menos 3 caracteres"),

  email: z.string().email("E-mail inválido"),

  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
