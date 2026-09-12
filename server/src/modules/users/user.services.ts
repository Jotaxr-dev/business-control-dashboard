import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}
