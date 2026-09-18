import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),

  email: z.string().email("E-mail inválido"),

  phone: z.string().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();
