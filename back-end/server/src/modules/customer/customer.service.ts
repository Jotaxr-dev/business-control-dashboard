import { prisma } from "../../lib/prisma.js";

interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
}

type CustomerSortBy = "name" | "createdAt";
type SortOrder = "asc" | "desc";

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

export async function getCustomers(
  search?: string,
  sortBy: CustomerSortBy = "createdAt",
  order: SortOrder = "desc",
  page = 1,
  limit = 10,
) {
  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : undefined;

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      orderBy: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    customers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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

export async function deleteCustomer(id: number) {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    return null;
  }

  await prisma.customer.delete({
    where: { id },
  });

  return customer;
}
