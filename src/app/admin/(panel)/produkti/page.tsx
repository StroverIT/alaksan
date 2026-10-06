import AdminProductsTabs from "@/components/AdminProductsTabs";
import {
  CONTENT,
  DEFAULT_PRODUCT_TAB,
  PRODUCT_TAB,
  isProductTab,
} from "@/components/AdminProductsTabs/consts";
import CoverPricesEditor from "@/components/CoverPricesEditor";
import FoamPricesEditor from "@/components/FoamPricesEditor";
import PillowPricesEditor from "@/components/PillowPricesEditor";
import { prisma } from "@/lib/prisma";
import type { FC } from "react";

type TProductsPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

const ProductsPage: FC<TProductsPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const activeTab = isProductTab(params.tab) ? params.tab : DEFAULT_PRODUCT_TAB;

  const foamTypes =
    activeTab === PRODUCT_TAB.DUNAPREN
      ? await prisma.foamType.findMany({
          where: { active: true },
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
          select: {
            id: true,
            code: true,
            name: true,
            pricePerM3: true,
          },
        })
      : [];

  const coverProduct =
    activeTab === PRODUCT_TAB.KALAFI
      ? await prisma.catalogProduct.findFirst({
          where: { slug: "kalafi-za-matraci", active: true },
          select: { id: true, pricePerM2: true },
        })
      : null;

  const pillowTypes =
    activeTab === PRODUCT_TAB.VAZGLAVNICI
      ? await prisma.pillowType.findMany({
          where: { active: true },
          orderBy: { sortOrder: "asc" },
          select: { id: true, name: true },
        })
      : [];

  const pillowSizes =
    activeTab === PRODUCT_TAB.VAZGLAVNICI
      ? await prisma.pillowSize.findMany({
          where: { active: true },
          orderBy: { sortOrder: "asc" },
          select: { id: true, label: true },
        })
      : [];

  const pillowPrices =
    activeTab === PRODUCT_TAB.VAZGLAVNICI
      ? await prisma.pillowPrice.findMany({
          select: {
            pillowTypeId: true,
            pillowSizeId: true,
            priceEur: true,
          },
        })
      : [];

  const tabLead =
    activeTab === PRODUCT_TAB.DUNAPREN
      ? CONTENT.dunaprenLeadLabel
      : activeTab === PRODUCT_TAB.VAZGLAVNICI
        ? CONTENT.vazglavniciLeadLabel
        : CONTENT.kalafiLeadLabel;

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">{CONTENT.titleLabel}</h1>
      <p className="mt-1 text-sm text-muted">{CONTENT.leadLabel}</p>

      <AdminProductsTabs activeTab={activeTab} />

      <div className="mt-6">
        <p className="mb-4 text-sm text-muted">{tabLead}</p>

        {activeTab === PRODUCT_TAB.DUNAPREN ? (
          <FoamPricesEditor foamTypes={foamTypes} />
        ) : null}

        {activeTab === PRODUCT_TAB.VAZGLAVNICI ? (
          <PillowPricesEditor
            pillowTypes={pillowTypes}
            pillowSizes={pillowSizes}
            pillowPrices={pillowPrices}
          />
        ) : null}

        {activeTab === PRODUCT_TAB.KALAFI && coverProduct ? (
          <CoverPricesEditor
            productId={coverProduct.id}
            pricePerM2={coverProduct.pricePerM2}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
