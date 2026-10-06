import PageIntro from "@/components/PageIntro";
import ShopProductCard from "@/components/ShopProductCard";
import { SHOP_CONTENT } from "@/consts";
import { prisma } from "@/lib/prisma";
import type { FC } from "react";

const ShopPage: FC = async () => {
  const products = await prisma.catalogProduct.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <PageIntro
        eyebrowLabel={SHOP_CONTENT.eyebrowLabel}
        titleLabel={SHOP_CONTENT.titleLabel}
        descriptionLabel={SHOP_CONTENT.descriptionLabel}
      />
      {products.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center text-muted">
          {SHOP_CONTENT.emptyLabel}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
