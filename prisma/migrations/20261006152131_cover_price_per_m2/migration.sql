-- AlterTable
ALTER TABLE "CatalogProduct" ADD COLUMN     "pricePerM2" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderLineItem" ADD COLUMN     "unitPriceEur" DOUBLE PRECISION;
