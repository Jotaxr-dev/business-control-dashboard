import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),

  description: z.string().optional(),

  price: z.number().positive("Preço deve ser maior que zero"),

  stock: z
    .number()
    .int("Estoque deve ser um número inteiro")
    .min(0, "Estoque não pod ser negativo"),
});

export const updateProductSchema = createProductSchema.partial();
