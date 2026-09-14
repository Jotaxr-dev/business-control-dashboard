import { prisma } from "../../lib/prisma.js";

interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export async function createProduct(data: CreateProductData) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    },
  });

  return product;
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}
