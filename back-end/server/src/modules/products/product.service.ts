import { prisma } from "../../lib/prisma.js";

interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export async function createProduct(
  companyId: number,
  data: CreateProductData,
) {
  return prisma.product.create({
    data: {
      companyId,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    },
  });
}

export async function getProducts(companyId: number) {
  return prisma.product.findMany({
    where: {
      companyId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById(id: number, companyId: number) {
  return prisma.product.findUnique({
    where: {
      id,
      companyId,
    },
  });
}

export async function updateProduct(
  id: number,
  companyId: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
  },
) {
  const result = await prisma.product.updateMany({
    where: {
      id,
      companyId,
    },
    data,
  });
  if (result.count === 0) {
    return null;
  }

  return prisma.product.findFirst({
    where: {
      id,
      companyId,
    },
  });
}

export async function deleteProduct(id: number, companyId: number) {
  const product = await prisma.product.findFirst({
    where: {
      id,
      companyId,
    },
  });
  if (!product) {
    return null;
  }

  await prisma.product.deleteMany({
    where: {
      id,
      companyId,
    },
  });
  return product;
}
