import { prisma } from "../../lib/prisma.js";

interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
}

export async function createCustomer(data: CreateCustomerData) {
  const customer = await prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });

  return customer;
}

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return customers;
}

export async function getCustomerById(id: number) {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  return customer;
}

export async function updateCustomer(
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
  },
) {
  const customer = await prisma.customer.update({
    where: { id },
    data,
  });

  return customer;
}
