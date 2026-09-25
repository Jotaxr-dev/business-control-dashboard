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
  const search = req.query.search;

  if (search !== undefined && typeof search !== "string") {
    return res.status(400).json({
      message: "Parâmetro search inválido",
    });
  }

  const customers = await getCustomers(search);

  return res.status(200).json(customers);
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
