import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import tr from "zod/v4/locales/tr.js";

function slugify(value: string){
  return value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");
}


export async function createUser(
  name: string,
  email: string,
  password: string,
  companyName: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const slug = `${slugify(companyName)}-${Date.now()}`;

  const user = await prisma.$transaction(async (tx) => {
    const company = await tx.company.create({
      data: {
        name: companyName,
        slug,
      },
    });

    return tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyId: company.id,
        role: "OWNER",
      },
      select:  {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  });

  return user;


}
