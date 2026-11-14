
-- 1. Criar o enum de permissões
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- 2. Criar a tabela de empresas
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- 3. Cadastrar a empresa inicial
INSERT INTO "Company" ("name", "slug", "createdAt", "updatedAt")
VALUES (
    'Business Control',
    'business-control',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- 4. Adicionar empresa aos usuários, produtos e clientes
ALTER TABLE "User" ADD COLUMN "companyId" INTEGER;
ALTER TABLE "Product" ADD COLUMN "companyId" INTEGER;
ALTER TABLE "Customer" ADD COLUMN "companyId" INTEGER;

-- 5. Adicionar função dos usuários
ALTER TABLE "User"
ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'MEMBER';

-- 6. Associar os registros existentes à empresa inicial
UPDATE "User"
SET "companyId" = (
    SELECT "id" FROM "Company" WHERE "slug" = 'business-control'
);

UPDATE "Product"
SET "companyId" = (
    SELECT "id" FROM "Company" WHERE "slug" = 'business-control'
);

UPDATE "Customer"
SET "companyId" = (
    SELECT "id" FROM "Company" WHERE "slug" = 'business-control'
);

-- 7. Definir Jota Xavier como proprietário inicial
UPDATE "User"
SET "role" = 'OWNER'
WHERE "email" = 'jota@example.com';

-- 8. Tornar companyId obrigatório
ALTER TABLE "User" ALTER COLUMN "companyId" SET NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "companyId" SET NOT NULL;
ALTER TABLE "Customer" ALTER COLUMN "companyId" SET NOT NULL;

-- 9. Substituir a unicidade global do e-mail dos clientes
DROP INDEX "Customer_email_key";

CREATE UNIQUE INDEX "Customer_companyId_email_key"
ON "Customer"("companyId", "email");

-- 10. Converter o preço para Decimal(12,2)
ALTER TABLE "Product"
ALTER COLUMN "price" TYPE DECIMAL(12,2)
USING ROUND("price"::numeric, 2);

-- 11. Criar relacionamentos com Company
ALTER TABLE "User"
ADD CONSTRAINT "User_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Product"
ADD CONSTRAINT "Product_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Customer"
ADD CONSTRAINT "Customer_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- 12. Criar índices para consultas por empresa
CREATE INDEX "User_companyId_idx" ON "User"("companyId");
CREATE INDEX "Product_companyId_idx" ON "Product"("companyId");
CREATE INDEX "Customer_companyId_idx" ON "Customer"("companyId");

-- 13. Sincronizar a sequência de IDs da empresa
SELECT setval(
    pg_get_serial_sequence('"Company"', 'id'),
    (SELECT MAX("id") FROM "Company")
);
