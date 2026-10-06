-- CreateEnum
CREATE TYPE "CatalogProductKind" AS ENUM ('FOAM_CONFIGURATOR', 'DIMENSIONS', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "CatalogProduct" ADD COLUMN     "kind" "CatalogProductKind" NOT NULL DEFAULT 'UNAVAILABLE';
