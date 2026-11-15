import { prisma } from "../../lib/prisma.js";

interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
}

type CustomerSortBy = "name" | "createdAt";
type SortOrder = "asc" | "desc";

export async function createCustomer(
  companyId: number,
  data: CreateCustomerData,
) {
  return prisma.customer.create({
    data: {
      companyId,
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });
}

export async function getCustomers(
  companyId: number,
  search?: string,
  sortBy: CustomerSortBy = "createdAt",
  order: SortOrder = "desc",
  page = 1,
  limit = 10,
) {
  const where = {
    companyId,
    ...(search
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
      : {}),
  };

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

export async function getCustomerById(id: number, companyId: number) {
  return prisma.customer.findFirst({
    where: {
      id,
      companyId,
    },
  });
}

export async function updateCustomer(
  id: number,
  companyId: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
  },
) {
  const result = await prisma.customer.updateMany({
    where: {
      id,
      companyId,
    },
    data,
  });

  if (result.count === 0) {
    return null;
  }

  return prisma.customer.findFirst({
    where: {
      id,
      companyId,
    },
  });
}

export async function deleteCustomer(id: number, companyId: number) {
  const customer = await prisma.customer.findFirst({
    where: {
      id,
      companyId,
    },
  });
  if (!customer) {
    return null;
  }
  await prisma.customer.deleteMany({
    where: {
      id,
      companyId,
    },
  });
  return customer;
}
