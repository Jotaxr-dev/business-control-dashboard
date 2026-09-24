import { Request, Response } from "express";

import { createCustomerSchema } from "./customer.schema";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
} from "./customer.service.js";

export async function createCustomerController(req: Request, res: Response) {
  const data = createCustomerSchema.parse(req.body);

  const customer = await createCustomer(data);

  return res.status(201).json(customer);
}

export async function getCustomersController(_req: Request, res: Response) {
  const customers = await getCustomers();

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
