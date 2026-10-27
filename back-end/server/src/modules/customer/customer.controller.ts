import { Request, Response } from "express";

import { createCustomerSchema, updateCustomerSchema } from "./customer.schema";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "./customer.service.js";

export async function createCustomerController(req: Request, res: Response) {
  const data = createCustomerSchema.parse(req.body);

  const customer = await createCustomer(data);

  return res.status(201).json(customer);
}

export async function getCustomersController(req: Request, res: Response) {
  const { search, sortBy, order, page, limit } = req.query;

  if (
    (search !== undefined && typeof search !== "string") ||
    (sortBy !== undefined && typeof sortBy !== "string") ||
    (order !== undefined && typeof order !== "string") ||
    (page !== undefined && typeof page !== "string") ||
    (limit !== undefined && typeof limit !== "string")
  ) {
    return res.status(400).json({
      message: "Parâmetros de consulta inválidos",
    });
  }

  const allowedSortFields = ["name", "createdAt"];
  const allowedOrders = ["asc", "desc"];

  if (sortBy !== undefined && !allowedSortFields.includes(sortBy)) {
    return res.status(400).json({
      message: "sortBy deve ser name ou createdAt",
    });
  }

  if (order !== undefined && !allowedOrders.includes(order)) {
    return res.status(400).json({
      message: "order deve ser asc ou desc",
    });
  }

  const pageNumber = page === undefined ? 1 : Number(page);
  const pageLimit = limit === undefined ? 10 : Number(limit);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    !Number.isInteger(pageLimit) ||
    pageLimit < 1 ||
    pageLimit > 100
  ) {
    return res.status(400).json({
      message: "page deve ser inteiro >= 1 e limit deve ser de 1 a 100",
    });
  }

  const result = await getCustomers(
    search,
    sortBy as "name" | "createdAt" | undefined,
    order as "asc" | "desc" | undefined,
    pageNumber,
    pageLimit,
  );

  return res.status(200).json(result);
}
export async function getCustomerByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);

  const customer = await getCustomerById(id);

  if (!customer) {
    return res.status(404).json({
      message: "Cliente não encontrado",
    });
  }

  return res.status(200).json(customer);
}

export async function updateCustomerController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = updateCustomerSchema.parse(req.body);

  const customer = await updateCustomer(id, data);

  return res.status(200).json(customer);
}

export async function deleteCustomerController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const customer = await deleteCustomer(id);

  if (!customer) {
    return res.status(404).json({
      message: "Cliente não encontrado",
    });
  }
  return res.status(204).send();
}
