import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import { createProductSchema, updateProductSchema } from "./product.schema.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service.js";

export async function createProductController(req: Request, res: Response) {
  const authenticatedReq = req as AuthenticatedRequest;
  const data = createProductSchema.parse(req.body);

  const product = await createProduct(authenticatedReq.companyId, data);

  return res.status(201).json(product);
}

export async function getProductsController(req: Request, res: Response) {
  const authenticatedReq = req as AuthenticatedRequest;
  const products = await getProducts(authenticatedReq.companyId);

  return res.status(200).json(products);
}

export async function getProductByIdController(req: Request, res: Response) {
  const authenticatedReq = req as AuthenticatedRequest;
  const id = Number(req.params.id);

  const product = await getProductById(id, authenticatedReq.companyId);

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado",
    });
  }

  return res.status(200).json(product);
}

export async function updateProductController(req: Request, res: Response) {
  const authenticatedReq = req as AuthenticatedRequest;
  const id = Number(req.params.id);
  const data = updateProductSchema.parse(req.body);

  const product = await updateProduct(id, authenticatedReq.companyId, data);

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado",
    });
  }

  return res.status(200).json(product);
}

export async function deleteProductController(req: Request, res: Response) {
  const authenticatedReq = req as AuthenticatedRequest;
  const id = Number(req.params.id);

  const product = await deleteProduct(id, authenticatedReq.companyId);

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado",
    });
  }

  return res.status(204).send();
}
