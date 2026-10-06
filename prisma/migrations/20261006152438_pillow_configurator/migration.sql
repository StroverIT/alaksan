-- AlterEnum
ALTER TYPE "CatalogProductKind" ADD VALUE 'PILLOW_CONFIGURATOR';

-- CreateTable
CREATE TABLE "PillowType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PillowType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PillowSize" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "widthCm" DOUBLE PRECISION NOT NULL,
    "lengthCm" DOUBLE PRECISION NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PillowSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PillowPrice" (
    "id" TEXT NOT NULL,
    "pillowTypeId" TEXT NOT NULL,
    "pillowSizeId" TEXT NOT NULL,
    "priceEur" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PillowPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PillowType_code_key" ON "PillowType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PillowSize_code_key" ON "PillowSize"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PillowPrice_pillowTypeId_pillowSizeId_key" ON "PillowPrice"("pillowTypeId", "pillowSizeId");

-- AddForeignKey
ALTER TABLE "PillowPrice" ADD CONSTRAINT "PillowPrice_pillowTypeId_fkey" FOREIGN KEY ("pillowTypeId") REFERENCES "PillowType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PillowPrice" ADD CONSTRAINT "PillowPrice_pillowSizeId_fkey" FOREIGN KEY ("pillowSizeId") REFERENCES "PillowSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;
