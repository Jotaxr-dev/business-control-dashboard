import { Request, Response } from "express";
import { createProductSchema } from "./product.schema.js";
import { createProduct, getProducts } from "./product.service.js";

export async function createProductController(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);

  const product = await createProduct(data);

  return res.status(201).json(product);
}

export async function getProductsController(_req: Request, res: Response) {
  const products = await getProducts();

  return res.status(200).json(products);
}
