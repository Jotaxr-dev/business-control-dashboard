import { Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "./product.service.js";

export async function createProductController(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);

  const product = await createProduct(data);

  return res.status(201).json(product);
}

export async function getProductsController(_req: Request, res: Response) {
  const products = await getProducts();

  return res.status(200).json(products);
}

export async function getProductByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);

  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado",
    });
  }

  return res.status(200).json(product);
}

export async function updateProductController(req: Request, res: Response) {
  const id = Number(req.params.id);

  const data = updateProductSchema.parse(req.body);

  const product = await updateProduct(id, data)

  return res.status(200).json(product)
}
